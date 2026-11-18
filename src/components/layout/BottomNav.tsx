import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Layers,
  BarChart3,
  User,
  Play,
  Sparkles,
  Compass,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { MOBILE_NAV_ITEMS } from '../../routes';

export function BottomNav() {
  const navigate = useNavigate();
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  const quickPracticeActions = [
    { label: 'Reading Test', path: '/practice/reading', icon: BookOpen, color: 'text-brand-700 bg-brand-50 dark:bg-brand-950/60' },
    { label: 'Listening Audio', path: '/practice/listening', icon: BookOpen, color: 'text-[#0F8B8D] bg-[#E6F5F5] dark:bg-[#0F8B8D]/20' },
    { label: 'Writing Prompt', path: '/practice/writing', icon: BookOpen, color: 'text-[#C98A0A] bg-[#FAF2E3] dark:bg-[#C98A0A]/20' },
    { label: 'Speaking Mock', path: '/practice/speaking/mock', icon: Sparkles, color: 'text-[#CF5C45] bg-[#FCECE9] dark:bg-[#CF5C45]/20' },
    { label: 'Diagnostic Exam', path: '/diagnostic', icon: Compass, color: 'text-brand-800 bg-brand-100 dark:bg-brand-900/60' },
  ];

  return (
    <>
      {/* Floating Action Menu Modal for Mobile */}
      <AnimatePresence>
        {isQuickActionOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end p-4 pb-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setIsQuickActionOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="relative z-10 w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-modal space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Play className="w-4 h-4 text-teal-600 fill-current" />
                  Quick Practice Launch
                </h3>
                <button
                  onClick={() => setIsQuickActionOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {quickPracticeActions.map((qa) => {
                  const Icon = qa.icon;
                  return (
                    <button
                      key={qa.label}
                      onClick={() => {
                        setIsQuickActionOpen(false);
                        navigate(qa.path);
                      }}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left"
                    >
                      <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center shrink-0', qa.color)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {qa.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <div className="md:hidden fixed bottom-16 right-4 z-40">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-teal-600 text-white font-semibold text-xs shadow-lg shadow-teal-600/30 hover:bg-teal-700 active:bg-teal-800 transition-all border border-teal-500/30"
          aria-label="Start Practice"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Start Practice</span>
        </motion.button>
      </div>

      {/* 5-Item Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 border-t border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md px-2 py-1 safe-bottom shadow-lg">
        <div className="flex items-center justify-around">
          {MOBILE_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[56px] min-h-[44px]',
                    isActive
                      ? 'text-teal-600 dark:text-teal-400 font-semibold'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="relative">
                      <Icon className="w-5 h-5 mb-0.5" />
                      {isActive && (
                        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                      )}
                    </div>
                    <span className="text-[10px] tracking-tight">{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
