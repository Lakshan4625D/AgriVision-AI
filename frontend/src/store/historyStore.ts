import { create } from "zustand";

import type { HistoryItem } from "../types/history";

interface HistoryState {

  history: HistoryItem[];

  loading: boolean;

  setHistory: (
    history: HistoryItem[]
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;
}

export const useHistoryStore =
create<HistoryState>((set) => ({

  history: [],

  loading: false,

  setHistory: (history) =>
    set({ history }),

  setLoading: (loading) =>
    set({ loading }),

}));