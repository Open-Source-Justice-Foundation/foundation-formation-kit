import { neon } from "@neondatabase/serverless";
import { auth } from "~/auth";
import { verifyPassword } from "~/lib/auth/passwords/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  if (session !== null) {
    throw new Error("Session already exists");
  }

  if (typeof process.env.DATABASE_URL === "string") {
    const sql = neon(process.env.DATABASE_URL);

    try {
      const { email, password } = await request.json();

      // TODO
      // Validate email and password here on the server using zod
      // Check for email and password existence and format

      const selectEmailAndPasswordHashResponse = await sql(
        "SELECT email, password_hash FROM users WHERE email = $1",
        [email],
      );

      if (selectEmailAndPasswordHashResponse === undefined) {
        throw new Error("Failed to select user from database");
      } else if (selectEmailAndPasswordHashResponse.length === 0) {
        throw new Error("Email doesn't exist");
        // TODO
        // Means no user was found, so this is their first attempt to login
        // Optionally, this is also the place you could do a user registration redirection
      } else if (selectEmailAndPasswordHashResponse.length > 1) {
        throw new Error("Multiple users exist with the same email");
      } else if (
        !selectEmailAndPasswordHashResponse[0].hasOwnProperty("email") ||
        !selectEmailAndPasswordHashResponse[0].hasOwnProperty("password_hash")
      ) {
        throw new Error("Credential properties don't exist");
      } else if (
        typeof selectEmailAndPasswordHashResponse[0].password_hash !== "string"
      ) {
        throw new Error("Incorrect credential types");
      }

      await verifyPassword(
        selectEmailAndPasswordHashResponse[0].password_hash,
        password,
      );
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      throw new Error("Failed to login user");
    }
  }

  return NextResponse.json(
    { message: "Credentials verified" },
    { status: 200 },
  );
}
