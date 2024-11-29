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
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const response = await HttpGET<GetProfileHttpResponse>(
      urls.USER.GET_PROFILE
    );
    console.log({ response });

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
      return errorResponse;
    }
    console.log({ error });
    return {
      ...errorResponse,
      errorMessage: "Algum erro na hora de carregar os dados do usario",
    };
  }
}
