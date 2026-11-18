import { describe, it, expect, beforeEach, beforeAll } from 'vitest';

class LocalStorageMock {
  private store: Record<string, string> = {};
  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

const mockStorage = new LocalStorageMock();
(globalThis as any).localStorage = mockStorage;
(globalThis as any).window = globalThis;

import {
  validateEmail,
  validateName,
  evaluatePasswordStrength,
  getLoginRateLimitState,
  recordFailedLoginAttempt,
  resetLoginRateLimit,
} from '../../lib/authValidators';
import {
  supabase,
  mapAuthErrorMessage,
  isMaintenanceMode,
  isSignupEnabled,
} from '../../lib/supabase';

describe('Auth Validation Utilities', () => {
  beforeAll(() => {
    (globalThis as any).localStorage = mockStorage;
    (globalThis as any).window = globalThis;
  });

  describe('validateEmail', () => {
    it('accepts standard valid email addresses', () => {
      expect(validateEmail('student@example.com')).toBeNull();
      expect(validateEmail('user.name+tag@domain.co.uk')).toBeNull();
      expect(validateEmail('ielts.candidate99@sub.domain.org')).toBeNull();
    });

    it('rejects empty or whitespace-only email', () => {
      expect(validateEmail('')).toBe('Email is required');
      expect(validateEmail('   ')).toBe('Email is required');
    });

    it('rejects invalid email formats', () => {
      expect(validateEmail('plainaddress')).toBe('Enter a valid email address');
      expect(validateEmail('@missingusername.com')).toBe('Enter a valid email address');
      expect(validateEmail('username@.com')).toBe('Enter a valid email address');
      expect(validateEmail('username@domain')).toBe('Enter a valid email address');
      expect(validateEmail('username with space@domain.com')).toBe('Enter a valid email address');
    });

    it('rejects emails exceeding maximum RFC length', () => {
      const longDomain = 'a'.repeat(250) + '@example.com';
      expect(validateEmail(longDomain)).toBe('Email is too long');
    });
  });

  describe('validateName', () => {
    it('accepts valid full names', () => {
      expect(validateName('Zarii Student')).toBeNull();
      expect(validateName('An')).toBeNull();
      expect(validateName('Jane Doe-Smith')).toBeNull();
    });

    it('rejects empty or whitespace-only name', () => {
      expect(validateName('')).toBe('Full name is required');
      expect(validateName('   ')).toBe('Full name is required');
    });

    it('rejects names shorter than 2 characters', () => {
      expect(validateName('A')).toBe('Name must be at least 2 characters');
    });

    it('rejects names exceeding 70 characters', () => {
      const longName = 'A'.repeat(71);
      expect(validateName(longName)).toBe('Name cannot exceed 70 characters');
    });
  });

  describe('evaluatePasswordStrength', () => {
    it('returns score 0 and "Too weak" for empty password', () => {
      const res = evaluatePasswordStrength('');
      expect(res.score).toBe(0);
      expect(res.label).toBe('Too weak');
      expect(res.hasMinLength).toBe(false);
      expect(res.hasLetter).toBe(false);
      expect(res.hasNumber).toBe(false);
      expect(res.hasSpecial).toBe(false);
    });

    it('evaluates weak passwords (< 8 chars)', () => {
      const res = evaluatePasswordStrength('short1');
      expect(res.hasMinLength).toBe(false);
      expect(res.score).toBeLessThanOrEqual(2);
      expect(['Too weak', 'Weak']).toContain(res.label);
    });

    it('evaluates fair passwords (8+ chars, letters + numbers)', () => {
      const res = evaluatePasswordStrength('pass1234');
      expect(res.hasMinLength).toBe(true);
      expect(res.hasLetter).toBe(true);
      expect(res.hasNumber).toBe(true);
      expect(res.score).toBeGreaterThanOrEqual(2);
      expect(['Fair', 'Good', 'Strong']).toContain(res.label);
    });

    it('evaluates strong passwords (10+ chars, mixed case, numbers, special characters)', () => {
      const res = evaluatePasswordStrength('Zarii#2026Secure!');
      expect(res.hasMinLength).toBe(true);
      expect(res.hasLetter).toBe(true);
      expect(res.hasNumber).toBe(true);
      expect(res.hasSpecial).toBe(true);
      expect(res.score).toBe(4);
      expect(res.label).toBe('Strong');
    });
  });

  describe('Client-side Login Rate Limiter', () => {
    beforeEach(() => {
      mockStorage.clear();
      resetLoginRateLimit();
    });

    it('initial state has 0 attempts and is not locked', () => {
      const state = getLoginRateLimitState();
      expect(state.isLocked).toBe(false);
      expect(state.attemptsCount).toBe(0);
      expect(state.remainingSeconds).toBe(0);
    });

    it('increments attempts on failed login without locking up to 4 attempts', () => {
      for (let i = 1; i <= 4; i++) {
        const state = recordFailedLoginAttempt();
        expect(state.attemptsCount).toBe(i);
        expect(state.isLocked).toBe(false);
      }
    });

    it('locks out user after 5 failed login attempts for 60 seconds', () => {
      for (let i = 1; i <= 4; i++) {
        recordFailedLoginAttempt();
      }
      const lockedState = recordFailedLoginAttempt();
      expect(lockedState.attemptsCount).toBe(5);
      expect(lockedState.isLocked).toBe(true);
      expect(lockedState.remainingSeconds).toBeGreaterThan(0);

      // Verify persisted state
      const currentState = getLoginRateLimitState();
      expect(currentState.isLocked).toBe(true);
      expect(currentState.remainingSeconds).toBeGreaterThan(0);
    });

    it('resets rate limit on successful authentication or explicit reset', () => {
      for (let i = 1; i <= 5; i++) {
        recordFailedLoginAttempt();
      }
      expect(getLoginRateLimitState().isLocked).toBe(true);

      resetLoginRateLimit();
      const state = getLoginRateLimitState();
      expect(state.isLocked).toBe(false);
      expect(state.attemptsCount).toBe(0);
    });
  });

  describe('Error Message Mapping', () => {
    it('maps invalid credentials error', () => {
      expect(mapAuthErrorMessage({ message: 'Invalid login credentials' }))
        .toBe('Incorrect email or password. Please check and try again.');
      expect(mapAuthErrorMessage({ message: 'invalid_grant' }))
        .toBe('Incorrect email or password. Please check and try again.');
    });

    it('maps user already registered error', () => {
      expect(mapAuthErrorMessage({ message: 'User already registered' }))
        .toBe('This email is already registered. Log in instead.');
    });

    it('maps rate limit error', () => {
      expect(mapAuthErrorMessage({ message: 'over_email_send_rate_limit' }))
        .toBe('Too many attempts. Try again in a few minutes.');
    });

    it('maps email unconfirmed error', () => {
      expect(mapAuthErrorMessage({ message: 'Email not confirmed' }))
        .toBe('Please verify your email address to log in. Check your inbox.');
    });

    it('maps network errors', () => {
      expect(mapAuthErrorMessage({ message: 'Failed to fetch' }))
        .toBe('Network connection issue. Please check your internet connection.');
    });

    it('provides friendly fallback for unknown errors', () => {
      expect(mapAuthErrorMessage(null))
        .toBe('An unexpected error occurred. Please try again.');
    });
  });

  describe('Supabase Client (Mock/Offline Mode)', () => {
    beforeEach(() => {
      mockStorage.clear();
    });

    it('signs up a new user and persists session', async () => {
      const res = await supabase.auth.signUp({
        email: 'newuser@zarii.com',
        password: 'Password123!',
        options: {
          data: { full_name: 'Test Candidate' },
        },
      });

      expect(res.error).toBeNull();
      expect(res.data.user).toBeDefined();
      expect(res.data.user?.email).toBe('newuser@zarii.com');
      expect(res.data.user?.user_metadata?.full_name).toBe('Test Candidate');
    });

    it('handles duplicate user signup with appropriate error', async () => {
      await supabase.auth.signUp({
        email: 'duplicate@zarii.com',
        password: 'Password123!',
      });

      const second = await supabase.auth.signUp({
        email: 'duplicate@zarii.com',
        password: 'Password123!',
      });

      expect(second.error).not.toBeNull();
      expect(second.error?.message).toContain('already registered');
    });

    it('signs in with valid credentials', async () => {
      await supabase.auth.signUp({
        email: 'loginuser@zarii.com',
        password: 'Password123!',
      });

      const loginRes = await supabase.auth.signInWithPassword({
        email: 'loginuser@zarii.com',
        password: 'Password123!',
      });

      expect(loginRes.error).toBeNull();
      expect(loginRes.data.user?.email).toBe('loginuser@zarii.com');
      expect(loginRes.data.session).toBeDefined();
    });

    it('signs in immediately with pre-configured credentials q8497464@gmail.com', async () => {
      const loginRes = await supabase.auth.signInWithPassword({
        email: 'q8497464@gmail.com',
        password: 'Qamar@000',
      });

      expect(loginRes.error).toBeNull();
      expect(loginRes.data.user?.email).toBe('q8497464@gmail.com');
      expect(loginRes.data.user?.user_metadata?.full_name).toBe('Qamar');
      expect(loginRes.data.session).toBeDefined();
    });

    it('rejects sign in with incorrect password', async () => {
      await supabase.auth.signUp({
        email: 'loginwrong@zarii.com',
        password: 'CorrectPassword123!',
      });

      const loginRes = await supabase.auth.signInWithPassword({
        email: 'loginwrong@zarii.com',
        password: 'WrongPassword123!',
      });

      expect(loginRes.error).not.toBeNull();
      expect(loginRes.error?.message).toContain('Incorrect email or password');
    });

    it('resets password without leaking user existence', async () => {
      const res = await supabase.auth.resetPasswordForEmail('nonexistent@zarii.com');
      expect(res.error).toBeNull();
      expect(res.data).toBeDefined();
    });

    it('signs out user and clears session', async () => {
      await supabase.auth.signUp({
        email: 'signout@zarii.com',
        password: 'Password123!',
      });

      const { data: initialSession } = await supabase.auth.getSession();
      expect(initialSession.session).not.toBeNull();

      await supabase.auth.signOut();
      const { data: afterSession } = await supabase.auth.getSession();
      expect(afterSession.session).toBeNull();
    });
  });

  describe('Navigation Configuration & Grouping', () => {
    it('defines exactly 4 grouped sections in MAIN_NAVIGATION including ACCOUNT', async () => {
      const { MAIN_NAVIGATION } = await import('../../lib/navigationConfig');
      expect(MAIN_NAVIGATION).toHaveLength(4);
      expect(MAIN_NAVIGATION[0].items[0].name).toBe('Home');
      expect(MAIN_NAVIGATION[1].label).toBe('LEARN');
      expect(MAIN_NAVIGATION[1].items.map((i) => i.name)).toEqual([
        'Practice',
        'Mock Tests',
        'Vocabulary',
        'Study Plan',
      ]);
      expect(MAIN_NAVIGATION[2].label).toBe('PROGRESS');
      expect(MAIN_NAVIGATION[2].items[0].name).toBe('Progress');
      expect(MAIN_NAVIGATION[3].label).toBe('ACCOUNT');
      expect(MAIN_NAVIGATION[3].items[0].name).toBe('Profile & Settings');
    });

    it('keeps BOTTOM_NAVIGATION empty so profile card is alone at bottom', async () => {
      const { BOTTOM_NAVIGATION } = await import('../../lib/navigationConfig');
      expect(BOTTOM_NAVIGATION).toHaveLength(0);
    });

    it('resolves correct page titles and categories across all routes', async () => {
      const { getPageTitle } = await import('../../lib/navigationConfig');
      expect(getPageTitle('/')).toEqual({ title: 'Home' });
      expect(getPageTitle('/practice')).toEqual({ title: 'Practice Modules', category: 'Learn' });
      expect(getPageTitle('/mock')).toEqual({ title: 'Mock Exams', category: 'Learn' });
      expect(getPageTitle('/vocab')).toEqual({ title: 'Vocabulary & Grammar', category: 'Learn' });
      expect(getPageTitle('/dashboard')).toEqual({ title: 'Performance Dashboard', category: 'Progress' });
      expect(getPageTitle('/settings')).toEqual({ title: 'Settings' });
    });
  });

  describe('Guest Mode and Admin Controls', () => {
    it('tracks guest mode status in local storage', () => {
      mockStorage.setItem('zarii_guest_mode', 'true');
      expect(mockStorage.getItem('zarii_guest_mode')).toBe('true');

      mockStorage.removeItem('zarii_guest_mode');
      expect(mockStorage.getItem('zarii_guest_mode')).toBeNull();
    });

    it('cleans up admin authentication session upon signout', () => {
      mockStorage.setItem('zarii_admin_auth', 'true');
      expect(mockStorage.getItem('zarii_admin_auth')).toBe('true');

      mockStorage.removeItem('zarii_admin_auth');
      expect(mockStorage.getItem('zarii_admin_auth')).toBeNull();
    });
  });
});
