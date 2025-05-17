import { neon } from "@neondatabase/serverless";
import type { SupportedOAuthProvider } from "~/lib/auth/types";
import { checkDatabaseUrlType } from "~/lib/utils";

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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}

export async function updatePasswordHashByUserId(
  passwordHash: string,
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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to update data in database");
  }
}

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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}

export async function checkIfEmailAlreadyExists(email: string): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)",
      [email],
    );

    if (response === undefined) {
      throw new Error("Failed to select users row from database");
    } else if (!response[0].hasOwnProperty("exists")) {
      throw new Error("Failed to check for exists property");
    } else if (response[0].exists !== false) {
      throw new Error("Email already exists");
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}

export async function checkIfEmailAlreadyExistsForAnotherUser(
  email: string,
  id: number,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1 AND id != $2)",
      [email, id],
    );

    if (response === undefined) {
      throw new Error("Failed to select users row from database");
    } else if (!response[0].hasOwnProperty("exists")) {
      throw new Error("Failed to check for exists property");
    } else if (response[0].exists !== false) {
      throw new Error("Email already exists for another user");
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}

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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to insert data into database");
  }
}

export async function checkEmailIsVerifiedByEmail(
  email: string,
): Promise<boolean> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      `SELECT EXISTS(SELECT 1 FROM users WHERE email = $1 AND "emailVerified" IS NOT NULL)`,
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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to select data from database");
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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}

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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to delete data from database");
  }
}

export async function createEmailAddressResetToken(
  email: string,
  tokenHash: string,
  expires: Date,
  userId: number,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      `INSERT INTO email_address_reset_tokens (email, token_hash, expires, "userId") VALUES ($1, $2, $3, $4)`,
      [email, tokenHash, expires, userId],
    );

    if (response === undefined) {
      throw new Error("Failed to insert row into database");
    } else if (!Array.isArray(response)) {
      throw new Error("Response data type must be an array");
    } else if (response.length !== 0) {
      throw new Error("Response data length must be 0");
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to insert data into database");
  }
}

export async function getEmailAddressResetTokenByTokenHash(
  tokenHash: string,
): Promise<Record<string, string | Date | number>> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "SELECT * FROM email_address_reset_tokens WHERE token_hash = $1",
      [tokenHash],
    );

    if (response === undefined) {
      throw new Error(
        "Failed to select email_address_reset_tokens row from database",
      );
    } else if (response.length === 0) {
      throw new Error("Email address reset token row doesn't exist");
    } else if (response.length > 1) {
      throw new Error(
        "Multiple email address reset token rows exist with the same token hash",
      );
    } else if (!response[0].hasOwnProperty("id")) {
      throw new Error("Failed to check for id property");
    } else if (!response[0].hasOwnProperty("email")) {
      throw new Error("Failed to check for email property");
    } else if (!response[0].hasOwnProperty("token_hash")) {
      throw new Error("Failed to check for token_hash property");
    } else if (!response[0].hasOwnProperty("expires")) {
      throw new Error("Failed to check for expires property");
    } else if (!response[0].hasOwnProperty("userId")) {
      throw new Error("Failed to check for userId property");
    }

    return response[0];
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}

export async function updateEmailAddressAndEmailVerifiedByUserId(
  email: string,
  emailVerified: Date,
  id: number,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      `UPDATE users SET email = $1, "emailVerified" = $2 WHERE id = $3`,
      [email, emailVerified, id],
    );

    if (response === undefined) {
      throw new Error(
        "Failed to update email and emailVerified in users row in database",
      );
    } else if (!Array.isArray(response)) {
      throw new Error("Response data type must be an array");
    } else if (response.length !== 0) {
      throw new Error("Response data length must be 0");
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to update data in database");
  }
}

