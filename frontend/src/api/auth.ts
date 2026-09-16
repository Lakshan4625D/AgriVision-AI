import api from "./axios";

export interface User {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
  is_admin: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  role_id: number;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
  access_token: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export async function login(
  data: LoginRequest, adminOnly = false
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    adminOnly ? "/auth/admin/login" : "/auth/login",
    data
  );

  return response.data;
}

export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>(
    "/auth/register",
    data
  );

  return response.data;
}