/**
 * Zarii IELTS - Central Brand Design Tokens
 * Deep Green: #124F40
 * Mint Accent: #5BB78D
 * Off-White Surface: #F7FAF8
 */

export const BRAND_TOKENS = {
  colors: {
    // Primary Brand Greens
    primary: '#124F40', // Deep green (logo & primary interactive)
    primaryHover: '#0E3D32',
    primaryLight: '#1E7A62',
    primarySubtle: '#F1FAF5',

    // Mint Accents
    accent: '#5BB78D', // Fresh mint (progress arcs, highlights)
    accentHover: '#4AA67C',
    accentLight: '#DDF2E7',
    accentSubtle: '#F1FAF5',

    // Surfaces & Backgrounds (Light)
    bgPageLight: '#F7FAF8',
    surfaceCardLight: '#FFFFFF',
    borderSubtleLight: '#E1EBE5',
    textMainLight: '#12211B',
    textMutedLight: '#5B6B63',

    // Surfaces & Backgrounds (Dark)
    bgPageDark: '#0B1612',
    surfaceCardDark: '#112019',
    surfaceElevatedDark: '#172A21',
    borderSubtleDark: '#24392F',
    textMainDark: '#E8F2EC',
    textMutedDark: '#9DB3A7',

    // Semantic Feedback
    success: '#1E9E63',
    warning: '#D99A0B',
    error: '#D1453B',
    info: '#2B7FB8',

    // IELTS Skill Colors
    skills: {
      listening: {
        tone: '#0F8B8D',
        tint: '#E6F5F5',
        border: '#BCE3E4',
      },
      reading: {
        tone: '#1E7A62',
        tint: '#DDF2E7',
        border: '#B6E3CD',
      },
      writing: {
        tone: '#C98A0A',
        tint: '#FAF2E3',
        border: '#F3DCB1',
      },
      speaking: {
        tone: '#CF5C45',
        tint: '#FCECE9',
        border: '#F6CBC3',
      },
    },

    // Chart Palette
    charts: ['#124F40', '#5BB78D', '#0F8B8D', '#C98A0A', '#CF5C45'],
  },

  typography: {
    fontSans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSerif: "'Source Serif 4', 'Source Serif Pro', Georgia, serif",
    fontMono: "'JetBrains Mono', monospace",
  },

  layout: {
    headerHeight: '64px',
    sidebarWidthExpanded: '256px',
    sidebarWidthCollapsed: '72px',
    borderRadiusCard: '1rem', // rounded-2xl
  },
} as const;
