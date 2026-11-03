import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { images, school } from '@/data/site';
import type { StudentDocument } from './student-documents';

type RGB = [number, number, number];
export type PdfPalette = { primary: RGB; heading: RGB; gold: RGB; ink: RGB; muted: RGB; border: RGB; paper: RGB };
export type PdfAssets = { school: Uint8Array; foundation: Uint8Array };
const clean = (input: string) => String(input ?? '').replace(/[\u2010-\u2015]/g, '-').replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/\u20b9/g, 'INR ').replace(/\u2026/g, '...').replace(/\u2265/g, '>=').replace(/\u00b7/g, '|').replace(/\u2192/g, '->');
const CONTENT_TOP = 103;
const CONTENT_BOTTOM = 269;
let assetsPromise: Promise<PdfAssets> | undefined;

function paletteFromDocument(): PdfPalette {
  const style = getComputedStyle(document.documentElement);
  function token(name: string): RGB { const hex = style.getPropertyValue(name).trim().replace('#', ''); if (!/^[a-f\d]{6}$/i.test(hex)) throw new Error('The PDF colour theme could not be loaded.'); return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)]; }
  return { primary: token('--primary'), heading: token('--navy'), gold: token('--sunshine'), ink: token('--ink'), muted: token('--muted-foreground'), border: token('--border'), paper: token('--warm-white') };
}
async function loadAssets(): Promise<PdfAssets> {
  if (!assetsPromise) assetsPromise = Promise.all([images.mtemsLogo.url, images.foundationLogo.url].map(async url => { const response = await fetch(url); if (!response.ok) throw new Error('The school logos could not be loaded. Please retry.'); const bytes = new Uint8Array(await response.arrayBuffer()); if (bytes[0] !== 255 || bytes[1] !== 216) throw new Error('The school logo file is unavailable. Please refresh and retry.'); return bytes; })).then(([schoolLogo, foundationLogo]) => { if (!schoolLogo || !foundationLogo) throw new Error('Both official logos are required.'); return { school: schoolLogo, foundation: foundationLogo }; }).catch(error => { assetsPromise = undefined; throw error; });
  return assetsPromise;
}

