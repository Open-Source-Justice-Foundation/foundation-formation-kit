import "server-only";

import { randomBytes } from "crypto";

import {
  EMAIL_ADDRESS_RESET_TOKEN_BYTE_SIZE,
  EMAIL_ADDRESS_VERIFICATION_TOKEN_BYTE_SIZE,
} from "~/lib/auth/constants/constants";
import { hashToken } from "~/lib/auth/tokens/utils";
import {
  createEmailAddressResetToken,
  createEmailAddressVerificationToken,
} from "~/services/database/queries/auth";

export async function generateEmailAddressResetToken(
  email: string,
  userId: number,
): Promise<string> {
  try {
    const buf = randomBytes(EMAIL_ADDRESS_RESET_TOKEN_BYTE_SIZE);
    const token = buf.toString("base64url");

    const tokenHash = hashToken(token);

    const expires = new Date(new Date().getTime() + 3600 * 1000);

    await createEmailAddressResetToken(email, tokenHash, expires, userId);

    return token;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to generate email address reset token");
  }
}

export async function generateEmailAddressVerificationToken(
  email: string,
  userId: number,
): Promise<string> {
  try {
    const buf = randomBytes(EMAIL_ADDRESS_VERIFICATION_TOKEN_BYTE_SIZE);
    const token = buf.toString("base64url");

    const tokenHash = hashToken(token);

    const expires = new Date(new Date().getTime() + 3600 * 1000);

    await createEmailAddressVerificationToken(
      email,
      tokenHash,
      expires,
      userId,
    );

    return token;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to generate email address verification token");
  }
}
