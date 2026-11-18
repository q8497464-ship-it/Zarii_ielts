import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2, Clock } from 'lucide-react';
import { authApi } from '../../shared/api';
import { AdminAuthLayout } from './AdminAuthLayout';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);

  const isTimeout = searchParams.get('reason') === 'timeout';
  const returnUrl = (location.state as any)?.from?.pathname || '/admin';

  // Set page title
  useEffect(() => {
    document.title = 'Admin sign in | Zarii';
  }, []);

  // Check rate limit status
  useEffect(() => {
    const rateStatus = authApi.getLoginRateLimitStatus(email || 'default');
    if (rateStatus.isLocked) {
      setLockoutSeconds(rateStatus.remainingSeconds);
    }
  }, [email]);

  // Live countdown timer for lockout
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  const formatLockoutTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0 || isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      const result = await authApi.authenticateAdmin(email, password);

      if (result.success) {
        // Check 2FA requirement
        if (result.requiresMfa) {
          if (result.isEnrolledInMfa) {
            navigate('/admin/verify-2fa', {
              state: { email, returnUrl, role: result.role, name: result.user?.user_metadata?.full_name || 'Admin' },
              replace: true,
            });
            return;
          } else {
            // First-time 2FA enrollment required for admin
            navigate('/admin/setup-2fa', {
              state: { email, returnUrl, role: result.role, name: result.user?.user_metadata?.full_name || 'Admin' },
              replace: true,
            });
            return;
          }
        }

        // Direct login if 2FA not required
        sessionStorage.setItem(
          'zarii_admin_session',
          JSON.stringify({
            role: result.role || 'admin',
            email,
            name: result.user?.user_metadata?.full_name || 'Admin',
            loginTime: Date.now(),
          })
        );
        sessionStorage.setItem('zarii_admin_last_activity', String(Date.now()));
        navigate(returnUrl, { replace: true });
      } else {
        setError(result.error || 'Invalid credentials or no access');
        const status = authApi.getLoginRateLimitStatus(email);
        if (status.isLocked) {
          setLockoutSeconds(status.remainingSeconds);
        }
      }
    } catch {
      setError('Invalid credentials or no access');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminAuthLayout title="Admin sign in" subtitle="Use your administrator account">
      {/* 1. Timeout Notification */}
      {isTimeout && !error && (
        <div
          role="status"
          className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2"
        >
          <Clock className="w-4 h-4 shrink-0 text-amber-500" />
          <span>Your session timed out due to inactivity. Please sign in again.</span>
        </div>
      )}

      {/* 2. Rate Limit Lockout Alert */}
      {lockoutSeconds > 0 && (
        <div
          role="alert"
          className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
          <div>
            <div className="font-semibold">Sign-in temporarily locked</div>
            <div className="text-2xs opacity-90 mt-0.5">
              Too many failed attempts. Please wait{' '}
              <span className="font-mono font-bold">{formatLockoutTime(lockoutSeconds)}</span> before retrying.
            </div>
          </div>
        </div>
      )}

      {/* 3. Error Alert (Identical generic message for security) */}
      {error && lockoutSeconds === 0 && (
        <div
          role="alert"
          className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* 4. Login Form */}
      <form onSubmit={handleAdminLogin} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor="admin-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Email address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              id="admin-email"
              type="email"
              required
              autoFocus
              autoComplete="username"
              disabled={lockoutSeconds > 0}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@zarii.app"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="admin-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <Link
              to="/admin/forgot-password"
              className="text-2xs text-[#124F40] dark:text-[#5BB78D] hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              disabled={lockoutSeconds > 0}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:border-transparent transition-all disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={isLoading || lockoutSeconds > 0}
          className="w-full mt-2 py-2.5 px-4 bg-[#124F40] hover:bg-[#0E3D32] active:bg-[#0A2E25] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#5BB78D]" />
              <span>Verifying credentials...</span>
            </>
          ) : lockoutSeconds > 0 ? (
            <span>Locked ({formatLockoutTime(lockoutSeconds)})</span>
          ) : (
            <>
              <span>Sign in</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </AdminAuthLayout>
  );
}
