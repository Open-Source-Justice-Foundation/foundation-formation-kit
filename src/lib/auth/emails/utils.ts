import { randomBytes } from "crypto";

import { EMAIL_ADDRESS_RESET_TOKEN_BYTE_SIZE } from "~/lib/auth/constants/constants";
import { hashResetToken } from "~/lib/auth/tokens/utils";
import { createEmailAddressResetToken } from "~/services/database/queries/auth";

export async function generateEmailAddressResetToken(
  email: string,
  userId: number,
): Promise<string> {
  try {
    const buf = randomBytes(EMAIL_ADDRESS_RESET_TOKEN_BYTE_SIZE);
    const token = buf.toString("base64url");

    const tokenHash = hashResetToken(token);

    const expires = new Date(new Date().getTime() + 3600 * 1000);

    await createEmailAddressResetToken(email, tokenHash, expires, userId);

    return token;
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to generate email address reset token");
  }
}
