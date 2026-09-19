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
