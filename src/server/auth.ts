import { auth } from "~/auth";
import { UserWithEmailVerified } from "~/types";

export async function getUser() {
  const session = await auth();
  const user = <UserWithEmailVerified>session?.user;

  if (user?.emailVerified) {
    return user;
  }

  return null;
}
