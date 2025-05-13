import { auth } from "~/auth";
import { type UserWithEmailVerifiedAndPasswordHash } from "~/types";
import { NextResponse } from "next/server";

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
