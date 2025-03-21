import { render } from "@react-email/render";
import { CustomSendVerificationRequestEmailTemplate } from "~/lib/auth/providers/email";
import { CustomEmailProviderSendVerificationRequestParams } from "~/lib/auth/types";

export async function customSendVerificationRequest(
  params: CustomEmailProviderSendVerificationRequestParams,
) {
  const { identifier: to, url, provider } = params;
  if (provider.from && provider.apiKey) {
    try {
      const resendAPIEndpoint = "https://api.resend.com/emails";
      const from = `FFK Team <${provider.from}>`;
      const subject = "Welcome to the Foundation Formation Kit! 📃";

      const html = await render(
        CustomSendVerificationRequestEmailTemplate({ url }),
        {
          pretty: true,
        },
      );

      // Email text body
      // Fallback for email clients that don't render HTML, e.g. feature phones
      const text = await render(
        CustomSendVerificationRequestEmailTemplate({ url }),
        {
          plainText: true,
        },
      );

      const resendResponse = await fetch(resendAPIEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${provider.apiKey}`,
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
