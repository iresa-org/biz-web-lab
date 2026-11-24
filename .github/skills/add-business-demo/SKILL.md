---
name: add-business-demo
description: Add or extend a standalone Angular business demo in this showcase, including lazy library routing, carousel previews, local mock interactions, stock assets, and business-specific styling. Use when adding a new concept or expanding a restaurant, retail, automotive, or similar demo.
---

# Add a business demo

## Read the current implementation first

Use the existing demo closest to the requested interaction as a reference:

- [Dog shop](../../../projects/dog-shop/src/lib/dog-shop.ts): categories, bag quantities, and totals.
- [Restaurant](../../../projects/restaurant/src/lib/restaurant.ts): menu filtering and simulated reservations.
- [Dealership](../../../projects/dealership/src/lib/dealership.ts): combined filters, empty results, and detail dialogs.

Inspect the matching templates and styles as well. Preserve existing uncommitted scaffolding;
do not regenerate an existing library or replace unrelated workspace configuration.
Check the installed Angular version before applying version-dependent advice.

## Wire a new concept end to end

Skip scaffolding steps for an existing concept.

1. Use Angular CLI's library generator for a genuinely new library, following the current
   workspace configuration in [angular.json](../../../angular.json).
2. Export the standalone page component from the library's `src/public-api.ts`.
3. In [tsconfig.json](../../../tsconfig.json), map the library name directly to its source
   public API, not a `dist` build. Keep library/spec project references consistent.
4. Declare `@angular/router` as a library peer dependency if the page imports router directives.
5. Add a titled, lazy `loadComponent` route importing the public API in
   [app.routes.ts](../../../projects/web-showcase/src/app/app.routes.ts), before the wildcard.
6. Add the carousel entry in
   [showcase-carousel.ts](../../../projects/web-showcase/src/app/home/showcase-carousel.ts).
   Extend the typed preview configuration and the matching template/style variants in
   [concept-preview.ts](../../../projects/web-showcase/src/app/home/concept-preview.ts).
7. Update the route table and any asset sources in [README.md](../../../README.md).

## Preserve the standalone experience

- Only the home route opts into `data: { showcaseNavigation: true }`. Business routes must
  not show showcase headers, footers, or a "Back to showcase" link.
- Carousel selectors switch previews. The launch anchor opens the selected route with
  `target="_blank"`, `rel="noopener noreferrer"`, and an accessible new-tab announcement.
- Preserve the showcase's visible `iresa` wordmark; do not reintroduce the removed text logo.
- Use `[routerLink]="[]"` with `fragment` for business-page section links. Plain fragment
  links can resolve against the root base URL and accidentally leave the sub-app.
- Preserve normal browser focus on initial document load; focus main on subsequent
  in-app route activations. Keep the route-safe skip link available on every page.
- Retain existing GitHub Pages base-href and deep-link handling.

## Implement a convincing, browser-only demo

- Use standalone components, typed readonly fixture data, signals for mutable state,
  `computed` for derived data, signal inputs where needed, and `@if`/`@for` with stable keys.
  Follow the installed Angular version's change-detection defaults.
- Keep state in browser memory and reset on reload. Do not introduce HTTP, backend calls,
  storage, real orders, payments, reservations, or personal-information collection.
- Make simulated outcomes explicit in both the page notice and confirmation copy.
- Cover relevant edge states: combined filters with no matches, reset, empty bag,
  duplicate quantities, removal, and completed simulated requests.
- Use labelled native dialogs, explicit close controls, and Escape dismissal. Move focus
  to a surviving control before an action removes or disables the focused control.
  Announce relevant state changes with a status region.

## Reuse the visual foundation

- Reuse [business-pages.scss](../../../projects/web-showcase/src/business-pages.scss) for
  grids, cards, buttons, dialogs, and navigation; use component `--biz-*` variables and
  scoped styles for the business theme.
- Keep component stylesheet budgets intact. Extract genuinely shared styles or split
  cohesive UI components instead of raising budgets.
- Bundle licensed stock photos under `projects/web-showcase/public/images` and record their
  source URLs and license in the README. Avoid runtime stock-service requests.
- Serve compressed WebP images, retaining JPEG originals for regeneration. Follow the
  documented Sharp CLI commands in the README rather than adding a runtime image service.
- Offer 480px and 768px mobile variants through native `<picture>` sources where appropriate;
  keep the full-size WebP fallback for desktop. Preserve the aspect ratio when generating
  variants. Inspect the actual `currentSrc` at mobile device pixel ratios, not just `src`.
  Full-bleed heroes using `object-fit: cover` may need more pixels than their viewport width.
- For a measured hero bottleneck, compare AVIF with WebP rather than changing quality
  blindly. The restaurant uses a typed AVIF picture source with a WebP image fallback.
  Keep any early preload's format and URL identical to the preferred source so capable
  browsers do not download both.
- Use `NgOptimizedImage`, meaningful alt text, responsive `sizes`, and `priority` for hero
  images. For `fill`, ensure a positioned container with real dimensions.
- Keep each control's complete visible text in its accessible name. Append context instead
  of inserting it into the label: `Add to bag: Product name`, `View vehicle: Vehicle name`,
  and `Explore the concept: Business type (opens in a new tab)`.
- Images are illustrative: do not imply stock photos verify fictional product specifications.

## Finish

Use the [validation skill](../validate-showcase-ui/SKILL.md) for affected routes and flows.
Add focused tests in the existing library and showcase specs for new behavior, run the
affected targets and production build, and report only outcomes actually verified.
