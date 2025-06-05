import { auth } from "~/auth";
import type { UserWithEmailVerifiedAndPasswordHash } from "~/lib/auth/types";
import {
  checkOAuthAccountAlreadyLinkedByUserIdAndProvider,
  deleteOAuthAccountForUserByUserIdAndProvider,
} from "~/services/database/queries/auth/oauth-accounts";
import { NextResponse } from "next/server";

export async function DELETE(): Promise<NextResponse> {
  const session = await auth();

  const user = <UserWithEmailVerifiedAndPasswordHash>session?.user;

  const userId = user?.id;
  const userEmail = user?.email;

  if (!userEmail || !user?.emailVerified || !user?.password_hash) {
    throw new Error("Invalid session");
  }

  try {
    if (typeof userId === "number") {
      const provider = "github";

      const oAuthAccountAlreadyLinked =
        await checkOAuthAccountAlreadyLinkedByUserIdAndProvider(
          userId,
          provider,
        );

      if (oAuthAccountAlreadyLinked) {
        await deleteOAuthAccountForUserByUserIdAndProvider(userId, provider);
      } else {
        throw new Error("Failed to find OAuth account for user");
      }
    } else {
      throw new Error("Incorrect user id data type");
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to unlink OAuth account");
  }

  return NextResponse.json(
    { message: "OAuth account unlinked successfully" },
    { status: 200 },
  );
}
