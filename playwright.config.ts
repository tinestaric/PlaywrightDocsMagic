import { defineConfig, devices } from '@playwright/test';

/**
 * Business Central Playwright Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BC_BASE_URL || 'https://businesscentral.dynamics.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Screenshot configuration */
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true
    },

    viewport: { width: 1920, height: 1080 },
    launchOptions: {
      slowMo: 1300,
      args: [
        '--window-size=1920,1080',
        '--enable-features=VizDisplayCompositor'
      ],
    },

    /* Video recording configuration */
    video: {
      mode: 'on',
      size: { width: 1920, height: 1080 }
    },    /* Global timeout for actions */
    actionTimeout: 30000,

    /* Navigation timeout */
    navigationTimeout: 60000,
  },

  /* Output directories */
  outputDir: 'test-results/artifacts',

  /* Test timeout */
  timeout: 120000
});
