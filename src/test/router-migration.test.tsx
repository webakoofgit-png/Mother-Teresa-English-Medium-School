import { act, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { MemoryRouter, Route, Routes, matchRoutes, useLocation } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { appRoutes } from '@/app-routes';
import { AppRoutes } from '@/App';
import { LoginPage, Portal } from '@/components/portal';
import { SiteHeader } from '@/components/layout/site-header';
import { PublicPage } from '@/components/website/public-pages';
import { repository } from '@/data/demo';

let root: Root | undefined;
let container: HTMLDivElement;
async function render(children: ReactNode, path: string) {
  container = document.createElement('div'); document.body.appendChild(container); root = createRoot(container);
  await act(async () => { root!.render(<MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>); });
}
function LocationProbe() { return <output data-location>{useLocation().pathname}</output>; }
function button(text: string) { const match = [...container.querySelectorAll('button')].find(node => node.textContent?.includes(text)); if (!match) throw new Error(`Button not found: ${text}`); return match; }
beforeEach(() => { localStorage.clear(); repository.reset(); });
afterEach(async () => { if (root) await act(async () => root!.unmount()); root = undefined; document.body.replaceChildren(); });

describe('React Router route coverage', () => {
  it.each(appRoutes.filter(route => !route.path.includes(':') && route.path !== '*'))('matches $path to its intended view', route => {
    const match = matchRoutes(appRoutes, route.path)?.at(-1);
    expect(match?.route.path).toBe(route.path);
    expect(match?.route.view).toBe(route.view);
  });
  it.each([['/events/n2', '/events/:id', 'n2'], ['/notices/n1', '/notices/:id', 'n1'], ['/admin/students/s1', '/admin/students/:id', 's1']])('resolves dynamic URL %s', (url, pattern, id) => {
    const match = matchRoutes(appRoutes, url!)?.at(-1);
    expect(match?.route.path).toBe(pattern); expect(match?.params.id).toBe(id);
  });
  it('shows a helpful 404 for unknown paths', async () => { await render(<AppRoutes />, '/not-a-school-page'); expect(container.textContent).toContain('Page not found'); expect(container.querySelector('a')?.getAttribute('href')).toBe('/'); });
});

describe('Demo navigation after migration', () => {
  it('enters the selected student demo and navigates to its dashboard', async () => {
    await render(<Routes><Route path="/login" element={<LoginPage />} /><Route path="/student/dashboard" element={<LocationProbe />} /></Routes>, '/login');
    const select = container.querySelector('select')!;
    await act(async () => { select.value = 's3'; select.dispatchEvent(new Event('change', { bubbles: true })); });
    await act(async () => button('Enter student demo').click());
    expect(repository.get().session).toEqual({ role: 'student', studentId: 's3' });
    expect(container.querySelector('[data-location]')?.textContent).toBe('/student/dashboard');
  });
  it('enters the admin demo and navigates to its dashboard', async () => {
    await render(<Routes><Route path="/login" element={<LoginPage />} /><Route path="/admin/dashboard" element={<LocationProbe />} /></Routes>, '/login');
    await act(async () => button('Enter admin demo').click());
    expect(repository.get().session?.role).toBe('admin'); expect(container.textContent).toBe('/admin/dashboard');
  });
  it('redirects an unauthenticated student route to login', async () => {
    await render(<Routes><Route path="/student/profile" element={<Portal />} /><Route path="/login" element={<LocationProbe />} /></Routes>, '/student/profile');
    expect(container.textContent).toBe('/login');
  });
  it('prevents a student session from entering an admin route', async () => {
    repository.login('student', 's1');
    await render(<Routes><Route path="/admin/students" element={<Portal />} /><Route path="/login" element={<LocationProbe />} /></Routes>, '/admin/students');
    expect(container.textContent).toBe('/login');
  });
  it('renders the selected learner and signs out to login', async () => {
    repository.login('student', 's1');
    await render(<Routes><Route path="/student/profile" element={<Portal />} /><Route path="/login" element={<LocationProbe />} /></Routes>, '/student/profile');
    expect(container.textContent).toContain('Aarav Deshmukh'); expect(container.textContent).not.toContain('Anaya Patil');
    expect(button('Download PDF')).toBeTruthy();
    await act(async () => button('Sign out').click());
    expect(repository.get().session).toBeNull(); expect(container.textContent).toBe('/login');
  });
  it('marks the current header link active', async () => {
    await render(<SiteHeader />, '/about');
    const selected = container.querySelector('nav[aria-label="Main navigation"] a.selected');
    expect(selected?.textContent).toBe('About'); expect(selected?.getAttribute('aria-current')).toBe('page');
  });
  it('renders an individual public notice at its existing URL', async () => {
    await render(<PublicPage />, '/notices/n1');
    expect(container.textContent).toContain(repository.get().entities.notices[0]!.title);
    expect([...container.querySelectorAll('a')].some(a => a.getAttribute('href') === '/notices' && a.textContent?.includes('Back to'))).toBe(true);
  });
});
