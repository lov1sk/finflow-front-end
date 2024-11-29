"use server";

import { HttpGET } from "@/config/api-client";
import { urls } from "../http-routes";
import { AxiosError } from "axios";

interface GetTransactionsCategoriesHttpResponse {
  categories: string[];
}

interface GetTransactionsCategoriesResponse {
  success: boolean;
  data?: GetTransactionsCategoriesHttpResponse;
  error: boolean;
  errorMessage?: string;
}
export async function getTransactionsCategories(): Promise<GetTransactionsCategoriesResponse> {
  try {
    const response = await HttpGET<GetTransactionsCategoriesHttpResponse>(
      urls.TRANSACTIONS.GET_CATEGORIES
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
      errorMessage: "Erro ao buscar as categorias",
    };
  }
}
/**
 * 
 *  total,
      page,
      lastPage: total < 15 ? 1 : Math.ceil(total / limit),
 */
