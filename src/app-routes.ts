export type RouteView = 'home' | 'about' | 'principal' | 'public' | 'login' | 'portal' | 'redirect' | 'not-found';
export type AppRoute = { path: string; view: RouteView; title: string; redirect?: string };

const titleCase = (text: string) => text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
export const publicPaths = ['foundation', 'academics', 'academics/pre-primary', 'academics/primary-secondary', 'academics/higher-secondary', 'admissions', 'facilities', 'events', 'events/:id', 'gallery', 'achievements', 'notices', 'notices/:id', 'downloads', 'contact'];
export const studentModules = ['dashboard', 'profile', 'homework', 'fees', 'attendance', 'timetable', 'exams', 'results', 'notices', 'materials', 'calendar', 'settings'];
export const adminModules = ['dashboard', 'students', 'students/new', 'students/:id', 'admissions', 'classes', 'teachers', 'homework', 'fees', 'attendance', 'timetable', 'exams', 'results', 'notices', 'events', 'materials', 'website-content', 'gallery', 'foundation', 'contacts', 'reports', 'settings'];

export const appRoutes: AppRoute[] = [
  { path: '/', view: 'home', title: 'Mother Teresa English Medium School' },
  { path: '/about', view: 'about', title: 'About Our School' },
  { path: '/about/principal-message', view: 'principal', title: 'Principal’s Message' },
  ...publicPaths.map(path => ({ path: `/${path}`, view: 'public' as const, title: titleCase(path.split('/').filter(part => !part.startsWith(':')).at(-1) || path) })),
  { path: '/login', view: 'login', title: 'Student & Admin Demo Login' },
  ...studentModules.map(module => ({ path: `/student/${module}`, view: 'portal' as const, title: `Student ${titleCase(module)}` })),
  ...adminModules.map(module => ({ path: `/admin/${module}`, view: 'portal' as const, title: `Admin ${titleCase(module.replace(/\/:id$/, ' Profile').replace('/new', ' New'))}` })),
  { path: '/student', view: 'redirect', title: 'Student Portal', redirect: '/student/dashboard' },
  { path: '/admin', view: 'redirect', title: 'Admin Workspace', redirect: '/admin/dashboard' },
  { path: '*', view: 'not-found', title: 'Page Not Found' },
];
