"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
  const cookieStore = cookies();
  cookieStore.set("token", "");

  redirect("/auth/login");
}
