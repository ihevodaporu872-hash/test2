import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should render hero section with Russian heading and CTA buttons", async ({
    page,
  }) => {
    await page.goto("/");

    // Verify the hero section is visible
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();

    // Verify h1 contains key Russian words about interior design
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    const headingText = await h1.textContent();
    expect(headingText).toContain("интерьеры");

    // Verify primary CTA button exists
    const primaryCta = page.getByRole("link", { name: "Обсудить проект" }).first();
    await expect(primaryCta).toBeVisible();

    // Verify secondary CTA button exists
    const secondaryCta = page.getByRole("link", { name: "Смотреть работы" });
    await expect(secondaryCta).toBeVisible();
  });

  test("should have correct page title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/INTERIOR STUDIO/);
  });
});
