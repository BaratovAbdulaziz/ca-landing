# Counter Arena website

Static marketing website with a home page, features page, and Android downloads page. Built with HTML, CSS, and a small Node.js build script; no browser framework or runtime dependencies.

## Local development

Requires Node.js 22 or later and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173. Source and asset changes rebuild automatically; refresh the browser to see them. Set `PORT` to use another port.

```sh
npm run check         # Build and verify local links, anchors, and assets
npm run format        # Format editable files
npm run format:check  # Check formatting without changing files
npm run preview      # Build and serve without watching
```

## Where to edit

| Path                      | Purpose                                                                      |
| ------------------------- | ---------------------------------------------------------------------------- |
| `src/pages/`              | Page content and matching JSON title/description metadata                    |
| `src/partials/`           | Shared head, header/navigation, and footer                                   |
| `src/styles/site.css`     | Shared tokens, components, landing and downloads styles                      |
| `src/styles/features.css` | Features page styles                                                         |
| `src/script.js`           | Small browser enhancements                                                   |
| `public/assets/`          | Images and logos served on the website                                       |
| `public/files/`           | Downloadable Android APK                                                     |
| `assets/`                 | Original design references and logo-generation sources                       |
| `scripts/`                | Build, local server, and validation                                          |
| `dist/`                   | Generated publishable output; never edit directly                            |
| `.stitch/`                | Existing design notes                                                        |
| `FEATURES.md`             | Product feature inventory; verify availability before changing public claims |

The build copies `public/` into `dist/`, renders shared partials around each page, and combines styles in their existing order. Navigation is defined once in `scripts/build.mjs`. Add a page by creating its HTML content and matching JSON metadata in `src/pages/`; add navigation there if needed.

## Design conventions

Use the existing spacing and color variables at the top of `site.css`. Standard CTAs use `.button` plus a color variant; store download badges use `.store-badge`. The styles preserve the existing responsive design and cascade. Keep Features page styling in its own file and shared components in `site.css`.

## Build and publish

```sh
npm ci
npm run check
```

Publish `dist/` as static files. Existing Sites configuration is in `.openai/hosting.json` and still points to `dist/`. Always build before publishing. Generated output, local deployment archives, dependencies, and environment secrets are ignored by Git. Old deployment archives are retained locally in `archive/`.

GitHub Actions runs formatting and site validation on pushes and pull requests. Source repository: [BaratovAbdulaziz/ca-landing](https://github.com/BaratovAbdulaziz/ca-landing). The Git remote uses SSH.
