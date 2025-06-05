import "server-only";

import { neon } from "@neondatabase/serverless";
import type { SupportedOAuthProvider } from "~/lib/auth/types";
import { checkDatabaseUrlType } from "~/lib/utils";

export async function getUsernameAndConnectedOnInAccountsByUserIdAndProvider(
  userId: number,
  provider: SupportedOAuthProvider,
): Promise<Record<string, string | Date | null>> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      `SELECT username, connected_on FROM accounts WHERE "userId" = $1 AND provider = $2`,
      [userId, provider],
    );

    if (response === undefined) {
      throw new Error("Failed to select accounts row from database");
    } else if (response.length === 0) {
      throw new Error("Accounts row doesn't exist");
    } else if (response.length > 1) {
      throw new Error(
        "Multiple account rows exist with the same userId and provider",
      );
    } else if (!response[0].hasOwnProperty("username")) {
      throw new Error("Failed to check for username property");
    } else if (!response[0].hasOwnProperty("connected_on")) {
      throw new Error("Failed to check for connected_on property");
    }

    return response[0];
  } catch (err) {
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}

export async function updateUsernameAndConnectedOnInAccountsByProviderAndProviderAccountId(
  username: string,
  connectedOn: Date,
  provider: SupportedOAuthProvider,
  providerAccountId: string,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      `UPDATE accounts SET username = $1, connected_on = $2 WHERE provider = $3 AND "providerAccountId" = $4`,
      [username, connectedOn, provider, providerAccountId],
    );

    if (response === undefined) {
      throw new Error(
        "Failed to update username and connected_on in accounts row in database",
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

export async function updateUsernameInAccountsByProviderAndProviderAccountId(
  username: string,
  provider: SupportedOAuthProvider,
  providerAccountId: string,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      `UPDATE accounts SET username = $1 WHERE provider = $2 AND "providerAccountId" = $3`,
      [username, provider, providerAccountId],
    );

    if (response === undefined) {
      throw new Error("Failed to update username in accounts row in database");
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

export async function deleteOAuthAccountForUserByUserIdAndProvider(
  userId: number,
  provider: SupportedOAuthProvider,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      `DELETE FROM accounts WHERE "userId" = $1 AND provider = $2`,
      [userId, provider],
    );

    if (response === undefined) {
      throw new Error("Failed to delete account row from database");
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

export async function deleteAllOAuthAccountsForUserByUserId(
  userId: number,
): Promise<void> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(`DELETE FROM accounts WHERE "userId" = $1`, [
      userId,
    ]);

    if (response === undefined) {
      throw new Error("Failed to delete accounts row(s) from database");
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

export async function checkConnectedOnIsNullInAccountsByProviderAndProviderAccountId(
  provider: SupportedOAuthProvider,
  providerAccountId: string,
): Promise<boolean> {
  try {
    const sql = neon(checkDatabaseUrlType());

    const response = await sql(
      `SELECT EXISTS(SELECT 1 FROM accounts WHERE provider = $1 AND "providerAccountId" = $2 AND connected_on IS NULL)`,
      [provider, providerAccountId],
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
    console.error(err);
    throw new Error("Failed to select data from database");
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
    console.error(err);
    throw new Error("Failed to select data from database");
  }
}
