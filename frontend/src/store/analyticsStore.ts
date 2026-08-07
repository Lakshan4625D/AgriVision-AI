import { create } from "zustand";

import type { AnalyticsRecord } from "../types/analytics";

interface AnalyticsState {

  data: AnalyticsRecord[];

  loading: boolean;

  setData: (data: AnalyticsRecord[]) => void;

  setLoading: (loading: boolean) => void;

}

export const useAnalyticsStore =
create<AnalyticsState>((set) => ({

  data: [],

  loading: false,

  setData: (data) =>
    set({ data }),

  setLoading: (loading) =>
    set({ loading }),

}));