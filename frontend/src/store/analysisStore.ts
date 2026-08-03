import { create } from "zustand";
import type { AnalysisResponse } from "../types/analysis";

interface AnalysisState {
  result: AnalysisResponse | null;

  loading: boolean;

  setLoading: (loading: boolean) => void;

  setResult: (result: AnalysisResponse) => void;

  clear: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  result: null,

  loading: false,

  setLoading: (loading) =>
    set({
      loading,
    }),

  setResult: (result) =>
    set({
      result,
    }),

  clear: () =>
    set({
      result: null,
      loading: false,
    }),
}));