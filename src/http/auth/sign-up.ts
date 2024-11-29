"use server";

import { HttpPOST } from "@/config/api-client";
import { urls } from "../http-routes";
import { AxiosError } from "axios";

interface SignInProps {
  fullName: string;
  gender: string;
  age: number;
  email: string;
  password: string;
}

interface SignUpResponse {
  success: boolean;
  error: boolean;
  errorMessage?: string;
}

export async function signUp({
  age,
  email,
  fullName,
  gender,
  password,
}: SignInProps): Promise<SignUpResponse> {
  try {
    const signUpDto = {
      name: fullName,
      email,
      age,
      password,
      gender,
    };
    await HttpPOST<void>(urls.AUTH.POST_SIGN_UP, signUpDto);

    return { success: true, error: false };
  } catch (error) {
    const errorResponse = { success: false, error: true };

    if (error instanceof AxiosError) {
      Object.assign(errorResponse, { errorMessage: error.response?.data });
      console.error({ status: error.status, errorResponse });
      return errorResponse;
    }

    return {
      ...errorResponse,
      errorMessage: "Erro inesperado ao criar o usuario",
    };
  }
}
