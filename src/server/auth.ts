"use server";

import { authOptions } from "~/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getUser() {
  console.log("getUser authOptions: ", authOptions);
  const session = await getServerSession(authOptions);
  console.log("getUser session: ", session);
  const user = session?.user;
  return user;
}

export async function redirectIfNotLoggedIn() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
}
