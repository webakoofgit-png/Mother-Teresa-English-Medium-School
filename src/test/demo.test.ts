import { beforeEach, describe, expect, it } from 'vitest';
import { balance, repository, seed, visibleNotices } from '@/data/demo';

describe('Shared demo repository', () => {
  beforeEach(() => { localStorage.clear(); repository.reset(); });

  it('publishes homework without leaking it into other classes', () => {
    const homework = { id: 'new-assignment', title: 'Fractions practice', class: '7', division: 'A', status: 'Published' };
    repository.save('homework', homework);
    const data = repository.get();
    const assignedTo = data.entities.students.filter(student => data.entities.homework.some(h => h.id === homework.id && h.status === 'Published' && h.class === student.class && h.division === student.division));
    expect(assignedTo.map(student => student.id)).toEqual(['s1']);
    expect(JSON.parse(localStorage.getItem('mtems-demo-v1')!).entities.homework).toContainEqual(homework);
  });

  it('keeps fee totals consistent when an offline payment is recorded', () => {
    const before = balance(repository.get(), 's1');
    repository.save('payments', { id: 'test-payment', studentId: 's1', feeId: 'fs1', amount: '2500', date: '2026-11-03', method: 'Cash (demo)' });
    const after = balance(repository.get(), 's1');
    expect(after.total).toBe(before.total);
    expect(after.paid).toBe(before.paid + 2500);
    expect(after.outstanding).toBe(before.outstanding - 2500);
    expect(balance(repository.get(), 's2').paid).toBe(0);
  });

  it('updates the same attendance record without duplicating it', () => {
    repository.save('attendance', { id: 'register', studentId: 's1', date: '2026-11-03', status: 'Present' });
    repository.save('attendance', { id: 'register', studentId: 's1', date: '2026-11-03', status: 'Absent' });
    expect(repository.get().entities.attendance.filter(a => a.id === 'register')).toEqual([{ id: 'register', studentId: 's1', date: '2026-11-03', status: 'Absent' }]);
  });

  it('filters public, all-student and class-specific notice audiences', () => {
    const data = seed();
    data.entities.notices = [
      { id: 'public', audience: 'Public', status: 'Published' },
      { id: 'students', audience: 'All Students', status: 'Published' },
      { id: 'middle', audience: 'Selected Classes', class: '7', status: 'Published' },
      { id: 'senior', audience: 'Selected Classes', class: '11', status: 'Published' },
      { id: 'draft', audience: 'Public', status: 'Draft' },
    ];
    expect(visibleNotices(data).map(n => n.id)).toEqual(['public']);
    expect(visibleNotices(data, data.entities.students[0]).map(n => n.id)).toEqual(['public', 'students', 'middle']);
    expect(visibleNotices(data, data.entities.students[2]).map(n => n.id)).toEqual(['public', 'students', 'senior']);
  });

  it('resets content, enquiries, edits and demo sessions together', () => {
    repository.login('admin');
    repository.content({ hero: 'Edited headline' });
    repository.save('admissions', { id: 'enquiry', name: 'Fictional student' });
    repository.reset();
    expect(repository.get().session).toBeNull();
    expect(repository.get().entities.admissions).toEqual([]);
    expect(repository.get().content.hero).toBe(seed().content.hero);
  });
});
