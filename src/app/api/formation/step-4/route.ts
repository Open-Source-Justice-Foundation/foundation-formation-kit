import { auth } from "~/auth";
import { legalNameSchema } from "~/lib/formation/validation/schemas";
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

    const {} = legalNameSchema.parse(data);
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    if (err instanceof ZodError) {
      throw new Error("Failed to process formation step 4: invalid data");
    }
    console.error(err);
    throw new Error("Failed to process formation step 4");
  }

  return NextResponse.json(
    { message: "Formation step 4 submitted" },
    { status: 200 },
  );
}
