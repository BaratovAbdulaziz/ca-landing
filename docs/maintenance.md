# Maintenance notes

## Shared layout

Every page is rendered with the same head, navigation, header action, and footer. Metadata lives next to the page content. Templates only support named `{{placeholders}}`; missing values fail the build. Keep new functionality in small scripts rather than adding a framework for static content.

## Styles

`site.css` preserves the existing cascade: foundational styles, responsive rules, downloads, editorial landing adjustments, light header/footer, then shared CTA sizing. `features.css` follows it. When changing a component, inspect its responsive rules as well as its base rule. Preserve this order when reorganizing styles; later rules intentionally override earlier design versions.

The old phone mockup rules are retained in the original Git history; the live pages use photography. Do not reintroduce unused illustration styles.

## Assets and downloads

Use `public/assets/` for files referenced by pages. Keep original brand references and editable logo tooling in `assets/`; these are not copied into the published site. Replace the APK in `public/files/` and update its version, size, and compatibility copy in `src/pages/downloads.html` together.

The Google Play badge remains disabled until a listing URL is available. The GitHub models link is a public content link, independent of the website's eventual Git remote.

## Validation and publication

Run `npm run check` and `npm run format:check` before a commit. The link check covers local files and fragment targets; it does not contact external services. Review desktop and mobile layouts when changing styles. Build output is disposable and should not be committed. Publishing requires a successful build and the existing hosting configuration.

This cleanup preserves the previously uncommitted Features page and navigation changes. It does not establish which planned features are implemented in the Android app; keep those claims grounded in the app source and product documentation.
