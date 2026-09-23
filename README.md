# Kalahari

A responsive handmade jewelry showcase using plain HTML, CSS, and JavaScript. Open `index.html`, or serve the repository root with a static server. No build step.

- `index.html`: Kalahari branding, collection, story, and contact content.
- `styles.css`: ivory #FBF5E9, champagne #D7C3A7, taupe #A8927A, gold #D4AF57, espresso #3E2B1F; responsive layout.
- `script.js`: mobile navigation and image previews. Set `studioEmail` to enable enquiries.
- `assets/kalahari-*`: supplied brand assets, copied without editing the originals. The brand board is retained as a reference; the standalone images appear on the page.

Item headings are descriptive labels. Product prices currently use S/ 50 placeholders and should be reviewed before launch. WhatsApp enquiries use the configured Peruvian phone number in `script.js`. Google Fonts has local system font fallbacks.

Updated brand assets are `assets/kalahari-v2-*`. The palette and values boards are kept as design references; the new logo, monogram, earring card, and label replace the previous branding on the site. Original assets remain preserved.

## GitHub Pages

In Settings → Pages, select **Deploy from a branch**, branch **main**, and folder **/(root)**. The root `index.html` is the homepage. No build step is required.

For a local preview, run `python3 -m http.server 8000` from the repository root and open `http://localhost:8000/`.

## Image and navigation tests

Tests use Playwright with Chromium at desktop (1440px) and mobile (390px) sizes. Node.js 22 or newer is recommended. The website itself still needs no build step.

```sh
npm ci
npx playwright install chromium
npm test
```

The test runner starts its own local server on port 4173 and serves the site at `/Kalahari/`, matching the GitHub Pages project path. Leave that port free. It checks all four pages, lazy-loaded product images, desktop dropdown previews, each product's image popup, local links and anchors, mobile overflow, and local resource or JavaScript errors. WhatsApp URLs are checked for their phone number and message format; tests do not send messages.

To inspect a failure, run `npm run test:report`. Failed runs save screenshots and traces in `test-results/`; the HTML report is in `playwright-report/`. These generated folders are ignored by Git.

`.github/workflows/site-tests.yml` runs the checks on pull requests to `main`, pushes to `main` and `nav-updates`, and manual runs. GitHub uploads the reports as the `playwright-report` artifact. Font requests use the site's system-font fallback to avoid failures caused by Google's availability. These are loading and behavior tests, not pixel-by-pixel screenshot comparisons or proof that the correct jewelry appears in a photo.

### Protecting production

The workflow must be pushed to GitHub and run before its check is available to select. In repository Settings → Rules → Rulesets (or branch protection), protect `main`, require a pull request, and require **Image and navigation checks** to pass before merging. Preserve existing rules. GitHub Pages remains configured to deploy from `main` at the repository root. A workflow file by itself does not block merges or prevent a direct push from deploying; the repository rule is required.
