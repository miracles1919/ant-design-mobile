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
    setupFiles: './src/tests/setup.ts',
  },
})
