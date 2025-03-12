import { neon } from "@neondatabase/serverless";
import { auth } from "~/auth";
import { saltAndHashPassword } from "~/lib/auth/passwords/utils";
import { registerSchema } from "~/lib/auth/validation/schemas";
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

      const { email, password } = registerSchema.parse(data);

      const emailExistsResponse = await sql(
        "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)",
        [email],
      );

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
      if (err instanceof ZodError) {
        throw new Error("Failed to register user: invalid credentials");
      }
      console.error(err);
      throw new Error("Failed to register user");
    }
  } else {
    throw new Error("Incorrect database URL type");
  }

  return NextResponse.json(
    { message: "Registration successful" },
    { status: 201 },
  );
}
