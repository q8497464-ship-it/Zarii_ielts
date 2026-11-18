import React from 'react';
import { ZariiLogo } from '../ui/ZariiLogo';
import { Button } from '../ui/Button';
import { ShieldCheck, RefreshCw, Clock } from 'lucide-react';

interface MaintenanceScreenProps {
  message?: string;
  estimatedReturnTime?: string;
}

export function MaintenanceScreen({
  message = 'Zarii is temporarily undergoing scheduled maintenance to upgrade practice mock tests. We will be back online shortly.',
  estimatedReturnTime = 'Short maintenance window',
}: MaintenanceScreenProps) {
  return (
    <div className="min-h-screen w-full bg-[#F7FAF8] dark:bg-[#0B1612] text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 select-none">
      <div className="max-w-md w-full bg-white dark:bg-[#112019] rounded-3xl border border-slate-200/80 dark:border-[#24392F] shadow-xl p-8 text-center space-y-6">
        <div className="flex justify-center">
          <ZariiLogo variant="mark" size="lg" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>Scheduled Maintenance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Workspace Upgrading
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {message}
          </p>
        </div>

        {estimatedReturnTime && (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-[#24392F] text-xs text-slate-500">
            Estimated Return: <strong className="text-slate-800 dark:text-slate-200">{estimatedReturnTime}</strong>
          </div>
        )}

        <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center justify-center gap-2 text-2xs text-emerald-800 dark:text-emerald-300 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>All offline attempts and local progress are securely saved</span>
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            size="md"
            className="w-full justify-center gap-2"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Check Platform Status</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
