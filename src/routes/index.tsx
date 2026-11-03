import { HomeHero, SchoolBrandBanner } from '@/components/website/home-hero';
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  MapPin,
  Quote,
  Sparkles,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";
import { ImageReveal, Reveal, SectionHeading } from "@/components/website/reveal";
import { facilities, images, news, noticeCategories, school, stages, testimonials, values } from "@/data/site";
import { useDemo, visibleNotices } from '@/data/demo';
import { PublicHomeSections } from '@/components/website/home-sections';



function Welcome() {
  const data = useDemo();
  return (
    <section id="welcome-to-school" className="section-pad">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
        <ImageReveal className="relative">
          <img
            src={images.schoolLibrary}
            alt="Children reading together in the school library"
            className="aspect-[5/4] w-full rounded-3xl object-cover"
            width={1280}
            height={960}
            loading="lazy"
          />
          <div className="absolute -bottom-6 right-6 rounded-2xl bg-navy px-5 py-4 text-white shadow-lg">
            <p className="font-display text-2xl font-bold">{school.levelsLabel}</p>
            <p className="text-xs text-white/70">One journey, many milestones</p>
          </div>
        </ImageReveal>
        <div>
          <SectionHeading
            align="left"
            kicker="Welcome to Our School"
            title={data.content.welcome}
          />
          <Reveal delay={0.1}>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Mother Teresa English Medium School offers a complete school education from Nursery
              to Standard 12 in Malwadi (Masur), Taluka Karad. As a self-financed English medium
              school managed by Shree Dhanlaxmi Foundation, Karad, we focus on strong academics,
              good values and the everyday happiness of every child.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Classrooms encourage questions, teachers know their students personally, and
              learning reaches beyond textbooks into activities, events and community life.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/about" className="btn-navy">
                About Our School
              </Link>
              <Link to="/about/principal-message" className="btn-outline">
                Principal's Message
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LearningJourney() {
  const [active, setActive] = useState(stages[0].id);
  const stage = stages.find((s) => s.id === active) ?? stages[0];
  return (
    <section className="section-pad bg-muted">
      <div className="container-site">
        <SectionHeading
          kicker="The Learning Journey"
          title="Every Stage. A New Possibility."
          description="Follow the journey from the first day of school to the doorstep of the future."
        />
        <Reveal delay={0.1}>
          <div className="relative mt-12">
            <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-0.5 bg-border lg:block" />
            <div className="flex gap-2 overflow-x-auto pb-2 lg:justify-between lg:gap-0" role="tablist" aria-label="Academic stages">
              {stages.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={active === s.id}
                  onClick={() => setActive(s.id)}
                  className="group relative flex shrink-0 flex-col items-center gap-2 px-3 lg:px-0"
                >
                  <span
                    className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 font-display text-sm font-bold transition-all ${
                      active === s.id
                        ? "border-teal bg-teal text-white shadow-lg"
                        : "border-border bg-white text-muted-foreground group-hover:border-teal/50"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`whitespace-nowrap text-xs font-semibold sm:text-sm ${
                      active === s.id ? "text-teal-deep" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 overflow-hidden rounded-3xl border bg-card shadow-sm">
            <div className="grid lg:grid-cols-2">
              <img
                key={stage.id}
                src={stage.image}
                alt={`${stage.label} learning at our school`}
                className="h-64 w-full object-cover sm:h-80 lg:h-full"
                width={1280}
                height={960}
                loading="lazy"
              />
              <div className="p-7 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-widest text-teal">
                  {stage.standards}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
                  {stage.heading}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{stage.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {stage.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral" aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link to="/academics" className="btn-outline mt-8">
                  Explore Academics <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhyChoose() {
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <section className="section-pad">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          align="left"
          kicker="Why Choose Our School"
          title="More Than Education. A Foundation for Life."
          description="Six commitments shape every school day at Mother Teresa English Medium School."
        />
        <div className="divide-y rounded-3xl border bg-card shadow-sm">
          {values.map((v, i) => {
            const open = activeIdx === i;
            return (
              <button
                key={v.title}
                type="button"
                onMouseEnter={() => setActiveIdx(i)}
                onFocus={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                aria-expanded={open}
                className="flex w-full items-start gap-4 px-6 py-5 text-left transition-colors hover:bg-muted"
              >
                <span
                  className={`font-display text-lg font-bold ${open ? "text-teal" : "text-border"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className={`block font-display font-semibold ${open ? "text-teal-deep" : "text-navy"}`}>
                    {v.title}
                  </span>
                  <span
                    className={`grid transition-all duration-300 ${
                      open ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="overflow-hidden text-sm leading-relaxed text-muted-foreground">
                      {v.description}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FoundationSpotlight() {
  const data = useDemo();
  return (
    <section className="section-pad relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="absolute -left-20 top-10 h-72 w-72 rounded-full border border-white/10" />
      <div aria-hidden className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-teal/15 blur-3xl" />
      <div className="container-site relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal className="mx-auto w-full max-w-sm">
          <div className="rounded-3xl bg-white p-8 shadow-2xl">
            <img
              src={images.foundationLogo.url}
              alt="Shree Dhanlaxmi Foundation, Karad logo"
              className="mx-auto h-48 object-contain"
              width={473}
              height={359}
              loading="lazy"
            />
          </div>
        </Reveal>
        <div>
          <SectionHeading
            align="left"
            light
            kicker="Foundation Spotlight"
            title="Rooted in Values. Inspired by Purpose."
          />
          <Reveal delay={0.1}>
            <p className="mt-5 leading-relaxed text-white/80">
              Mother Teresa English Medium School operates under Shree Dhanlaxmi Foundation, Karad
              — a foundation with a deep commitment to education. The foundation's guidance shapes
              the school's values, standards and everyday care for students.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <h3 className="font-display font-bold text-sunshine">Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {data.content.foundationVision}
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <h3 className="font-display font-bold text-sunshine">Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {data.content.foundationMission}
                </p>
              </div>
            </div>
            <Link to="/foundation" className="btn-white mt-8">
              Explore the Foundation <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FacilitiesTeaser() {
  const data = useDemo();
  const facilities = data.entities.facilities.filter(f => f.status === 'Published').map(f => ({ ...f, image: f.url, label: f.title }));
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            kicker="Campus & Facilities"
            title="Spaces That Inspire Learning."
            description="Sample categories shown — photographs and details will be updated with actual school images."
          />
          <Reveal delay={0.1}>
            <Link to="/facilities" className="btn-outline">
              View All Facilities
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.07} className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}>
              <figure className={`group relative h-full overflow-hidden rounded-3xl ${i === 0 ? "min-h-72" : "min-h-48"}`}>
                <img
                  src={f.image}
                  alt={f.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={1280}
                  height={960}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/10 to-transparent" />
                <figcaption className="absolute bottom-0 p-5 text-white">
                  <p className="font-display font-bold">{f.label}</p>
                  <p className="mt-1 text-xs text-white/80">{f.description}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsEvents() {
  const data = useDemo();
  const news = visibleNotices(data).map(n => ({ ...n, excerpt: n.description }));
  const [filter, setFilter] = useState<(typeof noticeCategories)[number]>("All");
  const shown = news.filter((n) => filter === "All" || n.category === filter);
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  return (
    <section className="section-pad bg-muted">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading align="left" kicker="Latest News & Events" title="What's Happening at Our School." />
          <Reveal delay={0.1}>
            <Link to="/notices" className="btn-outline">
              View All Notices
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter news">
            {noticeCategories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === c
                    ? "bg-navy text-white"
                    : "border bg-white text-muted-foreground hover:border-teal hover:text-teal-deep"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <ol className="mt-6 space-y-3">
            {shown.map((n, i) => (
              <motion.li
                key={n.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex flex-col gap-2 rounded-2xl border bg-card p-5 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="flex shrink-0 items-center gap-2 text-xs font-semibold text-teal-deep">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  {fmt(n.date)}
                </div>
                <div className="flex-1">
                  <p className="font-display font-semibold text-navy">{n.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{n.excerpt}</p>
                </div>
                <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  {n.category}
                </span>
              </motion.li>
            ))}
            {shown.length === 0 && (
              <li className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                No items in this category yet.
              </li>
            )}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function AdmissionsCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-deep to-navy text-white">
      <div aria-hidden className="absolute right-0 top-0 h-64 w-64 rounded-full bg-sunshine/10 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-teal/15 blur-3xl" />
      <div className="container-site relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sunshine">
              Admissions
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Your Child's Journey Begins Here.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/80">
              Register an admission enquiry and our team will guide you through the process —
              from the first visit to the first day of school.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/admissions" className="btn-white">
                Apply for Admission <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact School
              </Link>
            </div>
            <p className="mt-5 text-xs text-white/55">
              Admission dates and availability are configurable by the school and will be
              announced officially.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const data = useDemo();
  const testimonials = data.entities.testimonials.filter(t => t.status === 'Published').map(t => ({ ...t, name: t.title, quote: t.description, role: 'Demo community voice' }));
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx % testimonials.length];
  const go = (dir: number) => setIdx((idx + dir + testimonials.length) % testimonials.length);
  if (!t) return null;
  return (
    <section className="section-pad">
      <div className="container-site">
        <SectionHeading
          kicker="Parent & Student Stories"
          title="Voices From Our School Community."
          description="Sample testimonials shown for demonstration — real voices will replace them."
        />
        <Reveal delay={0.1}>
          <figure className="relative mx-auto mt-12 max-w-2xl rounded-3xl border bg-card p-8 text-center shadow-sm sm:p-12">
            <Quote className="mx-auto h-10 w-10 text-coral/60" aria-hidden />
            <blockquote className="mt-6 text-lg leading-relaxed text-foreground sm:text-xl">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-display font-semibold text-navy">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </figcaption>
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-secondary"
              >
                <ChevronDown className="h-4 w-4 rotate-90" aria-hidden />
              </button>
              <div className="flex gap-2" aria-hidden>
                {testimonials.map((item, i) => (
                  <span
                    key={item.id}
                    className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-teal" : "w-2 bg-border"}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-secondary"
              >
                <ChevronDown className="h-4 w-4 -rotate-90" aria-hidden />
              </button>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function ContactPreview() {
  const data = useDemo();
  return (
    <section className="section-pad bg-muted">
      <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            align="left"
            kicker="Get In Touch"
            title="We'd Love to Hear From You."
          />
          <Reveal delay={0.1}>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden />
                <span>{school.name}, {school.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-5 w-5 items-center justify-center text-xs font-bold text-teal">✆</span>
                <span>{data.content.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-5 w-5 items-center justify-center text-xs font-bold text-teal">@</span>
                <span>{data.content.email}</span>
              </li>
            </ul>
            <Link to="/contact" className="btn-primary mt-8">
              Send an Enquiry <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border-2 border-dashed border-border bg-card">
            <div className="text-center">
              <MapPin className="mx-auto h-8 w-8 text-teal/50" aria-hidden />
              <p className="mt-3 text-sm text-muted-foreground">
                School map will appear here
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {school.shortLocation}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <SiteLayout>
      <HomeHero />
      <Welcome />
      <SchoolBrandBanner />
      <LearningJourney />
      <WhyChoose />
      <FoundationSpotlight />
      <FacilitiesTeaser />
      <PublicHomeSections />
      <NewsEvents />
      <AdmissionsCta />
      <Testimonials />
      <ContactPreview />
    </SiteLayout>
  );
}
