const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort());
});

test('photo likes and saves persist independently and can be removed', async ({ page }) => {
  await page.goto('index.html#contact');
  const like = page.locator('[data-id="0282"][data-action="liked"]');
  const save = page.locator('[data-id="0282"][data-action="saved"]');
  await like.click();
  await save.click();
  await page.reload();
  await expect(like).toHaveAttribute('aria-pressed', 'true');
  await expect(save).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Next photo', exact: true }).click();
  await expect(page.locator('[data-id="0278"][data-action="liked"]')).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Previous photo', exact: true }).click();
  await expect(like).toHaveAttribute('aria-pressed', 'true');
  await like.click();
  await page.reload();
  await expect(like).toHaveAttribute('aria-pressed', 'false');
  await expect(save).toHaveAttribute('aria-pressed', 'true');
  await save.click();
  await page.reload();
  await expect(save).toHaveAttribute('aria-pressed', 'false');
  for (let i = 1; i <= 7; i++) {
    await page.getByRole('button', {name: `Show photo ${i}`, exact:true}).click();
    await expect.poll(() => page.locator('.popup-photo').first().evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  expect((await page.locator('.popup-post').allTextContents()).join(' ')).not.toMatch(/likes|comments|Pop-up moments/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('blocked storage still allows toggling during the visit', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } });
  });
  await page.goto('index.html#contact');
  const like = page.locator('[data-id="0282"][data-action="liked"]');
  await like.click();
  await expect(like).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.popup-storage-note')).toBeVisible();
  await like.click();
  await expect(like).toHaveAttribute('aria-pressed', 'false');
});
