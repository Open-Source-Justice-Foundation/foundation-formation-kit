import { createHash, randomBytes } from "crypto";

import {
  EMAIL_ADDRESS_RESET_TOKEN_BYTE_SIZE,
  PASSWORD_RESET_TOKEN_BYTE_SIZE,
} from "~/lib/auth/constants/constants";
import {
  createEmailAddressResetToken,
  createPasswordResetToken,
} from "~/services/database/queries/auth";
import * as argon2 from "argon2";

export async function saltAndHashPassword(password: string) {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to salt and hash password");
  }
}

export async function verifyPassword(hash: string, password: string) {
  try {
    const passwordVerified = await argon2.verify(hash, password);
    if (passwordVerified) {
      return true;
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to verify password");
  }
}

export function hashEmailAddressOrPasswordResetToken(token: string): string {
  try {
    const tokenHash = createHash("sha512").update(token).digest("base64");

    return tokenHash;
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to hash email address or password reset token");
  }
}

export async function generateEmailAddressResetToken(
  email: string,
  userId: number,
): Promise<string> {
  try {
    const buf = randomBytes(EMAIL_ADDRESS_RESET_TOKEN_BYTE_SIZE);
    const token = buf.toString("base64url");

    const tokenHash = hashEmailAddressOrPasswordResetToken(token);

    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const response = await createEmailAddressResetToken(
      email,
      tokenHash,
      expires,
      userId,
    );

    if (response === true) {
      return token;
    } else {
      throw new Error("Failed to create email address reset token");
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to generate email address reset token");
  }
}

export async function generatePasswordResetToken(
  email: string,
): Promise<string> {
  try {
    const buf = randomBytes(PASSWORD_RESET_TOKEN_BYTE_SIZE);
    const token = buf.toString("base64url");

    const tokenHash = hashEmailAddressOrPasswordResetToken(token);

    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const response = await createPasswordResetToken(email, tokenHash, expires);

    if (response === true) {
      return token;
    } else {
      throw new Error("Failed to create password reset token");
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to generate password reset token");
  }
}
