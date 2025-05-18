import "server-only";

import { createHash } from "crypto";

export function hashToken(token: string): string {
  try {
    const tokenHash = createHash("sha512").update(token).digest("base64");

    return tokenHash;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to hash reset token");
  }
}
