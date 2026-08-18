import api from "./axios";

import type { UserWithRole } from "../types/users";

export async function getUsers(): Promise<UserWithRole[]> {
  const response = await api.get("/users");

  return response.data;
}