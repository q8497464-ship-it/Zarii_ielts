/**
 * Auth Validation and Password Strength Utilities for Zarii IELTS
 */

export interface PasswordStrengthResult {
  score: number; // 0 to 4
  label: 'Too weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
  hasMinLength: boolean;
  hasLetter: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

/**
 * Validates standard email format.
 */
export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Email is required';
  }
  // Standard RFC 5322 simplified email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Enter a valid email address';
  }
  if (trimmed.length > 254) {
    return 'Email is too long';
  }
  return null;
}

/**
 * Validates user's full name.
 */
export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Full name is required';
  }
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (trimmed.length > 70) {
    return 'Name cannot exceed 70 characters';
  }
  return null;
}

/**
 * Evaluates password strength according to Zarii rules:
 * - At least 8 characters
 * - Combination of letters and numbers
 * - Optional uppercase and symbols for higher security
 */
export function evaluatePasswordStrength(password: string): PasswordStrengthResult {
  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);

  let score = 0;
  if (hasMinLength) score += 1;
  if (hasLetter && hasNumber) score += 1;
  if (hasMixedCase || (hasMinLength && password.length >= 10)) score += 1;
  if (hasSpecial && password.length >= 10) score += 1;

  if (password.length === 0) {
    return {
      score: 0,
      label: 'Too weak',
      color: 'bg-slate-200 dark:bg-slate-700',
      hasMinLength: false,
      hasLetter: false,
      hasNumber: false,
      hasSpecial: false,
    };
  }

  const labels: Array<PasswordStrengthResult['label']> = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = [
    'bg-rose-500',
    'bg-rose-500',
    'bg-amber-500',
    'bg-[#5BB78D]',
    'bg-[#1E9E63]',
  ];

  return {
    score,
    label: labels[score] || 'Too weak',
    color: colors[score] || 'bg-slate-200',
    hasMinLength,
    hasLetter,
    hasNumber,
    hasSpecial,
  };
}

/**
 * Evaluates admin password strength according to Zarii Administrator Security Standards:
 * - Minimum 12 characters required
 * - Must include lowercase, uppercase, numbers, and symbols
 */
export interface AdminPasswordValidationResult {
  isValid: boolean;
  score: number; // 0 to 4
  label: 'Too weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
  errors: string[];
  requirements: {
    hasMinLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
}

export function evaluateAdminPasswordStrength(password: string): AdminPasswordValidationResult {
  const hasMinLength = password.length >= 12;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  const errors: string[] = [];
  if (!hasMinLength) errors.push('Password must be at least 12 characters');
  if (!hasLowercase) errors.push('Include at least one lowercase letter (a-z)');
  if (!hasUppercase) errors.push('Include at least one uppercase letter (A-Z)');
  if (!hasNumber) errors.push('Include at least one number (0-9)');
  if (!hasSpecial) errors.push('Include at least one special character (!@#$%^&*)');

  let score = 0;
  if (password.length >= 8) score += 1;
  if (hasMinLength) score += 1;
  if (hasLowercase && hasUppercase && hasNumber) score += 1;
  if (hasSpecial && password.length >= 12) score += 1;

  const labels: Array<AdminPasswordValidationResult['label']> = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = [
    'bg-rose-500',
    'bg-rose-500',
    'bg-amber-500',
    'bg-[#5BB78D]',
    'bg-[#124F40]',
  ];

  const isValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;

  return {
    isValid,
    score,
    label: labels[score] || 'Too weak',
    color: colors[score] || 'bg-rose-500',
    errors,
    requirements: {
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial,
    },
  };
}

/**
 * Client-side rate limiter / failed attempts tracker.
 */
const RATE_LIMIT_KEY = 'zarii_auth_failed_logins';
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 seconds
const MAX_FAILED_ATTEMPTS = 5;

export interface RateLimitState {
  isLocked: boolean;
  remainingSeconds: number;
  attemptsCount: number;
}

export function getLoginRateLimitState(): RateLimitState {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return { isLocked: false, remainingSeconds: 0, attemptsCount: 0 };
    const data = JSON.parse(raw);
    const now = Date.now();

    if (data.lockedUntil && data.lockedUntil > now) {
      const remaining = Math.ceil((data.lockedUntil - now) / 1000);
      return { isLocked: true, remainingSeconds: remaining, attemptsCount: data.attempts || MAX_FAILED_ATTEMPTS };
    }

    // Lockout expired
    if (data.lockedUntil && data.lockedUntil <= now) {
      localStorage.removeItem(RATE_LIMIT_KEY);
      return { isLocked: false, remainingSeconds: 0, attemptsCount: 0 };
    }

    return { isLocked: false, remainingSeconds: 0, attemptsCount: data.attempts || 0 };
  } catch {
    return { isLocked: false, remainingSeconds: 0, attemptsCount: 0 };
  }
}

export function recordFailedLoginAttempt(): RateLimitState {
  try {
    const state = getLoginRateLimitState();
    const newCount = state.attemptsCount + 1;
    const now = Date.now();

    if (newCount >= MAX_FAILED_ATTEMPTS) {
      const lockedUntil = now + LOCKOUT_DURATION_MS;
      localStorage.setItem(
        RATE_LIMIT_KEY,
        JSON.stringify({ attempts: newCount, lockedUntil })
      );
      return { isLocked: true, remainingSeconds: 60, attemptsCount: newCount };
    }

    localStorage.setItem(
      RATE_LIMIT_KEY,
      JSON.stringify({ attempts: newCount, lockedUntil: null })
    );
    return { isLocked: false, remainingSeconds: 0, attemptsCount: newCount };
  } catch {
    return { isLocked: false, remainingSeconds: 0, attemptsCount: 0 };
  }
}

export function resetLoginRateLimit(): void {
  try {
    localStorage.removeItem(RATE_LIMIT_KEY);
  } catch {}
}
