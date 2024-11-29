"use server";

import { User } from "@/types/user";
import { HttpGET } from "@/config/api-client";
import { urls } from "../http-routes";
import { AxiosError } from "axios";

export interface GetProfileResponse {
  success: boolean;
  data?: GetProfileHttpResponse;
  error: boolean;
  errorMessage?: string;
}

interface GetProfileHttpResponse extends User {}
export async function getProfile(): Promise<GetProfileResponse> {
  try {
    const response = await HttpGET<GetProfileHttpResponse>(
      urls.USER.GET_PROFILE
    );

    return {
      success: true,
      data: response,
      error: false,
    };
  } catch (error) {
    const errorResponse = {
      success: false,
      error: true,
    };
    if (error instanceof AxiosError) {
      Object.assign(errorResponse, { errorMessage: error.response?.data });
      console.error({ status: error.status, errorResponse });
      return errorResponse;
    }
    return {
      ...errorResponse,
      errorMessage: "Algum erro na hora de carregar os dados do usario",
    };
  }
}
