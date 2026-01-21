import { test, expect } from "@playwright/test";
import { loginAsBuyer } from "../../playwright/auth.utils";

test.describe("User journey", () => {
  test("user can browse asset, add to cart, login, and reach checkout", async ({ page }) => {
    // 1️. --- Discover page ---
    await page.goto("/discover");

    // Assert discover page
    await expect(page.getByRole("heading", { name: "Discover Assets" })).toBeVisible();

    // Assert asset cards exist
    const count = await page.locator("[data-testid='asset-card']").count();
    expect(count).toBeGreaterThan(0);

    // Select first asset
    await page.locator("[data-testid='asset-card']").first().click();

    // Assert asset details page identity (wait for RSC render, not navigation)
    // await expect(page).toHaveURL(/\/assets\/.+/);
    await page.waitForSelector("[data-testid='asset-details']");


    // 2️. --- Add asset to cart ---
    const cartActionButton = page.getByTestId("cart-action-button");

    // Assert cart button should be "Add To Cart"
    await expect(cartActionButton).toHaveText(/add to cart/i);
    // Click the button
    await cartActionButton.click();
    
    // Assert cart button should be "Go To Cart" 
    await expect(cartActionButton).toHaveText(/go to cart/i);
    // Click the button
    await cartActionButton.click();

    // Assert cart page identity
    await page.waitForSelector("[data-testid='cart-page']");


    // 3️. --- Guest is prompted to login ---
    await page.getByRole("link", { name: /login to buy/i }).click();

    // Assert login page identity
    await page.waitForSelector("[data-testid='login-page']");


    // 4️. --- Login / Signup (handles callback internally) ---
    await loginAsBuyer(page);

    // Assert user is back on cart
    await page.waitForSelector("[data-testid='cart-page']");


    // 5️. --- Proceed to checkout ---
    const checkoutButton = page.getByRole("link", { name: /proceed to checkout/i });
    await expect(checkoutButton).toBeVisible();

    await checkoutButton.click();

    // Assert checkout page
    await page.waitForSelector("[data-testid='checkout-page']");


    // 6️. --- Click Pay Securely (Stripe redirect) ---
    const payButton = page.getByRole("button", { name: /pay securely/i });
    await expect(payButton).toBeVisible();

    // A real navigation, wait for URL
    await Promise.all([
      page.waitForURL(/checkout\.stripe\.com/),
      payButton.click(),
    ]);

    // Fill details
    await page.getByRole('textbox', { name: 'Card number' }).fill("4242 4242 4242 4242");
    await page.getByRole('textbox', { name: 'Expiration' }).fill("12 / 34");
    await page.getByRole('textbox', { name: 'CVC' }).fill("123");
    await page.getByRole('textbox', { name: 'Cardholder name' }).fill("Test");

    // Pay
    await Promise.all([
      page.waitForURL(/\/checkout\/success/),
      page.getByRole("button", { name: /pay/i }).click(),
    ]);

    // Assert success page identity
    await page.waitForSelector("[data-testid='checkout-success-page']");


    // 7. Go to library
    const libraryButton = page.getByRole("link", { name: /go to library/i });
    await expect(libraryButton).toBeVisible();

    await libraryButton.click();

    // Assert library page
    await page.waitForSelector("[data-testid='library-page']");

    // Assert asset count in library
    await expect(page.locator("[data-testid='library-asset']")).toHaveCount(1);
  });
});
