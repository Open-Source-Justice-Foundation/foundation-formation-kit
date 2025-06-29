import { auth } from "~/auth";
import {
  deleteAllEmailAddressResetTokensByUserId,
  deleteAllEmailAddressVerificationTokensByUserId,
} from "~/services/database/queries/auth/email-addresses";
import { deleteAllOAuthAccountsForUserByUserId } from "~/services/database/queries/auth/oauth-accounts";
import { deleteAllPasswordResetTokensByEmail } from "~/services/database/queries/auth/passwords";
import { deleteAllSessionsForUserByUserId } from "~/services/database/queries/auth/sessions";
import { deleteUserById } from "~/services/database/queries/auth/users";
import { deleteAllVerificationTokensForUserByUserIdentifier } from "~/services/database/queries/auth/verification-tokens";
import { NextResponse } from "next/server";

export async function DELETE(): Promise<NextResponse> {
  const session = await auth();

  const user = session?.user;

  const userId = user?.id;
  const userEmail = user?.email;

  if (!session) {
    throw new Error("Invalid session");
  }

  try {
    if (typeof userId === "number") {
      await deleteAllSessionsForUserByUserId(userId);
      await deleteUserById(userId);
      if (typeof userEmail === "string") {
        await deleteAllVerificationTokensForUserByUserIdentifier(userEmail);
        await deleteAllPasswordResetTokensByEmail(userEmail);
      } else {
        throw new Error("Incorrect user email data type");
      }
      await deleteAllEmailAddressResetTokensByUserId(userId);
      await deleteAllEmailAddressVerificationTokensByUserId(userId);
      await deleteAllOAuthAccountsForUserByUserId(userId);
    } else {
      throw new Error("Incorrect user id data type");
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete account");
  }

  return NextResponse.json(
    { message: "Account deleted successfully" },
    { status: 200 },
  );
}
