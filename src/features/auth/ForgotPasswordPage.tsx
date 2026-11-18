import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { supabase, mapAuthErrorMessage } from '../../lib/supabase';
import { validateEmail } from '../../lib/authValidators';
import { cn } from '../../lib/utils';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Forgot Password | Zarii';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const err = validateEmail(email);
    setEmailError(err);
    if (err) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setServerError(mapAuthErrorMessage(error));
        setIsLoading(false);
        return;
      }

      // Always show success state for privacy (no user enumeration)
      setIsSubmitted(true);
      setIsLoading(false);
    } catch {
      setIsSubmitted(true);
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout activeScreen="forgot-password">
      <div className="space-y-6 animate-in fade-in duration-300">
        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="space-y-1.5 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#12211B] dark:text-[#E8F2EC]">
                Forgot password?
              </h1>
              <p className="text-xs sm:text-sm text-[#5B6B63] dark:text-[#9DB3A7]">
                Enter your email address and we'll send you a link to reset your password.
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
              <div className="space-y-1 text-left">
                <label
                  htmlFor="forgot-email"
                  className="block text-xs font-semibold text-[#12211B] dark:text-[#E8F2EC]"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="forgot-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'forgot-email-error' : undefined}
                    placeholder="name@example.com"
                    disabled={isLoading}
                    className={cn(
                      'w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-white dark:bg-[#112019] text-[#12211B] dark:text-[#E8F2EC] placeholder-slate-400 transition-all outline-none',
                      emailError
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-[#24392F] focus:border-[#1E7A62] focus:ring-2 focus:ring-[#8ACFAE]'
                    )}
                  />
                </div>
                {emailError && (
                  <p id="forgot-email-error" role="alert" className="text-2xs text-rose-600 dark:text-rose-400 pt-0.5">
                    {emailError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] active:bg-[#0A2E25] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:ring-offset-2 dark:focus:ring-offset-[#112019] disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending recovery email...</span>
                  </>
                ) : (
                  <>
                    <span>Send reset link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success Confirmation View */
          <div className="space-y-5 text-center sm:text-left animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#DDF2E7] dark:bg-[#172A21] text-[#1E9E63] dark:text-[#5BB78D] flex items-center justify-center mx-auto sm:mx-0 shadow-2xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h1 className="text-2xl font-extrabold text-[#12211B] dark:text-[#E8F2EC]">
                Check your inbox
              </h1>
              <p className="text-xs sm:text-sm text-[#5B6B63] dark:text-[#9DB3A7] leading-relaxed">
                If an account exists for <strong className="text-[#12211B] dark:text-white font-mono">{email}</strong>, we've sent password reset instructions.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] text-xs text-[#5B6B63] dark:text-[#9DB3A7] space-y-1 text-left">
              <span className="font-semibold block text-[#12211B] dark:text-[#E8F2EC]">Didn't receive an email?</span>
              <ul className="list-disc list-inside space-y-0.5 text-2xs">
                <li>Check your spam or junk folder</li>
                <li>Make sure you entered the correct email address</li>
                <li>Wait up to 2 minutes for delivery</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-[#24392F] bg-white dark:bg-[#112019] text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#172A21] transition-all"
            >
              Try another email
            </button>
          </div>
        )}

        {/* Back to Login Link */}
        <div className="text-center text-xs text-[#5B6B63] dark:text-[#9DB3A7] pt-2 border-t border-slate-200 dark:border-[#24392F]">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline focus:outline-none focus:ring-1 focus:ring-[#5BB78D] rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to log in</span>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
