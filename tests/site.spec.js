const { test, expect } = require('@playwright/test');
const pages = ['index.html', 'pearl-and-poise.html', 'stone-and-soul.html', 'glass-and-glow.html'];

// Visibility alone does not prove the browser decoded an image.
async function expectImage(image) {
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();
  const src = await image.getAttribute('src');
  await expect.poll(() => image.evaluate(el => el.complete && el.naturalWidth > 0 && el.naturalHeight > 0), {
    message: `Image must load and decode: ${src}`,
  }).toBe(true);
}

test.beforeEach(async ({ page }) => {
  // The site has system-font fallbacks. Avoid making Google availability a gate.
  await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort());
});

for (const file of pages) {
  test(`${file}: images, previews, links and layout`, async ({ page, baseURL, isMobile }) => {
    const failures = [];
    page.on('pageerror', error => failures.push(`JavaScript: ${error.message}`));
    page.on('response', response => {
      if (response.url().startsWith(new URL(baseURL).origin) && response.status() >= 400) {
        failures.push(`${response.status()} ${response.url()}`);
      }
    });
    page.on('requestfailed', request => {
      if (request.url().startsWith(new URL(baseURL).origin)) failures.push(`Failed: ${request.url()}`);
    });
    const response = await page.goto(file);
    expect(response.status()).toBe(200);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('[data-piece]').first()).toBeVisible();

    const images = page.locator('img');
    expect(await images.count()).toBeGreaterThan(3);
    for (const image of await images.all()) {
      if (await image.isVisible()) await expectImage(image);
    }
    // Explicitly assert product images, even if a CSS regression hides them.
    for (const image of await page.locator('main img').all()) await expectImage(image);

    if (!isMobile) {
      await page.locator('.collections-menu > summary').hover();
      await expect(page.locator('.collections-dropdown')).toBeVisible();
      const previews = page.locator('.collection-preview img');
      await expect(previews).toHaveCount(3);
      for (const image of await previews.all()) await expectImage(image);
      await page.locator('.collections-menu > summary').click();
    } else {
      await expect(page.locator('.collections-mobile-link')).toBeVisible();
      await expect(page.locator('.collections-menu')).toBeHidden();
    }

    for (const button of await page.locator('[data-piece]').all()) {
      const source = await button.locator('img').getAttribute('src');
      await button.click();
      await expect(page.locator('#piece-dialog')).toBeVisible();
      await expect(page.locator('#dialog-image')).toHaveAttribute('src', source);
      await expectImage(page.locator('#dialog-image'));
      await page.locator('.dialog-close').click();
      await expect(page.locator('#piece-dialog')).toBeHidden();
    }

    // Check local destinations and fragment IDs under /Kalahari/.
    const links = await page.locator('a[href]').evaluateAll(elements => elements.map(a => a.href));
    for (const href of new Set(links)) {
      const url = new URL(href);
      if (url.origin !== new URL(baseURL).origin) continue;
      expect(url.pathname, `Project-relative link: ${href}`).toMatch(/^\/Kalahari\//);
      const target = await page.request.get(href);
      expect(target.status(), href).toBe(200);
      if (url.hash) {
        const html = await target.text();
        expect(html, `Missing anchor ${href}`).toContain(`id="${decodeURIComponent(url.hash.slice(1))}"`);
      }
    }
    const whatsapp = links.filter(href => href.startsWith('https://wa.me/'));
    expect(whatsapp.length).toBeGreaterThan(0);
    for (const href of whatsapp) {
      const url = new URL(href);
      expect(url.pathname).toMatch(/^\/\d{8,15}$/);
      expect(url.searchParams.get('text')).toBeTruthy();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'No horizontal overflow').toBe(true);
    expect(failures, 'No missing local resources or JavaScript errors').toEqual([]);
  });
}

test('collection navigation reaches each page and returns home', async ({ page, isMobile }) => {
  for (const file of pages.slice(1)) {
    await page.goto('index.html');
    if (isMobile) {
      await page.locator('.collections-mobile-link').click();
      await expect(page).toHaveURL(/index\.html#collection$/);
      await page.locator(`.collection-card[href="${file}"]`).click();
    } else {
      await page.locator('.collections-menu > summary').hover();
      await page.locator(`.collection-preview[href="${file}"]`).click();
    }
    await expect(page).toHaveURL(new RegExp(file.replace('.', '\\.')));
    await expect(page.locator('h1')).toBeVisible();
    await page.locator('.site-header a[aria-label="Kalahari home"]').click();
    await expect(page).toHaveURL(/\/Kalahari\/index\.html(?:#.*)?$/);
  }
});
