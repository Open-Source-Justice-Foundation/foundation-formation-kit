import { auth } from "~/auth";
import { form1023Part1IdentificationOfApplicantStep6Schema } from "~/lib/formation/validation/part-1/schemas";
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
    const data = await request.json();

    const { } = form1023Part1IdentificationOfApplicantStep6Schema.parse(data);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(
        "Failed to process formation part 1 step 6: invalid data",
      );
    }
    console.error(err);
    throw new Error("Failed to process formation part 1 step 6");
  }

  return NextResponse.json(
    { message: "Formation part 1 step 6 submitted" },
    { status: 200 },
  );
}
