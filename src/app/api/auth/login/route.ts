import { neon } from "@neondatabase/serverless";
import { auth } from "~/auth";
import { verifyPassword } from "~/lib/auth/passwords/utils";
import { signInSchema } from "~/lib/auth/validation/schemas";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  if (session !== null) {
    throw new Error("Session already exists");
  }

  if (typeof process.env.DATABASE_URL === "string") {
    try {
      const sql = neon(process.env.DATABASE_URL);

      const data = await request.json();

      const { email, password } = signInSchema.parse(data);

      const selectEmailAndPasswordHashResponse = await sql(
        "SELECT email, password_hash FROM users WHERE email = $1",
        [email],
      );

      if (selectEmailAndPasswordHashResponse === undefined) {
        throw new Error("Failed to select user from database");
      } else if (selectEmailAndPasswordHashResponse.length === 0) {
        throw new Error("Email doesn't exist");
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
      if (err instanceof ZodError) {
        throw new Error("Failed to login user: invalid credentials");
      }
      console.error(err);
      throw new Error("Failed to login user");
    }
  } else {
    throw new Error("Incorrect database URL type");
  }

  return NextResponse.json(
    { message: "Credentials verified" },
    { status: 200 },
  );
}
