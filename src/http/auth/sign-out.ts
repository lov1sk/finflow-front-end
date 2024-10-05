"use server";

import { redirect } from "next/navigation";

export async function signOut() {
  console.log({ msg: "Signout..." });

  redirect("/auth/login");
}
