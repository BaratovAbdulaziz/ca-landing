import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFile(resolve(root, path), 'utf8');
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
const render = (template, values) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in values)) throw new Error(`Missing template value: ${key}`);
    return values[key];
  });
const links = [
  ['Features', 'features.html'],
  ['How it works', 'index.html#how-it-works'],
  ['Exercises', 'index.html#exercises'],
  ['Downloads', 'downloads.html'],
  ['Privacy', 'index.html#privacy'],
];

export async function build() {
  const pages = (await readdir(resolve(root, 'src/pages')))
    .filter((name) => name.endsWith('.html'))
    .sort();
  const head = await read('src/partials/head.html');
  const header = await read('src/partials/header.html');
  const footer = await read('src/partials/footer.html');
  const output = [];
  for (const page of pages) {
    const metadata = JSON.parse(await read(`src/pages/${page.replace('.html', '.json')}`));
    const navigation = links
      .map(
        ([label, href]) =>
          `<a href="${href}"${href === page ? ' aria-current="page"' : ''}>${label}</a>`,
      )
      .join('\n');
    const values = {
      title: escape(metadata.title),
      description: escape(metadata.description),
      navigation,
      headerHref: page === 'downloads.html' ? 'index.html' : 'downloads.html',
      headerLabel: page === 'downloads.html' ? 'Back to home' : 'Get the app',
    };
    output.push([
      page,
      `<!doctype html>\n<html lang="en">\n${render(head, values)}\n<body>\n<a class="skip-link" href="#main">Skip to content</a>\n${render(header, values)}\n${await read(`src/pages/${page}`)}\n${footer}\n<script src="script.js"></script>\n</body>\n</html>\n`,
    ]);
  }
  const css = (await read('src/styles/site.css')) + '\n' + (await read('src/styles/features.css'));
  // Only replace disposable build output, after all source files have been read.
  await rm(resolve(root, 'dist'), { recursive: true, force: true });
  await mkdir(resolve(root, 'dist'), { recursive: true });
  await cp(resolve(root, 'public'), resolve(root, 'dist'), { recursive: true });
  for (const [page, html] of output) await writeFile(resolve(root, 'dist', page), html);
  await writeFile(resolve(root, 'dist/styles.css'), css);
  await cp(resolve(root, 'src/script.js'), resolve(root, 'dist/script.js'));
  console.log(`Built ${pages.length} pages into dist/`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
