import { auth } from "~/auth";
import { saltAndHashPassword } from "~/lib/auth/passwords/utils";
import { registerSchema } from "~/lib/auth/validation/schemas";
import { checkIfEmailAlreadyExists } from "~/services/database/queries/auth/email-addresses";
import { createEmailAndPasswordHashInUsers } from "~/services/database/queries/auth/passwords";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  if (session !== null) {
    throw new Error("Session already exists");
  }

  try {
    const data = await request.json();

    const { email, password } = registerSchema.parse(data);

    await checkIfEmailAlreadyExists(email);

    const passwordHash = await saltAndHashPassword(password);

    await createEmailAndPasswordHashInUsers(email, passwordHash);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error("Failed to register user: invalid credentials");
    }
    console.error(err);
    throw new Error("Failed to register user");
  }

  return NextResponse.json(
    { message: "Registration successful" },
    { status: 201 },
  );
}
