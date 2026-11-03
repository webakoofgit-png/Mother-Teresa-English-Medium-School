import { school } from '@/data/site';
import { balance, visibleNotices, type Demo, type RecordData } from '@/data/demo';

export type StudentDocumentKind = 'profile' | 'homework' | 'fees' | 'receipt' | 'attendance' | 'timetable' | 'exams' | 'results' | 'notices' | 'materials' | 'calendar';
export type DocumentSection = { title: string; paragraphs?: string[]; columns?: string[]; rows?: string[][] };
export type StudentDocument = { title: string; reference: string; student: { name: string; admission: string; className: string; roll: string; year: string }; sections: DocumentSection[]; note: string };
export const pdfMoney = (value: number) => `INR ${new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}`;
const grade = (percentage: number) => percentage >= 80 ? 'A' : percentage >= 60 ? 'B' : percentage >= 40 ? 'C' : 'D';
const value = (record: RecordData, key: string) => record[key] || 'Not provided';
const dateLabel = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(`${date}T12:00:00+05:30`)) : date || 'Not scheduled';

export function studentDocument(kind: StudentDocumentKind, data: Demo, student: RecordData, recordId?: string, month?: string): StudentDocument {
  if (!data.entities.students.some(s => s.id === student.id)) throw new Error('Student record not found.');
  const own = (r: RecordData) => r.studentId === student.id;
  const classMatch = (r: RecordData) => r.class === student.class && (!r.division || r.division === student.division);
  const titles: Record<StudentDocumentKind, string> = { profile: 'Student Profile', homework: recordId ? 'Homework Assignment' : 'Homework Planner', fees: 'Fee Statement', receipt: 'Payment Receipt', attendance: 'Monthly Attendance Report', timetable: 'Weekly Class Timetable', exams: 'Examination Schedule', results: 'Student Progress Report', notices: recordId ? 'School Circular' : 'Notices & Circulars', materials: recordId ? 'Learning Resource' : 'Learning Resource Catalogue', calendar: 'School & Learning Calendar' };
  const document: StudentDocument = {
    title: titles[kind], reference: `${school.shortName}-${kind.toUpperCase()}-${recordId || student.admission || student.id}`,
    student: { name: value(student, 'name'), admission: value(student, 'admission'), className: `${value(student, 'class')} / ${value(student, 'division')}`, roll: value(student, 'roll'), year: value(student, 'year') },
    sections: [], note: 'DEMO DOCUMENT | Fictional student records. Not an official school certificate or payment acknowledgement.',
  };
  const table = (title: string, columns: string[], rows: string[][]) => document.sections.push({ title, columns, rows: rows.length ? rows : [columns.map((_, i) => i === 0 ? 'No records available' : '-')] });
  if (kind === 'profile') {
    table('Student information', ['Field', 'Details'], [['Full name', value(student, 'name')], ['Admission number', value(student, 'admission')], ['Date of birth', dateLabel(student.dob)], ['Gender', value(student, 'gender')], ['Class / Division', document.student.className], ['Roll number', value(student, 'roll')], ['Academic year', value(student, 'year')], ['Admission date', dateLabel(student.admissionDate)], ['Status', value(student, 'status')]]);
    table('Parent / guardian information', ['Field', 'Details'], [['Parent / guardian', value(student, 'guardian')], ['Contact number', value(student, 'mobile')], ['Address', value(student, 'address')]]);
  }
  if (kind === 'receipt') {
    const payment = data.entities.payments.find(p => p.id === recordId && own(p));
    if (!payment) throw new Error('This payment is not available for the selected student.');
    const fee = data.entities.fees.find(f => f.id === payment.feeId && own(f));
    table('Transaction details', ['Field', 'Details'], [['Receipt reference', payment.id], ['Payment date', dateLabel(payment.date)], ['Payment method', payment.method], ['Fee category', fee?.category || 'Demo fee payment'], ['Academic year', fee?.year || document.student.year], ['Amount received', pdfMoney(Number(payment.amount))]]);
    table('Student fee account as of generation', ['Total assigned', 'Total paid', 'Outstanding'], (() => { const b = balance(data, student.id); return [[pdfMoney(b.total), pdfMoney(b.paid), pdfMoney(b.outstanding)]]; })());
    document.sections.push({ title: 'Payment record', paragraphs: ['This receipt represents a fictional offline payment recorded in the demo workspace. No real transaction has been processed.', 'Verification or an authorised signature must be obtained from the school office for actual payments.'] });
  }
  if (kind === 'fees') {
    const b = balance(data, student.id);
    table('Account summary', ['Assigned fees', 'Amount paid', 'Balance outstanding'], [[pdfMoney(b.total), pdfMoney(b.paid), pdfMoney(b.outstanding)]]);
    table('Installment breakdown', ['Category', 'Due date', 'Assigned (INR)', 'Paid (INR)', 'Balance (INR)'], data.entities.fees.filter(own).map(f => { const paid = data.entities.payments.filter(p => own(p) && p.feeId === f.id).reduce((sum, p) => sum + Number(p.amount), 0); return [f.category, dateLabel(f.due), pdfMoney(Number(f.amount)), pdfMoney(paid), pdfMoney(Number(f.amount) - paid)]; }));
    table('Payment history', ['Reference', 'Date', 'Method', 'Amount (INR)'], data.entities.payments.filter(own).map(p => [p.id, dateLabel(p.date), p.method, pdfMoney(Number(p.amount))]));
  }
  if (kind === 'homework') {
    const assignments = data.entities.homework.filter(h => classMatch(h) && h.status === 'Published' && (!recordId || h.id === recordId));
    if (recordId && !assignments.length) throw new Error('This assignment is not published for the selected class.');
    if (!recordId) table('Assignment overview', ['Subject', 'Assignment', 'Assigned', 'Due', 'Status'], assignments.map(h => [h.subject, h.title, dateLabel(h.date), dateLabel(h.due), data.entities.completion.some(c => own(c) && c.homeworkId === h.id) ? 'Completed' : 'To do']));
    for (const h of assignments) {
      document.sections.push({ title: h.title, paragraphs: [`Subject: ${h.subject} | Teacher: ${h.teacher}`, `Assigned: ${dateLabel(h.date)} | Due: ${dateLabel(h.due)}`, h.description, h.attachment ? `Sample attachment reference: ${h.attachment}. This PDF contains the available assignment instructions; no separate worksheet file has been provided.` : 'Complete the assignment as instructed by your teacher.'] });
    }
  }
  if (kind === 'attendance') {
    const selectedMonth = /^\d{4}-\d{2}$/.test(month || '') ? month! : new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date());
    const rows = data.entities.attendance.filter(a => own(a) && a.date.startsWith(selectedMonth)).sort((a, b) => a.date.localeCompare(b.date));
    const counted = rows.filter(a => a.status !== 'Holiday'); const present = rows.filter(a => a.status === 'Present').length;
    document.sections.push({ title: `Attendance period: ${selectedMonth}`, paragraphs: [`Attendance: ${counted.length ? (present / counted.length * 100).toFixed(1) : '0'}% | Present: ${present} | Absent: ${rows.filter(a => a.status === 'Absent').length} | Leave: ${rows.filter(a => a.status === 'Leave').length} | Holidays: ${rows.filter(a => a.status === 'Holiday').length}`, 'Only recorded school days are counted. Unrecorded days are excluded.'] });
    table('Daily register', ['Date', 'Attendance status'], rows.map(a => [dateLabel(a.date), a.status]));
  }
  if (kind === 'timetable') {
    for (const day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']) { const periods = data.entities.timetable.filter(t => classMatch(t) && t.day === day); if (periods.length) table(day, ['Timing', 'Subject / activity', 'Teacher'], periods.map(t => [t.time, t.subject, t.teacher])); }
  }
  if (kind === 'exams') table('Published examination schedule', ['Examination', 'Subject', 'Date', 'Time', 'Maximum marks'], data.entities.exams.filter(e => classMatch(e) && e.status === 'Published').map(e => [e.title, e.subject, dateLabel(e.date), e.time, e.maximum]));
  if (kind === 'results') {
    const results = data.entities.results.filter(r => own(r) && r.status === 'Published');
    for (const examId of new Set(results.map(r => r.examId))) {
      const exam = data.entities.exams.find(e => e.id === examId); const marks = results.filter(r => r.examId === examId);
      table(exam?.title || 'Published assessment', ['Subject', 'Marks obtained', 'Maximum', 'Percentage', 'Grade'], marks.map(r => { const p = Number(r.maximum) > 0 ? Number(r.marks) / Number(r.maximum) * 100 : 0; return [r.subject, r.marks, r.maximum, `${p.toFixed(1)}%`, grade(p)]; }));
      const total = marks.reduce((sum, r) => sum + Number(r.marks), 0); const maximum = marks.reduce((sum, r) => sum + Number(r.maximum), 0); const percentage = maximum > 0 ? total / maximum * 100 : 0;
      table('Assessment summary', ['Total obtained', 'Total maximum', 'Percentage', 'Overall grade'], [[String(total), String(maximum), `${percentage.toFixed(1)}%`, grade(percentage)]]);
    }
    document.sections.push({ title: 'Grading key', paragraphs: ['Demo grading: A = 80% and above; B = 60% to below 80%; C = 40% to below 60%; D = below 40%. Each examination is calculated separately. This is a demo progress report, not a certified report card.'] });
  }
  if (kind === 'notices') {
    const notices = visibleNotices(data, student).filter(n => !recordId || n.id === recordId);
    if (recordId && !notices.length) throw new Error('This circular is not available to the selected student.');
    notices.forEach(n => document.sections.push({ title: n.title, paragraphs: [`Published: ${dateLabel(n.date)} | Category: ${n.category}`, `Audience: ${n.audience}${n.audience === 'Selected Classes' ? ` - Class ${n.class}` : ''}`, n.description] }));
  }
  if (kind === 'materials') {
    const materials = data.entities.materials.filter(m => classMatch(m) && (!recordId || m.id === recordId));
    if (recordId && !materials.length) throw new Error('This resource is not assigned to the selected class.');
    materials.forEach(m => document.sections.push({ title: m.title, paragraphs: [`Subject: ${m.subject} | Class: ${student.class}`, m.description, 'SAMPLE LEARNING RESOURCE: this PDF contains the available demo resource description. An approved lesson or worksheet has not yet been supplied by the school.'] }));
  }
  if (kind === 'calendar') {
    const events = [...data.entities.events.filter(e => e.status === 'Published').map(e => ({ ...e, kind: 'School event' })), ...data.entities.exams.filter(e => classMatch(e) && e.status === 'Published').map(e => ({ ...e, kind: 'Examination' })), ...data.entities.homework.filter(h => classMatch(h) && h.status === 'Published').map(h => ({ ...h, date: h.due, kind: 'Homework due' }))].sort((a, b) => a.date.localeCompare(b.date));
    table('Important dates', ['Date', 'Type', 'Title'], events.map(e => [dateLabel(e.date), e.kind, e.title]));
  }
  if (!document.sections.length) document.sections.push({ title: 'No records available', paragraphs: ['There are no published records for this student in the selected section.'] });
  return document;
}
