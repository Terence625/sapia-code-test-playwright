import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

export default defineConfig({
  testDir: './tests',
  testMatch: '**/?(*.)+(spec|test).[tj]s?(x)',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 3 : 3,
  reporter: process.env.CI
    ? [['github'], ['html']]
    : 'html',
  timeout: 180000,
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://fi.sandbox.sapia.ai/',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
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
  ],
})
