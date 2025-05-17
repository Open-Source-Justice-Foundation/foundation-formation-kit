import { createHash } from "crypto";

export function hashToken(token: string): string {
  try {
    const tokenHash = createHash("sha512").update(token).digest("base64");

    return tokenHash;
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to hash reset token");
  }
}
