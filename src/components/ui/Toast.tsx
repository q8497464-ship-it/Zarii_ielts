import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToastItemProps {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  message: string;
  onDismiss: (id: string) => void;
}

export function ToastItem({ id, type, title, message, onDismiss }: ToastItemProps) {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#1E9E63] shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#D99A0B] shrink-0 mt-0.5" />,
    error: <AlertCircle className="w-5 h-5 text-[#D1453B] shrink-0 mt-0.5" />,
    info: <Info className="w-5 h-5 text-[#2B7FB8] shrink-0 mt-0.5" />,
  };

  const cardStyles = {
    success: 'border-[#1E9E63]/30 bg-white/95 text-slate-900 dark:bg-slate-900/95 dark:text-slate-100 dark:border-[#1E9E63]/40 shadow-popover',
    warning: 'border-[#D99A0B]/30 bg-white/95 text-slate-900 dark:bg-slate-900/95 dark:text-slate-100 dark:border-[#D99A0B]/40 shadow-popover',
    error: 'border-[#D1453B]/30 bg-white/95 text-slate-900 dark:bg-slate-900/95 dark:text-slate-100 dark:border-[#D1453B]/40 shadow-popover',
    info: 'border-[#2B7FB8]/30 bg-white/95 text-slate-900 dark:bg-slate-900/95 dark:text-slate-100 dark:border-[#2B7FB8]/40 shadow-popover',
  };

  const accentBars = {
    success: 'bg-[#1E9E63]',
    warning: 'bg-[#D99A0B]',
    error: 'bg-[#D1453B]',
    info: 'bg-[#2B7FB8]',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      className={cn(
        'pointer-events-auto relative overflow-hidden flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md',
        cardStyles[type]
      )}
    >
      <div className={cn('absolute left-0 top-0 bottom-0 w-1', accentBars[type])} />
      {icons[type]}
      <div className="flex-1 min-w-0 pr-1">
        {title && (
          <h4 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-0.5">
            {title}
          </h4>
        )}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {message}
        </p>
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors focus:outline-none"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useAppStore();

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onDismiss={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
