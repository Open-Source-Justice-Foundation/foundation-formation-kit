import { auth } from "~/auth";
import { saltAndHashPassword } from "~/lib/auth/passwords/utils";
import { hashToken } from "~/lib/auth/tokens/utils";
import { updatePasswordSchema } from "~/lib/auth/validation/schemas";
import { isDate } from "~/lib/utils";
import { deleteAllVerificationTokensForUserByUserIdentifier } from "~/services/database/queries/auth";
import {
  deletePasswordResetTokenById,
  getPasswordResetTokenByTokenHash,
  updatePasswordHashByUserId,
} from "~/services/database/queries/auth/passwords";
import { deleteAllSessionsForUserByUserId } from "~/services/database/queries/auth/sessions";
import { getUserByEmail } from "~/services/database/queries/auth/users";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  if (session !== null) {
    throw new Error("Session already exists");
  }

  try {
    const data = await request.json();

    const { token, password, passwordConfirmation } = data;

    if (typeof token !== "string") {
      throw new Error("Invalid token");
    }

    updatePasswordSchema.parse({ password, passwordConfirmation });

    const tokenHash = hashToken(token);

    const existingToken = await getPasswordResetTokenByTokenHash(tokenHash);

    const existingTokenEmail = existingToken?.email;
    const existingTokenExpires = existingToken?.expires;
    const existingTokenId = existingToken?.id;

    if (isDate(existingTokenExpires)) {
      if (new Date(existingTokenExpires) < new Date()) {
        throw new Error("Expired token");
      }
    } else {
      throw new Error("Incorrect existing token expires data type");
    }

    if (typeof existingTokenEmail === "string") {
      const user = await getUserByEmail(existingTokenEmail);
      const userId = user?.id;
      const userEmail = user?.email;

      const passwordHash = await saltAndHashPassword(password);

      // TODO
      // Look into preventing password update if the password is the same as the previous password
      if (typeof userId === "number") {
        await updatePasswordHashByUserId(passwordHash, userId);

        if (typeof existingTokenId === "string") {
          await deletePasswordResetTokenById(existingTokenId);
        }

        await deleteAllSessionsForUserByUserId(userId);

        if (typeof userEmail === "string") {
          await deleteAllVerificationTokensForUserByUserIdentifier(userEmail);
        }
      } else {
        throw new Error("Incorrect user id data type");
      }
    }
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error("Failed to update password: invalid credentials");
    }
    console.error(err);
    throw new Error("Failed to update password");
  }

  return NextResponse.json(
    { message: "Password update successful" },
    { status: 200 },
  );
}
