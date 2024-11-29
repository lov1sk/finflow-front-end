"use server";

import { HttpPUT } from "@/config/api-client";
import { urls } from "../http-routes";
import { AxiosError } from "axios";

interface EditUserRequest {
  name: string;
  age: number;
  gender: string;
}

interface EditUserResponse {
  success: boolean;
  error: boolean;
  errorMessage?: string;
}

interface EditUserHttpResponse {
  age: number;
  gender: string;
  name: string;
}

export async function editUser({
  age,
  gender,
  name,
}: EditUserRequest): Promise<EditUserResponse> {
  try {
    const editUserDto = {
      age,
      gender,
      name,
    };

    await HttpPUT<EditUserHttpResponse>(urls.USER.PUT_UPDATE, editUserDto);

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    const errorResponse = {
      success: false,
      error: true,
    };
    console.error({ errorResponse });
    return {
      ...errorResponse,
      errorMessage: "Ocorreu algum erro ao editar o usuario",
    };
  }
}
