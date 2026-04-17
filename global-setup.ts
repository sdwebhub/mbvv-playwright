import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Load .env.playwright so BASE_URL is available in global setup
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

export default async function globalSetup() {
  const baseURL = process.env.BASE_URL;
  if (!baseURL) throw new Error('BASE_URL is not set in .env.playwright');

  console.log(`\n[global setup] Checking app URL: ${baseURL}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    const response = await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 15000 });
    if (!response || !response.ok()) {
      throw new Error(`App URL returned status ${response?.status()} — aborting tests.`);
    }
    console.log(`[global setup] App is reachable (HTTP ${response.status()}) ✓\n`);
  } catch (err) {
    throw new Error(`[global setup] App URL is not reachable: ${baseURL}\n${err}`);
  } finally {
    await browser.close();
  }
}
