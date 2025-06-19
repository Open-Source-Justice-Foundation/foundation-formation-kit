import { auth } from "~/auth";
import { form1023Part2OrganizationalStructureStep4Schema } from "~/lib/formation/validation/part-2/schemas";
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

    const { } = form1023Part2OrganizationalStructureStep4Schema.parse(data);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(
        "Failed to process formation part 2 step 4: invalid data",
      );
    }
    console.error(err);
    throw new Error("Failed to process formation part 2 step 4");
  }

  return NextResponse.json(
    { message: "Formation part 2 step 4 submitted" },
    { status: 200 },
  );
}
