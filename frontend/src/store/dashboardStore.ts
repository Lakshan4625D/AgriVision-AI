import { create } from "zustand";

import type { DashboardResponse } from "../types/dashboard";

interface DashboardState {
  dashboard: DashboardResponse | null;
  loading: boolean;

  setDashboard: (dashboard: DashboardResponse) => void;
  setLoading: (loading: boolean) => void;
  clearDashboard: () => void;
}

export const useDashboardStore =
  create<DashboardState>((set) => ({
    dashboard: null,

    loading: false,

    setDashboard: (dashboard) =>
      set({
        dashboard,
      }),

    setLoading: (loading) =>
      set({
        loading,
      }),

    clearDashboard: () =>
      set({
        dashboard: null,
      }),
  }));