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

    const response = await HttpPOST<SignInHttpResponse>(
      urls.AUTH.POST_SIGN_IN,
      signInDto
    );

    const accessToken = response.token;
    console.log({ accessToken });

    cookieStore.set("token", accessToken);

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
      console.error({ status: error.status, errorResponse });
      return errorResponse;
    }

    return {
      ...errorResponse,
      errorMessage: "Erro ao tentar fazer login, tente novamente",
    };
  }
}
