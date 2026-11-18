import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Key, AlertCircle, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { authApi } from '../../../../shared/api';
import { AdminAuthLayout } from '../../AdminAuthLayout';

export function AdminMfaChallengePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state as any) || {};
  const email = state.email || 'admin@zarii.app';
  const role = state.role || 'admin';
  const name = state.name || 'Admin';
  const returnUrl = state.returnUrl || '/admin';

  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    document.title = 'Two-factor authentication | Zarii';
    // Focus first digit on load
    inputRefs.current[0]?.focus();
  }, [isRecoveryMode]);

  // Handle auto-submit when all 6 digits are filled
  useEffect(() => {
    const fullCode = digits.join('');
    if (fullCode.length === 6 && !isLoading && !isRecoveryMode) {
      submitTotp(fullCode);
    }
  }, [digits, isLoading, isRecoveryMode]);

  const submitTotp = async (code: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = authApi.verifyTotpChallenge(email, code);
      if (res.success) {
        sessionStorage.setItem(
          'zarii_admin_session',
          JSON.stringify({
            role,
            email,
            name,
            mfaVerified: true,
            loginTime: Date.now(),
          })
        );
        sessionStorage.setItem('zarii_admin_last_activity', String(Date.now()));
        navigate(returnUrl, { replace: true });
      } else {
        setError(res.error || 'Invalid authentication code. Please try again.');
        // Reset inputs and focus first digit
        setDigits(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    // Only accept numeric input
    const clean = value.replace(/\D/g, '');
    if (!clean) {
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      return;
    }

    const char = clean[clean.length - 1]; // Take latest character
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    // Auto-advance to next input box
    if (index < 5 && char) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasteData) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasteData[i] || '';
    }
    setDigits(newDigits);

    const focusIndex = Math.min(pasteData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryCode.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      const res = authApi.verifyRecoveryCode(email, recoveryCode);
      if (res.success) {
        sessionStorage.setItem(
          'zarii_admin_session',
          JSON.stringify({
            role,
            email,
            name,
            mfaVerified: true,
            loginTime: Date.now(),
          })
        );
        sessionStorage.setItem('zarii_admin_last_activity', String(Date.now()));
        navigate(returnUrl, { replace: true });
      } else {
        setError(res.error || 'Invalid recovery code. Please try again.');
      }
    } catch {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminAuthLayout
      title="Two-factor authentication"
      subtitle={
        isRecoveryMode
          ? 'Enter one of your 8-character recovery backup codes.'
          : 'Enter the 6-digit code from your authenticator app.'
      }
    >
      {error && (
        <div
          role="alert"
          className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {!isRecoveryMode ? (
        /* 6-Digit Auto-Advancing Input Boxes */
        <div className="space-y-5">
          <div className="flex justify-between gap-1.5 sm:gap-2">
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
                maxLength={1}
                disabled={isLoading}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={idx === 0 ? handlePaste : undefined}
                className="w-11 h-13 sm:w-12 sm:h-14 text-center font-mono text-lg font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:border-transparent transition-all disabled:opacity-50"
              />
            ))}
          </div>

          <div className="flex items-center justify-center pt-2">
            {isLoading ? (
              <div className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin text-[#5BB78D]" />
                <span>Verifying code...</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setIsRecoveryMode(true);
                }}
                className="text-xs text-[#124F40] dark:text-[#5BB78D] hover:underline font-semibold transition-colors cursor-pointer"
              >
                Use a recovery code instead
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Recovery Code Fallback Form */
        <form onSubmit={handleRecoverySubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="recovery-code" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Emergency recovery code
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="recovery-code"
                type="text"
                required
                autoFocus
                value={recoveryCode}
                onChange={(e) => setRecoveryCode(e.target.value.toUpperCase())}
                placeholder="XXXX-XXXX"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-xs uppercase tracking-wider text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:border-transparent transition-all"
              />
            </div>
            <p className="text-2xs text-slate-500 dark:text-slate-400">
              Each recovery code can only be used once.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !recoveryCode.trim()}
            className="w-full py-2.5 px-4 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#5BB78D]" />
                <span>Verifying recovery code...</span>
              </>
            ) : (
              <>
                <span>Verify recovery code</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setIsRecoveryMode(false);
              }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Use authenticator app code instead
            </button>
          </div>
        </form>
      )}
    </AdminAuthLayout>
  );
}
