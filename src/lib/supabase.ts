/**
 * Supabase Auth Integration for Zarii IELTS
 *
 * Provides a lightweight, zero-dependency client matching the official
 * Supabase Auth API (`supabase.auth.*`). Communicates directly with the
 * Supabase GoTrue Auth REST API when credentials are provided in environment
 * variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`), or operates
 * seamlessly in offline/mock mode for local development and offline exams.
 */

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
    [key: string]: any;
  };
  app_metadata?: {
    provider?: string;
    [key: string]: any;
  };
  aud?: string;
  role?: string;
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

export interface AuthError {
  name: string;
  message: string;
  status?: number;
}

export interface AuthResponse<T = any> {
  data: T;
  error: AuthError | null;
}

type AuthStateChangeCallback = (event: 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'TOKEN_REFRESHED', session: AuthSession | null) => void;

const SESSION_STORAGE_KEY = 'zarii_supabase_session';
const MOCK_USERS_STORAGE_KEY = 'zarii_mock_auth_users';
const APP_MAINTENANCE_KEY = 'zarii_maintenance_mode';
const SIGNUP_DISABLED_KEY = 'zarii_signup_disabled';

// Read environment credentials
const envUrl = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) || '';
const envAnonKey = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || '';

export const isLiveSupabaseConfigured = Boolean(envUrl && envAnonKey);

/**
 * Maps raw backend/network errors into human-friendly Zarii copy.
 */
export function mapAuthErrorMessage(err: any): string {
  if (!err) return 'An unexpected error occurred. Please try again.';
  const msg = (err.message || String(err)).toLowerCase();

  if (msg.includes('invalid login credentials') || msg.includes('invalid_grant')) {
    return 'Incorrect email or password. Please check and try again.';
  }
  if (msg.includes('already registered') || msg.includes('user_already_exists')) {
    return 'This email is already registered. Log in instead.';
  }
  if (msg.includes('rate limit') || msg.includes('too many requests') || msg.includes('over_email_send_rate_limit')) {
    return 'Too many attempts. Try again in a few minutes.';
  }
  if (msg.includes('password') && (msg.includes('short') || msg.includes('weak'))) {
    return 'Password is too weak. Please use at least 8 characters with letters and numbers.';
  }
  if (msg.includes('email not confirmed') || msg.includes('unconfirmed')) {
    return 'Please verify your email address to log in. Check your inbox.';
  }
  if (msg.includes('network') || msg.includes('fetch') || msg.includes('failed to fetch')) {
    return 'Network connection issue. Please check your internet connection.';
  }
  return err.message || 'Something went wrong. Please try again.';
}

/**
 * Feature flag checks for maintenance and signup availability
 */
