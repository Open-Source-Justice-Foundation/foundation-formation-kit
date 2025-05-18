import { auth } from "~/auth";
import { NextResponse } from "next/server";

// TODO
// Make sure this route has proper validation
// Set up query
export async function GET(): Promise<NextResponse> {
  const session = await auth();

  if (!session) {
    throw new Error("Invalid session");
  }

  try {
    console.log("Getting user foundations...");
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get user foundations");
  }

  return NextResponse.json(
    { message: "User foundations retrieved" },
    { status: 200 },
  );
}
