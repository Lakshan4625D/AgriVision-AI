import api from "./axios";
import type { AnalyticsRecord } from "../types/analytics";

export async function getAnalytics(
  userId: number
): Promise<AnalyticsRecord[]> {

  const response = await api.get(
    `/analysis/user/${userId}`
  );

  return response.data;
}