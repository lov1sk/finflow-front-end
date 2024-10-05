import { User } from "@/types/user";
import { randomUUID } from "crypto";

export const usersMock: User[] = [
  {
    id: randomUUID(),
    name: "User-1",
    age: 20,
    gender: "Masculino",
    createdAt: new Date("2024-01-01"),
  },
];
