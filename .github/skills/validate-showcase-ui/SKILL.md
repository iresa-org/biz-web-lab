---
name: validate-showcase-ui
description: Verify this Angular showcase with Chrome Lighthouse, targeted tests, and a real browser. Use for page-speed optimization, accessibility, SEO, best practices, responsive card alignment, routing, and mock interaction validation.
---

# Validate showcase UI

## Select checks by the change

Read [package.json](../../../package.json) and [angular.json](../../../angular.json) for
current targets. Run the smallest relevant test set:

```powershell
npx ng test dog-shop --watch=false
npx ng test restaurant --watch=false
npx ng test dealership --watch=false
npx ng test web-showcase --watch=false
```

These are alternatives, not a requirement to run all four for every edit. Run showcase
tests for routing, shell, or carousel changes and the affected library tests for interaction
changes. CSS geometry requires a real browser; DOM-only tests do not establish alignment.

For application changes, also run:

```powershell
npm run build
git --no-pager diff --check
```

Documentation-only changes do not require application builds or tests.

## Audit a production build with Chrome Lighthouse

1. Establish a before-change baseline for `/`, `/restaurant`, `/dog-shop`, and `/dealership`.
   Serve `dist/web-showcase/browser` after `npm run build`, not the Angular dev server.
   The preview must support SPA route fallback, correct MIME types, and realistic text
   compression. Keep serving conditions identical between before and after runs.
2. Locate an installed Chrome executable. On Windows, set `CHROME_PATH` explicitly if
   discovery fails. Check Lighthouse availability first; if missing, an ephemeral
   `npx --yes lighthouse@<version>` invocation avoids a permanent application dependency.
   Pin the same version for all comparison runs.
3. Use default mobile throttling for a mobile audit. Do not mix it with desktop scores;
   use a separate `--preset=desktop` run when desktop coverage is needed.
4. Include Performance, Accessibility, Best Practices, and SEO. Do not leave
   `--only-categories=performance` on final validation runs.
5. Save JSON for analysis and HTML for review outside the repository. Example with an
   existing writable report directory and a ready production preview:

   ```powershell
   $env:CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
   npx --yes lighthouse@13.6.0 http://127.0.0.1:4173/dog-shop --chrome-flags="--headless --no-first-run" --output=json --output=html --output-path="$reportDirectory\dog-shop" --quiet
   ```

6. Run audits sequentially, without builds, tests, image conversion, or other audits
   competing for CPU. For timing comparisons, take at least three runs per revision and
   report medians and ranges rather than selecting the best score.
7. Inspect `runWarnings`, environment metadata, and CPU-calibration warnings. On a shared
   machine, distinguish unstable Total Blocking Time and scores from deterministic
   resource-size savings; never promise a stable production score from these lab results.

Read `first-contentful-paint`, `largest-contentful-paint`, `total-blocking-time`,
`cumulative-layout-shift`, `speed-index`, and `total-byte-weight`. Use image-delivery,
LCP-breakdown, and long-task details to choose changes, not generic optimization lists.
Measure before and after on the same route; keep the initially text-only showcase distinct
from photo-heavy business pages.

Inspect every failed audit reference, including zero-weight diagnostics. A category score
of 100 can coexist with `label-content-name-mismatch` failures. Preserve each control's
complete visible label in its accessible name, appending contextual text instead of
interrupting the label. Rebuild and rerun affected audits after fixes.

Prefer compressed local WebP and appropriate mobile picture sources for image bottlenecks.
Keep hero priority and below-fold lazy loading. Do not preload every route's hero globally,
raise budgets, or introduce SSR/backend dependencies simply to chase a score.
Verify image `currentSrc`, natural dimensions, visual appearance, and request sizes after
changes. Check for duplicate downloads when adding picture sources.

For late hero discovery, the existing restaurant preload in
[index.html](../../../projects/web-showcase/src/index.html) is route-specific: compare
against the document base URL, restore GitHub Pages deep links first, and set the matching
image MIME type. Test root and deployed base paths, trailing slashes, restored links,
and unrelated routes. An AVIF preload must not trigger a WebP download in AVIF-capable
browsers; verify the WebP fallback separately.

