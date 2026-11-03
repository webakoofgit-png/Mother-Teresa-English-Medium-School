import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, ChevronDown, GraduationCap, MapPin, Menu } from 'lucide-react';
import { images, school } from '@/data/site';
import { Sheet, SheetContent, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about', children: [{ label: 'Our school', to: '/about' }, { label: 'Principal’s message', to: '/about/principal-message' }] },
  { label: 'Academics', to: '/academics', children: [{ label: 'Academic overview', to: '/academics' }, { label: 'Pre-primary', to: '/academics/pre-primary' }, { label: 'Primary & secondary', to: '/academics/primary-secondary' }, { label: 'Higher secondary', to: '/academics/higher-secondary' }, { label: 'Downloads', to: '/downloads' }] },
  { label: 'Admissions', to: '/admissions' },
  { label: 'School life', to: '/events', children: [{ label: 'Events & activities', to: '/events' }, { label: 'Facilities', to: '/facilities' }, { label: 'Gallery', to: '/gallery' }, { label: 'Achievements', to: '/achievements' }] },
  { label: 'Foundation', to: '/foundation' },
  { label: 'Notices', to: '/notices' },
  { label: 'Contact', to: '/contact' },
];

function SchoolIdentity() {
  return <Link to="/" className="school-identity" aria-label={`${school.name} — home`}>
    <img src={images.mtemsLogo.url} alt="Mother Teresa English Medium School official badge" width={80} height={80} fetchPriority="high" />
    <span><small>LEARNING WITH PURPOSE. GROWING WITH CARE.</small><strong>Mother Teresa<span>English Medium School</span></strong><em>Malwadi (Masur) · Karad · Satara</em></span>
  </Link>;
}

export function SiteHeader() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const onScroll = () => setCompact(window.scrollY > 60); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <header className={`school-header ${compact ? 'is-compact' : ''}`}>
    <div className="school-topline"><div className="container-site"><span><MapPin size={12} /> Malwadi (Masur), Karad, Satara <i /> <span className="topline-code">UDISE {school.udiseCode}</span></span><span><Link to="/login">Student & Admin Login</Link><i /><Link to="/admissions">Admission enquiry <ArrowRight size={12} /></Link></span></div></div>
    <div className="container-site school-brand-row"><SchoolIdentity /><Link to="/foundation" className="foundation-identity" aria-label="About Shree Dhanlaxmi Foundation, Karad"><span><small>AN INSTITUTION OF</small><strong>Shree Dhanlaxmi Foundation</strong><em>Karad, Maharashtra</em></span><img src={images.foundationLogo.url} alt="Shree Dhanlaxmi Foundation, Karad official logo" width={96} height={96} /></Link>
      <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><button className="school-mobile-trigger" aria-label="Open navigation"><Menu size={23} /></button></SheetTrigger><SheetContent side="right" className="school-mobile-panel w-full sm:max-w-md"><SheetTitle>Explore our school</SheetTitle><SheetDescription>Mother Teresa English Medium School</SheetDescription><div className="mobile-brand"><img src={images.mtemsLogo.url} alt="Official school badge" /><img src={images.foundationLogo.url} alt="Official foundation logo" /></div><nav aria-label="Mobile navigation">{navigation.map(item => item.children ? <details key={item.to}><summary>{item.label}<ChevronDown size={16} /></summary>{item.children.map(child => <Link key={child.to} to={child.to} onClick={() => setOpen(false)}>{child.label}</Link>)}</details> : <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>{item.label}</Link>)}</nav><Link to="/admissions" className="btn-primary" onClick={() => setOpen(false)}>Admission enquiry <ArrowRight size={16} /></Link><Link to="/login" className="btn-outline" onClick={() => setOpen(false)}>Student & Admin demo</Link></SheetContent></Sheet>
    </div>
    <div className="school-navigation"><div className="container-site"><nav aria-label="Main navigation">{navigation.map(item => <div key={item.to} className="school-nav-item"><NavLink to={item.to} end className={({ isActive }) => isActive ? 'selected' : undefined}>{item.label}{item.children && <ChevronDown size={12} />}</NavLink>{item.children && <div className="school-dropdown">{item.children.map(child => <Link to={child.to} key={child.to}>{child.label}<ArrowRight size={13} /></Link>)}</div>}</div>)}</nav><Link to="/login" className="school-portal-link"><GraduationCap size={17} /> School portal <ArrowRight size={14} /></Link></div></div>
  </header>;
}
