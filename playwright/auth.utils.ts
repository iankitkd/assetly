import { Page, expect } from "@playwright/test";

export async function login(page: Page) {
  await page.goto("/login");
  await page.fill("input[name='email']", "buyer@test.com");
  await page.fill("input[name='password']", "password123");
  await page.getByRole("button", { name: /login/i }).click();
  await expect(page).toHaveURL(/\/(dashboard|cart)/);
}

export async function loginAsBuyer(page: Page) {
  // 1️. Ensure we're on login page
  await page.waitForSelector("[data-testid='login-page']");

  // 2️. Switch to signup if needed
  const signupLink = page.getByRole("link", { name: /sign up/i });
  if (await signupLink.isVisible()) {
    await signupLink.click();
  }

  // 3️. Wait for signup form
  await page.waitForSelector("[data-testid='signup-form']");

  // 4️. Fill credentials (unique per run)
  const timestamp = Date.now();
  const name = `buyer_${timestamp}`;
  const email = `buyer_${timestamp}@test.com`;
  const password = "Password123!";

  await page.getByRole("textbox", { name: /^name$/i }).fill(name);
  await page.getByRole("textbox", { name: /^email$/i }).fill(email);
  await page.getByRole("textbox", { name: /^password$/i }).fill(password);

  // 5️. Submit signup
  await page.getByRole("button", { name: /register as user/i }).click();

  // 6️. Wait for redirect back (cart or callbackUrl)
  await page.waitForSelector("[data-testid='cart-page']");
}
