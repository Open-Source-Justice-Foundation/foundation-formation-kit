import { auth } from "~/auth";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// TODO
// Make sure this route has proper validation
export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  if (!session) {
    throw new Error("Session doesn't exist");
  }

  try {
    const { } = await request.json();
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(
        "Failed to process formation schedule B step 15: invalid data",
      );
    }
    console.error(err);
    throw new Error("Failed to process formation schedule B step 15");
  }

  return NextResponse.json(
    { message: "Formation schedule B step 15 submitted" },
    { status: 200 },
  );
}
