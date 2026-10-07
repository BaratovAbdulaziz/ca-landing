import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { root } from './build.mjs';

const directory = resolve(root, 'dist');
const pages = (await readdir(directory)).filter((name) => name.endsWith('.html'));
const errors = [];
let checked = 0;
for (const page of pages) {
  const html = await readFile(resolve(directory, page), 'utf8');
  if (/\{\{\w+\}\}/.test(html)) errors.push(`${page}: unresolved template`);
  for (const match of html.matchAll(/(?:href|src|srcset)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(?:[a-z]+:|\/\/)/i.test(url)) continue;
    const [path, fragment] = url.split('#');
    const target = resolve(dirname(resolve(directory, page)), path || page);
    checked++;
    try {
      await access(target);
      if (fragment && target.endsWith('.html')) {
        const document = await readFile(target, 'utf8');
        if (!document.includes(`id="${fragment}"`)) errors.push(`${page}: missing anchor ${url}`);
      }
    } catch {
      errors.push(`${page}: missing local resource ${url}`);
    }
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else console.log(`Checked ${pages.length} pages and ${checked} local links/assets.`);
