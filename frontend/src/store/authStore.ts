import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      token: null,

      isAuthenticated: false,

      login: (user) =>
        set({
          user,
          token: "temp-token",
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "agrivision-auth",
    }
  )
);