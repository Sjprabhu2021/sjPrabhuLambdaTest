import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  workers: 2,
  projects: [
    {
      name: 'Chrome:137:Windows 11@lambdatest',
      use: {
        viewport: { width: 1280, height: 720 },
      }
    },
    {
      name: 'MicrosoftEdge:137:macOS Ventura@lambdatest',
      use: {
        viewport: { width: 1280, height: 720 },
      }
    }
  ],
  reporter: [['html'], ['list']]
});
