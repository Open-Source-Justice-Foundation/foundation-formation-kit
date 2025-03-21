import { auth } from "~/auth";
import { verifyPassword } from "~/lib/auth/passwords/utils";
import { signInSchema } from "~/lib/auth/validation/schemas";
import { selectPasswordHashUsingEmail } from "~/services/database/queries/auth";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  if (session !== null) {
    throw new Error("Session already exists");
  }

  try {
    const data = await request.json();

    const { email, password } = signInSchema.parse(data);

    const password_hash = await selectPasswordHashUsingEmail(email);

    await verifyPassword(password_hash, password);
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    if (err instanceof ZodError) {
      throw new Error("Failed to login user: invalid credentials");
    }
    console.error(err);
    throw new Error("Failed to login user");
  }

  return NextResponse.json(
    { message: "Credentials verified" },
    { status: 200 },
  );
}