If Lighthouse attributes forced reflow to `mainContent.focus()`, distinguish initial
document load from in-app navigation. The shell preserves native initial focus and focuses
main only after subsequent route activations. Check the browser's first Tab reaches the
skip link and later navigations still focus main. Merely moving focus to
`afterNextRender` does not guarantee layout is no longer forced: rerun the diagnostic
before keeping a scheduling change.

## Start a controlled browser check

1. Use an existing responsive dev server if available. Otherwise start the host with
   `npx ng serve web-showcase`, recording the process or managed server handle.
2. Verify readiness with an HTTP request before opening the browser. Account for a non-root
   base path if using a production preview.
3. Discover the available browser tools. Read the page and inspect browser errors before
   testing interactions. Do not install a new end-to-end framework just for a small fix.
4. Subscribe to page errors and fetch/XHR traffic before navigation when validating the
   mock-only contract. Avoid collecting request bodies or unrelated browsing data.

## Verify the exact layout requirement

For responsive card work, test widths 1440, 1024, 768, 390, and 320 CSS pixels.
Wait for images and fonts to settle before measuring.

- Use `getBoundingClientRect()` to measure actual button positions, card edges, and image
  heights. Group cards by their rendered row; do not compare stacked rows as if they were one.
- Within each row, calculate `max(buttonTop) - min(buttonTop)`. Report the actual spread.
  Target zero; tolerate at most 1 CSS pixel for fractional rendering.
- Verify button bounds remain inside their cards, text does not overlap actions, photos
  retain nonzero height, and `document.documentElement.scrollWidth` does not exceed
  `document.documentElement.clientWidth`.
- Exercise differing text lengths and relevant filtered states, not only the first render.
- Inspect the page visually as well as measuring geometry.

For unequal card content, first consider the existing
[dog-shop.css](../../../projects/dog-shop/src/lib/dog-shop.css) pattern: a stretched grid,
flex-column card, nonshrinking photo, growing flex-column body, and `margin-top: auto` on
the action. Avoid fixed text heights or arbitrary spacers. Confirm this matches the actual
DOM before applying it elsewhere.

## Verify navigation when affected

- The home route has the Iresa showcase shell; business routes have only their own branding.
- No showcase header, footer, or return link appears inside a business demo.
- Carousel selection, previous/next wrap, and arrow keys still work.
- Launch anchors retain the expected route, `_blank` target, safe `rel`, and accessible
  new-tab label. Distinguish attribute/test verification from observed popup creation.
- In-page section links and the skip link keep the current business route.
- Direct route entry and the existing unknown-route fallback still work.
- Do not claim GitHub Pages deployment or production deep-link verification from a local
  development-server check alone.

## Verify mock flows when affected

Use the current fixtures and assert visible outcomes rather than incidental implementation:

- Restaurant: menu category filtering, reservation dialog, simulated confirmation,
  dismissal, and focus after confirmation.
- Dog shop: category filtering, repeated additions increasing quantity, correct subtotal,
  removal, clear, empty state, and focus after line/action removal.
- Dealership: body-style and budget filters together, empty/reset behavior, vehicle details,
  simulated test-drive confirmation, and focus after confirmation.
- Reload resets interaction state. No real transaction or personal-data collection occurs.
- Confirm no fetch/XHR requests were observed during tested flows. Static image and
  development-server traffic are not backend API calls; report scope accurately.

Check keyboard operation, labelled dialogs, Escape, status announcements, and visible focus.
Open dialogs with Enter, Tab through enough controls to verify focus remains trapped,
then verify Escape closes the dialog and restores focus to its opener. After confirmation,
removal, or clear actions, confirm focus lands on a surviving dialog control. Test the skip
link with the keyboard and assert focus reaches `main-content` without changing the route.
Lighthouse's initial page audit does not establish accessibility of closed dialog content.
Use an available accessibility checker for changed pages and dialog states, supplemented
by contrast inspection for theme colors. If tooling is unavailable, state that limitation;
do not claim a clean automated accessibility result.

## Close out honestly

Stop only temporary servers started for this check, using their recorded handles or PIDs.
Remove only known temporary artifacts. Report commands run, tested routes/viewports,
measured outcomes, and any unverified behavior. Do not turn a tool limitation into an
application change without independent evidence of a bug.
