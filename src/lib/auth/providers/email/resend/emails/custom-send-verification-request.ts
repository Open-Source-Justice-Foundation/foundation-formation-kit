import { render } from "@react-email/render";
import { CustomSendVerificationRequestEmailTemplate } from "~/lib/auth/providers/email";
import { CustomEmailProviderSendVerificationRequestParams } from "~/lib/auth/types";

export async function customSendVerificationRequest(
  params: CustomEmailProviderSendVerificationRequestParams,
) {
  const { identifier: to, url, provider, theme } = params;

  if (provider.from && provider.apiKey) {
    try {
      const html = await render(
        CustomSendVerificationRequestEmailTemplate({ url, theme }),
        {
          pretty: true,
        },
      );

      // Email text body
      // Fallback for email clients that don't render HTML, e.g. feature phones
      const text = await render(
        CustomSendVerificationRequestEmailTemplate({ url, theme }),
        {
          plainText: true,
        },
      );

      const resendAPIEndpoint = "https://api.resend.com/emails";

      const resendResponse = await fetch(resendAPIEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${provider.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: provider.from,
          to,
          subject: "Welcome to the Foundation Formation Kit! 📃",
          html,
          text,
        }),
      });

      if (!resendResponse?.ok) {
        throw new Error(
          `Custom send verification request resend status: ${resendResponse?.status}`,
        );
      }
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      throw new Error("Failed to send verification email");
    }
  } else {
    throw new Error("Invalid provider from and/or apiKey properties");
  }
}