/** A selectable-text A4 document. Long descriptions and tables continue on branded pages. */
export function createStudentPdf(model: StudentDocument, assets: PdfAssets, palette: PdfPalette, generatedAt = new Date(), compress = true): jsPDF {
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress });
  pdf.setProperties({ title: `${model.title} | ${school.name}`, subject: 'Fictional school portal demonstration document', author: school.name, creator: 'MTEMS Student Portal', keywords: 'school, student, demo, report' });
  let cursor = CONTENT_TOP;
  function pageBreak(required: number) { if (cursor + required > CONTENT_BOTTOM) { pdf.addPage(); cursor = CONTENT_TOP; } }
  function sectionTitle(text: string) { pageBreak(18); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(10); pdf.setTextColor(...palette.heading); const lines = pdf.splitTextToSize(clean(text), 177) as string[]; for (const line of lines) { pageBreak(7); pdf.text(line, 16, cursor); cursor += 5; } cursor += 2; }
  function paragraph(text: string) {
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9); pdf.setTextColor(...palette.ink);
    const lines = pdf.splitTextToSize(clean(text), 177) as string[];
    for (const line of lines) { pageBreak(5); pdf.text(line, 16, cursor); cursor += 4.8; }
    cursor += 3;
  }
  for (const section of model.sections) {
    sectionTitle(section.title);
    for (const text of section.paragraphs ?? []) paragraph(text);
    if (section.columns && section.rows) {
      autoTable(pdf, { startY: cursor, head: [section.columns.map(clean)], body: section.rows.map(row => row.map(clean)), margin: { top: CONTENT_TOP, bottom: 28, left: 16, right: 16 }, theme: 'grid', styles: { font: 'helvetica', fontSize: 8, cellPadding: 3, overflow: 'linebreak', textColor: palette.ink, lineColor: palette.border, lineWidth: .15, valign: 'middle' }, headStyles: { fillColor: palette.primary, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 }, alternateRowStyles: { fillColor: palette.paper }, rowPageBreak: 'avoid', showHead: 'everyPage' });
      cursor = (pdf as jsPDF & { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY ?? CONTENT_TOP;
      cursor += 10;
    } else cursor += 5;
  }
  const generated = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(generatedAt);
  const count = pdf.getNumberOfPages();
  for (let page = 1; page <= count; page++) {
    pdf.setPage(page);
    pdf.setFillColor(...palette.primary); pdf.rect(0, 0, 210, 3, 'F');
    pdf.addImage(assets.school, 'JPEG', 15, 12, 25, 25, 'school-badge', 'NONE');
    pdf.addImage(assets.foundation, 'JPEG', 170, 10, 28, 28, 'foundation-shield', 'NONE');
    pdf.setFont('helvetica', 'bold'); pdf.setTextColor(...palette.heading); pdf.setFontSize(12);
    pdf.text('MOTHER TERESA', 105, 17, { align: 'center' }); pdf.setFontSize(10); pdf.text('ENGLISH MEDIUM SCHOOL', 105, 23, { align: 'center' });
    pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); pdf.setTextColor(...palette.muted);
    pdf.text('Managed by Shree Dhanlaxmi Foundation, Karad', 105, 29, { align: 'center' });
    pdf.text('Malwadi (Masur), Tal. Karad, Dist. Satara, Maharashtra', 105, 34, { align: 'center' });
    pdf.setFontSize(6.5); pdf.text(`UDISE: ${school.udiseCode}  |  Institute: ${school.instituteCode}`, 105, 39, { align: 'center' });
    pdf.setDrawColor(...palette.gold); pdf.setLineWidth(.65); pdf.line(16, 45, 194, 45);
    pdf.setFont('helvetica', 'bold'); pdf.setFontSize(16); pdf.setTextColor(...palette.heading); pdf.text(clean(model.title), 16, 55);
    pdf.setFont('helvetica', 'normal'); pdf.setTextColor(...palette.muted); pdf.setFontSize(6.5);
    pdf.text(clean(`Reference: ${model.reference}`).slice(0, 110), 16, 62);
    pdf.setFillColor(...palette.paper); pdf.setDrawColor(...palette.border); pdf.setLineWidth(.2); pdf.roundedRect(16, 68, 178, 25, 2, 2, 'FD');
    const pairs = [[`Student: ${model.student.name}`, `Admission: ${model.student.admission}`], [`Class / Division: ${model.student.className}`, `Roll no.: ${model.student.roll}`], [`Academic year: ${model.student.year}`, 'Document type: Frontend demo']];
    pdf.setFontSize(8); pdf.setTextColor(...palette.ink);
    pairs.forEach(([left, right], index) => { const y = 75 + index * 6; pdf.text(pdf.splitTextToSize(clean(left || ''), 87).slice(0, 1), 20, y); pdf.text(pdf.splitTextToSize(clean(right || ''), 76).slice(0, 1), 114, y); });
    pdf.setDrawColor(...palette.border); pdf.line(16, 277, 194, 277); pdf.setFontSize(6.2); pdf.setTextColor(...palette.muted);
    pdf.text(clean(model.note), 16, 282, { maxWidth: 177 });
    pdf.text(`Generated: ${clean(generated)} IST`, 16, 290); pdf.text(`Page ${page} of ${count}`, 194, 290, { align: 'right' });
  }
  return pdf;
}

export async function downloadStudentPdf(model: StudentDocument): Promise<void> {
  const assets = await loadAssets();
  const pdf = createStudentPdf(model, assets, paletteFromDocument());
  const safe = (text: string) => text.normalize('NFKD').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(0, 70);
  const filename = `${school.shortName}-${safe(model.title)}-${safe(model.student.name)}-${safe(model.reference).slice(-18)}.pdf`;
  await pdf.save(filename, { returnPromise: true });
}
