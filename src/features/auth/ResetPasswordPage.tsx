import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { supabase, mapAuthErrorMessage } from '../../lib/supabase';
import { evaluatePasswordStrength } from '../../lib/authValidators';
import { cn } from '../../lib/utils';

export function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const strength = evaluatePasswordStrength(password);

  useEffect(() => {
    document.title = 'Reset Password | Zarii';
    // Add noindex meta tag for password reset screen
    let metaTag = document.querySelector('meta[name="robots"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'robots');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', 'noindex, nofollow');

    return () => {
      metaTag?.setAttribute('content', 'index, follow');
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    let pErr: string | null = null;
    if (!password) {
      pErr = 'New password is required';
    } else if (password.length < 8) {
      pErr = 'Password must be at least 8 characters';
    } else if (!strength.hasLetter || !strength.hasNumber) {
      pErr = 'Password must include both letters and numbers';
    }

    const cErr = confirmPassword !== password ? 'Passwords do not match' : null;

    setPasswordError(pErr);
    setConfirmError(cErr);

    if (pErr || cErr) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setServerError(mapAuthErrorMessage(error));
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setIsLoading(false);
    } catch {
      setServerError('Unable to update password. Your reset link may have expired.');
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout activeScreen="reset-password">
      <div className="space-y-6 animate-in fade-in duration-300">
        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="space-y-1.5 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#12211B] dark:text-[#E8F2EC]">
                Set new password
              </h1>
              <p className="text-xs sm:text-sm text-[#5B6B63] dark:text-[#9DB3A7]">
                Choose a strong password with at least 8 characters.
              </p>
            </div>

            {/* Error Banner */}
            {serverError && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2.5 shadow-2xs animate-in fade-in"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed flex-1 font-medium">{serverError}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* New Password Field */}
              <div className="space-y-1 text-left">
                <label
                  htmlFor="reset-password"
                  className="block text-xs font-semibold text-[#12211B] dark:text-[#E8F2EC]"
                >
                  New password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="reset-password"
                    type={showPassword ? 'text' : 'password'}
                    name="new-password"
                    autoComplete="new-password"
                    autoFocus
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError(null);
                    }}
                    aria-invalid={!!passwordError}
                    aria-describedby={passwordError ? 'reset-password-error' : undefined}
                    placeholder="Min. 8 characters"
                    disabled={isLoading}
                    className={cn(
                      'w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border bg-white dark:bg-[#112019] text-[#12211B] dark:text-[#E8F2EC] placeholder-slate-400 transition-all outline-none',
                      passwordError
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-[#24392F] focus:border-[#1E7A62] focus:ring-2 focus:ring-[#8ACFAE]'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5BB78D]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Strength Meter */}
                {password.length > 0 && (
                  <div className="pt-1 space-y-1">
                    <div className="grid grid-cols-4 gap-1 h-1">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={cn(
                            'rounded-full transition-all duration-300',
                            strength.score >= step ? strength.color : 'bg-slate-200 dark:bg-slate-700'
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#5B6B63] dark:text-[#9DB3A7]">
                      <span>Strength: <strong className="font-semibold">{strength.label}</strong></span>
                      <span className="flex items-center gap-1.5">
                        <span className={cn(strength.hasMinLength ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400')}>
                          8+ chars
                        </span>
                        •
                        <span className={cn(strength.hasLetter && strength.hasNumber ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400')}>
                          letters & numbers
                        </span>
                      </span>
                    </div>
                  </div>
                )}

                {passwordError && (
                  <p id="reset-password-error" role="alert" className="text-2xs text-rose-600 dark:text-rose-400 pt-0.5">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1 text-left">
                <label
                  htmlFor="reset-confirm-password"
                  className="block text-xs font-semibold text-[#12211B] dark:text-[#E8F2EC]"
                >
                  Confirm new password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="reset-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirm-password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (confirmError) setConfirmError(null);
                    }}
                    aria-invalid={!!confirmError}
                    aria-describedby={confirmError ? 'reset-confirm-error' : undefined}
                    placeholder="Re-enter new password"
                    disabled={isLoading}
                    className={cn(
                      'w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border bg-white dark:bg-[#112019] text-[#12211B] dark:text-[#E8F2EC] placeholder-slate-400 transition-all outline-none',
                      confirmError
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-[#24392F] focus:border-[#1E7A62] focus:ring-2 focus:ring-[#8ACFAE]'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5BB78D]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmError && (
                  <p id="reset-confirm-error" role="alert" className="text-2xs text-rose-600 dark:text-rose-400 pt-0.5">
                    {confirmError}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] active:bg-[#0A2E25] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:ring-offset-2 dark:focus:ring-offset-[#112019] disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating password...</span>
                  </>
                ) : (
                  <>
                    <span>Update password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="space-y-5 text-center sm:text-left animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#DDF2E7] dark:bg-[#172A21] text-[#1E9E63] dark:text-[#5BB78D] flex items-center justify-center mx-auto sm:mx-0 shadow-2xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h1 className="text-2xl font-extrabold text-[#12211B] dark:text-[#E8F2EC]">
                Password reset complete
              </h1>
              <p className="text-xs sm:text-sm text-[#5B6B63] dark:text-[#9DB3A7] leading-relaxed">
                Your password has been securely updated. You can now log in with your new credentials.
              </p>
            </div>

            <Link
              to="/login"
              className="w-full py-2.5 px-4 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
            >
              <span>Continue to Log in</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
