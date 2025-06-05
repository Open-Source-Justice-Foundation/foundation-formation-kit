import "server-only";

import { neon } from "@neondatabase/serverless";
import { checkDatabaseUrlType } from "~/lib/utils";

export async function deleteAllVerificationTokensForUserByUserIdentifier(
  identifier: string,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "DELETE FROM verification_token WHERE identifier = $1",
      [identifier],
    );

    if (response === undefined) {
      throw new Error(
        "Failed to delete verification_token row(s) from database",
      );
    } else if (!Array.isArray(response)) {
      throw new Error("Response data type must be an array");
    } else if (response.length !== 0) {
      throw new Error("Response data length must be 0");
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete data from database");
  }
}
