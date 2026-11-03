import fs from 'node:fs';
const file = 'src/routes/index.tsx';
let source = fs.readFileSync(file, 'utf8');
if (!source.includes("from '@/components/website/home-hero'")) {
  source = "import { HomeHero, SchoolBrandBanner } from '@/components/website/home-hero';\n" + source;
  const start = source.indexOf('const headlineWords =');
  const end = source.indexOf('function Welcome()', start);
  if (start < 0 || end < 0) throw new Error('Homepage boundaries were not found.');
  source = source.slice(0, start) + source.slice(end);
  source = source.replace('<Hero />', '<HomeHero />').replace('<Welcome />', '<Welcome />\n      <SchoolBrandBanner />');
  source = source.replace('function Welcome() {\n  const data = useDemo();\n  return (\n    <section className="section-pad">', 'function Welcome() {\n  const data = useDemo();\n  return (\n    <section id="welcome-to-school" className="section-pad">');
  fs.writeFileSync(file, source);
}
const rootFile = 'src/routes/__root.tsx';
const root = fs.readFileSync(rootFile, 'utf8').replace('rel: "icon", type: "image/png", href: "/favicon.png"', 'rel: "icon", type: "image/jpeg", href: "/brand/school-logo.jpg"');
fs.writeFileSync(rootFile, root);
console.log('Homepage composition and original school favicon updated.');
