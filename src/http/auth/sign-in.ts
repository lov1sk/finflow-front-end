"use server";

import { HttpPOST } from "@/config/api-client";
import { urls } from "../http-routes";
import { cookies } from "next/headers";
import { AxiosError } from "axios";

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  success: boolean;
  data?: SignInHttpResponse;
  error: boolean;
  errorMessage?: string;
}

interface SignInHttpResponse {
  token: string;
}

export async function signIn({
  email,
  password,
}: SignInRequest): Promise<SignInResponse> {
  const cookieStore = cookies();

  try {
    const signInDto = {
      email,
      password,
    };
    console.log({ signInDto });

    const response = await HttpPOST<SignInHttpResponse>(
      urls.AUTH.POST_SIGN_IN,
      signInDto
    );

    const accessToken = response.token;

    cookieStore.set("token", accessToken);
    console.log({ accessToken });

    return {
      success: true,
      data: {
        token: accessToken,
      },
      error: false,
    };
  } catch (error) {
    cookieStore.delete("token");
    const errorResponse = { success: false, error: true };

    if (error instanceof AxiosError) {
      Object.assign(errorResponse, { errorMessage: error.response?.data });
      return errorResponse;
    }

    return {
      ...errorResponse,
      errorMessage: "Erro ao tentar fazer login, tente novamente",
    };
  }
}
