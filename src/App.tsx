import { Component, Suspense, lazy, useEffect, useLayoutEffect, useRef, type ErrorInfo, type ReactNode } from 'react';
import { Link, Navigate, matchRoutes, useLocation, useNavigationType, useRoutes, type RouteObject } from 'react-router-dom';
import { appRoutes, type AppRoute } from './app-routes';
import { school } from './data/site';
import { reportLovableError } from './lib/lovable-error-reporting';

const Home = lazy(() => import('./routes/index'));
const About = lazy(() => import('./routes/about'));
const Principal = lazy(() => import('./routes/principal-message'));
const PublicPage = lazy(() => import('./components/website/public-pages').then(module => ({ default: module.PublicPage })));
const Login = lazy(() => import('./components/portal').then(module => ({ default: module.LoginPage })));
const Portal = lazy(() => import('./components/portal').then(module => ({ default: module.Portal })));

function NotFound() {
  return <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-background px-5 text-center"><p className="eyebrow">A LITTLE OFF THE BEATEN PATH</p><h1 className="font-display text-7xl font-bold">404</h1><h2 className="text-xl font-semibold">Page not found</h2><p className="max-w-md text-muted-foreground">The page you’re looking for doesn’t exist or has moved.</p><Link to="/" className="btn-primary">Back to our school</Link></main>;
}

function elementFor(route: AppRoute): ReactNode {
  switch (route.view) {
    case 'home': return <Home />;
    case 'about': return <About />;
    case 'principal': return <Principal />;
    case 'public': return <PublicPage />;
    case 'login': return <Login />;
    case 'portal': return <Portal />;
    case 'redirect': return <Navigate to={route.redirect || '/'} replace />;
    case 'not-found': return <NotFound />;
  }
}
const routes: RouteObject[] = appRoutes.map(route => ({ path: route.path, element: elementFor(route) }));
export function AppRoutes() { return useRoutes(routes); }

function NavigationEffects() {
  const location = useLocation(); const navigationType = useNavigationType();
  const positions = useRef(new Map<string, number>());
  useEffect(() => {
    const route = matchRoutes(appRoutes, location)?.at(-1)?.route;
    document.title = route?.view === 'home' ? `${school.name} | Malwadi (Masur), Karad` : `${route?.title || 'School'} | ${school.name}`;
  }, [location.pathname]);
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        try { document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView(); } catch { window.scrollTo(0, 0); }
      } else window.scrollTo(0, navigationType === 'POP' ? positions.current.get(location.key) || 0 : 0);
    });
    return () => { cancelAnimationFrame(frame); positions.current.set(location.key, window.scrollY); };
  }, [location.key, location.hash, navigationType]);
  return null;
}

class RouteErrorBoundary extends Component<{ children: ReactNode; resetKey: string }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override componentDidCatch(error: Error, info: ErrorInfo) { reportLovableError(error, { boundary: 'app_route', componentStack: info.componentStack }); }
  override componentDidUpdate(previous: Readonly<{ children: ReactNode; resetKey: string }>) { if (this.state.failed && previous.resetKey !== this.props.resetKey) this.setState({ failed: false }); }
  override render() {
    if (this.state.failed) return <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 text-center"><h1 className="text-2xl font-bold">This page didn’t load</h1><p className="text-muted-foreground">Refresh the page to try again, or return to the school homepage.</p><button className="btn-primary" onClick={() => window.location.reload()}>Try again</button><a href="/" className="btn-outline">Go home</a></main>;
    return this.props.children;
  }
}

export default function App() {
  const location = useLocation();
  return <RouteErrorBoundary resetKey={location.pathname}><Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-background" role="status"><span className="text-sm text-muted-foreground">Loading your school…</span></main>}><NavigationEffects /><AppRoutes /></Suspense></RouteErrorBoundary>;
}
