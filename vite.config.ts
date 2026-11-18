/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@supabase')) {
              return 'supabase';
            }
            if (id.includes('recharts')) {
              return 'charts';
            }
            if (id.includes('framer-motion')) {
              return 'motion';
            }
            if (id.includes('dexie')) {
              return 'db';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('zustand')
            ) {
              return 'vendor';
            }
          }
          if (id.includes('/content/reading/') || id.includes('\\content\\reading\\')) {
            return 'content-reading';
          }
          if (id.includes('/content/listening/') || id.includes('\\content\\listening\\')) {
            return 'content-listening';
          }
          if (
            id.includes('/content/writing/') ||
            id.includes('\\content\\writing\\') ||
            id.includes('/content/speaking/') ||
            id.includes('\\content\\speaking\\')
          ) {
            return 'content-subjective';
          }
          if (
            id.includes('/content/vocab/') ||
            id.includes('\\content\\vocab\\') ||
            id.includes('/content/grammar/') ||
            id.includes('\\content\\grammar\\')
          ) {
            return 'content-vocab';
          }
        },
      },
    },
  },
});
