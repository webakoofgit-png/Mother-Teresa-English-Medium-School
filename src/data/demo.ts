import { useSyncExternalStore } from 'react';
import { images, news } from './site';

export type RecordData = { id: string; [key: string]: string };
export type Demo = { entities: Record<string, RecordData[]>; content: Record<string, string>; session: { role: string; studentId: string } | null };
export const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const row = (id: string, fields: Record<string, string>): RecordData => ({ id, ...fields });
export function seed(): Demo {
  const students = [row('s1', { name: 'Aarav Deshmukh', class: '7', division: 'A', roll: '12', guardian: 'Demo guardian', mobile: '9000000001', dob: '2014-06-12' }), row('s2', { name: 'Anaya Patil', class: 'Nursery', division: 'A', roll: '4', guardian: 'Demo guardian', mobile: '9000000002', dob: '2023-04-10' }), row('s3', { name: 'Ishaan Jadhav', class: '11', division: 'A', roll: '8', guardian: 'Demo guardian', mobile: '9000000003', dob: '2009-08-22' })].map(s => ({ ...s, admission: `DEMO-${s.id}`, status: 'Active', year: '2026–27', address: 'Fictional demo address, Karad', gender: 'Not specified', admissionDate: '2026-06-01' }));
  return { session: null, content: { hero: 'Where Young Minds Grow Into Bright Futures.', welcome: 'A Place to Learn. A Place to Belong.', principal: 'Editable welcome message: nurturing curiosity, character and confidence in every learner.', mission: 'Editable mission: joyful learning, strong values and a confident future.', vision: 'Editable vision: a caring community where every learner can flourish.', foundation: 'Shree Dhanlaxmi Foundation, Karad manages Mother Teresa English Medium School. Further details await confirmation.', foundationMission: 'Editable: supporting meaningful education.', foundationVision: 'Editable: opportunity through learning.', foundationValues: 'Care, integrity and educational commitment.', foundationInitiatives: 'Verified initiatives will be added by the foundation.', foundationContact: 'Contact details awaiting confirmation.', phone: 'Contact number awaiting confirmation', email: 'Email awaiting confirmation', admissions: 'Enquire about availability, eligibility and the current admission process with the school office.' }, entities: {
    students,
    classes: ['Nursery', 'Junior KG', 'Senior KG', ...Array.from({ length: 12 }, (_, i) => String(i + 1))].map((name, i) => row(`c${i}`, { name, division: 'A', teacher: 'Demo teacher', year: '2026–27' })),
    teachers: [row('t1', { name: 'Meera Kulkarni (Demo)', subject: 'Mathematics', class: '7', status: 'Active' }), row('t2', { name: 'Rohan Shah (Demo)', subject: 'English', class: '11', status: 'Active' })],
    homework: students.flatMap((s, i) => ['Mathematics', 'English', 'Environmental Studies'].map((subject, j) => row(`h${i}${j}`, { title: ['Explore patterns', 'My favourite story', 'Observe the world'][j], description: 'Demo assignment: complete the practice worksheet and bring your questions to the next class.', class: s.class, division: s.division, subject, teacher: 'Meera Kulkarni (Demo)', date: today(), due: '2026-11-20', attachment: 'Sample worksheet', status: 'Published' }))),
    completion: [],
    fees: students.map(s => row(`f${s.id}`, { studentId: s.id, category: 'Demo tuition installment', amount: '18000', due: '2026-12-01', year: '2026–27' })),
    'fee-structures': [],
    payments: [row('p1', { studentId: 's1', feeId: 'fs1', amount: '6000', date: '2026-10-01', method: 'Demo offline payment' })],
    attendance: students.flatMap(s => Array.from({ length: 20 }, (_, i) => row(`a${s.id}${i}`, { studentId: s.id, date: `2026-10-${String(i + 1).padStart(2, '0')}`, status: i === 6 ? 'Absent' : i === 13 ? 'Holiday' : 'Present' }))),
    timetable: students.flatMap(s => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].flatMap(day => ['English', 'Mathematics', 'Break', 'Creative learning'].map((subject, i) => row(`tt${s.id}${day}${i}`, { class: s.class, division: s.division, day, subject, teacher: subject === 'Break' ? '—' : 'Demo teacher', time: `${9 + i}:00 – ${9 + i}:45` })))),
    exams: students.map(s => row(`e${s.id}`, { title: 'Demo term assessment', class: s.class, subject: 'English', date: '2026-11-23', time: '09:00', maximum: '100', status: 'Published', year: '2026–27' })),
    results: students.map(s => row(`r${s.id}`, { studentId: s.id, examId: `e${s.id}`, subject: 'English', marks: '82', maximum: '100', status: 'Published' })),
    notices: news.map(n => row(n.id, { title: `Demo: ${n.title}`, description: n.excerpt, category: n.category, date: n.date, audience: 'Public', class: '7', pinned: 'No', status: 'Published' })),
    events: news.filter(n => n.category !== 'Notices').map(n => row(n.id, { title: `Demo: ${n.title}`, description: n.excerpt, date: n.date, category: n.category, status: 'Published' })),
    gallery: [images.classroom, images.schoolLibrary, images.campusActivities, images.heroSchool].map((url, i) => row(`g${i}`, { title: ['Learning together', 'A world of stories', 'Beyond the classroom', 'Curiosity in action'][i], url, category: ['Classrooms', 'Library', 'Activities', 'Classrooms'][i], status: 'Published' })),
    admissions: [], contacts: [], reads: [], preferences: [],
    materials: [row('m1', { title: 'Reading practice', subject: 'English', class: '7', description: 'Sample worksheet. Replace with an approved school document.' })],
    facilities: [row('fc1', { title: 'Classrooms', description: 'Sample category — facilities and photographs await school confirmation.', category: 'Learning', url: images.classroom, status: 'Published' }), row('fc2', { title: 'Library', description: 'Sample category — library details await confirmation.', category: 'Reading', url: images.schoolLibrary, status: 'Published' })],
    achievements: [row('ac1', { title: 'A step forward', description: 'Demo student achievement. Verified milestones will be published by the school.', category: 'Student', date: '2026-10-20', status: 'Published' })],
    testimonials: [row('ts1', { title: 'Demo parent voice', description: 'Sample testimonial: a welcoming place to learn and grow.', status: 'Published' })],
  } };
}
const KEY = 'mtems-demo-v1';
let state = seed();
let hydrated = false;
let storageError = '';
const listeners = new Set<() => void>();
function emit() { listeners.forEach(fn => fn()); }
function hydrate() {
  if (hydrated || typeof window === 'undefined') return;
  hydrated = true;
  try { const saved = localStorage.getItem(KEY); if (saved) { const parsed = JSON.parse(saved); if (parsed.entities?.students && parsed.content) state = { ...seed(), ...parsed }; } } catch { storageError = 'Saved demo data could not be loaded. This session uses fresh demo data.'; }
  window.addEventListener('storage', event => { if (event.key === KEY) { try { state = event.newValue ? JSON.parse(event.newValue) : seed(); emit(); } catch { /* Retain the current valid snapshot. */ } } });
}
export const repository = {
  get: () => state,
  error: () => storageError,
  commit(next: Demo) { hydrate(); state = next; try { localStorage.setItem(KEY, JSON.stringify(state)); storageError = ''; } catch { storageError = 'Browser storage is unavailable. Changes last for this session only.'; } emit(); },
  save(entity: string, value: RecordData) { const rows = state.entities[entity] ?? []; this.commit({ ...state, entities: { ...state.entities, [entity]: rows.some(r => r.id === value.id) ? rows.map(r => r.id === value.id ? value : r) : [...rows, value] } }); },
  remove(entity: string, id: string) { this.commit({ ...state, entities: { ...state.entities, [entity]: state.entities[entity].filter(r => r.id !== id) } }); },
  content(values: Record<string, string>) { this.commit({ ...state, content: { ...state.content, ...values } }); },
  login(role: string, studentId = '') { this.commit({ ...state, session: { role, studentId } }); },
  logout() { this.commit({ ...state, session: null }); },
  reset() { this.commit(seed()); },
};
const serverState = state;
export function useDemo() { return useSyncExternalStore(fn => { hydrate(); listeners.add(fn); emit(); return () => { listeners.delete(fn); }; }, () => state, () => serverState); }
export const uid = () => globalThis.crypto?.randomUUID?.() ?? `demo-${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const money = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
export function balance(data: Demo, id: string) { const total = data.entities.fees.filter(f => f.studentId === id).reduce((s, f) => s + Number(f.amount), 0); const paid = data.entities.payments.filter(p => p.studentId === id).reduce((s, p) => s + Number(p.amount), 0); return { total, paid, outstanding: total - paid }; }
export function visibleNotices(data: Demo, student?: RecordData) { return data.entities.notices.filter(n => n.status === 'Published' && (n.audience === 'Public' || !!student && (n.audience === 'All Students' || n.audience === 'Selected Classes' && n.class === student.class))); }
export function download(name: string, text: string, type = 'text/plain') { const url = URL.createObjectURL(new Blob([text], { type })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
export function csv(rows: RecordData[]) { const keys = [...new Set(rows.flatMap(Object.keys))]; const cell = (v: string) => `"${String(v ?? '').replace(/^[=+@-]/, "'$&").replaceAll('"', '""')}"`; return [keys, ...rows.map(r => keys.map(k => r[k]))].map(r => r.map(cell).join(',')).join('\r\n'); }
