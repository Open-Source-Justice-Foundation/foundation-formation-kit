import { auth } from "~/auth";
import { resetPasswordSchema } from "~/lib/auth/validation/schemas";
// import { neon } from "@neondatabase/serverless";
// import { saltAndHashPassword } from "~/lib/auth/passwords/utils";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  if (session !== null) {
    throw new Error("Session already exists");
  }

  if (typeof process.env.DATABASE_URL === "string") {
    // const sql = neon(process.env.DATABASE_URL);

    try {
      const data = await request.json();

      const {} = resetPasswordSchema.parse(data);

      // const passwordHash = await saltAndHashPassword(password);
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      if (err instanceof ZodError) {
        throw new Error("Failed to reset password: invalid credentials");
      }
      console.error(err);
      throw new Error("Failed to reset password");
    }
  }

  return NextResponse.json(
    { message: "Password reset successful" },
    { status: 200 },
  );
}
