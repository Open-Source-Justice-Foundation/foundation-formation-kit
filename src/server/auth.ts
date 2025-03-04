"use server"

import { auth } from "~/auth";
import { UserWithEmailVerified } from "~/types";

export async function getUser() {
  try {
    const session = await auth();
    const user = <UserWithEmailVerified>session?.user;

    if (user?.emailVerified) {
      return user;
    }

    return null;
  } catch (err) {
    // TODO
    // Don't log the err value, do something else with it to avoid deployment error
    console.error(err);
    throw new Error("Failed to get auth session");
  }
}
