import { describe, it, expect, beforeEach } from 'vitest';
import { authApi } from '../../shared/api';
import {
  sanitizeHtml,
  sanitizeMarkdown,
  validateUploadedFile,
  DEFAULT_AUDIO_TYPES,
  DEFAULT_IMAGE_TYPES,
  MAX_AUDIO_FILE_SIZE,
  MAX_IMAGE_FILE_SIZE,
} from '../../shared/utils';

describe('ADMIN SECURITY: Protections (Rate Limiting, Sanitization, File Checks)', () => {
  beforeEach(() => {
    authApi.clearLoginAttempts('attacker@zarii.app');
    authApi.clearLoginAttempts('admin@zarii.app');
  });

  describe('1. Login Rate Limiting & Brute-Force Defense', () => {
    it('allows initial login attempts below the threshold (5 tries)', () => {
      const email = 'attacker@zarii.app';
      for (let i = 0; i < 4; i++) {
        const res = authApi.recordFailedLogin(email);
        expect(res.isLocked).toBe(false);
      }
      const status = authApi.getLoginRateLimitStatus(email);
      expect(status.isLocked).toBe(false);
      expect(status.attempts).toBe(4);
    });

    it('triggers a 60-second lockout on the 5th consecutive failure', () => {
      const email = 'attacker@zarii.app';
      for (let i = 0; i < 4; i++) {
        authApi.recordFailedLogin(email);
      }
      const fifthAttempt = authApi.recordFailedLogin(email);
      expect(fifthAttempt.isLocked).toBe(true);
      expect(fifthAttempt.remainingSeconds).toBeGreaterThan(0);

      const status = authApi.getLoginRateLimitStatus(email);
      expect(status.isLocked).toBe(true);
    });

    it('clears failed attempts upon a successful authentication', () => {
      const email = 'admin@zarii.app';
      authApi.recordFailedLogin(email);
      authApi.recordFailedLogin(email);
      expect(authApi.getLoginRateLimitStatus(email).attempts).toBe(2);

      authApi.clearLoginAttempts(email);
      expect(authApi.getLoginRateLimitStatus(email).attempts).toBe(0);
      expect(authApi.getLoginRateLimitStatus(email).isLocked).toBe(false);
    });
  });

  describe('2. Input Sanitization & XSS Defense', () => {
    it('strips dangerous <script> tags from editor HTML input', () => {
      const dirty = '<p>Normal text</p><script>alert("XSS Attack!");</script><b>Bold content</b>';
      const clean = sanitizeHtml(dirty);
      expect(clean).not.toContain('<script');
      expect(clean).not.toContain('alert(');
      expect(clean).toContain('<p>Normal text</p>');
      expect(clean).toContain('<b>Bold content</b>');
    });

    it('neutralizes inline event handlers (onerror, onload, onclick)', () => {
      const dirty = '<img src="invalid-url.jpg" onerror="alert(\'XSS\')" alt="Test" />';
      const clean = sanitizeHtml(dirty);
      expect(clean).not.toContain('onerror');
      expect(clean).not.toContain('alert(');
      expect(clean).toContain('alt="Test"');
    });

    it('neutralizes javascript: URI protocols in markdown links', () => {
      const dirtyMarkdown = '[Click here to win an award](javascript:alert("Hacked!"))';
      const cleanMarkdown = sanitizeMarkdown(dirtyMarkdown);
      expect(cleanMarkdown).not.toContain('javascript:');
      expect(cleanMarkdown).toContain('#blocked-script');
    });

    it('neutralizes embedded <iframe>, <object>, and <embed> tags', () => {
      const dirty = '<iframe src="https://malicious-site.com"></iframe><p>Safe paragraph</p>';
      const clean = sanitizeHtml(dirty);
      expect(clean).not.toContain('<iframe');
      expect(clean).toContain('<p>Safe paragraph</p>');
    });

    it('preserves valid IELTS educational HTML and Markdown formatting', () => {
      const safeMarkdown = '### Passage 1: Renewable Energy\n\n- Solar power\n- Wind power\n\n**Key Insight:** Low carbon.';
      const clean = sanitizeMarkdown(safeMarkdown);
      expect(clean).toBe(safeMarkdown);
    });
  });

  describe('3. File Upload MIME & Size Guardrails', () => {
    it('approves valid IELTS audio MP3 file within 25MB limit', () => {
      const validAudio = new File(['mock audio stream'], 'section1.mp3', { type: 'audio/mpeg' });
      const res = validateUploadedFile(validAudio, {
        allowedMimeTypes: DEFAULT_AUDIO_TYPES,
        maxBytes: MAX_AUDIO_FILE_SIZE,
      });
      expect(res.isValid).toBe(true);
    });

    it('approves valid Task 1 chart PNG image within 5MB limit', () => {
      const validImage = new File(['mock image stream'], 'task1-barchart.png', { type: 'image/png' });
      const res = validateUploadedFile(validImage, {
        allowedMimeTypes: DEFAULT_IMAGE_TYPES,
        maxBytes: MAX_IMAGE_FILE_SIZE,
      });
      expect(res.isValid).toBe(true);
    });

    it('rejects malicious file types (e.g. .exe, .sh, .php)', () => {
      const maliciousFile = new File(['#!/bin/bash echo bad'], 'malicious.sh', { type: 'application/x-sh' });
      const res = validateUploadedFile(maliciousFile, {
        allowedMimeTypes: DEFAULT_AUDIO_TYPES,
      });
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('not supported');
    });

    it('rejects files exceeding the size limit', () => {
      // 30MB file mock
      const oversizedAudio = {
        name: 'huge-podcast.mp3',
        size: 30 * 1024 * 1024,
        type: 'audio/mpeg',
      } as unknown as File;

      const res = validateUploadedFile(oversizedAudio, {
        maxBytes: MAX_AUDIO_FILE_SIZE,
      });
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('exceeds maximum allowed limit');
    });

    it('rejects 0-byte empty files', () => {
      const emptyFile = new File([], 'empty.mp3', { type: 'audio/mpeg' });
      const res = validateUploadedFile(emptyFile);
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('Empty files');
    });
  });
});
