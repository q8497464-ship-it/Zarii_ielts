import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, User, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { evaluateAdminPasswordStrength } from '../../../../lib/authValidators';
import { AdminAuthLayout } from '../../AdminAuthLayout';

export function AdminAcceptInvitePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token') || '';
  const emailParam = searchParams.get('email') || 'invited.admin@zarii.app';

  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Accept admin invitation | Zarii';
  }, []);

  const strength = evaluateAdminPasswordStrength(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleAcceptInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please provide your full legal or professional name.');
      return;
    }

    if (!strength.isValid) {
      setError(strength.errors[0] || 'Password does not meet administrator security standards.');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // In Supabase Auth, verifyOtp or updateUser sets the accepted password
      // Navigate to mandatory 2FA enrollment immediately
      navigate('/admin/setup-2fa', {
        state: {
          email: emailParam,
          name: fullName.trim(),
          role: 'admin',
          returnUrl: '/admin',
        },
        replace: true,
      });
    } catch {
      setError('Unable to activate invitation. The invite link may have expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminAuthLayout
      title="Accept admin invitation"
      subtitle="Complete your profile to activate your administrator credentials."
    >
      <form onSubmit={handleAcceptInvite} className="space-y-4">
        {error && (
          <div
            role="alert"
            className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Read-Only Invited Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Invited Email (Read-only)
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="email"
              disabled
              value={emailParam}
              className="w-full pl-9 pr-24 py-2.5 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-300 select-all cursor-not-allowed"
            />
            <div className="absolute right-2 top-2.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-2xs font-semibold bg-[#5BB78D]/20 text-[#124F40] dark:text-[#5BB78D]">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="admin-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              id="admin-name"
              type="text"
              required
              autoFocus
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Dr. Alex Mercer"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label htmlFor="invite-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Create Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              id="invite-password"
              type={showPassword ? 'text' : 'password'}
              required
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

        {/* Strength Meter */}
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
            <p className="text-2xs text-slate-500 dark:text-slate-400">
              Must be at least 12 characters with uppercase, lowercase, numbers, and symbols.
            </p>
          </div>
        )}

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="confirm-invite-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              id="confirm-invite-password"
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
          disabled={isLoading || !fullName.trim() || !strength.isValid || !passwordsMatch}
          className="w-full mt-2 py-2.5 px-4 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#5BB78D]" />
              <span>Activating credentials...</span>
            </>
          ) : (
            <>
              <span>Activate account & proceed to 2FA</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </AdminAuthLayout>
  );
}
