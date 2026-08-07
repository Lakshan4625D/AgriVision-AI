import api from "./axios";

import type { HistoryItem } from "../types/history";

export async function getHistory(
  userId: number
): Promise<HistoryItem[]> {

  const response = await api.get(
    `/analysis/user/${userId}`
  );

  return response.data;
}