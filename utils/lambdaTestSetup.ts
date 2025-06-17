import * as base from '@playwright/test';
import { chromium } from 'playwright';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config(); // Load LT_USERNAME and LT_ACCESS_KEY from .env

// Base capabilities object
const capabilities: any = {
  browserName: 'Chrome',
  browserVersion: 'latest',
  'LT:Options': {
    platform: 'Windows 11',
    build: 'Playwright LambdaTest Build',
    name: '',
    user: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
    network: true,
    video: true,
    console: true,
    tunnel: true,
    selenium_version: '4.0.0', // Optional, recommended
  }
};

// Update capabilities dynamically from project
const modifyCapabilities = (projectName: string, testName: string) => {
  const [browserName, browserVersion, platform] = projectName.split('@')[0].split(':');
  capabilities.browserName = browserName;
  capabilities.browserVersion = browserVersion;
  capabilities['LT:Options'].platform = platform;
  capabilities['LT:Options'].name = testName;
};

// Extend Playwright's base test
const test = base.test.extend({
  page: async ({ playwright }, use, testInfo) => {
    if (testInfo.project.name.includes('@lambdatest')) {
      // Update capabilities for this project and test
      const testName = `${testInfo.title} - ${testInfo.file.split(path.sep).pop()}`;
      modifyCapabilities(testInfo.project.name, testName);

      // Connect to LambdaTest
      const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
      });

      const context = await browser.newContext();
      const page = await context.newPage();

      // Use LambdaTest browser page for the test
      await use(page);

      // Set test status in LambdaTest
      const status = {
        action: 'setTestStatus',
        arguments: {
          status: testInfo.status === 'passed' ? 'passed' : 'failed',
          remark: testInfo.error?.message || 'Completed',
        }
      };

      await page.evaluate((_status) => {
        // LambdaTest specific action to mark test pass/fail
        // This must be a string exactly like below
        // See: https://www.lambdatest.com/support/docs/playwright-cloud-grid/
        // @ts-ignore
        window._lambdaTestAction = _status;
      }, status);

      await page.close();
      await browser.close();
    } else {
      // Local run fallback
      const browser = await playwright.chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await use(page);
      await browser.close();
    }
  },
});

export default test;
