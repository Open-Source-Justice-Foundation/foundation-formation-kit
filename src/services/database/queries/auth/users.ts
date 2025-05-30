import "server-only";

import { neon } from "@neondatabase/serverless";
import { checkDatabaseUrlType } from "~/lib/utils";

export async function getUserByEmail(
  email: string,
): Promise<Record<string, number | string | Date | null>> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql("SELECT * FROM users WHERE email = $1", [email]);

    if (response === undefined) {
      throw new Error("Failed to select users row from database");
    } else if (response.length === 0) {
      throw new Error("User row doesn't exist");
    } else if (response.length > 1) {
      throw new Error("Multiple user rows exist with the same email");
    } else if (!response[0].hasOwnProperty("id")) {
      throw new Error("Failed to check for id property");
    } else if (!response[0].hasOwnProperty("name")) {
      throw new Error("Failed to check for name property");
    } else if (!response[0].hasOwnProperty("email")) {
      throw new Error("Failed to check for email property");
    } else if (!response[0].hasOwnProperty("emailVerified")) {
      throw new Error("Failed to check for emailVerified property");
    } else if (!response[0].hasOwnProperty("password_hash")) {
      throw new Error("Failed to check for password_hash property");
    } else if (!response[0].hasOwnProperty("image")) {
      throw new Error("Failed to check for image property");
    }

    return response[0];
  } catch (err) {
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}
