import { create } from 'zustand';
import { db, getActiveProfile, getAppSettings, updateAppSettings, saveProfile } from '../lib/db';
import { supabase } from '../lib/supabase';
import { extractCandidateName, isPlaceholderName } from '../shared/utils/candidateUtils';
import type { UserProfile, AppSettings, LearningTrack } from '../types';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message: string;
  duration?: number;
}

interface AppState {
  // Theme & Appearance
  theme: 'light' | 'dark' | 'system' | 'high-contrast';
  textSize: 'normal' | 'medium' | 'large';
  fontFamily: 'inter' | 'dyslexic' | 'serif';
  lineSpacing: 'normal' | 'relaxed' | 'loose';
  resolvedTheme: 'light' | 'dark' | 'high-contrast';
  setTheme: (theme: 'light' | 'dark' | 'system' | 'high-contrast') => Promise<void>;
  setTextSize: (size: 'normal' | 'medium' | 'large') => Promise<void>;
  setFontFamily: (font: 'inter' | 'dyslexic' | 'serif') => Promise<void>;
  setLineSpacing: (spacing: 'normal' | 'relaxed' | 'loose') => Promise<void>;

  // Interactive Product Tour
  isTourOpen: boolean;
  setTourOpen: (open: boolean) => void;

  // User Profile
  profile: UserProfile | null;
  isLoadingProfile: boolean;
  loadProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;

  // Learning Track
  currentTrack: LearningTrack;
  setCurrentTrack: (track: LearningTrack) => void;

  // Settings
  settings: AppSettings | null;
  loadSettings: () => Promise<void>;
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Sidebar & Navigation UI State
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Command Palette
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  // Global initialization
  initialize: () => Promise<void>;
}

// Helper to resolve system theme
function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function applyThemeToDocument(theme: 'light' | 'dark' | 'system' | 'high-contrast') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('dark', 'high-contrast');

  if (theme === 'high-contrast') {
    root.classList.add('high-contrast');
    return;
  }

  const resolved = theme === 'system' ? getSystemTheme() : theme;
  if (resolved === 'dark') {
    root.classList.add('dark');
  }
}

function applyFontFamilyToDocument(font: 'inter' | 'dyslexic' | 'serif') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('font-dyslexic', 'font-serif-mode');
  if (font === 'dyslexic') {
    root.classList.add('font-dyslexic');
  } else if (font === 'serif') {
    root.classList.add('font-serif-mode');
  }
}

function applyLineSpacingToDocument(spacing: 'normal' | 'relaxed' | 'loose') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('line-spacing-normal', 'line-spacing-relaxed', 'line-spacing-loose');
  root.classList.add(`line-spacing-${spacing}`);
}

function applyTextSizeToDocument(size: 'normal' | 'medium' | 'large') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('text-size-normal', 'text-size-medium', 'text-size-large');
  root.classList.add(`text-size-${size}`);
  
  if (size === 'medium') {
    root.style.fontSize = '17px';
  } else if (size === 'large') {
    root.style.fontSize = '18.5px';
  } else {
    root.style.fontSize = '16px';
  }
}

function safeGetStorage(key: string, fallback: string): string {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key) || fallback;
    }
  } catch {}
  return fallback;
}

