import { auth } from "~/auth";
import {
  hashEmailAddressOrPasswordResetToken,
  verifyPassword,
} from "~/lib/auth/passwords/utils";
import { passwordRequestSchema } from "~/lib/auth/validation/schemas";
import {
  checkIfEmailAlreadyExists,
  deleteAllPasswordResetTokensByEmail,
  deleteAllSessionsForUserByUserId,
  deleteAllVerificationTokensForUserByUserIdentifier,
  deleteEmailAddressResetTokenById,
  getEmailAddressResetTokenByTokenHash,
  getPasswordHashByEmail,
  getUserByEmail,
  updateEmailAddressByUserId,
} from "~/services/database/queries/auth";
import { type UserWithEmailVerified } from "~/types";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  const user = <UserWithEmailVerified>session?.user;

  const userEmail = user?.email;

  if (!userEmail || !user?.emailVerified) {
    throw new Error("Invalid session");
  }

  try {
    const data = await request.json();

    const { token, password } = data;

    if (typeof token !== "string") {
      throw new Error("Invalid token");
    }

    passwordRequestSchema.parse({ password });

    const tokenHash = hashEmailAddressOrPasswordResetToken(token);

    const existingToken = await getEmailAddressResetTokenByTokenHash(tokenHash);

    if (user.id !== existingToken.userId) {
      throw new Error("Invalid session");
    }

    if (typeof existingToken?.email === "string") {
      await checkIfEmailAlreadyExists(existingToken.email);
    }

    if (new Date(existingToken.expires) < new Date()) {
      throw new Error("Expired token");
    }

    const password_hash = await getPasswordHashByEmail(userEmail);

    await verifyPassword(password_hash, password);

    if (typeof userEmail === "string") {
      const user = await getUserByEmail(userEmail);

      if (existingToken?.email === "string" && typeof user?.id === "number") {
        const emailAddressUpdated = await updateEmailAddressByUserId(
          existingToken.email,
          user.id,
        );

        if (emailAddressUpdated) {
          if (typeof existingToken?.id === "string") {
            deleteEmailAddressResetTokenById(existingToken.id);
          }

          deleteAllSessionsForUserByUserId(user.id);

          if (typeof user?.email === "string") {
            deleteAllVerificationTokensForUserByUserIdentifier(user.email);
            deleteAllPasswordResetTokensByEmail(userEmail);
          }
        }
      }
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    if (err instanceof ZodError) {
      throw new Error("Failed to update email address: invalid credentials");
    }
    console.error(err);
    throw new Error("Failed to update email address");
  }

  return NextResponse.json(
    { message: "Email address update successful" },
    { status: 200 },
  );
}
