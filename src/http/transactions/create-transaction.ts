"use server";

import { HttpPOST } from "@/config/api-client";
import { urls } from "../http-routes";
import { AxiosError } from "axios";

interface CreateTransactionRequest {
  date: string;
  description: string;
  value: number;
  category: string;
  typeTransaction: string;
}

interface CreateTransactionResponse {
  success: boolean;
  error: boolean;
  errorMessage?: string;
}

export async function createTransaction({
  date,
  description,
  value,
  category,
  typeTransaction,
}: CreateTransactionRequest): Promise<CreateTransactionResponse> {
  try {
    const createTransactionDto = {
      date,
      description,
      value,
      category,
      typeTransaction,
    };
    console.log({
      msg: "CRIANDO NOVA TRANSAÇÃO",
      dto: createTransactionDto,
      endpoint: urls.TRANSACTIONS.POST_CREATE_TRANSACTION,
    });

    await HttpPOST<void>(
      urls.TRANSACTIONS.POST_CREATE_TRANSACTION,
      createTransactionDto
    );

    return {
      success: true,
      error: false,
    };
  } catch (error) {
    const errorResponse = {
      success: false,
      error: true,
      errorMessage: "Erro ao criar transação",
    };

    if (error instanceof AxiosError) {
      Object.assign(errorResponse, { errorMessage: error.response?.data });
    }

    return errorResponse;
  }
}
