import { neon } from "@neondatabase/serverless";
import { saltAndHashPassword } from "~/lib/auth/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (typeof process.env.DATABASE_URL === "string") {
    const sql = neon(process.env.DATABASE_URL);

    try {
      const { email, password } = await request.json();

      // TODO
      // Validate email and password here on the server using zod
      // Check for email and password existence and format

      const emailExistsResponse = await sql(
        "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)",
        [email],
      );

      console.log("emailExistsResponse", emailExistsResponse);

      if (emailExistsResponse === undefined) {
        throw new Error("Failed to select user from database");
      } else if (emailExistsResponse.length !== 1) {
        throw new Error("Failed to check if email exists in database");
      } else if (!emailExistsResponse[0].hasOwnProperty("exists")) {
        throw new Error("Failed to check for exists property");
      } else if (emailExistsResponse[0].exists !== false) {
        throw new Error("Email already exists");
      }

      const passwordHash = await saltAndHashPassword(password);

      await sql("INSERT INTO users (email, password_hash) VALUES ($1, $2)", [
        email,
        passwordHash,
      ]);
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      throw new Error("Failed to register user");
    }
  }

  return NextResponse.json(
    { message: "Registration successful" },
    { status: 201 },
  );
}
