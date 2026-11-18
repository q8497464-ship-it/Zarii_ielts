import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastAlert {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

interface AdminToastContextType {
  toasts: ToastAlert[];
  addToast: (toast: Omit<ToastAlert, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AdminToastContext = createContext<AdminToastContextType | undefined>(undefined);

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastAlert[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastAlert, 'id'>) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const newToast: ToastAlert = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);

      const timeout = toast.duration || 4000;
      setTimeout(() => {
        removeToast(id);
      }, timeout);
    },
    [removeToast]
  );

  return (
    <AdminToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast Render Viewport */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto p-3.5 rounded-2xl shadow-xl border flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-150 ${
              t.type === 'success'
                ? 'bg-emerald-950/95 text-emerald-100 border-emerald-800/80'
                : t.type === 'error'
                ? 'bg-rose-950/95 text-rose-100 border-rose-800/80'
                : t.type === 'warning'
                ? 'bg-amber-950/95 text-amber-100 border-amber-800/80'
                : 'bg-slate-900/95 text-slate-100 border-slate-700/80'
            }`}
          >
            {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />}
            {t.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />}
            {t.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />}
            {t.type === 'info' && <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />}

            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold leading-tight">{t.title}</div>
              {t.message && <div className="text-[11px] opacity-80 mt-0.5 leading-snug">{t.message}</div>}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="p-1 rounded-md text-white/60 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </AdminToastContext.Provider>
  );
}

export function useAdminToast() {
  const ctx = useContext(AdminToastContext);
  if (!ctx) {
    throw new Error('useAdminToast must be used within an AdminToastProvider');
  }
  return ctx;
}
