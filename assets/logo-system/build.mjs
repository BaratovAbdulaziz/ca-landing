import { readFileSync, writeFileSync } from 'node:fs';

const source = readFileSync(new URL('../counter-arena-wordmark.png', import.meta.url));
const href = `data:image/png;base64,${source.toString('base64')}`;
const image = `<image href="${href}" x="0" y="0" width="2172" height="280"/>`;
const svg = (viewBox, content) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="Counter Arena logo"><title>Counter Arena</title>${content}</svg>`;
const wordX = 390;
const wordWidth = 2172 - wordX;
const variants = {
  '01-primary.svg': svg('0 0 2172 280', image),
  '02-secondary.svg': svg(`0 0 ${wordWidth} 650`, `<svg x="${(wordWidth - 360) / 2}" y="0" width="360" height="280" viewBox="0 0 360 280">${image}</svg><svg x="0" y="350" width="${wordWidth}" height="280" viewBox="${wordX} 0 ${wordWidth} 280">${image}</svg>`),
  '03-simplified.svg': svg(`${wordX} 0 ${wordWidth} 280`, image),
  '04-submark.svg': svg('0 0 360 280', image),
};

for (const [name, content] of Object.entries(variants)) {
  writeFileSync(new URL(name, import.meta.url), content);
  writeFileSync(new URL(`../../dist/assets/logo-system/${name}`, import.meta.url), content);
}
