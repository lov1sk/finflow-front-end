"use server";

import { Transaction } from "@/types/transaction";
import { HttpGET } from "@/config/api-client";
import { urls } from "../http-routes";
import { AxiosError } from "axios";

interface GetTransactionsRequest {
  page?: string | number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  description?: string;
}
interface GetTransactionsHttpResponse {
  data: Transaction[];
  page: number;
  total: number;
  lastPage: number;
  transactionsAmount: number;
  creditTransactionsAmount: number;
  debitTransactionsAmount: number;
}

interface GetTransactionsResponse {
  success: boolean;
  data?: GetTransactionsHttpResponse;
  error: boolean;
  errorMessage?: string;
}
export async function getTransactions({
  page = 1,
  limit = 10,
  startDate = "",
  endDate = "",
  description = "",
}: GetTransactionsRequest): Promise<GetTransactionsResponse> {
  try {
    page = Number(page) - 1;

    const queryParams = `?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&description=${description}`;

    const response = await HttpGET<GetTransactionsHttpResponse>(
      urls.TRANSACTIONS.GET_TRANSACTIONS.concat(queryParams)
    );

    return {
      success: true,
      error: false,
      data: response,
    };
  } catch (error) {
    const errorResponse = { success: false, error: true };
    if (error instanceof AxiosError) {
      Object.assign(errorResponse, { errorMessage: error.response?.data });
      return errorResponse;
    }

    return {
      ...errorResponse,
      errorMessage: "Erro ao buscar as suas transações",
    };
  }
}
/**
 * 
 *  total,
      page,
      lastPage: total < 15 ? 1 : Math.ceil(total / limit),
 */
