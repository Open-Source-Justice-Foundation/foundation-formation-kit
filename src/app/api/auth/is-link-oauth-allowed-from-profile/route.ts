import { auth } from "~/auth";
import { type UserWithEmailVerifiedAndPasswordHash } from "~/types";
import { NextResponse } from "next/server";

// TODO
// Try linking multiple github accounts, should only be able to link one github account per user
export async function GET(): Promise<NextResponse> {
  const session = await auth();

  const user = <UserWithEmailVerifiedAndPasswordHash>session?.user;

  const userEmail = user?.email;

  if (!userEmail || !user?.emailVerified || !user?.password_hash) {
    throw new Error("Invalid session");
  }

  return NextResponse.json(
    { message: "Allowed to link OAuth account" },
    { status: 200 },
  );
}
