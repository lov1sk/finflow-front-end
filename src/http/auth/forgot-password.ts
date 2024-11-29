"use server";
import { HttpPATCH } from "@/config/api-client";
import { urls } from "../http-routes";
import { AxiosError } from "axios";

interface ForgotPasswordRequest {
  email: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  data?: string;
  error: boolean;
  errorMessage?: string;
}

export async function forgotPassword({
  email,
}: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  try {
    const forgotPasswordDto = {
      email,
    };

    const response = await HttpPATCH<string>(
      urls.AUTH.PATCH_FORGOT_PASSWORD,
      forgotPasswordDto
    );

    return {
      data: response,
      success: true,
      error: false,
    };
  } catch (error) {
    const defaultErrorMessage = "Erro ao enviar a recuperação da senha";
    const errorResponse = {
      success: false,
      error: true,
      errorMessage: defaultErrorMessage,
    };

    if (error instanceof AxiosError) {
      Object.assign(errorResponse, {
        errorMessage: error.response?.data || defaultErrorMessage,
      });
      console.error({ status: error.status, errorResponse });
    }

    return errorResponse;
  }
}
