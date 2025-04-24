import { render } from "@react-email/render";
import { auth } from "~/auth";
import {
  AUTH_FROM_FIELD,
  RESEND_API_ENDPOINT,
} from "~/lib/auth/constants/constants";
import {
  generateEmailAddressResetToken,
  verifyPassword,
} from "~/lib/auth/passwords/utils";
import {
  ResetEmailAddressRequestEmailTemplate,
  ResetEmailAddressWarningEmailTemplate,
} from "~/lib/auth/providers/email";
import {
  passwordRequestSchema,
  resetEmailAddressSchema,
} from "~/lib/auth/validation/schemas";
import {
  checkIfEmailAlreadyExists,
  getPasswordHashByEmail,
} from "~/services/database/queries/auth";
import { type UserWithEmailVerified } from "~/types";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();

  const user = <UserWithEmailVerified>session?.user;

  if (!user?.email || !user?.emailVerified) {
    throw new Error("Invalid session");
  }

  try {
    const data = await request.json();

    const { email, password } = data;

    resetEmailAddressSchema.parse({ email });
    passwordRequestSchema.parse({ password });

    await checkIfEmailAlreadyExists(email);

    const password_hash = await getPasswordHashByEmail(user?.email);

    await verifyPassword(password_hash, password);

    const resetEmailAddressWarningSubject = "Email address reset requested";

    const resetEmailAddressWarningHtml = await render(
      ResetEmailAddressWarningEmailTemplate(),
      {
        pretty: true,
      },
    );

    // Email text body
    // Fallback for email clients that don't render HTML, e.g. feature phones
    const resetEmailAddressWarningText = await render(
      ResetEmailAddressWarningEmailTemplate(),
      {
        plainText: true,
      },
    );

    const resetEmailAddressWarningResendResponse = await fetch(
      RESEND_API_ENDPOINT,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: AUTH_FROM_FIELD,
          to: user?.email,
          subject: resetEmailAddressWarningSubject,
          html: resetEmailAddressWarningHtml,
          text: resetEmailAddressWarningText,
        }),
      },
    );

    if (!resetEmailAddressWarningResendResponse?.ok) {
      throw new Error(
        `Reset email address warning resend status: ${resetEmailAddressWarningResendResponse?.status}`,
      );
    }

    if (typeof user?.id === "number") {
      const token = await generateEmailAddressResetToken(email, user?.id);

      const resetLink = `${process.env.DOMAIN}/update-email-address?token=${token}`;

      const resetEmailAddressSubject = "Email address reset link";

      const resetEmailAddressHtml = await render(
        ResetEmailAddressRequestEmailTemplate({ url: resetLink }),
        {
          pretty: true,
        },
      );

      // Email text body
      // Fallback for email clients that don't render HTML, e.g. feature phones
      const resetEmailAddressText = await render(
        ResetEmailAddressRequestEmailTemplate({ url: resetLink }),
        {
          plainText: true,
        },
      );

      const resetEmailAddressResendResponse = await fetch(RESEND_API_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: AUTH_FROM_FIELD,
          to: email,
          subject: resetEmailAddressSubject,
          html: resetEmailAddressHtml,
          text: resetEmailAddressText,
        }),
      });

      if (!resetEmailAddressResendResponse?.ok) {
        throw new Error(
          `Reset email address request resend status: ${resetEmailAddressResendResponse?.status}`,
        );
      }
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    if (err instanceof ZodError) {
      throw new Error(
        "Failed to send email address reset instructions: invalid credentials",
      );
    }
    console.error(err);
    throw new Error("Failed to send email address reset instructions");
  }

  return NextResponse.json(
    { message: "Email address reset instructions sent" },
    { status: 200 },
  );
}
