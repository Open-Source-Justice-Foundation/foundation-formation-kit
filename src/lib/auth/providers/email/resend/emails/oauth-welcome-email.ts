import "server-only";

import { render } from "@react-email/render";
import { AUTH_FROM_FIELD } from "~/lib/auth/constants/constants";
import { OAuthWelcomeEmailTemplate } from "~/lib/auth/providers/email";
import { RESEND_API_ENDPOINT } from "~/lib/auth/providers/email/resend/constants/constants";

export async function oAuthWelcomeEmail(to: string) {
  try {
    const subject = "Welcome to the Foundation Formation Kit! 📃";

    const html = await render(OAuthWelcomeEmailTemplate(), {
      pretty: true,
    });

    // Email text body
    // Fallback for email clients that don't render HTML, e.g. feature phones
    const text = await render(OAuthWelcomeEmailTemplate(), {
      plainText: true,
    });

    const resendResponse = await fetch(RESEND_API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: AUTH_FROM_FIELD,
        to,
        subject,
        html,
        text,
      }),
    });

    if (!resendResponse?.ok) {
      throw new Error(
        `OAuth welcome email resend status: ${resendResponse?.status}`,
      );
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to send OAuth welcome email");
  }
}
