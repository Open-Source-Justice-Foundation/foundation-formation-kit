import { auth } from "~/auth";
import {
  saltAndHashPassword,
  verifyPassword,
} from "~/lib/auth/passwords/utils";
import type {
  SessionWithId,
  UserWithEmailVerifiedAndPasswordHash,
} from "~/lib/auth/types";
import { updatePasswordFromProfileSchema } from "~/lib/auth/validation/schemas";
import {
  deleteAllPasswordResetTokensByEmail,
  deleteAllSessionsExceptCurrentForUserByUserId,
  deleteAllVerificationTokensForUserByUserIdentifier,
  getPasswordHashById,
  updatePasswordHashByUserId,
} from "~/services/database/queries/auth";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  const sessionWithId = <SessionWithId>session;

  const sessionId = sessionWithId?.id;

  const user = <UserWithEmailVerifiedAndPasswordHash>session?.user;

  const userId = user?.id;
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

    if (typeof userId === "number") {
      const currentPasswordHash = await getPasswordHashById(userId);

      await verifyPassword(currentPasswordHash, currentPassword);
    } else {
      throw new Error("Incorrect user id data type");
    }

    const passwordHash = await saltAndHashPassword(password);

    // TODO
    // Look into preventing password update if the password is the same as the previous password
    if (typeof sessionId === "number") {
      await updatePasswordHashByUserId(passwordHash, userId);

      await deleteAllSessionsExceptCurrentForUserByUserId(sessionId, userId);
      await deleteAllVerificationTokensForUserByUserIdentifier(userEmail);
      await deleteAllPasswordResetTokensByEmail(userEmail);
    } else {
      throw new Error("Incorrect session id data type");
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
