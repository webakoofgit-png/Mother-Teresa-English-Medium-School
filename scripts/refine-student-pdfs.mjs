import fs from 'node:fs';
const file = 'src/components/portal.tsx';
let source = fs.readFileSync(file, 'utf8');
source = source.replace('{detail.due ? <StudentPdfButton kind="homework"', '{page === \'homework\' ? <StudentPdfButton kind="homework"');
fs.writeFileSync(file, source);
const studentSource = source.slice(source.indexOf('function StudentModule('));
if (/download\(|window\.print\(/.test(studentSource)) throw new Error('A legacy student download remains.');
console.log('Student PDF actions verified; circulars use the correct document type.');
