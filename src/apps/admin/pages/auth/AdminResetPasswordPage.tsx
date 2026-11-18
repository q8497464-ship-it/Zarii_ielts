import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { apiSupabase } from '../../../../shared/api';
import { evaluateAdminPasswordStrength } from '../../../../lib/authValidators';
import { AdminAuthLayout } from '../../AdminAuthLayout';

export function AdminResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Reset password | Zarii';
  }, []);

  const strength = evaluateAdminPasswordStrength(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!strength.isValid) {
      setError(strength.errors[0] || 'Password does not meet administrator security standards.');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match. Please verify both fields.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await apiSupabase.auth.updateUser({ password });
      if (res.error) {
        setError(res.error.message || 'Unable to update password. Session may have expired.');
      } else {
        setIsSuccess(true);
      }
    } catch {
      setError('Failed to update password. Please request a new reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminAuthLayout
      title="Set new password"
      subtitle="Choose a secure password for your administrator account (minimum 12 characters)."
    >
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              role="alert"
              className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* New Password */}
          <div className="space-y-1.5">
            <label htmlFor="new-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Password Strength Meter */}
          {password.length > 0 && (
            <div className="space-y-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center text-2xs">
                <span className="text-slate-500 dark:text-slate-400">Password strength:</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">{strength.label}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                {[0, 1, 2, 3].map((stepIdx) => (
                  <div
                    key={stepIdx}
                    className={`h-full flex-1 rounded-full transition-colors ${
                      stepIdx < strength.score ? strength.color : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
              <ul className="text-2xs space-y-0.5 text-slate-500 dark:text-slate-400">
                <li className={strength.requirements.hasMinLength ? 'text-[#124F40] dark:text-[#5BB78D]' : ''}>
                  • At least 12 characters
                </li>
                <li
                  className={
                    strength.requirements.hasLowercase && strength.requirements.hasUppercase
                      ? 'text-[#124F40] dark:text-[#5BB78D]'
                      : ''
                  }
                >
                  • Uppercase & lowercase letters
                </li>
                <li
                  className={
                    strength.requirements.hasNumber && strength.requirements.hasSpecial
                      ? 'text-[#124F40] dark:text-[#5BB78D]'
                      : ''
                  }
                >
                  • Numbers & special characters
                </li>
              </ul>
            </div>
          )}

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label htmlFor="confirm-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="confirm-password"
                type={showConfirm ? 'text' : 'password'}
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="text-2xs text-rose-500">Passwords do not match.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !strength.isValid || !passwordsMatch}
            className="w-full mt-2 py-2.5 px-4 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#5BB78D]" />
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
      ) : (
        /* Success State */
        <div className="space-y-5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Password Updated Successfully
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your administrator credentials have been securely updated. You may now sign in.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/admin/login"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl transition-all shadow-md gap-2"
            >
              <span>Sign in to Admin Console</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </AdminAuthLayout>
  );
}
