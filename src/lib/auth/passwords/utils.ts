import * as argon2 from "argon2";

export async function saltAndHashPassword(password: string) {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
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
    console.error(err);
    throw new Error("Failed to verify password");
  }
}
