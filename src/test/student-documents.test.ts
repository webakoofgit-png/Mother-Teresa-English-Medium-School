import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { seed } from '@/data/demo';
import { studentDocument, type StudentDocumentKind } from '@/lib/student-documents';
import { createStudentPdf, type PdfPalette } from '@/lib/student-pdf';

const assets = { school: new Uint8Array(readFileSync('public/brand/school-logo.jpg')), foundation: new Uint8Array(readFileSync('public/brand/foundation-logo.jpeg')) };
const palette: PdfPalette = { primary: [152, 37, 54], heading: [100, 29, 43], gold: [214, 171, 54], ink: [53, 40, 44], muted: [120, 104, 107], border: [233, 223, 213], paper: [255, 250, 241] };
const kinds: StudentDocumentKind[] = ['profile', 'homework', 'fees', 'attendance', 'timetable', 'exams', 'results', 'notices', 'materials', 'calendar'];

describe('Branded student PDF documents', () => {
  it.each(kinds)('creates a genuine PDF with both official logos for %s', kind => {
    const data = seed(); const student = data.entities.students[0]!;
    const model = studentDocument(kind, data, student, undefined, '2026-10');
    const pdf = createStudentPdf(model, assets, palette, new Date('2026-11-03T10:00:00Z'), false);
    const output = pdf.output();
    expect(output.startsWith('%PDF-')).toBe(true);
    expect(output).toContain('/Subtype /Image');
    expect(output.match(/\/Subtype \/Image/g)).toHaveLength(2);
    expect(output).toContain('MOTHER TERESA');
    expect(output).toContain('Aarav Deshmukh');
    expect(output).toContain('DEMO DOCUMENT');
    expect(output).not.toContain('Anaya Patil');
  });

  it('uses the recorded payment amount and current account balance', () => {
    const data = seed(); const model = studentDocument('receipt', data, data.entities.students[0]!, 'p1');
    expect(JSON.stringify(model)).toContain('INR 6,000.00');
    expect(JSON.stringify(model)).toContain('INR 12,000.00');
    expect(() => studentDocument('receipt', data, data.entities.students[1]!, 'p1')).toThrow('not available');
  });

  it('excludes drafts and assignments for a different class or division', () => {
    const data = seed(); const student = data.entities.students[0]!;
    data.entities.homework.push({ id: 'hidden', class: '7', division: 'A', title: 'Draft secret', status: 'Draft' }, { id: 'other-section', class: '7', division: 'B', title: 'Another division', status: 'Published' });
    const text = JSON.stringify(studentDocument('homework', data, student));
    expect(text).not.toContain('Draft secret'); expect(text).not.toContain('Another division');
    expect(() => studentDocument('homework', data, student, 'hidden')).toThrow('not published');
  });

  it('applies notice audience filtering to both catalogues and individual downloads', () => {
    const data = seed(); data.entities.notices.push({ id: 'senior-only', title: 'Senior private circular', status: 'Published', audience: 'Selected Classes', class: '11' });
    expect(JSON.stringify(studentDocument('notices', data, data.entities.students[0]!))).not.toContain('Senior private circular');
    expect(() => studentDocument('notices', data, data.entities.students[0]!, 'senior-only')).toThrow('not available');
  });

  it('calculates result summaries separately for each examination', () => {
    const data = seed(); data.entities.results.push({ id: 'new-result', studentId: 's1', examId: 'another-exam', subject: 'Mathematics', marks: '45', maximum: '50', status: 'Published' });
    const model = studentDocument('results', data, data.entities.students[0]!);
    const summaries = model.sections.filter(s => s.title === 'Assessment summary');
    expect(summaries.map(s => s.rows?.[0])).toEqual([['82', '100', '82.0%', 'A'], ['45', '50', '90.0%', 'A']]);
  });

  it('continues long tables on new pages with repeated letterheads and page numbers', () => {
    const data = seed(); const model = studentDocument('profile', data, data.entities.students[0]!);
    model.sections = [{ title: 'Long register', columns: ['Reference', 'Description'], rows: Array.from({ length: 130 }, (_, i) => [String(i), 'A full description that remains inside the printable table area.']) }];
    const pdf = createStudentPdf(model, assets, palette, new Date('2026-11-03T10:00:00Z'), false);
    const output = pdf.output(); const pages = pdf.getNumberOfPages();
    expect(pages).toBeGreaterThan(1);
    expect(output.match(/MOTHER TERESA/g)).toHaveLength(pages);
    expect(output).toContain(`Page ${pages} of ${pages}`);
  });
});
