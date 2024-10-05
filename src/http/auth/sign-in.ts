"use server";
interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

export async function signIn({
  email,
  password,
}: SignInRequest): Promise<SignInResponse> {
  console.log({ email, password });

  return { token: "" };
}
