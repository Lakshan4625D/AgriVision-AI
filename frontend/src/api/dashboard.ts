import api from "./axios";
import type { DashboardResponse } from "../types/dashboard";

export async function getDashboard(
  userId: number
): Promise<DashboardResponse> {
  const response = await api.get(`/dashboard/${userId}`);

  return response.data;
}