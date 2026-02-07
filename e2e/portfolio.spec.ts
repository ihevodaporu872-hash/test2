import { test, expect } from "@playwright/test";

test.describe("Portfolio", () => {
  test("should navigate to portfolio, click first project, and verify case study page", async ({
    page,
  }) => {
    await page.goto("/portfolio");

    // Verify the portfolio page loaded with the page header
    const pageTitle = page.locator("h1");
    await expect(pageTitle).toContainText("проект", { ignoreCase: true });

    // Find the first project card link and click it
    const firstProjectLink = page
      .locator('a[href^="/portfolio/"]')
      .first();
    await expect(firstProjectLink).toBeVisible();
    await firstProjectLink.click();

    // Verify the case study page loaded
    await page.waitForURL(/\/portfolio\/.+/);

    // Verify project title (h1) is visible on the detail page
    const projectTitle = page.locator("h1");
    await expect(projectTitle).toBeVisible();
    const titleText = await projectTitle.textContent();
    expect(titleText!.length).toBeGreaterThan(0);

    // Verify the gallery section exists
    const galleryHeading = page.getByText("Галерея проекта");
    await expect(galleryHeading).toBeVisible();
  });
});
