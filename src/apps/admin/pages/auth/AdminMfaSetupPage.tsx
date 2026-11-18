import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QrCode, Copy, Check, Download, ShieldCheck, ArrowRight, AlertCircle, Loader2, Key } from 'lucide-react';
import { authApi } from '../../../../shared/api';
import { formatSecretKey } from '../../../../shared/utils/mfaUtils';
import { AdminAuthLayout } from '../../AdminAuthLayout';

export function AdminMfaSetupPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state as any) || {};
  const email = state.email || 'admin@zarii.app';
  const role = state.role || 'admin';
  const name = state.name || 'Admin';
  const returnUrl = state.returnUrl || '/admin';

  const [step, setStep] = useState<'qr' | 'codes'>('qr');
  const [factorData, setFactorData] = useState<{
    factorId: string;
    secret: string;
    uri: string;
    qrSvg: string;
  } | null>(null);

  const [confirmationCode, setConfirmationCode] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [hasSavedCodes, setHasSavedCodes] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCodes, setCopiedCodes] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Set up two-factor authentication | Zarii';
    // Generate TOTP enrollment data
    const factor = authApi.enrollTotp(email);
    setFactorData(factor);
  }, [email]);

  const handleCopySecret = async () => {
    if (!factorData?.secret) return;
    try {
      await navigator.clipboard.writeText(factorData.secret);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } catch {}
  };

  const handleCopyCodes = async () => {
    if (recoveryCodes.length === 0) return;
    try {
      await navigator.clipboard.writeText(recoveryCodes.join('\n'));
      setCopiedCodes(true);
      setTimeout(() => setCopiedCodes(false), 2000);
    } catch {}
  };

  const handleDownloadCodes = () => {
    if (recoveryCodes.length === 0) return;
    const content = [
      '# ZARII IELTS - EMERGENCY RECOVERY CODES',
      `# Account: ${email}`,
      `# Generated: ${new Date().toISOString()}`,
      '# Each recovery code can only be used ONCE if you lose access to your authenticator app.',
      '',
      ...recoveryCodes.map((c, i) => `${i + 1}. ${c}`),
      '',
      'Store this file in a secure password manager or encrypted drive.',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zarii-admin-recovery-codes-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleVerifySetup = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = authApi.verifyTotpSetup(email, confirmationCode);
      if (res.success) {
        setRecoveryCodes(res.recoveryCodes);
        setStep('codes');
      } else {
        setError(res.error || 'Invalid 6-digit confirmation code. Please try again.');
      }
    } catch {
      setError('Failed to verify authenticator code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinishSetup = () => {
    if (!hasSavedCodes) return;

    // Establish verified session
    sessionStorage.setItem(
      'zarii_admin_session',
      JSON.stringify({
        role,
        email,
        name,
        mfaVerified: true,
        loginTime: Date.now(),
      })
    );
    sessionStorage.setItem('zarii_admin_last_activity', String(Date.now()));
    navigate(returnUrl, { replace: true });
  };

  return (
    <AdminAuthLayout
      title={step === 'qr' ? 'Set up two-factor authentication' : 'Save recovery codes'}
      subtitle={
        step === 'qr'
          ? 'Scan the QR code with an authenticator app (e.g. Google Authenticator, 1Password, Authy).'
          : 'Keep these one-time codes in a safe place. You will need them if you lose your phone.'
      }
    >
      {error && (
        <div
          role="alert"
          className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {step === 'qr' ? (
        <div className="space-y-4">
          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {factorData?.qrSvg ? (
              <div
                className="w-44 h-44 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: factorData.qrSvg }}
              />
            ) : (
              <div className="w-44 h-44 flex items-center justify-center text-slate-400">
                <QrCode className="w-12 h-12 animate-pulse" />
              </div>
            )}
            <span className="text-2xs text-slate-500 dark:text-slate-400 mt-2 font-mono">
              Scan with your authenticator
            </span>
          </div>

          {/* Manual Entry Key */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-2xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Or enter key manually:</span>
              <button
                type="button"
                onClick={handleCopySecret}
                className="inline-flex items-center gap-1 text-[#124F40] dark:text-[#5BB78D] hover:underline font-semibold"
              >
                {copiedKey ? <Check className="w-3 h-3 text-[#5BB78D]" /> : <Copy className="w-3 h-3" />}
                {copiedKey ? 'Copied' : 'Copy key'}
              </button>
            </div>
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-center tracking-wider text-slate-800 dark:text-slate-200 select-all">
              {factorData?.secret ? formatSecretKey(factorData.secret) : '••••••••••••••••'}
            </div>
          </div>

          {/* 6-Digit Confirmation Form */}
          <form onSubmit={handleVerifySetup} className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-1.5">
              <label htmlFor="totp-confirm" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Enter 6-digit confirmation code
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  id="totp-confirm"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  maxLength={6}
                  required
                  autoFocus
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center text-sm font-mono tracking-widest text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || confirmationCode.length < 6}
              className="w-full py-2.5 px-4 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#5BB78D]" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify and continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Step 2: Emergency Recovery Codes */
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Two-factor authentication successfully verified!</span>
          </div>

          <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-xs text-center text-slate-800 dark:text-slate-200">
            {recoveryCodes.map((code, idx) => (
              <div key={idx} className="p-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 select-all">
                {code}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopyCodes}
              className="flex-1 py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedCodes ? <Check className="w-3.5 h-3.5 text-[#5BB78D]" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCodes ? 'Copied' : 'Copy codes'}
            </button>
            <button
              type="button"
              onClick={handleDownloadCodes}
              className="flex-1 py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download (.txt)
            </button>
          </div>

          <label className="flex items-start gap-2 pt-2 text-2xs text-slate-600 dark:text-slate-400 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={hasSavedCodes}
              onChange={(e) => setHasSavedCodes(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-[#124F40] focus:ring-[#5BB78D]"
            />
            <span>I have downloaded or copied these recovery codes and saved them in a secure place.</span>
          </label>

          <button
            type="button"
            onClick={handleFinishSetup}
            disabled={!hasSavedCodes}
            className="w-full py-2.5 px-4 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] disabled:opacity-50 cursor-pointer"
          >
            <span>Complete setup and enter Admin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </AdminAuthLayout>
  );
}
