import { describe, it, expect, beforeEach } from 'vitest';
import { authApi } from '../../shared/api';
import { evaluateAdminPasswordStrength } from '../../lib/authValidators';
import {
  generateBase32Secret,
  generateRecoveryCodes,
  buildTotpUri,
  generateQrCodeSvg,
  verifyTotpInput,
  formatSecretKey,
} from '../../shared/utils/mfaUtils';
import { contentStore } from '../../shared/content/contentStore';

describe('FEATURE: Full-Window Admin Login, 2FA & Security QA', () => {
  beforeEach(() => {
    authApi.clearLoginAttempts('attacker@zarii.app');
    authApi.clearLoginAttempts('admin@zarii.app');
    authApi.clearLoginAttempts('student@zarii.app');
    authApi.clearLoginAttempts('q8497464@gmail.com');
  });

  describe('1. Password Validation Rules (Min 12 Characters & Complexity)', () => {
    it('rejects passwords shorter than 12 characters', () => {
      const res = evaluateAdminPasswordStrength('Short1!abc');
      expect(res.isValid).toBe(false);
      expect(res.requirements.hasMinLength).toBe(false);
      expect(res.errors).toContain('Password must be at least 12 characters');
    });

    it('rejects passwords missing uppercase letters', () => {
      const res = evaluateAdminPasswordStrength('adminsecret123!lowercase');
      expect(res.isValid).toBe(false);
      expect(res.requirements.hasUppercase).toBe(false);
      expect(res.errors).toContain('Include at least one uppercase letter (A-Z)');
    });

    it('rejects passwords missing numbers', () => {
      const res = evaluateAdminPasswordStrength('AdminSecret!NoNumbers');
      expect(res.isValid).toBe(false);
      expect(res.requirements.hasNumber).toBe(false);
      expect(res.errors).toContain('Include at least one number (0-9)');
    });

    it('rejects passwords missing special characters', () => {
      const res = evaluateAdminPasswordStrength('AdminSecret123NoSpecial');
      expect(res.isValid).toBe(false);
      expect(res.requirements.hasSpecial).toBe(false);
      expect(res.errors).toContain('Include at least one special character (!@#$%^&*)');
    });

    it('accepts compliant passwords meeting all 5 criteria', () => {
      const res = evaluateAdminPasswordStrength('AdminSecret123!');
      expect(res.isValid).toBe(true);
      expect(res.errors.length).toBe(0);
      expect(res.requirements.hasMinLength).toBe(true);
      expect(res.requirements.hasUppercase).toBe(true);
      expect(res.requirements.hasLowercase).toBe(true);
      expect(res.requirements.hasNumber).toBe(true);
      expect(res.requirements.hasSpecial).toBe(true);
      expect(res.score).toBeGreaterThanOrEqual(3);
    });
  });

  describe('2. Brute-Force Rate Limiter & Lockout Counter (15-Minute Lock)', () => {
    it('allows initial attempts under the 5-failure threshold', () => {
      const email = 'attacker@zarii.app';
      for (let i = 0; i < 4; i++) {
        const res = authApi.recordFailedLogin(email);
        expect(res.isLocked).toBe(false);
      }
      const status = authApi.getLoginRateLimitStatus(email);
      expect(status.isLocked).toBe(false);
      expect(status.attempts).toBe(4);
    });

    it('locks sign-in for 15 minutes (900 seconds) on the 5th failure', () => {
      const email = 'attacker@zarii.app';
      for (let i = 0; i < 4; i++) {
        authApi.recordFailedLogin(email);
      }
      const fifth = authApi.recordFailedLogin(email);
      expect(fifth.isLocked).toBe(true);
      expect(fifth.remainingSeconds).toBeGreaterThan(800);
      expect(fifth.remainingSeconds).toBeLessThanOrEqual(900);

      const status = authApi.getLoginRateLimitStatus(email);
      expect(status.isLocked).toBe(true);
    });

    it('records failed login attempts into append-only audit log without passwords', () => {
      const email = 'test.attacker@zarii.app';
      authApi.recordFailedLogin(email);

      const logs = contentStore.getAuditLogs();
      const failLog = logs.find((l) => l.action === 'ADMIN_LOGIN_FAILED' && l.target_id === email);
      expect(failLog).toBeDefined();
      expect(failLog?.target_type).toBe('auth');
      // Passwords must never be logged
      expect(JSON.stringify(failLog)).not.toContain('password');
      expect(failLog?.new_state?.client).toBeDefined();
    });

    it('clears failed attempts upon successful authentication', () => {
      const email = 'admin@zarii.app';
      authApi.recordFailedLogin(email);
      expect(authApi.getLoginRateLimitStatus(email).attempts).toBe(1);

      authApi.clearLoginAttempts(email);
      expect(authApi.getLoginRateLimitStatus(email).attempts).toBe(0);
      expect(authApi.getLoginRateLimitStatus(email).isLocked).toBe(false);
    });
  });

  describe('3. Generic Neutral Security Responses & Student Isolation', () => {
    it('returns identical generic error for invalid password', async () => {
      const res = await authApi.authenticateAdmin('admin@zarii.app', 'WrongPassword999!');
      expect(res.success).toBe(false);
      expect(res.error).toBe('Invalid credentials or no access');
    });

    it('returns identical generic error for non-existent admin email', async () => {
      const res = await authApi.authenticateAdmin('nonexistent.admin@zarii.app', 'AnyPass123!');
      expect(res.success).toBe(false);
      expect(res.error).toBe('Invalid credentials or no access');
    });

    it('blocks student accounts and signs them out with generic error', async () => {
      // q8497464@gmail.com is registered as a student
      const res = await authApi.authenticateAdmin('q8497464@gmail.com', 'Qamar@000');
      expect(res.success).toBe(false);
      expect(res.error).toBe('Invalid credentials or no access');
    });
  });

  describe('4. Multi-Factor Authentication (TOTP Key, SVG QR & Recovery Codes)', () => {
    it('generates a valid 16-character base32 secret and formats it in 4-character chunks', () => {
      const secret = generateBase32Secret(16);
      expect(secret.length).toBe(16);
      expect(/^[A-Z2-7]+$/.test(secret)).toBe(true);

      const formatted = formatSecretKey(secret);
      expect(formatted.split(' ').length).toBe(4);
    });

    it('builds a compliant TOTP URI and generates valid vector SVG QR code', () => {
      const uri = buildTotpUri('Zarii Admin', 'admin@zarii.app', 'JBSWY3DPEHPK3PXP');
      expect(uri).toContain('otpauth://totp/Zarii%20Admin:admin%40zarii.app');
      expect(uri).toContain('secret=JBSWY3DPEHPK3PXP');

      const svg = generateQrCodeSvg(uri, 180);
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
      expect(svg).toContain('viewBox="0 0 180 180"');
    });

    it('generates 8 unique single-use recovery backup codes formatted as XXXX-XXXX', () => {
      const codes = generateRecoveryCodes(8);
      expect(codes.length).toBe(8);
      codes.forEach((c) => {
        expect(c).toMatch(/^[2-9A-Z]{4}-[2-9A-Z]{4}$/);
      });
      // Ensure all 8 codes are distinct
      const unique = new Set(codes);
      expect(unique.size).toBe(8);
    });

    it('enrolls an admin into MFA, verifies confirmation code, and consumes recovery codes', () => {
      const testEmail = 'mfa.test.admin@zarii.app';

      // 1. Enroll
      const factor = authApi.enrollTotp(testEmail);
      expect(factor.secret).toBeDefined();
      expect(factor.qrSvg).toContain('<svg');

      // 2. Verify with confirmation code
      const verifyRes = authApi.verifyTotpSetup(testEmail, '123456');
      expect(verifyRes.success).toBe(true);
      expect(verifyRes.recoveryCodes.length).toBe(8);

      // 3. Challenge verification
      const challengeRes = authApi.verifyTotpChallenge(testEmail, '123456');
      expect(challengeRes.success).toBe(true);

      // 4. Consume one recovery code
      const codeToUse = verifyRes.recoveryCodes[0];
      const recRes = authApi.verifyRecoveryCode(testEmail, codeToUse);
      expect(recRes.success).toBe(true);
      expect(recRes.remainingCodesCount).toBe(7);

      // 5. Re-using the same code must fail (single-use)
      const reuseRes = authApi.verifyRecoveryCode(testEmail, codeToUse);
      expect(reuseRes.success).toBe(false);
    });
  });

  describe('5. Sensitive Actions Re-Authentication & Last Admin Protection', () => {
    it('verifies admin password before executing sensitive actions', async () => {
      // Re-authentication with valid admin password
      const validReauth = await authApi.reauthenticate('AdminSecret123!');
      expect(validReauth.success).toBe(true);

      // Re-authentication with invalid password fails
      const invalidReauth = await authApi.reauthenticate('WrongPass123!');
      expect(invalidReauth.success).toBe(false);
    });
  });
});
