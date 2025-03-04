// import { neon } from "@neondatabase/serverless";
// import { saltAndHashPassword } from "~/lib/auth/utils";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (typeof process.env.DATABASE_URL === "string") {
    // const sql = neon(process.env.DATABASE_URL);

    try {
      const {} = await request.json();

      // TODO
      // Validate password and password Confirmation here on the server using zod
      // Check for password and passwordConfirmation existence and format

      // const passwordHash = await saltAndHashPassword(password);
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      throw new Error("Failed to reset password");
    }
  }

  // TODO
  // Check status code
  return NextResponse.json(
    { message: "Password reset successful" },
    { status: 200 },
  );
}
