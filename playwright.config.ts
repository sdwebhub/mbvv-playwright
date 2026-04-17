import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Load .env.playwright manually to avoid dotenvx noise from @playwright/test
const envFile = path.resolve(__dirname, '.env.playwright');
if (fs.existsSync(envFile)) {
  fs.readFileSync(envFile, 'utf-8')
    .split('\n')
    .forEach(line => {
      const [key, ...rest] = line.split('=');
      if (key && !key.startsWith('#')) {
        process.env[key.trim()] = rest.join('=').trim();
      }
    });
}

const browser = process.env.BROWSER || 'chromium';
const headless = process.env.HEADLESS === 'true';
const workers = process.env.WORKERS ? parseInt(process.env.WORKERS) : 1;

const browserDevice: Record<string, object> = {
  chromium: devices['Desktop Chrome'],
  firefox: devices['Desktop Firefox'],
  webkit: devices['Desktop Safari'],
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: './global-setup.ts',
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : workers,
  reporter: [
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    headless,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: browser,
      use: { ...browserDevice[browser] },
    },
  ],
});
