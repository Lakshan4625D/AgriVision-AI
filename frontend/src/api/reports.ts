import api from "./axios";

import type { Report } from "../types/reports";

export async function getReports(
  userId: number
): Promise<Report[]> {

  const response = await api.get(
    `/analysis/user/${userId}`
  );

  return response.data;
}