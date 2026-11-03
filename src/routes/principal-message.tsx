import { Link } from "react-router-dom";
import { ArrowLeft, Quote } from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";
import { PageHero, Reveal, SectionHeading } from "@/components/website/reveal";
import { school } from "@/data/site";
import { useDemo } from '@/data/demo';



export default function PrincipalMessagePage() {
  const data = useDemo();
  return (
    <SiteLayout>
      <PageHero
        kicker="Principal's Message"
        title="Welcome to Our School Family."
        description="A personal welcome from the school leadership."
      />

      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <Reveal>
            <div className="rounded-3xl border bg-card p-7 shadow-sm">
              <div className="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted">
                <div className="text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-2xl font-bold text-teal-deep">
                    ✦
                  </span>
                  <p className="mt-3 text-xs text-muted-foreground">Principal's photograph</p>
                  <p className="text-xs text-muted-foreground">(to be added)</p>
                </div>
              </div>
              <dl className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Name</dt>
                  <dd className="font-medium text-navy">To be added</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Designation</dt>
                  <dd className="font-medium text-navy">Principal</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <figure className="rounded-3xl border bg-card p-8 shadow-sm sm:p-10">
                <Quote className="h-8 w-8 text-coral/60" aria-hidden />
                <blockquote className="mt-5 space-y-4 text-base leading-relaxed text-foreground">
                  <p>{data.content.principal}</p>


                </blockquote>
                <figcaption className="mt-6 text-sm text-muted-foreground">
                  — Principal, {school.name} <span className="text-xs">(name to be added)</span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10">
                <SectionHeading
                  align="left"
                  kicker="Educational Philosophy"
                  title="How We Teach, and Why."
                />
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  Editable: learning at our school is active, conversational and grounded in
                  values. Concepts are built step by step, questions are always welcome, and every
                  child is known by name. Discipline comes from respect, not fear — and progress
                  is measured by confidence as much as by marks.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <Link to="/about" className="btn-outline mt-10">
                <ArrowLeft className="h-4 w-4" aria-hidden /> Back to About
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
