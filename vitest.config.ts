import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    globals: true,
    coverage: {
      reporter: ["text", "html"],
      provider: "v8",
    },
    include: ["src/__tests__/**/*.{test,spec}.ts"],
    exclude: ["./tests/e2e/**", "./playwright/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "server-only": path.resolve(__dirname, "src/__tests__/__mocks__/server-only.ts"),
    },
  },
});
