import { describe, it, expect, beforeEach } from 'vitest';
import { extractCandidateName, isPlaceholderName, formatEmailAsCandidateName } from './candidateUtils';

const store: Record<string, string> = {};
const mockStorage = {
  getItem: (k: string) => store[k] || null,
  setItem: (k: string, v: string) => {
    store[k] = String(v);
  },
  removeItem: (k: string) => {
    delete store[k];
  },
  clear: () => {
    Object.keys(store).forEach((k) => delete store[k]);
  },
};
(globalThis as any).localStorage = mockStorage;

describe('candidateUtils', () => {
  beforeEach(() => {
    mockStorage.clear();
  });

  describe('isPlaceholderName', () => {
    it('returns true for placeholder and empty names', () => {
      expect(isPlaceholderName('')).toBe(true);
      expect(isPlaceholderName('Candidate')).toBe(true);
      expect(isPlaceholderName('candidate')).toBe(true);
      expect(isPlaceholderName('IELTS Candidate')).toBe(true);
      expect(isPlaceholderName('Guest Candidate')).toBe(true);
      expect(isPlaceholderName('Guest User')).toBe(true);
      expect(isPlaceholderName(null)).toBe(true);
      expect(isPlaceholderName(undefined)).toBe(true);
    });

    it('returns false for actual candidate names', () => {
      expect(isPlaceholderName('Zarmeen')).toBe(false);
      expect(isPlaceholderName('Qamar')).toBe(false);
      expect(isPlaceholderName('Ali Khan')).toBe(false);
      expect(isPlaceholderName('John Doe')).toBe(false);
    });
  });

  describe('formatEmailAsCandidateName', () => {
    it('formats email prefix into proper candidate name', () => {
      expect(formatEmailAsCandidateName('zarmeen.akhtar@gmail.com')).toBe('Zarmeen Akhtar');
      expect(formatEmailAsCandidateName('qamar_uz_zaman@outlook.com')).toBe('Qamar Uz Zaman');
      expect(formatEmailAsCandidateName('ali-khan@zarii.app')).toBe('Ali Khan');
      expect(formatEmailAsCandidateName('john99@gmail.com')).toBe('John');
    });

    it('returns empty for invalid email or placeholder prefix', () => {
      expect(formatEmailAsCandidateName('candidate@zarii.app')).toBe('');
      expect(formatEmailAsCandidateName('')).toBe('');
    });
  });

  describe('extractCandidateName', () => {
    it('prioritizes explicit non-placeholder profile display name', () => {
      expect(extractCandidateName(null, 'Zarmeen Tariq')).toBe('Zarmeen Tariq');
    });

    it('ignores placeholder profile display name and falls back to localStorage or user metadata', () => {
      mockStorage.setItem('zarii_candidate_name', 'Qamar');
      expect(extractCandidateName(null, 'Candidate')).toBe('Qamar');
      expect(extractCandidateName(null, 'IELTS Candidate')).toBe('Qamar');
    });

    it('extracts from Supabase / Google OAuth user_metadata', () => {
      const mockUser = {
        email: 'student@example.com',
        user_metadata: {
          full_name: 'Dr. Fatima Noor',
        },
      };
      expect(extractCandidateName(mockUser, 'Candidate')).toBe('Dr. Fatima Noor');
    });

    it('extracts from user email when metadata has no name', () => {
      const mockUser = {
        email: 'ahmed.raza@gmail.com',
        user_metadata: {},
      };
      expect(extractCandidateName(mockUser, '')).toBe('Ahmed Raza');
    });
  });
});
