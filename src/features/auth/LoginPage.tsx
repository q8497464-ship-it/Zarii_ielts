import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { supabase, mapAuthErrorMessage, isMaintenanceMode, isLiveSupabaseConfigured } from '../../lib/supabase';
import { validateEmail, getLoginRateLimitState, recordFailedLoginAttempt, resetLoginRateLimit } from '../../lib/authValidators';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';
import { Loader } from '../../components/loader';
import { extractCandidateName } from '../../shared/utils/candidateUtils';

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawRedirect = searchParams.get('redirect');
  const redirectTarget = rawRedirect && rawRedirect !== '/' ? rawRedirect : '/app';
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { profile, updateProfile } = useAppStore();

  const [email, setEmail] = useState(() => {
    return localStorage.getItem('zarii_remember_email') || 'q8497464@gmail.com';
  });
  const [password, setPassword] = useState('Qamar@000');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Errors & States
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);

  const emailInputRef = useRef<HTMLInputElement>(null);

  // Page title and OAuth errors
  useEffect(() => {
    document.title = 'Log in | Zarii';

    try {
      const oauthErr = sessionStorage.getItem('zarii_oauth_error');
      if (oauthErr) {
        sessionStorage.removeItem('zarii_oauth_error');
        if (oauthErr.toLowerCase().includes('unsupported_provider') || oauthErr.toLowerCase().includes('not enabled')) {
          setServerError('Google Sign-In is not enabled yet in your Supabase project. Please enable Google provider in Supabase Dashboard (Authentication > Providers > Google).');
        } else {
          setServerError(`Google sign-in error: ${oauthErr}`);
        }
      }
    } catch {}
  }, []);

  // Check existing session: redirect if already authenticated
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const isGuest = localStorage.getItem('zarii_guest_mode') === 'true';
      if (data.session || isGuest) {
        navigate(redirectTarget, { replace: true });
      }
    });
  }, [navigate, redirectTarget]);

  // Rate limit cooldown countdown
  useEffect(() => {
    const checkRateLimit = () => {
      const state = getLoginRateLimitState();
      if (state.isLocked) {
        setRateLimitSeconds(state.remainingSeconds);
      } else {
        setRateLimitSeconds(0);
      }
    };

    checkRateLimit();
    const interval = setInterval(checkRateLimit, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else {
      setPasswordError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Check rate limit
    const rlState = getLoginRateLimitState();
    if (rlState.isLocked) {
      setServerError(`Too many failed login attempts. Please wait ${rlState.remainingSeconds} seconds.`);
      return;
    }

    // Check maintenance
    if (isMaintenanceMode()) {
      setServerError('Zarii is currently undergoing scheduled maintenance. Please check back shortly.');
      return;
    }

    const emailErr = validateEmail(email);
    const passErr = !password ? 'Password is required' : null;
    setEmailError(emailErr);
    setPasswordError(passErr);

    if (emailErr || passErr) {
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const mappedMsg = mapAuthErrorMessage(error);
        const newRl = recordFailedLoginAttempt();
        if (newRl.isLocked) {
          setRateLimitSeconds(newRl.remainingSeconds);
          setServerError(`Too many failed attempts. Try again in ${newRl.remainingSeconds} seconds.`);
        } else {
          setServerError(mappedMsg);
        }
        setIsLoading(false);
        return;
      }

      resetLoginRateLimit();

      // Extract candidate name from auth user and update profile
      const user = data.user;
      if (user) {
        const nameToSave = extractCandidateName(user);
        if (nameToSave) {
          localStorage.setItem('zarii_candidate_name', nameToSave);
          await updateProfile({
            displayName: nameToSave,
          });
        }
      }

      if (rememberMe) {
        localStorage.setItem('zarii_remember_email', email);
      } else {
        localStorage.removeItem('zarii_remember_email');
      }

      // Success: redirect to original destination
      setIsRedirecting(true);
      navigate(redirectTarget, { replace: true });
    } catch (err: any) {
      setServerError('Unable to connect to login service. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setServerError(null);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + redirectTarget,
        },
      });
      if (error) {
        setServerError(mapAuthErrorMessage(error));
        setIsLoading(false);
      } else if (!isLiveSupabaseConfigured) {
        const scholarName = localStorage.getItem('zarii_candidate_name') || 'Zarii Scholar';
        localStorage.setItem('zarii_candidate_name', scholarName);
        await updateProfile({ displayName: scholarName });
        setIsRedirecting(true);
        navigate(redirectTarget, { replace: true });
      }
    } catch {
      setServerError('Google sign-in encountered an issue. Please try email login.');
      setIsLoading(false);
    }
  };

  const handleContinueAsGuest = async () => {
    // Guest mode: continue to application with local Dexie storage
    localStorage.setItem('zarii_guest_mode', 'true');
    const existingName = extractCandidateName(null, profile?.displayName);
    const guestName = existingName || 'Guest Candidate';
    if (!profile || !profile.displayName || profile.displayName === 'IELTS Candidate') {
      await updateProfile({
        displayName: guestName,
        testType: 'academic',
        targetBand: 7.5,
        currentLevel: 'intermediate',
        dailyStudyMinutes: 30,
        onboardingCompleted: true,
      });
    }
    setIsRedirecting(true);
    navigate(redirectTarget, { replace: true });
  };

  return (
    <>
      {isRedirecting && (
        <Loader variant="overlay" message="Opening your study workspace..." />
      )}
      <AuthLayout activeScreen="login">
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="space-y-1.5 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#12211B] dark:text-[#E8F2EC]">
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B63] dark:text-[#9DB3A7]">
            Log in to continue your IELTS preparation
          </p>
        </div>

        {/* Global Server Error Banner */}
        {serverError && (
          <div
            role="alert"
            className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2.5 shadow-2xs animate-in fade-in"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed flex-1 font-medium">{serverError}</div>
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading || rateLimitSeconds > 0}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-[#24392F] bg-white dark:bg-[#112019] text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#172A21] hover:border-[#8ACFAE] dark:hover:border-[#5BB78D] transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:ring-offset-2 dark:focus:ring-offset-[#112019] disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-slate-200 dark:border-[#24392F]" />
          <span className="absolute bg-[#F7FAF8] dark:bg-[#0B1612] px-3 text-[11px] font-bold tracking-wider uppercase text-[#5B6B63] dark:text-[#9DB3A7]">
            or with email
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1 text-left">
            <label
              htmlFor="login-email"
              className="block text-xs font-semibold text-[#12211B] dark:text-[#E8F2EC]"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={emailInputRef}
                id="login-email"
                type="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                onBlur={handleEmailBlur}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? 'login-email-error' : undefined}
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
              <p id="login-email-error" role="alert" className="text-2xs text-rose-600 dark:text-rose-400 pt-0.5">
                {emailError}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1 text-left">
            <div className="flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="block text-xs font-semibold text-[#12211B] dark:text-[#E8F2EC]"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-2xs font-semibold text-[#1E7A62] dark:text-[#5BB78D] hover:underline focus:outline-none focus:ring-1 focus:ring-[#5BB78D] rounded"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError(null);
                }}
                onBlur={handlePasswordBlur}
                aria-invalid={!!passwordError}
                aria-describedby={passwordError ? 'login-password-error' : undefined}
                placeholder="••••••••"
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
            {passwordError && (
              <p id="login-password-error" role="alert" className="text-2xs text-rose-600 dark:text-rose-400 pt-0.5">
                {passwordError}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#124F40] dark:text-[#5BB78D] border-slate-300 dark:border-[#24392F] focus:ring-2 focus:ring-[#5BB78D] accent-[#124F40]"
              />
              <span className="text-xs text-[#5B6B63] dark:text-[#9DB3A7]">
                Remember me
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || rateLimitSeconds > 0}
            className="w-full py-2.5 px-4 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] active:bg-[#0A2E25] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:ring-offset-2 dark:focus:ring-offset-[#112019] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : rateLimitSeconds > 0 ? (
              <span>Locked ({rateLimitSeconds}s)</span>
            ) : (
              <>
                <span>Log in</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Continue Without Account (Guest Mode) */}
        <div className="pt-2 text-center border-t border-slate-200 dark:border-[#24392F] space-y-1">
          <button
            type="button"
            onClick={handleContinueAsGuest}
            className="text-xs font-semibold text-[#1E7A62] dark:text-[#5BB78D] hover:underline focus:outline-none focus:ring-1 focus:ring-[#5BB78D] rounded px-1.5 py-0.5 inline-block"
          >
            Continue without an account
          </button>
          <p className="text-[11px] text-[#5B6B63] dark:text-[#9DB3A7] leading-relaxed max-w-xs mx-auto">
            Progress is saved locally on this device. You can sync or register an account anytime.
          </p>
        </div>

        {/* Create Account Link */}
        <div className="text-center text-xs text-[#5B6B63] dark:text-[#9DB3A7] pt-1">
          <span>New to Zarii? </span>
          <Link
            to="/signup"
            className="font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline focus:outline-none focus:ring-1 focus:ring-[#5BB78D] rounded"
          >
            Create an account
          </Link>
        </div>
      </div>
    </AuthLayout>
  </>
  );
}
