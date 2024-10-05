"use server";

interface SignInProps {
  fullName: string;
  gender: string;
  age: number;
  email: string;
  password: string;
}

export async function signUp({
  age,
  email,
  fullName,
  gender,
  password,
}: SignInProps) {
  console.log({ age, email, fullName, gender, password });
}
