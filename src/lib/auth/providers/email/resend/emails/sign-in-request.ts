import "server-only";

import { render } from "@react-email/render";
import {
  AUTH_FROM_FIELD,
  RESEND_API_ENDPOINT,
} from "~/lib/auth/constants/constants";
import { SignInRequestEmailTemplate } from "~/lib/auth/providers/email";
import type { CustomEmailProviderSendVerificationRequestParams } from "~/lib/auth/types";

export async function signInRequest(
  params: CustomEmailProviderSendVerificationRequestParams,
) {
  const { identifier: to, url, provider } = params;
  if (provider?.apiKey) {
    try {
      const subject = "Sign in link";

      const html = await render(SignInRequestEmailTemplate({ url }), {
        pretty: true,
      });

      // Email text body
      // Fallback for email clients that don't render HTML, e.g. feature phones
      const text = await render(SignInRequestEmailTemplate({ url }), {
        plainText: true,
      });

      const resendResponse = await fetch(RESEND_API_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${provider.apiKey}`,
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
          `Sign in request resend status: ${resendResponse?.status}`,
        );
      }
    } catch (err) {
      console.error(err);
      throw new Error("Failed to send sign in email");
    }
  } else {
    throw new Error("Invalid provider from and/or apiKey properties");
  }
}
