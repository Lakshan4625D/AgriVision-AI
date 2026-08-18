import { create } from "zustand";

import type { UserWithRole } from "../types/users";

interface UsersState {
  users: UserWithRole[];
  loading: boolean;
  error: string | null;

  setUsers: (users: UserWithRole[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUsers: () => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  loading: false,
  error: null,

  setUsers: (users) =>
    set({
      users,
      error: null,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  setError: (error) =>
    set({
      error,
      loading: false,
    }),

  clearUsers: () =>
    set({
      users: [],
      error: null,
    }),
}));