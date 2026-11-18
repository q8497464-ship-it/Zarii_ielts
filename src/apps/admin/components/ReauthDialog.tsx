import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle, Loader2, X } from 'lucide-react';
import { authApi } from '../../../shared/api';

interface ReauthDialogProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  actionLabel?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function ReauthDialog({
  isOpen,
  title = 'Re-authentication required',
  description = 'Please verify your administrator password before executing this sensitive operation.',
  actionLabel = 'Confirm & Proceed',
  onClose,
  onSuccess,
}: ReauthDialogProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      const res = await authApi.reauthenticate(password);
      if (res.success) {
        setPassword('');
        onSuccess();
        onClose();
      } else {
        setError(res.error || 'Incorrect password. Verification failed.');
      }
    } catch {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs select-none animate-zarii-fade">
      <div className="max-w-md w-full bg-white dark:bg-[#112019] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-900 dark:text-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#5BB78D]/15 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>

        {error && (
          <div role="alert" className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="reauth-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="reauth-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
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

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !password}
              className="flex-1 py-2 px-3 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#5BB78D]" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>{actionLabel}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
