import { create } from "zustand";
export interface User { id: number; full_name: string; email: string; role_id: number; is_admin: boolean }
interface AuthState { user: User | null; isAuthenticated: boolean; login: (user: User, token: string) => void; logout: () => void }
let user: User | null = null;
try { user = localStorage.getItem("access_token") ? JSON.parse(localStorage.getItem("user") || "null") : null; } catch { /* Invalid persisted session requires login. */ }
export const useAuthStore = create<AuthState>((set) => ({
 user, isAuthenticated: user !== null,
 login: (user, token) => { localStorage.setItem("user", JSON.stringify(user)); localStorage.setItem("access_token", token); set({user, isAuthenticated: true}); },
 logout: () => { localStorage.removeItem("user"); localStorage.removeItem("access_token"); set({user: null, isAuthenticated: false}); }
}));
