import { render } from "@react-email/render";
import { auth } from "~/auth";
import {
  AUTH_FROM_FIELD,
  RESEND_API_ENDPOINT,
} from "~/lib/auth/constants/constants";
import { generatePasswordResetToken } from "~/lib/auth/passwords/utils";
import { ResetPasswordRequestEmailTemplate } from "~/lib/auth/providers/email";
import { resetPasswordSchema } from "~/lib/auth/validation/schemas";
import { checkPasswordHashNotNullByEmail } from "~/services/database/queries/auth";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  if (session !== null) {
    throw new Error("Session already exists");
  }

  try {
    const data = await request.json();

    const { email } = resetPasswordSchema.parse(data);

    const passwordHashNotNull = await checkPasswordHashNotNullByEmail(email);

    if (passwordHashNotNull) {
      const token = await generatePasswordResetToken(email);

      const resetLink = `${process.env.DOMAIN}/update-password?token=${token}`;

      const subject = "Password reset link";

      const html = await render(
        ResetPasswordRequestEmailTemplate({ url: resetLink }),
        {
          pretty: true,
        },
      );

      // Email text body
      // Fallback for email clients that don't render HTML, e.g. feature phones
      const text = await render(
        ResetPasswordRequestEmailTemplate({ url: resetLink }),
        {
          plainText: true,
        },
      );

      const resendResponse = await fetch(RESEND_API_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: AUTH_FROM_FIELD,
          to: email,
          subject,
          html,
          text,
        }),
      });

      if (!resendResponse?.ok) {
        throw new Error(
          `Reset password request resend status: ${resendResponse?.status}`,
        );
      }
    } else {
      throw new Error("Failed to reset password");
    }
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(
        "Failed to send password reset instructions: invalid credentials",
      );
    }
    console.error(err);
    throw new Error("Failed to send password reset instructions");
  }

  return NextResponse.json(
    { message: "Password reset instructions sent" },
    { status: 200 },
  );
}
