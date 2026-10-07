import { createServer } from 'node:http';
import { watch } from 'node:fs';
import { stat, readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { build, root } from './build.mjs';

await build();
const directory = resolve(root, 'dist');
const port = Number(process.env.PORT || 4173);
const types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.apk': 'application/vnd.android.package-archive',
};

createServer(async (request, response) => {
  try {
    let path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (path.endsWith('/')) path += 'index.html';
    if (!extname(path)) path += '.html';
    const file = resolve(directory, `.${path}`);
    if (!file.startsWith(directory + sep)) {
      response.writeHead(403).end();
      return;
    }
    if (!(await stat(file)).isFile()) throw new Error('Not a file');
    const body = await readFile(file);
    response.writeHead(200, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port}`));

if (process.argv.includes('--watch')) {
  let timer;
  let queued = Promise.resolve();
  for (const folder of ['src', 'public'])
    watch(resolve(root, folder), { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        queued = queued.then(build).catch(console.error);
      }, 100);
    });
  console.log('Watching source and public assets. Refresh the browser after a change.');
}
