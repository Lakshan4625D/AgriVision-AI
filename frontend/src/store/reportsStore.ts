import { create } from "zustand";

import type { Report } from "../types/reports";

interface ReportsState {

  reports: Report[];

  loading: boolean;

  setReports: (
    reports: Report[]
  ) => void;

  setLoading: (
    value: boolean
  ) => void;

}

export const useReportsStore =
create<ReportsState>((set) => ({

  reports: [],

  loading: false,

  setReports: (reports) =>
    set({ reports }),

  setLoading: (loading) =>
    set({ loading }),

}));