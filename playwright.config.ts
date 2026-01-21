import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  testMatch: "**/*.spec.ts",
  timeout: 60_000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: "http://localhost:3000",
    // storageState: "playwright/.auth/user.json",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: true,
  },
});
