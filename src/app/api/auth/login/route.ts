import { auth } from "~/auth";
import { verifyPassword } from "~/lib/auth/passwords/utils";
import { signInSchema } from "~/lib/auth/validation/schemas";
import { getUserByEmail } from "~/services/database/queries/auth/users";
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

    const user = await getUserByEmail(email);

    const userEmailVerified = user?.emailVerified;
    const userPasswordHash = user?.password_hash;

    if (!userEmailVerified) {
      throw new Error("Unverified email");
    }

    if (typeof userPasswordHash === "string") {
      await verifyPassword(userPasswordHash, password);
    } else {
      throw new Error("Incorrect password hash data type");
    }
  } catch (err) {
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
