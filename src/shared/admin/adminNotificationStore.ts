export interface AdminInAppNotification {
  id: string;
  type: 'feedback' | 'ai_error' | 'quota_warning' | 'system';
  title: string;
  description: string;
  time: string;
  unread: boolean;
  link?: string;
  createdAt: string;
}

const STORAGE_KEY = 'zarii_admin_inapp_notifications_v1';

export const INITIAL_ADMIN_NOTIFICATIONS: AdminInAppNotification[] = [
  {
    id: 'notif-1',
    type: 'feedback',
    title: 'New Student Bug Report',
    description: 'Aisha Al-Mansoor reported Question 14 heading key ambiguity in Cambridge 19 Reading Test 1.',
    time: '12m ago',
    unread: true,
    link: '/admin/communication?tab=feedback&feedbackId=fb-101',
    createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
  },
  {
    id: 'notif-2',
    type: 'ai_error',
    title: 'Evaluator Timeout Fallback Triggered',
    description: 'Writing Task 2 submission for candidate #u-104 timed out after 10s. Successfully fell back to rule-based rubric.',
    time: '45m ago',
    unread: true,
    link: '/admin/ai?tab=usage',
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
  },
  {
    id: 'notif-3',
    type: 'quota_warning',
    title: 'Gemini Free Tier Quota Alert',
    description: 'Daily usage reached 85% of 1,500 requests/day limit. Fallback provider Groq is prepared.',
    time: '2h ago',
    unread: true,
    link: '/admin/ai?tab=limits',
    createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
  },
];

class AdminNotificationStore {
  private notifications: AdminInAppNotification[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.load();
    if (typeof window !== 'undefined') {
      window.addEventListener('zarii:student-feedback-submitted', (e: any) => {
        const detail = e.detail;
        if (detail) {
          this.addNotification({
            type: 'feedback',
            title: `Student Feedback: ${detail.category || 'General'}`,
            description: (detail.message || '').slice(0, 90),
            link: `/admin/communication?tab=feedback&feedbackId=${detail.id}`,
          });
        }
      });
    }
  }

  private load() {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          this.notifications = JSON.parse(raw);
          return;
        }
      }
    } catch {}
    this.notifications = [...INITIAL_ADMIN_NOTIFICATIONS];
  }

  private save() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notifications.slice(0, 50)));
      }
    } catch {}
  }

  private notify() {
    this.save();
    this.listeners.forEach((l) => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public getNotifications(): AdminInAppNotification[] {
    return [...this.notifications];
  }

  public getUnreadCount(): number {
    return this.notifications.filter((n) => n.unread).length;
  }

  public addNotification(
    notif: Omit<AdminInAppNotification, 'id' | 'time' | 'unread' | 'createdAt'>
  ): AdminInAppNotification {
    const item: AdminInAppNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      time: 'Just now',
      unread: true,
      createdAt: new Date().toISOString(),
    };
    this.notifications.unshift(item);
    if (this.notifications.length > 50) this.notifications.pop();
    this.notify();
    return item;
  }

  public markAsRead(id: string): void {
    const notif = this.notifications.find((n) => n.id === id);
    if (notif) {
      notif.unread = false;
      this.notify();
    }
  }

  public markAllAsRead(): void {
    this.notifications.forEach((n) => (n.unread = false));
    this.notify();
  }

  public removeNotification(id: string): void {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.notify();
  }

  public clearAll(): void {
    this.notifications = [];
    this.notify();
  }

  public resetToDefault(): void {
    this.notifications = JSON.parse(JSON.stringify(INITIAL_ADMIN_NOTIFICATIONS));
    this.notify();
  }
}

export const adminNotificationStore = new AdminNotificationStore();
