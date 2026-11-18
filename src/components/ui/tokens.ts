/**
 * Zarii IELTS Design System Tokens
 * Source of truth for brand colors, skill themes, recharts palettes, motion presets, and typography constants.
 */

export const ZARII_BRAND = {
  // Brand green scale (800 = logo deep green, 400 = logo mint)
  scale: {
    50: '#F1FAF5',
    100: '#DDF2E7',
    200: '#B6E3CD',
    300: '#8ACFAE',
    400: '#5BB78D', // Logo mint accent
    500: '#2F9477',
    600: '#1E7A62',
    700: '#17634F',
    800: '#124F40', // Logo deep green
    900: '#0E3D32',
    950: '#0A2E25',
  },
  // Neutrals (green-tinted gray)
  neutral: {
    background: '#F7FAF8',
    surface: '#FFFFFF',
    border: '#E1EBE5',
    muted: '#5B6B63',
    main: '#12211B',
  },
  // Dark mode surfaces
  dark: {
    background: '#0B1612',
    surface: '#112019',
    elevated: '#172A21',
    border: '#24392F',
    text: '#E8F2EC',
    muted: '#9DB3A7',
  },
  // Semantic harmonized
  semantic: {
    success: '#1E9E63',
    warning: '#D99A0B',
    error: '#D1453B',
    info: '#2B7FB8',
  },
} as const;

export const RECHARTS_PALETTE = {
  brand800: '#124F40',   // Logo deep green
  brand400: '#5BB78D',   // Logo mint
  teal: '#0F8B8D',       // Listening
  amber: '#C98A0A',      // Writing
  terracotta: '#CF5C45', // Speaking
  gray: '#8E9F97',       // Neutral gray
  targetBand: '#5BB78D', // Dashed line for target band
} as const;

export const RECHARTS_SERIES_COLORS = [
  '#124F40', // brand 800
  '#5BB78D', // brand 400
  '#0F8B8D', // teal
  '#C98A0A', // amber
  '#CF5C45', // terracotta
  '#8E9F97', // gray
] as const;

export const SKILL_THEMES = {
  listening: {
    name: 'Listening',
    color: '#0F8B8D',
    accentText: 'text-[#0F8B8D] dark:text-[#52C5C7]',
    accentBg: 'bg-[#E6F5F5] dark:bg-[#0F8B8D]/20',
    accentBorder: 'border-[#BCE3E4] dark:border-[#0F8B8D]/40',
    badgeClass: 'bg-[#E6F5F5] text-[#0F8B8D] dark:bg-[#0F8B8D]/20 dark:text-[#52C5C7] border-[#BCE3E4] dark:border-[#0F8B8D]/40',
    pillClass: 'bg-[#0F8B8D] text-white hover:bg-[#0D7779]',
  },
  reading: {
    name: 'Reading',
    color: '#1E7A62',
    accentText: 'text-[#1E7A62] dark:text-[#8ACFAE]',
    accentBg: 'bg-[#DDF2E7] dark:bg-[#1E7A62]/20',
    accentBorder: 'border-[#B6E3CD] dark:border-[#1E7A62]/40',
    badgeClass: 'bg-[#DDF2E7] text-[#17634F] dark:bg-[#1E7A62]/20 dark:text-[#8ACFAE] border-[#B6E3CD] dark:border-[#1E7A62]/40',
    pillClass: 'bg-[#17634F] text-white hover:bg-[#124F40]',
  },
  writing: {
    name: 'Writing',
    color: '#C98A0A',
    accentText: 'text-[#C98A0A] dark:text-[#F3DCB1]',
    accentBg: 'bg-[#FAF2E3] dark:bg-[#C98A0A]/20',
    accentBorder: 'border-[#F3DCB1] dark:border-[#C98A0A]/40',
    badgeClass: 'bg-[#FAF2E3] text-[#9A6705] dark:bg-[#C98A0A]/20 dark:text-[#F3DCB1] border-[#F3DCB1] dark:border-[#C98A0A]/40',
    pillClass: 'bg-[#C98A0A] text-white hover:bg-[#AD7708]',
  },
  speaking: {
    name: 'Speaking',
    color: '#CF5C45',
    accentText: 'text-[#CF5C45] dark:text-[#F6CBC3]',
    accentBg: 'bg-[#FCECE9] dark:bg-[#CF5C45]/20',
    accentBorder: 'border-[#F6CBC3] dark:border-[#CF5C45]/40',
    badgeClass: 'bg-[#FCECE9] text-[#A63F2C] dark:bg-[#CF5C45]/20 dark:text-[#F6CBC3] border-[#F6CBC3] dark:border-[#CF5C45]/40',
    pillClass: 'bg-[#CF5C45] text-white hover:bg-[#B34B36]',
  },
} as const;

export type SkillType = keyof typeof SKILL_THEMES;

/**
 * Standard Framer Motion transition curves and variants with reduced motion support
 */
export const MOTION_PRESETS = {
  page: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
  },
  card: {
    whileHover: { y: -2, transition: { duration: 0.15, ease: 'easeOut' } },
    whileTap: { y: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  },
  scaleModal: {
    initial: { opacity: 0, scale: 0.96, y: 12 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.15 } },
  },
  slideDrawer: {
    initial: { x: '100%' },
    animate: { x: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
    exit: { x: '100%', transition: { duration: 0.2, ease: 'easeIn' } },
  },
};
