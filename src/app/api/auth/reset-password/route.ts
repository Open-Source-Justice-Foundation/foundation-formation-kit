import { render } from "@react-email/render";
import { auth } from "~/auth";
import { ResetPasswordRequestEmailTemplate } from "~/lib/auth/providers/email";
import { resetPasswordSchema } from "~/lib/auth/validation/schemas";
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

    // TODO
    // Update with password reset link
    const url = "https://foundationformationkit.org/";

    const resendAPIEndpoint = "https://api.resend.com/emails";

    const fromEmailAddress = "auth@foundationformationkit.org";
    const from = `FFK Team <${fromEmailAddress}>`;

    const to = email;

    const subject = "Password reset link";

    const html = await render(ResetPasswordRequestEmailTemplate({ url }), {
      pretty: true,
    });

    // Email text body
    // Fallback for email clients that don't render HTML, e.g. feature phones
    const text = await render(ResetPasswordRequestEmailTemplate({ url }), {
      plainText: true,
    });

    const resendResponse = await fetch(resendAPIEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
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
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
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
