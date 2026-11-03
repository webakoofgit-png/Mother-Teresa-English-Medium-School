import { useState } from 'react';
import { Download, LoaderCircle } from 'lucide-react';
import { repository } from '@/data/demo';
import type { StudentDocumentKind } from '@/lib/student-documents';

export function StudentPdfButton({ kind, studentId, recordId, month, label = 'Download PDF', className = 'btn-outline' }: { kind: StudentDocumentKind; studentId: string; recordId?: string | undefined; month?: string | undefined; label?: string; className?: string }) {
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  async function generate() {
    setBusy(true); setError('');
    try {
      const [{ studentDocument }, { downloadStudentPdf }] = await Promise.all([import('@/lib/student-documents'), import('@/lib/student-pdf')]);
      const data = repository.get(); const student = data.entities.students.find(s => s.id === studentId);
      if (!student) throw new Error('The selected student could not be found.');
      await downloadStudentPdf(studentDocument(kind, data, student, recordId, month));
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'The PDF could not be generated. Please retry.'); }
    finally { setBusy(false); }
  }
  return <span className="pdf-download-control"><button type="button" className={className} disabled={busy} aria-busy={busy} onClick={generate}>{busy ? <LoaderCircle size={15} className="animate-spin" /> : <Download size={15} />}{busy ? 'Preparing PDF…' : label}</button>{error && <span role="alert" className="pdf-download-error">{error}</span>}</span>;
}
