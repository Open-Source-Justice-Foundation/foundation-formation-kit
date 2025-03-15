import { auth } from "~/auth";
import { resetPasswordSchema } from "~/lib/auth/validation/schemas";
// import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  if (session !== null) {
    throw new Error("Session already exists");
  }

  if (typeof process.env.DATABASE_URL === "string") {
    try {
      // const sql = neon(process.env.DATABASE_URL);

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
  } else {
    throw new Error("Incorrect database URL type");
  }

  return NextResponse.json(
    { message: "Password reset instructions sent" },
    { status: 200 },
  );
}
