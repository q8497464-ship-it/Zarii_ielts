/**
 * PRIVACY NOTE:
 * The letter text below lives in the frontend client bundle, so anyone inspecting the site code
 * or bundle could potentially read it.
 *
 * For complete privacy, an optional Supabase Row Level Security (RLS) mode is supported:
 * by setting `surpriseConfig.useSupabasePrivateNotes = true` and `visibleForEmails = ['recipient@domain.com']`,
 * the text is fetched at runtime from the `private_notes` table only for the verified authenticated user,
 * leaving zero private text inside the public JavaScript files.
 * See README.md under "Private surprise mode" for full SQL migrations and setup details.
 */

import { surpriseConfig } from './surpriseConfig';
import { supabase } from '../../lib/supabase';

export interface LoveNoteContent {
  headlinePrefix: string;
  recipientName: string;
  headlineFull: string;
  greeting: string;
  paragraphs: string[];
  closing: string;
  signature: string;
  footerLine: string;
}

export const DEFAULT_LOVE_NOTE: LoveNoteContent = {
  headlinePrefix: 'Qamar loves you sooo much,',
  recipientName: 'Zarmeen',
  headlineFull: 'Qamar loves you sooo much, Zarmeen',
  greeting: 'My dearest Zarmeen,',
  paragraphs: [
    'I am completely mesmerized by your eyes. They are deep and calm like a lake, and every time I look into them, time slows down and I happily lose myself in them.',
    'When you smile, my whole world lights up. Your laughter is the cure for my every tiredness, and your name is the first word in all of my prayers.',
    'I know preparing for IELTS is not easy. Some nights you will be tired, some days you will feel anxious, and sometimes it will feel like it is too much. In those moments, please remember how hardworking you are, how smart you are, and that you can achieve anything you set your heart on.',
    'I made this little app just for you, with the hope that every lesson, every practice test and every band score brings you one step closer to your dream. All the effort you put in will never go to waste.',
    'When you feel worn out, take a deep breath, smile a little, and remember that there is someone standing beside you at every step, your biggest fan.',
    'Just keep trying, my love. I will keep you in my prayers, and I believe in you more than you know.',
  ],
  closing: 'Always and only yours,',
  signature: 'Qamar',
  footerLine: 'P.S. Band 8 is going to be yours, I just know it.',
};

/**
 * Loads the love note content, optionally fetching from Supabase table `private_notes`
 * if `useSupabasePrivateNotes` is enabled. Falls back gracefully to `DEFAULT_LOVE_NOTE`.
 */
export async function fetchLoveNote(): Promise<LoveNoteContent> {
  if (!surpriseConfig.useSupabasePrivateNotes) {
    return DEFAULT_LOVE_NOTE;
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || !session.user?.email) return DEFAULT_LOVE_NOTE;

    const envUrl = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) || '';
    const envAnonKey = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || '';
    if (!envUrl) return DEFAULT_LOVE_NOTE;

    const res = await fetch(
      `${envUrl}/rest/v1/private_notes?recipient_email=eq.${encodeURIComponent(session.user.email.toLowerCase())}&select=headline_prefix,recipient_name,greeting,paragraphs,closing,signature,footer_line&limit=1`,
      {
        headers: {
          apikey: envAnonKey,
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    if (!res.ok) return DEFAULT_LOVE_NOTE;
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) return DEFAULT_LOVE_NOTE;

    const data = rows[0];
    return {
      headlinePrefix: data.headline_prefix || DEFAULT_LOVE_NOTE.headlinePrefix,
      recipientName: data.recipient_name || DEFAULT_LOVE_NOTE.recipientName,
      headlineFull: `${data.headline_prefix || DEFAULT_LOVE_NOTE.headlinePrefix} ${data.recipient_name || DEFAULT_LOVE_NOTE.recipientName}`,
      greeting: data.greeting || DEFAULT_LOVE_NOTE.greeting,
      paragraphs: Array.isArray(data.paragraphs) ? data.paragraphs : DEFAULT_LOVE_NOTE.paragraphs,
      closing: data.closing || DEFAULT_LOVE_NOTE.closing,
      signature: data.signature || DEFAULT_LOVE_NOTE.signature,
      footerLine: data.footer_line || DEFAULT_LOVE_NOTE.footerLine,
    };
  } catch (err) {
    console.warn('Error fetching private note:', err);
    return DEFAULT_LOVE_NOTE;
  }
}
