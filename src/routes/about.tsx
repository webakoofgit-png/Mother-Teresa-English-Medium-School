import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/site-layout";
import { PageHero, Reveal, SectionHeading } from "@/components/website/reveal";
import { images, school, values } from "@/data/site";
import { useDemo } from '@/data/demo';



export default function AboutPage() {
  const data = useDemo();
  return (
    <SiteLayout>
      <PageHero
        kicker="About Our School"
        title="An Education Built on Care, Character and Curiosity."
        description={`${school.name}, ${school.location} — ${school.schoolType.toLowerCase()} from ${school.levels}.`}
      />

      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading align="left" kicker="Who We Are" title="A School That Feels Like Family." />
            <Reveal delay={0.1}>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {school.name} is a self-financed English medium school managed by{" "}
                {school.managedBy}. Serving the Malwadi (Masur) community and nearby villages of
                Taluka Karad, the school welcomes children from Nursery through Standard 12.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We believe good education balances strong academics with character, creativity and
                care. Our teachers work closely with each child, and parents are partners in every
                step of the journey.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <img
              src={images.classroom}
              alt="Teacher guiding students in a bright classroom"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
              width={1280}
              height={960}
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-muted">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border bg-card p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-navy">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{data.content.mission}</p>

            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border bg-card p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-navy">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{data.content.vision}</p>

            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <SectionHeading
            kicker="School Values"
            title="The Values We Practise Every Day."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md">
                  <span className="font-display text-sm font-bold text-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display font-semibold text-navy">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-navy text-white">
        <div className="container-site flex flex-col items-center gap-6 text-center">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl font-bold sm:text-4xl">
              A Word From Our Principal.
            </h2>
            <p className="mt-3 max-w-xl text-white/75">
              Read the Principal's welcome message and our educational philosophy.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/about/principal-message" className="btn-white">
                Principal's Message <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/foundation"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Our Foundation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
