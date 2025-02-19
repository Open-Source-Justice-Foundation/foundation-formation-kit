"use server";

import { auth } from "~/auth";
import { redirect } from "next/navigation";

export async function getUser() {
  const session = await auth();
  console.log("getUser session: ", session);
  const user = session?.user;
  return user;
}

export async function redirectIfNotLoggedIn() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
}
