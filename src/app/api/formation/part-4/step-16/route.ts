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
        "Failed to process formation part 4 step 16: invalid data",
      );
    }
    console.error(err);
    throw new Error("Failed to process formation part 4 step 16");
  }

  return NextResponse.json(
    { message: "Formation part 4 step 16 submitted" },
    { status: 200 },
  );
}
