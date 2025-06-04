import "server-only";

import { neon } from "@neondatabase/serverless";
import { checkDatabaseUrlType } from "~/lib/utils";

export async function deleteAllSessionsForUserByUserId(
  userId: number,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(`DELETE FROM sessions WHERE "userId" = $1`, [
      userId,
    ]);

    if (response === undefined) {
      throw new Error("Failed to delete sessions row(s) from database");
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

export async function deleteAllSessionsExceptCurrentForUserByUserId(
  id: number,
  userId: number,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      `DELETE FROM sessions WHERE id != $1 AND "userId" = $2`,
      [id, userId],
    );

    if (response === undefined) {
      throw new Error("Failed to delete sessions row(s) from database");
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
