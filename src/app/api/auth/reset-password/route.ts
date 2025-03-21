import { auth } from "~/auth";
import { resetPasswordSchema } from "~/lib/auth/validation/schemas";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  if (session !== null) {
    throw new Error("Session already exists");
  }

  try {
    const data = await request.json();

    const {} = resetPasswordSchema.parse(data);
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    if (err instanceof ZodError) {
      throw new Error(
        "Failed to send password reset instructions: invalid credentials",
      );
    }
    console.error(err);
    throw new Error("Failed to send password reset instructions");
  }

  return NextResponse.json(
    { message: "Password reset instructions sent" },
    { status: 200 },
  );
}
