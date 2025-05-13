import { auth } from "~/auth";
import { checkOAuthAccountAlreadyLinkedByUserIdAndProvider } from "~/services/database/queries/auth";
import {
  type ProfileState,
  type UserWithEmailVerifiedAndPasswordHash,
} from "~/types";
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
      } else if (user.password_hash === null) {
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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to get profile state");
  }

  return NextResponse.json(
    { message: "Profile state retrieved", profileState },
    { status: 200 },
  );
}
