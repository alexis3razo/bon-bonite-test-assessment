import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Central configuration for the Bon-bonite automation suite.
 * Base URL and environment-sensitive values are read from .env
 * so credentials/URLs never get hardcoded into the test code.
 */
export default defineConfig({
  testDir: './src/tests',
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false, // sequential runs: safer against a live production site
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined, // Use default workers locally
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.bon-bonite.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});