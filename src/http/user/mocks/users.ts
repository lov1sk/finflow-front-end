import { User } from "@/types/user";
import { randomUUID } from "crypto";

export const usersMock: User[] = [
  {
    id: randomUUID(),
    name: "Lucas Ribeiro",
    email: "user1@test.com",
    age: 20,
    gender: "Masculino",
    createdAt: new Date("2024-01-01"),
  },
];
