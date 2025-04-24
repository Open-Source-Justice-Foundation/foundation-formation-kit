import { auth } from "~/auth";
import {
  saltAndHashPassword,
  verifyPassword,
} from "~/lib/auth/passwords/utils";
import { updatePasswordFromProfileSchema } from "~/lib/auth/validation/schemas";
import {
  deleteAllPasswordResetTokensByEmail,
  deleteAllSessionsExceptCurrentForUserByUserId,
  deleteAllVerificationTokensForUserByUserIdentifier,
  getPasswordHashByEmail,
  updatePasswordHashByUserId,
} from "~/services/database/queries/auth";
import {
  type SessionWithId,
  type UserWithEmailVerifiedAndPasswordHash,
} from "~/types";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  const sessionWithId = <SessionWithId>session;

  const user = <UserWithEmailVerifiedAndPasswordHash>session?.user;

  const userEmail = user?.email;

  if (!userEmail || !user?.emailVerified || !user?.password_hash) {
    throw new Error("Invalid session");
  }

  try {
    const data = await request.json();

    const { currentPassword, password, passwordConfirmation } = data;

    updatePasswordFromProfileSchema.parse({
      currentPassword,
      password,
      passwordConfirmation,
    });

    const password_hash = await getPasswordHashByEmail(userEmail);

    await verifyPassword(password_hash, currentPassword);

    const passwordHash = await saltAndHashPassword(password);

    // TODO
    // Look into preventing password update if the password is the same as the previous password
    if (typeof sessionWithId?.id === "number" && typeof user?.id === "number") {
      const passwordUpdated = await updatePasswordHashByUserId(
        passwordHash,
        user.id,
      );

      if (passwordUpdated) {
        deleteAllSessionsExceptCurrentForUserByUserId(
          sessionWithId.id,
          user.id,
        );
        deleteAllVerificationTokensForUserByUserIdentifier(userEmail);
        deleteAllPasswordResetTokensByEmail(userEmail);
      }
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
