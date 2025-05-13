import { auth } from "~/auth";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const session = await auth();

  if (session !== null) {
    throw new Error("Session already exists");
  }

  return NextResponse.json(
    { message: "Session status verified" },
    { status: 200 },
  );
}
