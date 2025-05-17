import { randomBytes } from "crypto";

import { PASSWORD_RESET_TOKEN_BYTE_SIZE } from "~/lib/auth/constants/constants";
import { hashToken } from "~/lib/auth/tokens/utils";
import { createPasswordResetToken } from "~/services/database/queries/auth";
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

export async function generatePasswordResetToken(
  email: string,
): Promise<string> {
  try {
    const buf = randomBytes(PASSWORD_RESET_TOKEN_BYTE_SIZE);
    const token = buf.toString("base64url");

    const tokenHash = hashToken(token);

    const expires = new Date(new Date().getTime() + 3600 * 1000);

    await createPasswordResetToken(email, tokenHash, expires);

    return token;
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to generate password reset token");
  }
}
