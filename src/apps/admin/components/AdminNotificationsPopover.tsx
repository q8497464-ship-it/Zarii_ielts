import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, AlertCircle, FileText, MessageSquare, ExternalLink, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  adminNotificationStore,
  type AdminInAppNotification,
} from '../../../shared/admin/adminNotificationStore';

export function AdminNotificationsPopover() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminInAppNotification[]>(() =>
    adminNotificationStore.getNotifications()
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return adminNotificationStore.subscribe(() => {
      setNotifications(adminNotificationStore.getNotifications());
    });
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const markAllAsRead = () => {
    adminNotificationStore.markAllAsRead();
  };

  const handleNotificationClick = (n: AdminInAppNotification) => {
    adminNotificationStore.markAsRead(n.id);
    if (n.link) {
      navigate(n.link);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
        aria-expanded={isOpen}
        className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#5BB78D] cursor-pointer"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse ring-2 ring-white dark:ring-slate-900" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] shadow-2xl overflow-hidden z-40 animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="p-3.5 border-b border-slate-100 dark:border-[#24392F]/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Admin Notifications
              </span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[11px] font-semibold text-[#124F40] dark:text-[#5BB78D] hover:underline cursor-pointer"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-[#24392F]/60">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                All caught up! No notifications.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-[#172b22] ${
                    n.unread ? 'bg-[#5BB78D]/5 dark:bg-[#5BB78D]/10' : ''
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                      n.type === 'feedback'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                        : n.type === 'ai_error'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                        : n.type === 'quota_warning'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                    }`}
                  >
                    {n.type === 'feedback' && <MessageSquare className="w-3.5 h-3.5" />}
                    {n.type === 'ai_error' && <AlertCircle className="w-3.5 h-3.5" />}
                    {n.type === 'quota_warning' && <Zap className="w-3.5 h-3.5" />}
                    {n.type === 'system' && <Check className="w-3.5 h-3.5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      {n.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
