import fs from 'node:fs';
const pdf = fs.readFileSync('d:/whasapp/MotherTeresa English meadium school logo.pdf');
const text = pdf.toString('latin1');
for (const match of text.matchAll(/(\d+)\s+0\s+obj([\s\S]*?)endobj/g)) {
  const body = match[2];
  if (body.includes('/Subtype /Image') || body.includes('/Subtype/Image')) {
    console.log('IMAGE OBJECT', match[1], body.slice(0, body.indexOf('stream')));
  }
}
console.log('PDF size', pdf.length);
