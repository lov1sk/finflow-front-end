import { checkAuthentication } from "@/http/auth/check-authentication";
import { getToken } from "@/http/auth/get-token";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "",
  timeout: 10 * 1000, // 10 seconds
});

checkAuthentication()
  .then((res) => {
    const jwtToken = getToken()?.value;
    console.log({ jwtToken });
    if (jwtToken && res) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    } else {
      apiClient.defaults.headers.common.Authorization = null;
    }
  })
  .catch(() => {
    apiClient.defaults.headers.common.Authorization = null;
  });

export async function HttpGET<T>(url: string): Promise<T> {
  await checkAuthentication();
  const response = await apiClient.get<T>(url);
  return response.data;
}

export async function HttpPOST<T>(url: string, data: unknown): Promise<T> {
  await checkAuthentication();
  const response = await apiClient.post<T>(url, data);
  return response.data;
}

export async function HttpPATCH<T>(url: string, data: unknown): Promise<T> {
  await checkAuthentication();
  const response = await apiClient.patch<T>(url, data);
  return response.data;
}

export async function HttpPUT<T>(url: string, data: unknown): Promise<T> {
  await checkAuthentication();
  const response = await apiClient.put<T>(url, data);
  return response.data;
}

export async function HttpDELETE<T>(url: string): Promise<T> {
  await checkAuthentication();
  const response = await apiClient.delete<T>(url);
  return response.data;
}
