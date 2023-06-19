/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
export default defineConfig({
  resolve: {
    alias: {
      'testing': './src/tests/testing',
      'antd-mobile': './src/index',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // environment: 'happydom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      include: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['**/demos/**', '**/tests/**', '**/.umi/**'],
    },
    minThreads: 10,
    maxThreads: 20,
  },
})
