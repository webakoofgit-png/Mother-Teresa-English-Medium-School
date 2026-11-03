import { useState, type FormEvent, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useDemo, type RecordData } from '@/data/demo';
import type { Field } from '@/data/modules';

export function Panel({ title, children, action }: { title?: string; children: ReactNode; action?: ReactNode }) { return <section className="demo-panel">{title && <div className="panel-heading"><h2>{title}</h2>{action}</div>}{children}</section>; }
export function Badge({ children }: { children: ReactNode }) { return <span className="demo-badge">{children}</span>; }
export function Empty({ text = 'Nothing here yet. New records will appear here.' }: { text?: string }) { return <div className="demo-empty"><span aria-hidden>✧</span><p>{text}</p></div>; }
export function Editor({ title, fields, initial, onSave, onClose }: { title: string; fields: Field[]; initial: RecordData; onSave: (value: RecordData) => string | void; onClose: () => void }) {
  const data = useDemo(); const [value, setValue] = useState(initial); const [error, setError] = useState('');
  function submit(e: FormEvent) { e.preventDefault(); const err = onSave(value); if (err) setError(err); else onClose(); }
  return <Dialog open onOpenChange={open => { if (!open) onClose(); }}><DialogContent className="max-h-[90vh] overflow-auto sm:max-w-2xl"><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>Frontend demonstration. Use fictional information only.</DialogDescription></DialogHeader><form onSubmit={submit} className="demo-form"><div className="form-grid">{fields.map(field => {
    let options = field.options?.map(v => ({ value: v, label: v }));
    if (field.type === 'classes') options = data.entities.classes.map(c => ({ value: c.name, label: `${c.name} · ${c.division}` }));
    if (['students', 'fees', 'exams'].includes(field.type ?? '')) options = data.entities[field.type!].map(r => ({ value: r.id, label: r.name || r.title || `${data.entities.students.find(s => s.id === r.studentId)?.name} · ${r.category} · ₹${r.amount}` }));
    const props = { id: `edit-${field.key}`, required: !field.optional, value: value[field.key] ?? '', onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setValue({ ...value, [field.key]: e.target.value }) };
    return <label key={field.key} className={field.type === 'textarea' ? 'wide' : ''} htmlFor={props.id}>{field.label}{options ? <select {...props}><option value="">Select…</option>{options.map((o, i) => <option key={`${o.value}-${i}`} value={o.value}>{o.label}</option>)}</select> : field.type === 'textarea' ? <textarea {...props} rows={4} /> : <input {...props} type={field.type || 'text'} min={field.type === 'number' ? 0 : undefined} step={field.type === 'number' ? '0.01' : undefined} pattern={field.type === 'tel' ? '[0-9+ ()-]{10,15}' : undefined} />}</label>;
  })}</div>{error && <p role="alert" className="text-destructive">{error}</p>}<div className="flex justify-end gap-3"><button type="button" className="btn-outline" onClick={onClose}>Cancel</button><button className="btn-primary" type="submit">Save changes</button></div></form></DialogContent></Dialog>;
}
export function Detail({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) { return <Dialog open onOpenChange={o => { if (!o) onClose(); }}><DialogContent className="max-h-[90vh] overflow-auto"><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>Demo school information</DialogDescription></DialogHeader>{children}</DialogContent></Dialog>; }
