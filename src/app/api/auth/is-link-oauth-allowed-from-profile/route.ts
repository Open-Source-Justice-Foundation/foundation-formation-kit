import { auth } from "~/auth";
import type { UserWithEmailVerifiedAndPasswordHash } from "~/lib/auth/types";
import { checkOAuthAccountAlreadyLinkedByUserIdAndProvider } from "~/services/database/queries/auth/oauth-accounts";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
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
        throw new Error("Not allowed to link OAuth account");
      }
    } else {
      throw new Error("Incorrect user id data type");
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to link OAuth account");
  }

  return NextResponse.json(
    { message: "Allowed to link OAuth account" },
    { status: 200 },
  );
}
