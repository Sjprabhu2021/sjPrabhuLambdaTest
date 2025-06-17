import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config();

const LT_USERNAME = process.env.LT_USERNAME;
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY;

if (!LT_USERNAME || !LT_ACCESS_KEY) {
  throw new Error("Please set LT_USERNAME and LT_ACCESS_KEY in your .env file");
}

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 300 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  workers: 2,
  use: {
    actionTimeout: 0,
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'Chrome:137.0:Windows 11@lambdatest',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'Chrome',
            browserVersion: '137.0',
            platform: 'Windows 11',
            resolution: '1920x1080', 
            build: 'Playwright Automation',
            name: 'Chrome test',
            user: LT_USERNAME,
            accessKey: LT_ACCESS_KEY,
            network: true,
            console: true,
            video: true,
            tunnel: true
          }))}`,
        },
      },
    },
    {
      name: 'MicrosoftEdge:137.0:macOS Ventura@lambdatest',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'MicrosoftEdge',
            browserVersion: '137.0',
            platform: 'macOS Ventura',
            resolution: '1920x1080', 
            build: 'Playwright Automation',
            name: 'Edge test',
            user: LT_USERNAME,
            accessKey: LT_ACCESS_KEY,
            network: true,
            console: true,
            video: true,
            tunnel: true
          }))}`,
        },
      },
    },
  ],
};

export default config;
