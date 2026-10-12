"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealTitle } from "@/components/ui/reveal";
import { ProjectVisual } from "@/components/projects/project-visual";
import { ProjectLinks, StatusChip } from "@/components/projects/project-links";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { families, projects, type Project, type ProjectFamily } from "@/lib/projects";

type Filter = ProjectFamily | "tous";

/**
 * The projects, as bands rather than a grid of equal cards: each one gets
 * the width to show its picture, its problem and the figures that prove it,
 * and the bands alternate sides so the eye zig-zags down the page.
 *
 * The filter answers the question a recruiter arrives with — "show me the
 * security work" — and says how many projects each family holds before it
 * is pressed.
 */
export default function ProjectsSection() {
  const reduce = useSafeReducedMotion();
  const [filter, setFilter] = useState<Filter>("tous");

  const visible = useMemo(
    () => (filter === "tous" ? projects : projects.filter((p) => p.families.includes(filter))),
    [filter],
  );

  const options: { id: Filter; label: string; count: number }[] = [
    { id: "tous", label: "Tous", count: projects.length },
    ...families.map((f) => ({
      id: f.id,
      label: f.label,
      count: projects.filter((p) => p.families.includes(f.id)).length,
    })),
  ];

  return (
    <section
      id="projets"
      tabIndex={-1}
      aria-labelledby="projets-title"
      className="relative px-5 py-20 outline-none sm:px-8 sm:py-28 lg:py-32"
    >
      {/* The section's id was #projects until October 2026; old links still land. */}
      <span id="projects" aria-hidden className="absolute top-0" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <RevealTitle id="projets-title" className="h-section" text="Des projets qui partent d'un vrai _problème_" />
          </div>
          <Reveal delay={0.06} className="min-w-0 lg:col-span-5">
            <p className="prose-night text-base sm:text-[1.0625rem]">
              Sécurité, données, web et mobile. Chaque fiche détaille le
              problème, la démarche et ce qui se vérifie : le code source, un
              tableau de bord ou l&apos;application elle-même.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            role="group"
            aria-label="Filtrer les projets par domaine"
            className="mt-10 flex flex-wrap gap-2 sm:mt-12"
          >
            {options.map((o) => {
              const pressed = filter === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setFilter(o.id)}
                  className={`btn btn-sm gap-2 border-border ${pressed ? "text-white" : "bg-card text-foreground hover:border-accent"}`}
                >
                  {/* The active pill slides from one filter to the next. */}
                  {pressed ? (
                    <motion.span
                      layoutId="filter-pill"
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-[image:var(--grad-brand)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {o.label}
                  <span className={`tabular-nums text-[0.8125rem] ${pressed ? "text-white/80" : "text-muted-foreground"}`}>
                    {o.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length > 1 ? "projets affichés" : "projet affiché"}
        </p>

        <ul className="mt-12 space-y-8 sm:mt-14 sm:space-y-10">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((p, i) => (
              <motion.li
                key={p.slug}
                layout={reduce ? false : "position"}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.18 } }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectBand project={p} flip={i % 2 === 1} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}

function ProjectBand({ project: p, flip }: { project: Project; flip: boolean }) {
  const href = `/projets/${p.slug}`;
  const titleId = `projet-${p.slug}`;

  return (
    <Reveal kind="scale">
      <article
        aria-labelledby={titleId}
        className="surface group relative grid gap-8 p-4 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] sm:p-6 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-8"
      >
        {/* A thin edge in the project's family colour, drawn on hover. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-x-8 top-0 h-[3px] origin-left scale-x-0 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 ${familyEdge(p)}`}
        />
        {/* The picture repeats the title link for the pointer; keyboard and
            screen reader users get the single link on the title. */}
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden
          className={`block min-w-0 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
        >
          <Reveal kind="clip" delay={0.15} duration={1.2}>
            <ProjectVisual project={p} />
          </Reveal>
        </Link>

        <div className="flex min-w-0 flex-col lg:col-span-5">
          <p className="label flex flex-wrap items-center gap-x-2.5 gap-y-2">
            <span aria-hidden className={`h-2 w-2 rounded-full ${familyEdge(p)}`} />
            <span>{p.category}</span>
            <span aria-hidden>·</span>
            <span>{p.year}</span>
            {p.status ? <StatusChip>{p.status}</StatusChip> : null}
          </p>

          <h3 id={titleId} className="h-title mt-3 text-[clamp(1.7rem,3vw,2.3rem)]">
            <Link href={href} className="transition-colors duration-300 hover:text-accent">
              {p.title}
            </Link>
          </h3>
          <p className="mt-3 text-[1.0625rem] leading-snug text-foreground/85 text-pretty">
            {p.tagline}
          </p>
          <p className="prose-night mt-4 text-[0.9375rem]">{p.summary}</p>

          {p.results?.length ? (
            <dl className="mt-6 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
              {p.results.slice(0, 2).map((r) => (
                <div key={r.value} className="flex flex-col-reverse">
                  <dt className="mt-2 text-[0.8125rem] leading-snug text-muted-foreground text-pretty">
                    {r.label}
                  </dt>
                  <dd className="figure text-foreground text-[2.1rem]">{r.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-1.5">
            {p.technologies.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1">
            <Link
              href={href}
              className="link-go inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-accent"
            >
              Lire la fiche du projet
              <ArrowRight size={16} aria-hidden className="icon-go" />
              <span className="sr-only">{p.title}</span>
            </Link>
            <ProjectLinks project={p} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** Cobalt for security, sage for data and AI, teal for web and mobile. */
function familyEdge(p: Project) {
  if (p.families.includes("securite")) return "bg-blue";
  if (p.families.includes("donnees")) return "bg-sage";
  return "bg-cyan";
}
