"use server";

interface EditUserRequest {
  name: string;
  age: number;
  gender: string;
}

export async function editUser(payload: EditUserRequest): Promise<void> {
  console.log({ payload });
}