export const useAppStore = create<AppState>((set, get) => ({
  theme: (safeGetStorage('zarii_theme', 'light') as 'light' | 'dark' | 'system' | 'high-contrast'),
  textSize: (safeGetStorage('zarii_text_size', 'normal') as 'normal' | 'medium' | 'large'),
  fontFamily: (safeGetStorage('zarii_font_family', 'inter') as 'inter' | 'dyslexic' | 'serif'),
  lineSpacing: (safeGetStorage('zarii_line_spacing', 'normal') as 'normal' | 'relaxed' | 'loose'),
  resolvedTheme: 'light',
  isTourOpen: false,
  profile: null,
  isLoadingProfile: true,
  currentTrack: (safeGetStorage('zarii_current_track', 'ielts') as LearningTrack),
  setCurrentTrack: (track: LearningTrack) => {
    try {
      localStorage.setItem('zarii_current_track', track);
    } catch {}
    set({ currentTrack: track });
  },
  settings: null,
  toasts: [],
  sidebarCollapsed: safeGetStorage('zarii_sidebar_collapsed', 'false') === 'true',
  isCommandPaletteOpen: false,

  setTourOpen: (open: boolean) => {
    set({ isTourOpen: open });
  },

  toggleSidebar: () => {
    const next = !get().sidebarCollapsed;
    localStorage.setItem('zarii_sidebar_collapsed', String(next));
    set({ sidebarCollapsed: next });
  },

  setSidebarCollapsed: (collapsed: boolean) => {
    localStorage.setItem('zarii_sidebar_collapsed', String(collapsed));
    set({ sidebarCollapsed: collapsed });
  },

  setCommandPaletteOpen: (open: boolean) => {
    set({ isCommandPaletteOpen: open });
  },

  setTheme: async (theme) => {
    localStorage.setItem('zarii_theme', theme);
    applyThemeToDocument(theme);
    const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
    set({ theme, resolvedTheme });
    await updateAppSettings({ theme });
  },

  setTextSize: async (textSize) => {
    localStorage.setItem('zarii_text_size', textSize);
    applyTextSizeToDocument(textSize);
    set({ textSize });
    await updateAppSettings({ textSize });
  },

  setFontFamily: async (fontFamily) => {
    localStorage.setItem('zarii_font_family', fontFamily);
    applyFontFamilyToDocument(fontFamily);
    set({ fontFamily });
    await updateAppSettings({ fontFamily });
  },

  setLineSpacing: async (lineSpacing) => {
    localStorage.setItem('zarii_line_spacing', lineSpacing);
    applyLineSpacingToDocument(lineSpacing);
    set({ lineSpacing });
    await updateAppSettings({ lineSpacing });
  },

  loadProfile: async () => {
    try {
      let profile = await getActiveProfile();

      // Check if logged in user has a name in Supabase or local cache
      try {
        let candidateName = '';
        const { data } = await supabase.auth.getUser();
        const user = data?.user;
        if (user) {
          candidateName = extractCandidateName(user, profile?.displayName);
        } else {
          candidateName = extractCandidateName(null, profile?.displayName);
        }

        if (candidateName && (!profile?.displayName || isPlaceholderName(profile.displayName) || profile.displayName !== candidateName)) {
          await get().updateProfile({ displayName: candidateName });
          profile = await getActiveProfile();
          localStorage.setItem('zarii_candidate_name', candidateName);
        }
      } catch {
        // Supabase offline / network error handling
      }

      set({ profile: profile || null, isLoadingProfile: false });
    } catch (err) {
      console.error('Failed to load profile from Dexie:', err);
      set({ profile: null, isLoadingProfile: false });
    }
  },

  updateProfile: async (data) => {
    const current = get().profile;
    const updated = {
      ...(current || {
        testType: 'academic',
        targetBand: 7.5,
        examDate: '',
        isExamBooked: false,
        dailyStudyMinutes: 30,
        currentLevel: 'intermediate',
        displayName: 'IELTS Candidate',
        onboardingCompleted: true,
      }),
      ...data,
      id: current?.id,
    };

    const id = await saveProfile(updated as any);
    const fresh = await db.profile.get(id);
    set({ profile: fresh || null });
  },

  loadSettings: async () => {
    try {
      const settings = await getAppSettings();
      const theme = (localStorage.getItem('zarii_theme') as 'light' | 'dark' | 'system' | 'high-contrast') || settings.theme || 'light';
      const textSize = (localStorage.getItem('zarii_text_size') as 'normal' | 'medium' | 'large') || settings.textSize || 'normal';
      const fontFamily = (localStorage.getItem('zarii_font_family') as 'inter' | 'dyslexic' | 'serif') || settings.fontFamily || 'inter';
      const lineSpacing = (localStorage.getItem('zarii_line_spacing') as 'normal' | 'relaxed' | 'loose') || settings.lineSpacing || 'normal';
      
      applyThemeToDocument(theme);
      applyTextSizeToDocument(textSize);
      applyFontFamilyToDocument(fontFamily);
      applyLineSpacingToDocument(lineSpacing);
      
      set({
        settings,
        theme,
        textSize,
        fontFamily,
        lineSpacing,
        resolvedTheme: theme === 'system' ? getSystemTheme() : theme,
      });
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  },

  updateSettings: async (updates) => {
    await updateAppSettings(updates);
    const fresh = await getAppSettings();
    set({ settings: fresh });
  },

  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...toast, id };
    set((state) => ({ toasts: [...state.toasts, newToast] }));

    const duration = toast.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  initialize: async () => {
    const storedTheme = (localStorage.getItem('zarii_theme') as 'light' | 'dark' | 'system' | 'high-contrast') || 'light';
    const storedSize = (localStorage.getItem('zarii_text_size') as 'normal' | 'medium' | 'large') || 'normal';
    const storedFont = (localStorage.getItem('zarii_font_family') as 'inter' | 'dyslexic' | 'serif') || 'inter';
    const storedSpacing = (localStorage.getItem('zarii_line_spacing') as 'normal' | 'relaxed' | 'loose') || 'normal';
    applyThemeToDocument(storedTheme);
    applyTextSizeToDocument(storedSize);
    applyFontFamilyToDocument(storedFont);
    applyLineSpacingToDocument(storedSpacing);

    await Promise.all([get().loadSettings(), get().loadProfile()]);

    // Keep candidate profile display name in sync whenever auth changes
    try {
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const name = extractCandidateName(session.user);
          if (name) {
            localStorage.setItem('zarii_candidate_name', name);
            const currentProfile = get().profile;
            if (!currentProfile?.displayName || isPlaceholderName(currentProfile.displayName) || currentProfile.displayName !== name) {
              await get().updateProfile({ displayName: name });
            }
          }
        }
      });
    } catch {}
  },
}));
