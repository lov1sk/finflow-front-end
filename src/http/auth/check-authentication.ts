"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// TODO: check token expiration
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export async function checkAuthentication(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return false;
  }

  // return true;
  try {
    const decoded = jwt.verify(token, SECRET_KEY!);
    console.log({ token, decoded });

    return !!decoded; // Retorna true se o token for válido
  } catch (error) {
    console.log({ token, decoded: "false" });
    return false; // Retorna false se o token for inválido ou expirado
  }
}
