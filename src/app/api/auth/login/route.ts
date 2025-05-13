import { auth } from "~/auth";
import { verifyPassword } from "~/lib/auth/passwords/utils";
import { signInSchema } from "~/lib/auth/validation/schemas";
import { getPasswordHashByEmail } from "~/services/database/queries/auth";
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

    const passwordHash = await getPasswordHashByEmail(email);

    await verifyPassword(passwordHash, password);
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
