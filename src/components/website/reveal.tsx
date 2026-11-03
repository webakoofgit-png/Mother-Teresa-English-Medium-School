import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.4, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  light = false,
}: {
  kicker: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col ${alignment}`}>
      <span className={`kicker ${light ? "!text-sunshine" : ""}`}>
        <span aria-hidden className={`h-px w-8 ${light ? "bg-sunshine/60" : "bg-teal/40"}`} />
        {kicker}
        <span aria-hidden className={`h-px w-8 ${light ? "bg-sunshine/60" : "bg-teal/40"}`} />
      </span>
      <h2
        className={`mt-4 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.6rem] ${
          light ? "text-white" : ""
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-xl text-base leading-relaxed ${
            light ? "text-white/75" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function PageHero({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-teal/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute right-1/4 top-0 h-1.5 w-40 rounded-b-full bg-sunshine/80"
      />
      <div className="container-site relative py-14 sm:py-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-xs font-bold uppercase tracking-[0.18em] text-sunshine"
        >
          {kicker}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-white/80"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
