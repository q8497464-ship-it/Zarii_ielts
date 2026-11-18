/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
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
        primary: {
          50: '#F1FAF5',
          100: '#DDF2E7',
          200: '#B6E3CD',
          300: '#8ACFAE',
          400: '#5BB78D',
          500: '#2F9477',
          600: '#1E7A62',
          700: '#17634F',
          800: '#124F40',
          900: '#0E3D32',
          950: '#0A2E25',
        },
        // Override teal to seamlessly route all existing primary/action classes to Zarii brand green
        teal: {
          50: '#F1FAF5',
          100: '#DDF2E7',
          200: '#B6E3CD',
          300: '#8ACFAE',
          400: '#5BB78D',
          500: '#2F9477',
          600: '#1E7A62',
          700: '#17634F',
          800: '#124F40',
          900: '#0E3D32',
          950: '#0A2E25',
        },
        // Override slate/neutrals with Zarii slightly green-tinted gray scale
        slate: {
          50: '#F7FAF8',   // Light page background
          100: '#EEF4F0',
          200: '#E1EBE5',  // Light subtle border
          300: '#C7D6CE',
          400: '#8E9F97',
          500: '#5B6B63',  // Muted text
          600: '#42524A',
          700: '#2D3B34',
          800: '#172A21',  // Dark elevated surface
          900: '#112019',  // Dark surface
          950: '#0B1612',  // Dark background
        },
        neutral: {
          50: '#F7FAF8',
          100: '#EEF4F0',
          200: '#E1EBE5',
          300: '#C7D6CE',
          400: '#8E9F97',
          500: '#5B6B63',
          600: '#42524A',
          700: '#2D3B34',
          800: '#172A21',
          900: '#112019',
          950: '#0B1612',
        },
        accent: {
          50: '#F1FAF5',
          100: '#DDF2E7',
          200: '#B6E3CD',
          300: '#8ACFAE',
          400: '#5BB78D',
          500: '#2F9477',
          600: '#1E7A62',
          700: '#17634F',
          800: '#124F40',
          900: '#0E3D32',
          950: '#0A2E25',
        },
        navy: {
          50: '#F0F6FA',
          100: '#DCE8F2',
          200: '#B9D2E6',
          300: '#85B3D4',
          400: '#5095C2',
          500: '#2B7FB8',
          600: '#226593',
          700: '#1C4E71',
          800: '#173D58',
          900: '#122E42',
          950: '#0B1B27',
        },
        semantic: {
          success: '#1E9E63',
          warning: '#D99A0B',
          error: '#D1453B',
          info: '#2B7FB8',
        },
        skill: {
          listening: {
            tint: 'var(--skill-listening-tint)',
            tone: 'var(--skill-listening-tone)',
            border: 'var(--skill-listening-border)',
          },
          reading: {
            tint: 'var(--skill-reading-tint)',
            tone: 'var(--skill-reading-tone)',
            border: 'var(--skill-reading-border)',
          },
          writing: {
            tint: 'var(--skill-writing-tint)',
            tone: 'var(--skill-writing-tone)',
            border: 'var(--skill-writing-border)',
          },
          speaking: {
            tint: 'var(--skill-speaking-tint)',
            tone: 'var(--skill-speaking-tone)',
            border: 'var(--skill-speaking-border)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Source Serif 4', 'Source Serif Pro', 'Georgia', 'Cambria', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '0.875rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],        // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],       // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        md: '10px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        full: '9999px',
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        popover: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
