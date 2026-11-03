import fs from 'node:fs';
const file = 'src/styles.css';
let source = fs.readFileSync(file, 'utf8');
source = source.replaceAll('rgb(23 54 93 /', 'rgb(100 29 43 /').replaceAll('rgb(15 37 64 /', 'rgb(64 19 30 /');
fs.writeFileSync(file, source);
console.log('Logo colours applied to surfaces, overlays and shadows.');
