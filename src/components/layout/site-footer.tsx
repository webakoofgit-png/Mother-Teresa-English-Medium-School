import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { images, school } from "@/data/site";
import { useDemo } from '@/data/demo';

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About School", to: "/about" },
  { label: "Admissions", to: "/admissions" },
  { label: "Notices", to: "/notices" },
  { label: "Contact", to: "/contact" },
  { label: "Student Login", to: "/login" },
];

const academicLinks = [
  { label: 'Gallery', to: '/gallery' },
  { label: 'Downloads', to: '/downloads' },
  { label: "Academics Overview", to: "/academics" },
  { label: "Facilities", to: "/facilities" },
  { label: "Events & Activities", to: "/events" },
  { label: "Achievements", to: "/achievements" },
  { label: "Foundation", to: "/foundation" },
];

const socials = [
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
];

export function SiteFooter() {
  const data = useDemo();
  return (
    <footer className="bg-navy text-white/80">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={images.mtemsLogo.url}
              alt={`${school.shortName} school logo`}
              className="h-14 w-14 object-contain"
              width={56}
              height={56}
              loading="lazy"
            />
            <div className="leading-tight">
              <p className="font-display font-bold text-white">Mother Teresa</p>
              <p className="font-display font-bold text-white">English Medium School</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            A self-financed English medium school from Nursery to Standard 12 in Malwadi (Masur),
            nurturing curiosity, character and confidence.
          </p>
          <Link to="/foundation" className="footer-foundation-seal">
            <img src={images.foundationLogo.url} alt="Official Shree Dhanlaxmi Foundation, Karad logo" width={80} height={80} loading="lazy" />
            <span>Managed with care by<strong>Shree Dhanlaxmi Foundation</strong><small>Karad, Maharashtra</small></span>
          </Link>
          <div className="mt-6 flex items-center gap-3">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href="/contact"
                title={`${label} — link to be added`}
                aria-label={`${label} (coming soon)`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-sunshine hover:text-sunshine"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Quick links">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-sunshine">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to + l.label}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Academics links">
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-sunshine">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {academicLinks.map((l) => (
              <li key={l.to + l.label}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-sunshine">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/50" aria-hidden />
              <span>{school.location}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-white/50" aria-hidden />
              <span>{data.content.phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-white/50" aria-hidden />
              <span>{data.content.email}</span>
            </li>
          </ul>
          <dl className="mt-5 space-y-1.5 rounded-2xl border border-white/15 bg-white/5 p-4 text-xs">
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">UDISE Code</dt>
              <dd className="font-medium text-white">{school.udiseCode}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">Institute Code</dt>
              <dd className="font-medium text-white">{school.instituteCode}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-white/60">
            An institution managed by Shree Dhanlaxmi Foundation, Karad.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {school.name}. All rights reserved.
          </p>
          <p>Managed by {school.managedBy}</p>
        </div>
      </div>
    </footer>
  );
}
