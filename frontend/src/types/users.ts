export interface UserRole {
  id: number;
  name: string;
}

export interface UserWithRole {
  id: number;
  full_name: string;
  email: string;
  phone?: string | null;
  role_id: number | null;
  role?: UserRole | null;
  created_at?: string | null;
  updated_at?: string | null;
}