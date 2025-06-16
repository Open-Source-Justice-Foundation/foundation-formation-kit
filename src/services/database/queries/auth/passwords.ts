import "server-only";

import { neon } from "@neondatabase/serverless";
import { checkDatabaseUrlType } from "~/lib/utils";

// Passwords
export async function createEmailAndPasswordHashInUsers(
  email: string,
  passwordHash: string,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
      [email, passwordHash],
    );

    if (response === undefined) {
      throw new Error("Failed to insert row into database");
    } else if (!Array.isArray(response)) {
      throw new Error("Response data type must be an array");
    } else if (response.length !== 0) {
      throw new Error("Response data length must be 0");
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to insert data into database");
  }
}

export async function getPasswordHashById(id: number): Promise<string> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      `SELECT password_hash FROM users WHERE "id" = $1`,
      [id],
    );

    if (response === undefined) {
      throw new Error("Failed to select users row from database");
    } else if (response.length === 0) {
      throw new Error("User row doesn't exist");
    } else if (response.length > 1) {
      throw new Error("Multiple user rows exist with the same id");
    } else if (!response[0].hasOwnProperty("password_hash")) {
      throw new Error("Failed to check for password_hash property");
    } else if (typeof response[0].password_hash !== "string") {
      throw new Error("Incorrect password_hash data type");
    }

    return response[0].password_hash;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}

export async function updatePasswordHashByUserId(
  passwordHash: string | null,
  id: number,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "UPDATE users SET password_hash = $1 WHERE id = $2",
      [passwordHash, id],
    );

    if (response === undefined) {
      throw new Error(
        "Failed to update password hash in users row in database",
      );
    } else if (!Array.isArray(response)) {
      throw new Error("Response data type must be an array");
    } else if (response.length !== 0) {
      throw new Error("Response data length must be 0");
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update data in database");
  }
}

export async function checkPasswordHashNotNullByEmail(
  email: string,
): Promise<boolean> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1 AND password_hash IS NOT NULL)",
      [email],
    );

    if (response === undefined) {
      throw new Error("Failed to select users row from database");
    } else if (!response[0].hasOwnProperty("exists")) {
      throw new Error("Failed to check for exists property");
    } else if (typeof response[0].exists !== "boolean") {
      throw new Error("Exists property data type must be a boolean");
    }

    return response[0].exists;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}

// Password reset tokens
export async function createPasswordResetToken(
  email: string,
  tokenHash: string,
  expires: Date,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "INSERT INTO password_reset_tokens (email, token_hash, expires) VALUES ($1, $2, $3)",
      [email, tokenHash, expires],
    );

    if (response === undefined) {
      throw new Error("Failed to insert row into database");
    } else if (!Array.isArray(response)) {
      throw new Error("Response data type must be an array");
    } else if (response.length !== 0) {
      throw new Error("Response data length must be 0");
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to insert data into database");
  }
}

export async function getPasswordResetTokenByTokenHash(
  tokenHash: string,
): Promise<Record<string, string | Date>> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "SELECT * FROM password_reset_tokens WHERE token_hash = $1",
      [tokenHash],
    );

    if (response === undefined) {
      throw new Error(
        "Failed to select password_reset_tokens row from database",
      );
    } else if (response.length === 0) {
      throw new Error("Password reset token row doesn't exist");
    } else if (response.length > 1) {
      throw new Error(
        "Multiple password reset token rows exist with the same token hash",
      );
    } else if (!response[0].hasOwnProperty("id")) {
      throw new Error("Failed to check for id property");
    } else if (!response[0].hasOwnProperty("email")) {
      throw new Error("Failed to check for email property");
    } else if (!response[0].hasOwnProperty("token_hash")) {
      throw new Error("Failed to check for token_hash property");
    } else if (!response[0].hasOwnProperty("expires")) {
      throw new Error("Failed to check for expires property");
    }

    return response[0];
  } catch (err) {
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}

export async function deletePasswordResetTokenById(id: string): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "DELETE FROM password_reset_tokens WHERE id = $1",
      [id],
    );

    if (response === undefined) {
      throw new Error(
        "Failed to delete password_reset_tokens row from database",
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

export async function deleteAllPasswordResetTokensByEmail(
  email: string,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "DELETE FROM password_reset_tokens WHERE email = $1",
      [email],
    );

    if (response === undefined) {
      throw new Error(
        "Failed to delete password_reset_tokens row(s) from database",
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
