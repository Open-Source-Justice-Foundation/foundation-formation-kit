import { neon } from "@neondatabase/serverless";

export async function selectPasswordHashUsingEmail(
  email: string,
): Promise<string> {
  if (typeof process.env.DATABASE_URL === "string") {
    try {
      const sql = neon(process.env.DATABASE_URL);

      const selectPasswordHashResponse = await sql(
        "SELECT password_hash FROM users WHERE email = $1",
        [email],
      );

      if (selectPasswordHashResponse === undefined) {
        throw new Error("Failed to select user from database");
      } else if (selectPasswordHashResponse.length === 0) {
        throw new Error("Email doesn't exist");
      } else if (selectPasswordHashResponse.length > 1) {
        throw new Error("Multiple users exist with the same email");
      } else if (
        !selectPasswordHashResponse[0].hasOwnProperty("password_hash")
      ) {
        throw new Error("Credential property doesn't exist");
      } else if (
        typeof selectPasswordHashResponse[0].password_hash !== "string"
      ) {
        throw new Error("Incorrect credential type");
      }

      return selectPasswordHashResponse[0].password_hash;
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      throw new Error("Failed to access database");
    }
  } else {
    throw new Error("Incorrect database URL type");
  }
}

export async function checkIfEmailAlreadyExists(email: string): Promise<void> {
  if (typeof process.env.DATABASE_URL === "string") {
    try {
      const sql = neon(process.env.DATABASE_URL);

      const emailExistsResponse = await sql(
        "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)",
        [email],
      );

      if (emailExistsResponse === undefined) {
        throw new Error("Failed to select user from database");
      } else if (emailExistsResponse.length !== 1) {
        throw new Error("Failed to check if email exists in database");
      } else if (!emailExistsResponse[0].hasOwnProperty("exists")) {
        throw new Error("Failed to check for exists property");
      } else if (emailExistsResponse[0].exists !== false) {
        throw new Error("Email already exists");
      }
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      throw new Error("Failed to access database");
    }
  } else {
    throw new Error("Incorrect database URL type");
  }
}

export async function insertEmailAndPasswordHashIntoUsers(
  email: string,
  passwordHash: string,
): Promise<void> {
  if (typeof process.env.DATABASE_URL === "string") {
    try {
      const sql = neon(process.env.DATABASE_URL);

      await sql("INSERT INTO users (email, password_hash) VALUES ($1, $2)", [
        email,
        passwordHash,
      ]);
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      throw new Error("Failed to insert data into database");
    }
  } else {
    throw new Error("Incorrect database URL type");
  }
}
