/**
 * Zarii IELTS - Central Supabase Client & REST Integration
 * Free-tier compatible with zero mandatory external runtime dependencies.
 * Automatically switches between live cloud Supabase and local offline mock mode.
 */

import { supabase as authClient, isLiveSupabaseConfigured } from '../../lib/supabase';

const envUrl = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) || '';
const envAnonKey = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || '';

export interface QueryOptions {
  select?: string;
  eq?: Record<string, any>;
  order?: { column: string; ascending?: boolean };
  limit?: number;
}

class SupabaseTableQuery<T = any> {
  private table: string;
  private url: string;
  private key: string;

  constructor(table: string) {
    this.table = table;
    this.url = envUrl.replace(/\/+$/, '');
    this.key = envAnonKey;
  }

  private async getAuthToken(): Promise<string | null> {
    const { data } = await authClient.auth.getSession();
    return data.session?.access_token || null;
  }

  public async select(columns: string = '*'): Promise<{ data: T[] | null; error: any }> {
    if (!isLiveSupabaseConfigured) {
      return { data: [], error: null };
    }

    try {
      const token = await this.getAuthToken();
      const headers: Record<string, string> = {
        apikey: this.key,
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${this.url}/rest/v1/${this.table}?select=${encodeURIComponent(columns)}`, {
        method: 'GET',
        headers,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        return { data: null, error: err };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }

  public async insert(payload: Partial<T> | Partial<T>[]): Promise<{ data: T[] | null; error: any }> {
    if (!isLiveSupabaseConfigured) {
      return { data: Array.isArray(payload) ? (payload as T[]) : [payload as T], error: null };
    }

    try {
      const token = await this.getAuthToken();
      const headers: Record<string, string> = {
        apikey: this.key,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${this.url}/rest/v1/${this.table}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        return { data: null, error: err };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }

  public async update(payload: Partial<T>, matchColumn: string, matchValue: any): Promise<{ data: T[] | null; error: any }> {
    if (!isLiveSupabaseConfigured) {
      return { data: [payload as T], error: null };
    }

    try {
      const token = await this.getAuthToken();
      const headers: Record<string, string> = {
        apikey: this.key,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${this.url}/rest/v1/${this.table}?${matchColumn}=eq.${encodeURIComponent(matchValue)}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        return { data: null, error: err };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }
}

export const apiSupabase = {
  auth: authClient.auth,
  from: <T = any>(table: string) => new SupabaseTableQuery<T>(table),
  isLive: isLiveSupabaseConfigured,
};
