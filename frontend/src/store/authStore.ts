import { create } from "zustand";

export interface User {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  login: (user: User) => void;
  logout: () => void;
}

const storedUser = localStorage.getItem("user");

const user: User | null = storedUser
  ? JSON.parse(storedUser)
  : null;

export const useAuthStore = create<AuthState>((set) => ({
  user,
  isAuthenticated: user !== null,

  login: (user) => {
    localStorage.setItem("user", JSON.stringify(user));

    set({
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("user");

    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));