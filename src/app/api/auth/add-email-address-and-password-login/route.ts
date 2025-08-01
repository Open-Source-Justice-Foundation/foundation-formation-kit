import { auth } from "~/auth";
import { verifyPassword } from "~/lib/auth/passwords/utils";
import { hashToken } from "~/lib/auth/tokens/utils";
import type { UserWithEmailVerifiedAndPasswordHash } from "~/lib/auth/types";
import { passwordRequestSchema } from "~/lib/auth/validation/schemas";
import { isDate } from "~/lib/utils";
import {
  checkIfEmailAlreadyExistsForAnotherUser,
  deleteEmailAddressVerificationTokenById,
  getEmailAddressVerificationTokenByTokenHash,
  updateEmailAddressAndEmailVerifiedByUserId,
} from "~/services/database/queries/auth/email-addresses";
import { getPasswordHashById } from "~/services/database/queries/auth/passwords";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  const user = <UserWithEmailVerifiedAndPasswordHash>session?.user;

  const userId = user?.id;
  const userEmail = user?.email;

  if (!userEmail || user?.emailVerified || !user?.password_hash) {
    throw new Error("Invalid session");
  }

  try {
    const data = await request.json();

    const { token, password } = data;

    if (typeof token !== "string") {
      throw new Error("Invalid token");
    }

    passwordRequestSchema.parse({ password });

    const tokenHash = hashToken(token);

    const existingToken =
      await getEmailAddressVerificationTokenByTokenHash(tokenHash);

    const existingTokenUserId = existingToken?.userId;
    const existingTokenEmail = existingToken?.email;
    const existingTokenExpires = existingToken?.expires;
    const existingTokenId = existingToken?.id;

    if (typeof userId === "number" && typeof existingTokenUserId === "number") {
      if (userId !== existingTokenUserId) {
        throw new Error("Invalid session");
      }
    } else {
      throw new Error(
        "Incorrect user id data type and/or incorrect existing token user id data type",
      );
    }

    if (typeof existingTokenEmail === "string") {
      await checkIfEmailAlreadyExistsForAnotherUser(existingTokenEmail, userId);
    } else {
      throw new Error("Incorrect existing token email data type");
    }

    if (isDate(existingTokenExpires)) {
      if (new Date(existingTokenExpires) < new Date()) {
        throw new Error("Expired token");
      }
    } else {
      throw new Error("Incorrect existing token expires data type");
    }

    const passwordHash = await getPasswordHashById(userId);

    await verifyPassword(passwordHash, password);

    const emailVerified = new Date();

    if (typeof existingTokenEmail === "string") {
      await updateEmailAddressAndEmailVerifiedByUserId(
        existingTokenEmail,
        emailVerified,
        userId,
      );
    }

    if (typeof existingTokenId === "string") {
      await deleteEmailAddressVerificationTokenById(existingTokenId);
    }
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(
        "Failed to add email address and password login: invalid credentials",
      );
    }
    console.error(err);
    throw new Error("Failed to add email address and password login");
  }

  return NextResponse.json(
    { message: "Email address and password login added successfully" },
    { status: 200 },
  );
}
