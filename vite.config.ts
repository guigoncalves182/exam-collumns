/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.interface.{ts,tsx}',
        'src/**/*.styles.ts',
        'src/**/index.ts',
        'src/**/*.d.ts',
        'src/types/**',
        'src/mocks/**',
        'src/test/**',
        'src/main.tsx',
        'src/App.tsx',
        'src/config/**',
        'src/styles/**',
      ],
    },
  },
})
