import fs from 'node:fs';
const file = 'src/components/portal.tsx';
let source = fs.readFileSync(file, 'utf8');
if (source.includes("import { StudentPdfButton }")) { console.log('Student PDF actions already connected.'); process.exit(0); }
const start = source.indexOf('function StudentModule(');
if (start < 0) throw new Error('Student module not found.');
let student = source.slice(start);
function replace(before, after) { if (!student.includes(before)) throw new Error(`Student download target not found: ${before.slice(0, 90)}`); student = student.replace(before, after); }
replace("return <>{page === 'profile'", `return <><div className="student-document-toolbar">{page !== 'settings' && <StudentPdfButton kind={page as StudentDocumentKind} studentId={student.id} month={month} label={page === 'results' ? 'Download report card PDF' : page === 'materials' ? 'Download resource catalogue PDF' : page === 'homework' ? 'Download all homework PDF' : 'Download PDF'} />}</div>{page === 'profile'`);
replace('<button className="btn-outline" onClick={() => setDetail(h)}>View details</button>', '<button className="btn-outline" onClick={() => setDetail(h)}>View details</button><StudentPdfButton kind="homework" studentId={student.id} recordId={h.id} />');
replace('<button className="btn-outline" onClick={() => window.print()}>Print demo report card</button>', '<StudentPdfButton kind="results" studentId={student.id} label="Download report card PDF" />');
replace('<button className="btn-outline" onClick={() => download(`sample-${m.id}.txt`, `SAMPLE LEARNING RESOURCE\\n${m.title}\\n${m.description}\\nApproved school materials will replace this sample.`)}>Download sample</button>', '<StudentPdfButton kind="materials" studentId={student.id} recordId={m.id} label="Download resource PDF" />');
replace('<button className="btn-primary" onClick={() => receipt(detail)}>Download demo receipt</button>', '<StudentPdfButton kind="receipt" studentId={student.id} recordId={detail.id} label="Download receipt PDF" className="btn-primary" />');
replace("{detail.attachment && <button className=\"btn-outline\" onClick={() => download('sample-worksheet.txt', `SAMPLE WORKSHEET\\n${detail.title}\\n${detail.description}`)}>Download sample attachment</button>}", "{detail.due ? <StudentPdfButton kind=\"homework\" studentId={student.id} recordId={detail.id} label=\"Download assignment PDF\" /> : <StudentPdfButton kind=\"notices\" studentId={student.id} recordId={detail.id} label=\"Download circular PDF\" />}");
if (/download\(|window\.print\(/.test(student)) throw new Error('A legacy student download or print action still remains.');
source = "import { StudentPdfButton } from './student-pdf-button';\nimport type { StudentDocumentKind } from '@/lib/student-documents';\n" + source.slice(0, start) + student;
fs.writeFileSync(file, source);
console.log('All student downloads now use branded PDF generation.');
