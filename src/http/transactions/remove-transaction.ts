"use server";

import { HttpDELETE } from "@/config/api-client";
import { AxiosError } from "axios";
import { urls } from "../http-routes";

interface RemoveTransactionRequest {
  id: string;
}

interface RemoveTransactionResponse {
  error?: boolean;
  errorMessage?: string;
  success?: boolean;
}
export async function removeTransaction({
  id,
}: RemoveTransactionRequest): Promise<RemoveTransactionResponse> {
  try {
    const queryParams = `?id_transaction=${id}`;
    await HttpDELETE(urls.TRANSACTIONS.DELETE_TRANSACTION.concat(queryParams));
    return {
      success: true,
      error: false,
    };
  } catch (error) {
    const errorResponse = { success: false, error: true };
    if (error instanceof AxiosError) {
      Object.assign(errorResponse, { errorMessage: error.response?.data });
      return errorResponse;
    }

    return {
      ...errorResponse,
      errorMessage:
        "Por algum motivo, nao foi possivel completar a solicitação",
    };
  }
}