export async function deleteEmailAddressResetTokenById(
  id: string,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "DELETE FROM email_address_reset_tokens WHERE id = $1",
      [id],
    );

    if (response === undefined) {
      throw new Error(
        "Failed to delete email_address_reset_tokens row from database",
      );
    } else if (!Array.isArray(response)) {
      throw new Error("Response data type must be an array");
    } else if (response.length !== 0) {
      throw new Error("Response data length must be 0");
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to delete data from database");
  }
}

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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to delete data from database");
  }
}

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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
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
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to delete data from database");
  }
}

export async function checkOAuthAccountAlreadyLinkedByUserIdAndProvider(
  userId: number,
  provider: SupportedOAuthProvider,
): Promise<boolean> {
  try {
    const sql = neon(checkDatabaseUrlType());

    if (provider !== "github") {
      throw new Error("Invalid OAuth provider");
    }

    const response = await sql(
      `SELECT EXISTS(SELECT 1 FROM accounts WHERE "userId" = $1 AND "provider" = $2)`,
      [userId, provider],
    );

    if (response === undefined) {
      throw new Error("Failed to select accounts row from database");
    } else if (!response[0].hasOwnProperty("exists")) {
      throw new Error("Failed to check for exists property");
    } else if (typeof response[0].exists !== "boolean") {
      throw new Error("Exists property data type must be a boolean");
    }

    return response[0].exists;
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}

export async function deleteAllEmailAddressVerificationTokensByUserId(
  userId: number,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      `DELETE FROM email_address_verification_tokens WHERE "userId" = $1`,
      [userId],
    );

    if (response === undefined) {
      throw new Error(
        "Failed to delete email_address_verification_tokens row(s) from database",
      );
    } else if (!Array.isArray(response)) {
      throw new Error("Response data type must be an array");
    } else if (response.length !== 0) {
      throw new Error("Response data length must be 0");
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to delete data from database");
  }
}

export async function createEmailAddressVerificationToken(
  email: string,
  tokenHash: string,
  expires: Date,
  userId: number,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      `INSERT INTO email_address_verification_tokens (email, token_hash, expires, "userId") VALUES ($1, $2, $3, $4)`,
      [email, tokenHash, expires, userId],
    );

    if (response === undefined) {
      throw new Error("Failed to insert row into database");
    } else if (!Array.isArray(response)) {
      throw new Error("Response data type must be an array");
    } else if (response.length !== 0) {
      throw new Error("Response data length must be 0");
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to insert data into database");
  }
}

export async function getEmailAddressVerificationTokenByTokenHash(
  tokenHash: string,
): Promise<Record<string, string | Date | number>> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "SELECT * FROM email_address_verification_tokens WHERE token_hash = $1",
      [tokenHash],
    );

    if (response === undefined) {
      throw new Error(
        "Failed to select email_address_verification_tokens row from database",
      );
    } else if (response.length === 0) {
      throw new Error("Email address verification token row doesn't exist");
    } else if (response.length > 1) {
      throw new Error(
        "Multiple email address verification token rows exist with the same token hash",
      );
    } else if (!response[0].hasOwnProperty("id")) {
      throw new Error("Failed to check for id property");
    } else if (!response[0].hasOwnProperty("email")) {
      throw new Error("Failed to check for email property");
    } else if (!response[0].hasOwnProperty("token_hash")) {
      throw new Error("Failed to check for token_hash property");
    } else if (!response[0].hasOwnProperty("expires")) {
      throw new Error("Failed to check for expires property");
    } else if (!response[0].hasOwnProperty("userId")) {
      throw new Error("Failed to check for userId property");
    }

    return response[0];
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}

export async function deleteEmailAddressVerificationTokenById(
  id: string,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      "DELETE FROM email_address_verification_tokens WHERE id = $1",
      [id],
    );

    if (response === undefined) {
      throw new Error(
        "Failed to delete email_address_verification_tokens row from database",
      );
    } else if (!Array.isArray(response)) {
      throw new Error("Response data type must be an array");
    } else if (response.length !== 0) {
      throw new Error("Response data length must be 0");
    }
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to delete data from database");
  }
}
