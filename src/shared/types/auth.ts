import type { UserRole } from './database';

export interface AuthUser {
  id: string;
  email: string;
  role?: UserRole;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
    [key: string]: any;
  };
  app_metadata?: {
    provider?: string;
    role?: UserRole;
    [key: string]: any;
  };
  created_at?: string;
  email_confirmed_at?: string;
}

export interface AuthSession {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: AuthUser;
}

export interface AdminUserSession {
  user: AuthUser;
  role: 'admin' | 'editor';
  token: string;
}
