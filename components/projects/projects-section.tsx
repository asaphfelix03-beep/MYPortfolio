"use client";

import { useEffect, useMemo, useState, ViewTransition } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealTitle } from "@/components/ui/reveal";
import { ProjectVisual } from "@/components/projects/project-visual";
import { ProjectLinks, StatusChip } from "@/components/projects/project-links";
import { RollingFigure } from "@/components/motion/kinetics";
import { ScrollTrigger } from "@/lib/motion";
import { families, projects, type Project, type ProjectFamily } from "@/lib/projects";

type Filter = ProjectFamily | "tous";

const MAX_TAGS = 4;

/**
 * The projects as a two-column grid of cards, each opening its page. The
 * filter answers the question a recruiter arrives with — "show me the
 * security work" — and says how many projects each family holds.
 */
export default function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>("tous");

  const visible = useMemo(
    () => (filter === "tous" ? projects : projects.filter((p) => p.families.includes(filter))),
    [filter],
  );

  // Filtering changes the page height, which moves every trigger below.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [filter]);

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
      className="tone-band relative px-5 py-20 outline-none sm:px-8 sm:py-28 lg:py-32"
    >
      {/* The section's id was #projects until October 2026; old links still land. */}
      <span id="projects" aria-hidden className="absolute top-0" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <RevealTitle id="projets-title" className="h-section" text="Des projets qui partent d'un vrai _problème_" />
          </div>
          <Reveal className="min-w-0 lg:col-span-5">
            <p className="prose-night text-base sm:text-[1.0625rem]">
              Sécurité, données, web et mobile. Chaque fiche détaille le
              problème, la démarche et ce qui se vérifie : le code source, un
              tableau de bord ou l&apos;application elle-même.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div role="group" aria-label="Filtrer les projets par domaine" className="mt-10 flex flex-wrap gap-2 sm:mt-12">
            {options.map((o) => {
              const pressed = filter === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setFilter(o.id)}
                  className={`btn btn-sm gap-2 ${pressed ? "btn-primary" : "border-border bg-card text-foreground hover:border-accent"}`}
                >
                  {o.label}
                  <span className="tabular-nums text-[0.8125rem] opacity-80">{o.count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length > 1 ? "projets affichés" : "projet affiché"}
        </p>

        <ul className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-8">
          {visible.map((p, i) => {
            // An odd count would leave a hole: the first card takes the full width.
            const wide = i === 0 && visible.length % 2 === 1;
            return (
              <li key={p.slug} className={`min-w-0 ${wide ? "lg:col-span-2" : ""}`}>
                <ProjectCard project={p} wide={wide} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, wide }: { project: Project; wide: boolean }) {
  const href = `/projets/${p.slug}`;
  const titleId = `projet-${p.slug}`;

  return (
    <Reveal kind="scale" className="h-full">
      <article
        aria-labelledby={titleId}
        className={`grid h-full gap-6 rounded-[32px] bg-card p-4 sm:p-6 ${wide ? "lg:grid-cols-2 lg:items-center lg:gap-10" : ""}`}
      >
        {/* The picture repeats the title link for the pointer; keyboard and
            screen reader users get the single link on the title. */}
        <Link href={href} transitionTypes={["nav-forward"]} tabIndex={-1} aria-hidden data-cursor="Voir" className="block min-w-0">
          <ViewTransition name={`visual-${p.slug}`} share="morph" default="none">
            <ProjectVisual project={p} />
          </ViewTransition>
        </Link>

        <div className="flex min-w-0 flex-col">
          <p className="label flex flex-wrap items-center gap-x-2.5 gap-y-2">
            <span>{p.category}</span>
            <span aria-hidden>·</span>
            <span>{p.year}</span>
            {p.status ? <StatusChip>{p.status}</StatusChip> : null}
          </p>

          <h3 id={titleId} className="h-title mt-3 text-[clamp(1.7rem,3vw,2.3rem)]">
            <Link href={href} transitionTypes={["nav-forward"]} className="transition-colors duration-300 hover:text-accent">
              <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
                <span className="inline-block">{p.title}</span>
              </ViewTransition>
            </Link>
          </h3>
          <p className="mt-3 text-[1.0625rem] leading-snug text-foreground/85 text-pretty">{p.tagline}</p>

          {p.results?.length ? (
            <dl className="mt-6 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
              {p.results.slice(0, 2).map((r) => (
                <div key={r.value} className="flex flex-col-reverse">
                  <dt className="mt-2 text-[0.8125rem] leading-snug text-muted-foreground text-pretty">{r.label}</dt>
                  <dd className="figure text-foreground text-[2.1rem]">
                    <RollingFigure value={r.value} />
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-1.5">
            {p.technologies.slice(0, MAX_TAGS).map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-1 pt-6">
            <Link
              href={href}
              transitionTypes={["nav-forward"]}
              data-cursor="Lire"
              className="link-go inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-accent"
            >
              Lire la fiche
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
