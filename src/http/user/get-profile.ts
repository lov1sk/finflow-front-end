"use server";

import { User } from "@/types/user";
import { usersMock } from "./mocks/users";

export interface GetProfileResponse {
  user: User;
}
export async function getProfile(): Promise<GetProfileResponse> {
  console.log({ user: usersMock[0] });
  return {
    user: usersMock[0],
  };
}