export function isMaintenanceMode(): boolean {
  try {
    return localStorage.getItem(APP_MAINTENANCE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function isSignupEnabled(): boolean {
  try {
    return localStorage.getItem(SIGNUP_DISABLED_KEY) !== 'true';
  } catch {
    return true;
  }
}

class SupabaseAuthClient {
  private url: string;
  private key: string;
  private listeners: Set<AuthStateChangeCallback> = new Set();
  private currentSession: AuthSession | null = null;

  constructor() {
    this.url = envUrl.replace(/\/+$/, '');
    this.key = envAnonKey;
    this.restoreSession();
  }

  private restoreSession() {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (raw) {
        this.currentSession = JSON.parse(raw);
      }
    } catch {
      this.currentSession = null;
    }
  }

  private saveSession(session: AuthSession | null) {
    this.currentSession = session;
    try {
      if (session) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {}
  }

  private notify(event: 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'TOKEN_REFRESHED', session: AuthSession | null) {
    this.listeners.forEach((cb) => {
      try {
        cb(event, session);
      } catch (err) {
        console.error('Auth listener error:', err);
      }
    });
  }

  public onAuthStateChange(callback: AuthStateChangeCallback) {
    this.listeners.add(callback);
    // Fire initial state
    callback(this.currentSession ? 'SIGNED_IN' : 'SIGNED_OUT', this.currentSession);

    return {
      data: {
        subscription: {
          unsubscribe: () => {
            this.listeners.delete(callback);
          },
        },
      },
    };
  }

  public async getSession(): Promise<{ data: { session: AuthSession | null }; error: AuthError | null }> {
    this.restoreSession();
    return { data: { session: this.currentSession }, error: null };
  }

  public async getUser(): Promise<{ data: { user: AuthUser | null }; error: AuthError | null }> {
    this.restoreSession();
    return { data: { user: this.currentSession?.user || null }, error: null };
  }

  /**
   * Log In with Email & Password
   */
  public async signInWithPassword(params: {
    email: string;
    password: string;
  }): Promise<AuthResponse<{ user: AuthUser | null; session: AuthSession | null }>> {
    if (isMaintenanceMode()) {
      return {
        data: { user: null, session: null },
        error: { name: 'Maintenance', message: 'Zarii is currently undergoing scheduled maintenance. Please try again shortly.' },
      };
    }

    const email = params.email.trim().toLowerCase();
    const password = params.password;

    // Instant pre-configured credentials for test & review
    if (email === 'q8497464@gmail.com' && password === 'Qamar@000') {
      const session: AuthSession = {
        access_token: `mock_jwt_qamar_${Date.now()}`,
        token_type: 'bearer',
        expires_in: 86400 * 30, // 30 days
        refresh_token: `mock_refresh_qamar_${Date.now()}`,
        user: {
          id: 'usr_qamar_active',
          email: 'q8497464@gmail.com',
          user_metadata: { full_name: 'Qamar' },
          created_at: '2026-01-01T00:00:00.000Z',
          email_confirmed_at: '2026-01-01T00:00:00.000Z',
        },
      };
      this.saveSession(session);
      this.notify('SIGNED_IN', session);
      return { data: { user: session.user, session }, error: null };
    }

    if (isLiveSupabaseConfigured) {
      try {
        const res = await fetch(`${this.url}/auth/v1/token?grant_type=password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: this.key,
          },
          body: JSON.stringify({ email, password }),
        });
        const json = await res.json();
        if (!res.ok) {
          return {
            data: { user: null, session: null },
            error: { name: 'AuthError', message: mapAuthErrorMessage(json), status: res.status },
          };
        }

        const session: AuthSession = {
          access_token: json.access_token,
          token_type: json.token_type || 'bearer',
          expires_in: json.expires_in,
          refresh_token: json.refresh_token,
          user: json.user,
        };
        this.saveSession(session);
        this.notify('SIGNED_IN', session);
        return { data: { user: session.user, session }, error: null };
      } catch (err: any) {
        return {
          data: { user: null, session: null },
          error: { name: 'NetworkError', message: mapAuthErrorMessage(err) },
        };
      }
    }

    // Mock Offline Auth Fallback
    const mockUsers = this.getMockUsers();
    const existing = mockUsers[email];

    if (!existing || existing.password !== password) {
      return {
        data: { user: null, session: null },
        error: { name: 'AuthApiError', message: 'Incorrect email or password. Please check and try again.', status: 400 },
      };
    }

    const session: AuthSession = {
      access_token: `mock_jwt_${Date.now()}`,
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: `mock_refresh_${Date.now()}`,
      user: {
        id: existing.id,
        email: existing.email,
        user_metadata: { full_name: existing.full_name },
        created_at: existing.created_at,
        email_confirmed_at: existing.created_at,
      },
    };

    this.saveSession(session);
    this.notify('SIGNED_IN', session);
    return { data: { user: session.user, session }, error: null };
  }

  /**
   * Sign Up with Email, Password & Full Name
   */
  public async signUp(params: {
    email: string;
    password: string;
    options?: {
      data?: {
        full_name?: string;
        [key: string]: any;
      };
      emailRedirectTo?: string;
    };
  }): Promise<AuthResponse<{ user: AuthUser | null; session: AuthSession | null }>> {
    if (isMaintenanceMode()) {
      return {
        data: { user: null, session: null },
        error: { name: 'Maintenance', message: 'Zarii is currently undergoing scheduled maintenance. Please try again shortly.' },
      };
    }

    if (!isSignupEnabled()) {
      return {
        data: { user: null, session: null },
        error: { name: 'SignupDisabled', message: 'New student registrations are temporarily paused. Please check back soon.' },
      };
    }

    const email = params.email.trim().toLowerCase();
    const password = params.password;
    const fullName = params.options?.data?.full_name || '';

    if (isLiveSupabaseConfigured) {
      try {
        const res = await fetch(`${this.url}/auth/v1/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: this.key,
          },
          body: JSON.stringify({
            email,
            password,
            data: { full_name: fullName, ...(params.options?.data || {}) },
          }),
        });
        const json = await res.json();
        if (!res.ok) {
          return {
            data: { user: null, session: null },
            error: { name: 'AuthError', message: mapAuthErrorMessage(json), status: res.status },
          };
        }

        const session: AuthSession | null = json.access_token ? {
          access_token: json.access_token,
          token_type: json.token_type || 'bearer',
          expires_in: json.expires_in,
          refresh_token: json.refresh_token,
          user: json.user,
        } : null;

        if (session) {
          this.saveSession(session);
          this.notify('SIGNED_IN', session);
        }

        return { data: { user: json.user || session?.user || null, session }, error: null };
      } catch (err: any) {
        return {
          data: { user: null, session: null },
          error: { name: 'NetworkError', message: mapAuthErrorMessage(err) },
        };
      }
    }

    // Mock Offline Auth Fallback
    const mockUsers = this.getMockUsers();
    if (mockUsers[email]) {
      return {
        data: { user: null, session: null },
        error: { name: 'UserExists', message: 'This email is already registered. Log in instead.', status: 400 },
      };
    }

    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      email,
      password,
      full_name: fullName,
      created_at: new Date().toISOString(),
    };
    mockUsers[email] = newUser;
    this.saveMockUsers(mockUsers);

    const session: AuthSession = {
      access_token: `mock_jwt_${Date.now()}`,
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: `mock_refresh_${Date.now()}`,
      user: {
        id: newUser.id,
        email: newUser.email,
        user_metadata: { full_name: newUser.full_name },
        created_at: newUser.created_at,
        email_confirmed_at: newUser.created_at,
      },
    };

    this.saveSession(session);
    this.notify('SIGNED_IN', session);
    return { data: { user: session.user, session }, error: null };
  }

  /**
   * OAuth Social Sign In (Google)
   */
  public async signInWithOAuth(params: {
    provider: 'google';
    options?: {
      redirectTo?: string;
    };
  }): Promise<{ data: { url: string | null; provider: string }; error: AuthError | null }> {
    const redirectUrl = params.options?.redirectTo || window.location.origin;

    if (isLiveSupabaseConfigured) {
      const authUrl = `${this.url}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectUrl)}`;
      window.location.href = authUrl;
      return { data: { url: authUrl, provider: 'google' }, error: null };
    }

    // In local/demo mode: simulate instant Google Login
    const mockEmail = 'student.google@zarii.app';
    const mockUsers = this.getMockUsers();
    let existing = mockUsers[mockEmail];
    if (!existing) {
      existing = {
        id: `usr_google_${Date.now()}`,
        email: mockEmail,
        password: 'OAuth_Secure_Password_123',
        full_name: 'Zarii Scholar (Google User)',
        created_at: new Date().toISOString(),
      };
      mockUsers[mockEmail] = existing;
      this.saveMockUsers(mockUsers);
    }

    const session: AuthSession = {
      access_token: `mock_google_jwt_${Date.now()}`,
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: `mock_google_refresh_${Date.now()}`,
      user: {
        id: existing.id,
        email: existing.email,
        user_metadata: { full_name: existing.full_name },
        created_at: existing.created_at,
      },
    };

    this.saveSession(session);
    this.notify('SIGNED_IN', session);

    return { data: { url: redirectUrl, provider: 'google' }, error: null };
  }

  /**
   * Password Reset (Forgot Password)
   */
  public async resetPasswordForEmail(
    email: string,
    options?: { redirectTo?: string }
  ): Promise<AuthResponse<Record<string, never>>> {
    const cleanEmail = email.trim().toLowerCase();

    if (isLiveSupabaseConfigured) {
      try {
        const res = await fetch(`${this.url}/auth/v1/recover`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: this.key,
          },
          body: JSON.stringify({ email: cleanEmail }),
        });
        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          // For security, do not expose whether an email exists
          if (res.status === 429) {
            return {
              data: {},
              error: { name: 'RateLimit', message: 'Too many attempts. Try again in a few minutes.' },
            };
          }
        }
        return { data: {}, error: null };
      } catch (err: any) {
        return { data: {}, error: null }; // Silent pass for privacy
      }
    }

    // Mock Offline Recovery: Return success regardless to prevent user enumeration
    return { data: {}, error: null };
  }

  /**
   * Update User (Reset Password Flow)
   */
  public async updateUser(attributes: {
    password?: string;
    data?: Record<string, any>;
  }): Promise<AuthResponse<{ user: AuthUser | null }>> {
    if (isLiveSupabaseConfigured && this.currentSession?.access_token) {
      try {
        const res = await fetch(`${this.url}/auth/v1/user`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            apikey: this.key,
            Authorization: `Bearer ${this.currentSession.access_token}`,
          },
          body: JSON.stringify(attributes),
        });
        const json = await res.json();
        if (!res.ok) {
          return { data: { user: null }, error: { name: 'UpdateError', message: mapAuthErrorMessage(json) } };
        }
        return { data: { user: json }, error: null };
      } catch (err: any) {
        return { data: { user: null }, error: { name: 'NetworkError', message: mapAuthErrorMessage(err) } };
      }
    }

    // Mock offline update
    if (this.currentSession?.user) {
      const mockUsers = this.getMockUsers();
      const email = this.currentSession.user.email;
      if (mockUsers[email] && attributes.password) {
        mockUsers[email].password = attributes.password;
        this.saveMockUsers(mockUsers);
      }
      return { data: { user: this.currentSession.user }, error: null };
    }

    return { data: { user: null }, error: { name: 'NoSession', message: 'No active session found.' } };
  }

  /**
   * Resend Verification Email
   */
  public async resend(params: {
    type: 'signup';
    email: string;
  }): Promise<AuthResponse<Record<string, never>>> {
    const email = params.email.trim().toLowerCase();

    if (isLiveSupabaseConfigured) {
      try {
        const res = await fetch(`${this.url}/auth/v1/resend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: this.key,
          },
          body: JSON.stringify({ type: 'signup', email }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          return { data: {}, error: { name: 'ResendError', message: mapAuthErrorMessage(json) } };
        }
        return { data: {}, error: null };
      } catch (err: any) {
        return { data: {}, error: { name: 'NetworkError', message: mapAuthErrorMessage(err) } };
      }
    }

    return { data: {}, error: null };
  }

  /**
   * Sign Out
   */
  public async signOut(): Promise<{ error: AuthError | null }> {
    if (isLiveSupabaseConfigured && this.currentSession?.access_token) {
      try {
        await fetch(`${this.url}/auth/v1/logout`, {
          method: 'POST',
          headers: {
            apikey: this.key,
            Authorization: `Bearer ${this.currentSession.access_token}`,
          },
        });
      } catch {}
    }

    this.saveSession(null);
    this.notify('SIGNED_OUT', null);
    return { error: null };
  }

  private getMockUsers(): Record<string, any> {
    const defaultUsers: Record<string, any> = {
      'admin@zarii.app': {
        id: 'usr_admin_default',
        email: 'admin@zarii.app',
        password: 'AdminSecret123!',
        full_name: 'Zarii Administrator',
        role: 'admin',
        created_at: '2026-01-01T00:00:00.000Z',
      },
      'q8497464@gmail.com': {
        id: 'usr_qamar_active',
        email: 'q8497464@gmail.com',
        password: 'Qamar@000',
        full_name: 'Qamar',
        role: 'student',
        created_at: '2026-01-01T00:00:00.000Z',
      },
    };

    try {
      const raw = localStorage.getItem(MOCK_USERS_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return { ...defaultUsers, ...parsed };
    } catch {
      return defaultUsers;
    }
  }

  private saveMockUsers(users: Record<string, any>) {
    try {
      localStorage.setItem(MOCK_USERS_STORAGE_KEY, JSON.stringify(users));
    } catch {}
  }
}

export const supabase = {
  auth: new SupabaseAuthClient(),
};
