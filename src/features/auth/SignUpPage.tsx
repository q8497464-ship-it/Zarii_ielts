import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, Loader2, Check, ArrowRight, ShieldCheck, Database, Calendar } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { supabase, mapAuthErrorMessage, isSignupEnabled, isMaintenanceMode, isLiveSupabaseConfigured } from '../../lib/supabase';
import { validateEmail, validateName, evaluatePasswordStrength } from '../../lib/authValidators';
import { db } from '../../lib/db';
import { useAppStore } from '../../store/useAppStore';
import { Modal } from '../../components/ui/Modal';
import { cn } from '../../lib/utils';
import type { TestType } from '../../types';

export function SignUpPage() {
  const navigate = useNavigate();
  const { updateProfile } = useAppStore();

  // Step management: 1 = Credentials, 2 = Optional Study Goals
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 2 Fields (Study Goals)
  const [testType, setTestType] = useState<TestType>('academic');
  const [targetBand, setTargetBand] = useState<number>(7.5);
  const [examDate, setExamDate] = useState<string>('');

  // Local progress detected in Dexie
  const [localAttemptsCount, setLocalAttemptsCount] = useState<number>(0);
  const [importLocalProgress, setImportLocalProgress] = useState(true);

  // Validation Errors
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  // Policy Modal
  const [policyModal, setPolicyModal] = useState<'terms' | 'privacy' | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const strength = evaluatePasswordStrength(password);

  useEffect(() => {
    document.title = 'Sign up | Zarii';

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

  // Check if user is already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const isGuest = localStorage.getItem('zarii_guest_mode') === 'true';
      if (data.session || isGuest) {
        navigate('/app', { replace: true });
      }
    });
  }, [navigate]);

  // Check for existing Dexie attempts on this device to offer import
  useEffect(() => {
    db.attempts.count().then((count) => {
      if (count > 0) {
        setLocalAttemptsCount(count);
      }
    }).catch(() => {});
  }, []);

  const handleNameBlur = () => {
    setNameError(validateName(fullName));
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else if (!strength.hasLetter || !strength.hasNumber) {
      setPasswordError('Password must include both letters and numbers');
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError(null);
    }
  };

  const handleSubmitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (isMaintenanceMode()) {
      setServerError('Zarii is currently undergoing scheduled maintenance. Please try again shortly.');
      return;
    }

    if (!isSignupEnabled()) {
      setServerError('Student registrations are temporarily paused. Please check back later.');
      return;
    }

    const nErr = validateName(fullName);
    const eErr = validateEmail(email);
    let pErr: string | null = null;
    if (!password) {
      pErr = 'Password is required';
    } else if (password.length < 8) {
      pErr = 'Password must be at least 8 characters';
    } else if (!strength.hasLetter || !strength.hasNumber) {
      pErr = 'Password must include both letters and numbers';
    }

    const cErr = confirmPassword !== password ? 'Passwords do not match' : null;
    const tErr = !agreeTerms ? 'You must accept the Terms and Privacy Policy to continue' : null;

    setNameError(nErr);
    setEmailError(eErr);
    setPasswordError(pErr);
    setConfirmPasswordError(cErr);
    setTermsError(tErr);

    if (nErr || eErr || pErr || cErr || tErr) {
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        setServerError(mapAuthErrorMessage(error));
        setIsLoading(false);
        return;
      }

      // Update local profile with display name
      localStorage.setItem('zarii_candidate_name', fullName.trim());
      await updateProfile({
        displayName: fullName.trim(),
        onboardingCompleted: true,
      });

      setIsLoading(false);

      // Advance to optional study goal customization (Step 2)
      setCurrentStep(2);
    } catch (err: any) {
      setServerError('Unable to create account right now. Please try again.');
      setIsLoading(false);
    }
  };

  const handleFinishStep2 = async () => {
    setIsLoading(true);
    try {
      await updateProfile({
        testType,
        targetBand,
        examDate: examDate || '',
        isExamBooked: Boolean(examDate),
        onboardingCompleted: true,
      });

      navigate('/app', { replace: true });
    } catch {
      navigate('/app', { replace: true });
    }
  };

  const handleGoogleSignUp = async () => {
    setServerError(null);
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/app',
        },
      });
      if (error) {
        setServerError(mapAuthErrorMessage(error));
        setIsLoading(false);
      } else if (!isLiveSupabaseConfigured) {
        const scholarName = localStorage.getItem('zarii_candidate_name') || 'Zarii Scholar';
        localStorage.setItem('zarii_candidate_name', scholarName);
        await updateProfile({ displayName: scholarName });
        navigate('/app', { replace: true });
      }
    } catch {
      setServerError('Google signup encountered an issue. Please try email registration.');
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout activeScreen="signup">
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Step Indicator Header */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className={cn('w-2 h-2 rounded-full transition-all', currentStep === 1 ? 'bg-[#124F40] dark:bg-[#5BB78D] w-6' : 'bg-slate-300 dark:bg-slate-700')} />
            <span className={cn('w-2 h-2 rounded-full transition-all', currentStep === 2 ? 'bg-[#124F40] dark:bg-[#5BB78D] w-6' : 'bg-slate-300 dark:bg-slate-700')} />
            <span className="text-2xs font-bold uppercase tracking-wider text-[#5B6B63] dark:text-[#9DB3A7] ml-1">
              Step {currentStep} of 2
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#12211B] dark:text-[#E8F2EC]">
            {currentStep === 1 ? 'Create your free account' : 'Customize your study goal'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6B63] dark:text-[#9DB3A7]">
            {currentStep === 1
              ? 'Start preparing in less than a minute. No credit card required.'
              : 'Set your target score to personalize your study recommendations.'}
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

        {/* Existing Guest Progress Offer Banner */}
        {localAttemptsCount > 0 && currentStep === 1 && (
          <div className="p-3.5 rounded-xl bg-[#F1FAF5] dark:bg-[#172A21] border border-[#B6E3CD] dark:border-[#24392F] text-xs text-[#124F40] dark:text-[#E8F2EC] flex items-start gap-3 shadow-2xs">
            <Database className="w-4 h-4 text-[#1E7A62] dark:text-[#5BB78D] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Previous Practice Found</span>
              <p className="text-2xs leading-relaxed text-[#5B6B63] dark:text-[#9DB3A7]">
                We found {localAttemptsCount} exam practice attempt{localAttemptsCount > 1 ? 's' : ''} on this device. They will be linked to your new account automatically.
              </p>
            </div>
          </div>
        )}

        {/* STEP 1: ACCOUNT CREDENTIALS */}
        {currentStep === 1 ? (
          <div className="space-y-4">
            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
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
              <span>Sign up with Google</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-slate-200 dark:border-[#24392F]" />
              <span className="absolute bg-[#F7FAF8] dark:bg-[#0B1612] px-3 text-[11px] font-bold tracking-wider uppercase text-[#5B6B63] dark:text-[#9DB3A7]">
                or with email
              </span>
            </div>

            <form onSubmit={handleSubmitStep1} noValidate className="space-y-3.5">
              {/* Full Name */}
              <div className="space-y-1 text-left">
                <label
                  htmlFor="signup-name"
                  className="block text-xs font-semibold text-[#12211B] dark:text-[#E8F2EC]"
                >
                  Full name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    ref={nameInputRef}
                    id="signup-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (nameError) setNameError(null);
                    }}
                    onBlur={handleNameBlur}
                    aria-invalid={!!nameError}
                    aria-describedby={nameError ? 'signup-name-error' : undefined}
                    placeholder="Candidate Name"
                    disabled={isLoading}
                    className={cn(
                      'w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border bg-white dark:bg-[#112019] text-[#12211B] dark:text-[#E8F2EC] placeholder-slate-400 transition-all outline-none',
                      nameError
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-[#24392F] focus:border-[#1E7A62] focus:ring-2 focus:ring-[#8ACFAE]'
                    )}
                  />
                </div>
                {nameError && (
                  <p id="signup-name-error" role="alert" className="text-2xs text-rose-600 dark:text-rose-400 pt-0.5">
                    {nameError}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1 text-left">
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-semibold text-[#12211B] dark:text-[#E8F2EC]"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    onBlur={handleEmailBlur}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'signup-email-error' : undefined}
                    placeholder="name@example.com"
                    disabled={isLoading}
                    className={cn(
                      'w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border bg-white dark:bg-[#112019] text-[#12211B] dark:text-[#E8F2EC] placeholder-slate-400 transition-all outline-none',
                      emailError
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-[#24392F] focus:border-[#1E7A62] focus:ring-2 focus:ring-[#8ACFAE]'
                    )}
                  />
                </div>
                {emailError && (
                  <p id="signup-email-error" role="alert" className="text-2xs text-rose-600 dark:text-rose-400 pt-0.5">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password with Live Strength Meter */}
              <div className="space-y-1 text-left">
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-semibold text-[#12211B] dark:text-[#E8F2EC]"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError(null);
                    }}
                    onBlur={handlePasswordBlur}
                    aria-invalid={!!passwordError}
                    aria-describedby={passwordError ? 'signup-password-error' : undefined}
                    placeholder="Min. 8 characters"
                    disabled={isLoading}
                    className={cn(
                      'w-full pl-10 pr-10 py-2 text-xs sm:text-sm rounded-xl border bg-white dark:bg-[#112019] text-[#12211B] dark:text-[#E8F2EC] placeholder-slate-400 transition-all outline-none',
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

                {/* Password Strength Progress Bar (4 segments) */}
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
                  <p id="signup-password-error" role="alert" className="text-2xs text-rose-600 dark:text-rose-400 pt-0.5">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1 text-left">
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-xs font-semibold text-[#12211B] dark:text-[#E8F2EC]"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirm-password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (confirmPasswordError) setConfirmPasswordError(null);
                    }}
                    onBlur={handleConfirmPasswordBlur}
                    aria-invalid={!!confirmPasswordError}
                    aria-describedby={confirmPasswordError ? 'signup-confirm-error' : undefined}
                    placeholder="Re-enter password"
                    disabled={isLoading}
                    className={cn(
                      'w-full pl-10 pr-10 py-2 text-xs sm:text-sm rounded-xl border bg-white dark:bg-[#112019] text-[#12211B] dark:text-[#E8F2EC] placeholder-slate-400 transition-all outline-none',
                      confirmPasswordError
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
                {confirmPasswordError && (
                  <p id="signup-confirm-error" role="alert" className="text-2xs text-rose-600 dark:text-rose-400 pt-0.5">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              {/* Agree to Terms Checkbox */}
              <div className="space-y-1 pt-0.5 text-left">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (termsError) setTermsError(null);
                    }}
                    className="w-4 h-4 mt-0.5 rounded text-[#124F40] dark:text-[#5BB78D] border-slate-300 dark:border-[#24392F] focus:ring-2 focus:ring-[#5BB78D] accent-[#124F40]"
                  />
                  <span className="text-2xs sm:text-xs text-[#5B6B63] dark:text-[#9DB3A7] leading-relaxed">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPolicyModal('terms');
                      }}
                      className="font-bold text-[#1E7A62] dark:text-[#5BB78D] hover:underline focus:outline-none rounded"
                    >
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPolicyModal('privacy');
                      }}
                      className="font-bold text-[#1E7A62] dark:text-[#5BB78D] hover:underline focus:outline-none rounded"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>
                {termsError && (
                  <p role="alert" className="text-2xs text-rose-600 dark:text-rose-400 pl-6">
                    {termsError}
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
                    <span>Creating your account...</span>
                  </>
                ) : (
                  <>
                    <span>Create account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* STEP 2: OPTIONAL STUDY GOALS */
          <div className="space-y-5 animate-in fade-in slide-in-from-right-2 duration-300 text-left">
            {/* Exam Format Option */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#12211B] dark:text-[#E8F2EC]">
                IELTS Test Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTestType('academic')}
                  className={cn(
                    'p-3 rounded-xl border text-xs font-semibold text-left transition-all',
                    testType === 'academic'
                      ? 'border-[#124F40] dark:border-[#5BB78D] bg-[#F1FAF5] dark:bg-[#172A21] text-[#124F40] dark:text-[#5BB78D] ring-1 ring-[#5BB78D]'
                      : 'border-slate-200 dark:border-[#24392F] bg-white dark:bg-[#112019] text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  )}
                >
                  <span className="block font-bold">Academic</span>
                  <span className="text-[10px] font-normal text-[#5B6B63] dark:text-[#9DB3A7]">For university / professional registration</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTestType('general')}
                  className={cn(
                    'p-3 rounded-xl border text-xs font-semibold text-left transition-all',
                    testType === 'general'
                      ? 'border-[#124F40] dark:border-[#5BB78D] bg-[#F1FAF5] dark:bg-[#172A21] text-[#124F40] dark:text-[#5BB78D] ring-1 ring-[#5BB78D]'
                      : 'border-slate-200 dark:border-[#24392F] bg-white dark:bg-[#112019] text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  )}
                >
                  <span className="block font-bold">General Training</span>
                  <span className="text-[10px] font-normal text-[#5B6B63] dark:text-[#9DB3A7]">For immigration & secondary education</span>
                </button>
              </div>
            </div>

            {/* Target Band Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="goal-target-band" className="block text-xs font-semibold text-[#12211B] dark:text-[#E8F2EC]">
                  Target Overall Band Score
                </label>
                <span className="text-sm font-black text-[#124F40] dark:text-[#5BB78D]">
                  Band {targetBand.toFixed(1)}
                </span>
              </div>
              <input
                id="goal-target-band"
                type="range"
                min="5.0"
                max="9.0"
                step="0.5"
                value={targetBand}
                onChange={(e) => setTargetBand(parseFloat(e.target.value))}
                className="w-full accent-[#124F40] dark:accent-[#5BB78D] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Band 5.0</span>
                <span>Band 7.0</span>
                <span>Band 9.0</span>
              </div>
            </div>

            {/* Exam Date */}
            <div className="space-y-1">
              <label htmlFor="goal-exam-date" className="block text-xs font-semibold text-[#12211B] dark:text-[#E8F2EC]">
                Target Exam Date (Optional)
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="goal-exam-date"
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-[#24392F] bg-white dark:bg-[#112019] text-[#12211B] dark:text-[#E8F2EC] outline-none focus:border-[#1E7A62] focus:ring-2 focus:ring-[#8ACFAE]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={handleFinishStep2}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Start Preparing</span>}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/app', { replace: true })}
                className="w-full py-2 text-xs font-semibold text-[#5B6B63] dark:text-[#9DB3A7] hover:text-[#12211B] dark:hover:text-white transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Existing Account Link */}
        <div className="text-center text-xs text-[#5B6B63] dark:text-[#9DB3A7] pt-1 border-t border-slate-200 dark:border-[#24392F]">
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="font-bold text-[#124F40] dark:text-[#5BB78D] hover:underline focus:outline-none focus:ring-1 focus:ring-[#5BB78D] rounded"
          >
            Log in
          </Link>
        </div>
      </div>

      {/* Terms & Privacy Modal */}
      <Modal
        isOpen={policyModal !== null}
        onClose={() => setPolicyModal(null)}
        title={policyModal === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
      >
        <div className="space-y-4 text-xs text-[#12211B] dark:text-[#E8F2EC] max-h-[60vh] overflow-y-auto pr-1 leading-relaxed">
          {policyModal === 'terms' ? (
            <>
              <p>
                Welcome to Zarii IELTS Preparation. By accessing or using our platform, you agree to be bound by these terms.
              </p>
              <h4 className="font-bold text-sm text-[#124F40] dark:text-[#5BB78D]">1. Free Educational Service</h4>
              <p>
                Zarii is provided free of charge for non-commercial educational preparation. Content and scores provided are estimates designed to assist your study and do not constitute official IELTS certificates.
              </p>
              <h4 className="font-bold text-sm text-[#124F40] dark:text-[#5BB78D]">2. Fair Use</h4>
              <p>
                You agree not to scrape, reverse engineer, or exploit practice materials for automated re-distribution.
              </p>
            </>
          ) : (
            <>
              <p>
                Your privacy is paramount. Zarii does not sell or share personal student information with advertisers.
              </p>
              <h4 className="font-bold text-sm text-[#124F40] dark:text-[#5BB78D]">1. Data Collected</h4>
              <p>
                We store account credentials, test answers, scores, and practice records to generate your study plan and mistake logs.
              </p>
              <h4 className="font-bold text-sm text-[#124F40] dark:text-[#5BB78D]">2. Local Mode Security</h4>
              <p>
                When using guest mode, your test attempts and notes are stored strictly inside your local browser via IndexedDB.
              </p>
            </>
          )}
        </div>
      </Modal>
    </AuthLayout>
  );
}
