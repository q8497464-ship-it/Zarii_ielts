import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { apiSupabase } from '../../../../shared/api';
import { AdminAuthLayout } from '../../AdminAuthLayout';

export function AdminForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Forgot password | Zarii';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);

    try {
      // Supabase password recovery
      await apiSupabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });
    } catch {
      // Swallow error for security
    } finally {
      setIsLoading(false);
      // Always show identical neutral success state to prevent account enumeration
      setIsSubmitted(true);
    }
  };

  return (
    <AdminAuthLayout
      title="Forgot password"
      subtitle="Enter your administrator email address to request password recovery."
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="forgot-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="forgot-email"
                type="email"
                required
                autoFocus
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@zarii.app"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full mt-2 py-2.5 px-4 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#5BB78D]" />
                <span>Sending instructions...</span>
              </>
            ) : (
              <>
                <span>Send reset instructions</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-[#124F40] dark:text-[#5BB78D] hover:underline font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to sign in
            </Link>
          </div>
        </form>
      ) : (
        /* Neutral Identical Confirmation (Never reveals if account exists) */
        <div className="space-y-5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Instructions Sent
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              If an administrative account is associated with <strong className="text-slate-800 dark:text-slate-200">{email}</strong>, you will receive password reset instructions shortly.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/admin/login"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl transition-all shadow-md gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to sign in
            </Link>
          </div>
        </div>
      )}
    </AdminAuthLayout>
  );
}
