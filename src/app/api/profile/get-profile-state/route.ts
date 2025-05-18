import { auth } from "~/auth";
import type { UserWithEmailVerifiedAndPasswordHash } from "~/lib/auth/types";
import { checkOAuthAccountAlreadyLinkedByUserIdAndProvider } from "~/services/database/queries/auth";
import type { ProfileState } from "~/types";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const session = await auth();

  const user = <UserWithEmailVerifiedAndPasswordHash>session?.user;

  const userId = user?.id;
  const userEmail = user?.email;
  const userEmailVerified = user?.emailVerified;
  const userPasswordHash = user?.password_hash;

  if (!userEmail) {
    throw new Error("Invalid session");
  }

  const profileState: ProfileState = {
    emailVerified: null,
    passwordPresent: null,
    githubAccountLinked: null,
  };

  try {
    if (typeof userId === "number") {
      const provider = "github";

      if (userEmailVerified) {
        profileState.emailVerified = true;
      } else if (userEmailVerified === null) {
        profileState.emailVerified = false;
      }

      if (userPasswordHash) {
        profileState.passwordPresent = true;
      } else if (userPasswordHash === null) {
        profileState.passwordPresent = false;
      }

      const oAuthAccountAlreadyLinked =
        await checkOAuthAccountAlreadyLinkedByUserIdAndProvider(
          userId,
          provider,
        );

      if (oAuthAccountAlreadyLinked) {
        profileState.githubAccountLinked = true;
      } else {
        profileState.githubAccountLinked = false;
      }
    } else {
      throw new Error("Incorrect user id data type");
    }

    if (
      profileState.emailVerified === null ||
      profileState.passwordPresent === null ||
      profileState.githubAccountLinked === null
    ) {
      throw new Error("Invalid profile state");
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get profile state");
  }

  return NextResponse.json(
    { message: "Profile state retrieved", profileState },
    { status: 200 },
  );
}
