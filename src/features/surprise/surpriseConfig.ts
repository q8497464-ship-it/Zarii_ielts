/**
 * Configuration for the Hidden Surprise Heart (Easter egg) in the Zarii student app.
 *
 * - enabled: master toggle for the surprise feature.
 * - recipientName: the name of the special person the surprise is for ("Zarmeen").
 * - senderName: the name of the author ("Qamar").
 * - visibleForEmails: array of emails allowed to see the heart.
 *     If empty ([]), the heart is visible to any student using the student app.
 *     If populated, only authenticated users matching one of the emails will see it.
 * - autoShowOnDate: optional YYYY-MM-DD date (e.g. "2026-12-25" for a birthday/anniversary).
 *     If set, the heart only appears on that specific day. If empty (""), shows every day.
 * - useSupabasePrivateNotes: optional toggle to fetch letter from Supabase RLS table
 *     instead of client bundle for complete privacy.
 */
export interface SurpriseConfig {
  enabled: boolean;
  recipientName: string;
  senderName: string;
  visibleForEmails: string[];
  autoShowOnDate?: string;
  useSupabasePrivateNotes?: boolean;
}

export const surpriseConfig: SurpriseConfig = {
  enabled: true,
  recipientName: 'Zarmeen',
  senderName: 'Qamar',
  visibleForEmails: [], // Empty = visible to everyone in /app/*; set to ['zarmeen@...'] for private mode
  autoShowOnDate: '', // e.g. "2026-12-25" (empty string = active every day)
  useSupabasePrivateNotes: false, // Set to true to fetch note from Supabase table 'private_notes'
};

/**
 * Checks whether the surprise heart should be visible for the current user and date.
 */
export function isSurpriseDateActive(targetDate?: string): boolean {
  if (!targetDate || !targetDate.trim()) return true;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;
  return todayStr === targetDate.trim();
}
