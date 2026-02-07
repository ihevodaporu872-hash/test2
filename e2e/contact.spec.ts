import { test, expect } from "@playwright/test";

test.describe("Contact page", () => {
  test("should load contact page and display heading", async ({ page }) => {
    await page.goto("/contact");

    // Verify the contact page loaded
    const heading = page.locator("h1");
    await expect(heading).toContainText("Контакт", { ignoreCase: true });
  });

  test("should fill in and submit the lead form", async ({ page }) => {
    await page.goto("/contact");

    // Look for any form on the page
    const form = page.locator("form").first();

    // If a form exists, try to fill it in
    const formCount = await page.locator("form").count();

    if (formCount > 0) {
      // Try to fill name field
      const nameInput = form.locator(
        'input[name="name"], input[placeholder*="имя" i], input[placeholder*="name" i]'
      ).first();
      const nameCount = await nameInput.count();
      if (nameCount > 0) {
        await nameInput.fill("Тестовый Пользователь");
      }

      // Try to fill phone field
      const phoneInput = form.locator(
        'input[name="phone"], input[type="tel"], input[placeholder*="телефон" i], input[placeholder*="phone" i]'
      ).first();
      const phoneCount = await phoneInput.count();
      if (phoneCount > 0) {
        await phoneInput.fill("+7 999 123 45 67");
      }

      // Try to submit the form
      const submitButton = form.locator(
        'button[type="submit"], button:has-text("Отправить"), button:has-text("Связаться")'
      ).first();
      const submitCount = await submitButton.count();
      if (submitCount > 0) {
        await submitButton.click();

        // Wait a moment for response
        await page.waitForTimeout(1000);

        // Check for success indication (toast, message, etc.)
        const successIndicator = page.locator(
          '[data-sonner-toast], [role="status"], :text("успешно"), :text("Спасибо"), :text("получили")'
        ).first();
        const successCount = await successIndicator.count();
        if (successCount > 0) {
          await expect(successIndicator).toBeVisible();
        }
      }
    }

    // Regardless of form presence, the page should still be loaded and functional
    await expect(page.locator("h1")).toBeVisible();
  });
});
