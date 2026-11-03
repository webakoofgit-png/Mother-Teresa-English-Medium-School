import fs from 'node:fs';
import path from 'node:path';

// Preserve the supplied artwork byte for byte. The school PDF contains a JPEG;
// extracting its original stream avoids rasterising or redrawing the badge.
const sourceDirectory = 'd:/whasapp';
const outputDirectory = 'public/brand';
fs.mkdirSync(outputDirectory, { recursive: true });
const pdf = fs.readFileSync(path.join(sourceDirectory, 'MotherTeresa English meadium school logo.pdf'));
const text = pdf.toString('latin1');
const object = [...text.matchAll(/\d+\s+0\s+obj([\s\S]*?)endobj/g)].find(match => /\/Subtype\s*\/Image/.test(match[1]) && match[1].includes('/DCTDecode'));
if (!object) throw new Error('The supplied PDF has no original JPEG artwork.');
const streamStart = text.indexOf('stream', object.index) + 6;
const start = streamStart + (text.slice(streamStart, streamStart + 2) === '\r\n' ? 2 : 1);
const length = Number(object[1].match(/\/Length\s+(\d+)/)[1]);
const badge = pdf.subarray(start, start + length);
if (badge[0] !== 255 || badge[1] !== 216) throw new Error('Invalid embedded JPEG.');
fs.writeFileSync(`${outputDirectory}/school-logo.jpg`, badge);
fs.copyFileSync(path.join(sourceDirectory, 'WhatsApp Image 2026-11-03 at 2.06.15 PM.jpeg'), `${outputDirectory}/foundation-logo.jpeg`);
fs.copyFileSync(path.join(sourceDirectory, 'WhatsApp Image 2026-11-03 at 2.06.15 PM (1).jpeg'), `${outputDirectory}/school-banner.jpeg`);
for (const [filename, url, source] of [
  ['mtems-logo.png.asset.json', '/brand/school-logo.jpg', 'Original JPEG extracted unchanged from the supplied school logo PDF'],
  ['dhanlaxmi-foundation-logo.png.asset.json', '/brand/foundation-logo.jpeg', 'Original foundation JPEG supplied by the user'],
]) {
  const pointerPath = `src/assets/${filename}`;
  const pointer = JSON.parse(fs.readFileSync(pointerPath, 'utf8'));
  pointer.original_cdn_url ??= pointer.url;
  pointer.url = url;
  pointer.source = source;
  fs.writeFileSync(pointerPath, `${JSON.stringify(pointer, null, 2)}\n`);
}
console.log('Imported the original school badge, foundation logo and school banner.');
