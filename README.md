# BizWebLab

[![Deploy to GitHub Pages](https://github.com/iresa-org/biz-web-lab/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/iresa-org/biz-web-lab/actions/workflows/deploy-pages.yml)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/iresa-org/biz-web-lab/actions/workflows/deploy-pages.yml)
[![Angular](https://img.shields.io/badge/Angular-22-dd0031?logo=angular&logoColor=white)](https://angular.dev/)

Live site: https://iresa-org.github.io/biz-web-lab/

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.0.

## App structure

`web-showcase` is the main application. Its home page presents the feature concepts in a
manually controlled carousel with previous/next buttons, project selectors, and arrow-key
navigation. It uses Angular 22 standalone components, signals, and built-in template control flow.
Each concept's launch link opens its sub-app in a new browser tab. Carousel selectors only
switch previews. Sub-apps show their own business navigation without showcase headers,
footers, or back links.

| Route         | Project                 | Purpose                                                               |
| ------------- | ----------------------- | --------------------------------------------------------------------- |
| `/`           | `projects/web-showcase` | Showcase, service overview, and concept carousel                      |
| `/restaurant` | `projects/restaurant`   | Seasonal menu filters and a simulated table reservation               |
| `/dog-shop`   | `projects/dog-shop`     | Product categories and a local shopping bag                           |
| `/dealership` | `projects/dealership`   | Inventory filters, vehicle details, and simulated test-drive requests |

Feature libraries are lazy-loaded through their public APIs. TypeScript aliases resolve to
library sources, so serving or building the main app does not require separate library builds.
To add a concept, add a library route in `app.routes.ts` and an entry in `showcase-carousel.ts`.
All business names, products, prices, and vehicle specifications are mock data.
Interactions run entirely in browser memory and reset on reload. No backend, checkout,
personal-data collection, real bookings, or real test-drive requests are involved.
The host provides shared business-page styling through `business-pages.scss`; each library
adds its own theme. Images are served locally from the main app's public assets.
Existing GitHub Pages deep-link handling is retained.
Initial document loads preserve normal browser focus; subsequent in-app route changes focus
the main content, and the skip link remains available on every page.

## Project agent skills

Reusable workflows extracted from this project live in `.github/skills`:

- [Add a business demo](.github/skills/add-business-demo/SKILL.md): library wiring,
  standalone routing, carousel previews, mock interactions, themes, and local images.
- [Validate showcase UI](.github/skills/validate-showcase-ui/SKILL.md): targeted tests,
  production Chrome Lighthouse audits for performance, accessibility, best practices, and SEO,
  plus browser geometry, keyboard navigation, and mock-flow validation.

## Stock photography

Photos are sourced from Unsplash and used under the [Unsplash License](https://unsplash.com/license).
They are downloaded to `projects/web-showcase/public/images` so the app makes no runtime
requests to stock-photo services. Product and vehicle images are illustrative, not exact
representations of the fictional inventory.

Pages serve compressed WebP copies of the source JPEGs, retaining image dimensions,
priority loading for hero photos, and lazy loading for collection photos.
Native picture sources offer 480px and 768px images for mobile collection photos,
vehicle dialogs, and the dog-shop hero; desktop layouts retain the full-size WebP images.
The restaurant hero prefers AVIF with a WebP fallback. Direct restaurant visits preload only
the AVIF hero, after GitHub Pages URL restoration and using the document base URL, so other
routes do not download it. Unsupported AVIF browsers use the WebP fallback.
To regenerate the WebP files from the originals in PowerShell:

```powershell
$images = Get-ChildItem projects\web-showcase\public\images -Filter *.jpg -File | Select-Object -ExpandProperty FullName
npx --yes --package=sharp-cli sharp -i $images -o projects\web-showcase\public\images -f webp -q 75 --effort 6
$responsiveImages = $images | Where-Object { [IO.Path]::GetFileNameWithoutExtension($_) -ne 'restaurant-room' }
foreach ($width in @(480, 768)) {
  npx --yes --package=sharp-cli sharp -i $responsiveImages -o "projects\web-showcase\public\images\{name}-$width.webp" -f webp -q 75 --effort 6 resize $width
}
```

Regenerate the restaurant hero's AVIF source with:

```powershell
$restaurantHero = (Resolve-Path projects\web-showcase\public\images\restaurant-room.jpg).Path
npx --yes --package=sharp-cli sharp -i $restaurantHero -o projects\web-showcase\public\images\restaurant-room.avif -f avif -q 45 --effort 6
```

| Local image           | Original source                                                          |
| --------------------- | ------------------------------------------------------------------------ |
| `restaurant-room.jpg` | [Unsplash](https://images.unsplash.com/photo-1414235077428-338989a2e8c0) |
| `seasonal-salad.jpg`  | [Unsplash](https://images.unsplash.com/photo-1546069901-ba9599a7e63c)    |
| `fresh-pasta.jpg`     | [Unsplash](https://images.unsplash.com/photo-1551183053-bf91a1d81141)    |
| `berry-dessert.jpg`   | [Unsplash](https://images.unsplash.com/photo-1565958011703-44f9829ba187) |
| `golden-dog.jpg`      | [Unsplash](https://images.unsplash.com/photo-1552053831-71594a27632d)    |
| `trail-dog.jpg`       | [Unsplash](https://images.unsplash.com/photo-1558788353-f76d92427f16)    |
| `dog-bowl.jpg`        | [Unsplash](https://images.unsplash.com/photo-1589924691995-400dc9ecc119) |
| `dogs-playing.jpg`    | [Unsplash](https://images.unsplash.com/photo-1548199973-03cce0bbc87b)    |
| `car-road.jpg`        | [Unsplash](https://images.unsplash.com/photo-1492144534655-ae79c964c9d7) |
| `city-car.jpg`        | [Unsplash](https://images.unsplash.com/photo-1503376780353-7e6692767b70) |
| `adventure-car.jpg`   | [Unsplash](https://images.unsplash.com/photo-1519641471654-76ce0107ad1b) |

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
npx ng test web-showcase --watch=false
npx ng test restaurant --watch=false
npx ng test dog-shop --watch=false
npx ng test dealership --watch=false
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
