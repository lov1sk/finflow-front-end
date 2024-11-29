"use server";

import { HttpPATCH } from "@/config/api-client";
import { urls } from "../http-routes";
import { AxiosError } from "axios";

interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
}

interface ResetPasswordResponse {
  success: boolean;
  error: boolean;
  errorMessage?: string;
}

export async function resetPassword({
  email,
  password,
  token,
}: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  try {
    const queryParams = `?email=${email}&token=${token}`;

    const resetPasswordDto = {
      newPassword: password,
    };

    await HttpPATCH<void>(
      urls.AUTH.PATCH_RESET_PASSWORD.concat(queryParams),
      resetPasswordDto
    );

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    const defaultErrorMessage = "Erro ao enviar a atualizar sua senha";
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
