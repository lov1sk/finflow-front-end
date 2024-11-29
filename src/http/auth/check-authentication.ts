"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export async function checkAuthentication(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY!);
    return !!decoded; // Retorna true se o token for válido
  } catch (error) {
    return false; // Retorna false se o token for inválido ou expirado
  }
}
