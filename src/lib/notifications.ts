import { copy } from './copy';

/**
 * Browser Notification Helper for Zarii IELTS ($0 cost, 100% free Web API)
 */

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false;
  try {
    const result = await Notification.requestPermission();
    return result === 'granted';
  } catch (err) {
    console.error('Failed to request notification permission:', err);
    return false;
  }
}

export function sendStudyNotification(
  title: string,
  options?: NotificationOptions
): Notification | null {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return null;
  }

  try {
    const notification = new Notification(title, {
      icon: '/vite.svg',
      badge: '/vite.svg',
      ...options,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    return notification;
  } catch (err) {
    console.error('Error dispatching browser notification:', err);
    return null;
  }
}

export function sendDailyGoalReminder(
  studiedMinutes: number,
  targetMinutes: number
): void {
  const remaining = Math.max(0, targetMinutes - studiedMinutes);
  if (remaining <= 0) return;

  sendStudyNotification(copy.notifications.dailyReminderTitle, {
    body: copy.notifications.dailyReminderBody(remaining, targetMinutes),
    tag: 'zarii-daily-goal',
  });
}

export function sendTestNotification(): boolean {
  const notif = sendStudyNotification(copy.notifications.testNotificationTitle, {
    body: copy.notifications.testNotificationBody,
    tag: 'zarii-test-notification',
  });
  return notif !== null;
}
