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

## Cloudflare deployment

```sh
npm ci
npm run cf:login      # One-time browser authorization on this Mac
npm run cf:whoami     # Confirm account and permissions
npm run deploy:check  # Validate the site and Wrangler config without publishing
npm run deploy        # Build, validate, and publish to Cloudflare
```

`wrangler.jsonc` deploys `dist/` as Workers Static Assets under the Worker name `counter-arena-landing`. The custom domain is `counterarena.com`, verified as an active zone in the configured Cloudflare account. Wrangler also provides a `workers.dev` address. The account ID is pinned in the configuration; it is a public identifier, not a credential. Cloudflare provisions DNS and a TLS certificate when deploying the custom domain. Never commit tokens or login credentials.

Use `npm run cf:dev` to preview through the Cloudflare runtime. The original `npm run dev` remains the lightweight source-watching preview. Wrangler runs the build automatically before previewing or deploying.

The previous Sites configuration remains in `.openai/hosting.json` for the existing hosted copy. Deploy with Wrangler for the new Cloudflare domain. Generated output, local deployment archives, dependencies, Wrangler state, and environment secrets are ignored by Git. Old deployment archives are retained locally in `archive/`.

GitHub Actions runs formatting and a deployment dry run on pushes and pull requests; it does not publish or need Cloudflare credentials. Source repository: [BaratovAbdulaziz/ca-landing](https://github.com/BaratovAbdulaziz/ca-landing). The Git remote uses SSH.
