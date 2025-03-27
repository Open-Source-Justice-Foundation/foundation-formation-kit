import { auth } from "~/auth";
import {
  hashPasswordResetToken,
  saltAndHashPassword,
} from "~/lib/auth/passwords/utils";
import { updatePasswordSchema } from "~/lib/auth/validation/schemas";
import {
  deleteAllSessionsForUserByUserId,
  deleteAllVerificationTokensForUserByUserIdentifier,
  deletePasswordResetTokenById,
  getPasswordResetTokenByTokenHash,
  getUserByEmail,
  updatePasswordHashByUserId,
} from "~/services/database/queries/auth";
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

    const tokenHash = hashPasswordResetToken(token);

    const existingToken = await getPasswordResetTokenByTokenHash(tokenHash);

    if (new Date(existingToken.expires) < new Date()) {
      throw new Error("Expired token");
    }

    const user = await getUserByEmail(existingToken.email);

    const passwordHash = await saltAndHashPassword(password);

    // TODO
    // Look into preventing password update if the password is the same as the previous password
    const passwordUpdated = await updatePasswordHashByUserId(
      passwordHash,
      user.id,
    );

    if (passwordUpdated) {
      deletePasswordResetTokenById(existingToken.id);
      deleteAllSessionsForUserByUserId(user.id);
      deleteAllVerificationTokensForUserByUserIdentifier(user.email);
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
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
