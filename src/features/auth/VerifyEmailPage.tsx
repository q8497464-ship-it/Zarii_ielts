import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle, Edit2 } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { supabase, mapAuthErrorMessage } from '../../lib/supabase';
import { cn } from '../../lib/utils';

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get('email') || 'your email';

  const [cooldown, setCooldown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Verify Email | Zarii';
    // Add noindex meta tag
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

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;
    setIsResending(true);
    setResendError(null);
    setResendSuccess(false);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: emailParam,
      });

      if (error) {
        setResendError(mapAuthErrorMessage(error));
      } else {
        setResendSuccess(true);
        setCooldown(60);
      }
    } catch {
      setResendError('Unable to resend verification email right now.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout activeScreen="verify-email">
      <div className="space-y-6 text-center sm:text-left animate-in fade-in duration-300">
        {/* Email Badge Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#DDF2E7] dark:bg-[#172A21] text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center mx-auto sm:mx-0 shadow-2xs">
          <Mail className="w-7 h-7" />
        </div>

        {/* Headline & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#12211B] dark:text-[#E8F2EC]">
            Verify your email
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B63] dark:text-[#9DB3A7] leading-relaxed">
            We've sent a verification link to your email address:
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#172A21] border border-slate-200 dark:border-[#24392F] text-xs font-mono font-bold text-[#124F40] dark:text-[#5BB78D]">
            <span>{emailParam}</span>
          </div>
        </div>

        {/* Feedback Alerts */}
        {resendSuccess && (
          <div
            role="status"
            className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-200 flex items-start gap-2.5 shadow-2xs animate-in fade-in"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed font-medium">A new verification link has been sent to your inbox.</div>
          </div>
        )}

        {resendError && (
          <div
            role="alert"
            className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2.5 shadow-2xs animate-in fade-in"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed font-medium">{resendError}</div>
          </div>
        )}

        {/* Helpful Tips Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] text-xs text-[#5B6B63] dark:text-[#9DB3A7] space-y-2 text-left">
          <span className="font-bold text-[#12211B] dark:text-[#E8F2EC] block">Next steps:</span>
          <ol className="list-decimal list-inside space-y-1 text-2xs leading-relaxed">
            <li>Open the confirmation email from Zarii</li>
            <li>Click the verification button inside</li>
            <li>Return here or log in directly to begin your IELTS prep</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-1">
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || isResending}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-[#24392F] bg-white dark:bg-[#112019] text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#172A21] hover:border-[#8ACFAE] dark:hover:border-[#5BB78D] transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] disabled:opacity-50"
          >
            <RefreshCw className={cn('w-4 h-4', isResending && 'animate-spin')} />
            <span>
              {cooldown > 0 ? `Resend email in ${cooldown}s` : 'Resend verification email'}
            </span>
          </button>

          <div className="flex items-center justify-between text-xs text-[#5B6B63] dark:text-[#9DB3A7] pt-1">
            <Link
              to="/signup"
              className="inline-flex items-center gap-1 font-semibold text-[#1E7A62] dark:text-[#5BB78D] hover:underline focus:outline-none rounded"
            >
              <Edit2 className="w-3 h-3" />
              <span>Change email address</span>
            </Link>

            <Link
              to="/login"
              className="font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline focus:outline-none rounded"
            >
              Log in instead
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
