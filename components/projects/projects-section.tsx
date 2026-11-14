"use client";

import { useEffect, useMemo, useState, ViewTransition } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/projects/project-visual";
import { ProjectLinks, StatusChip } from "@/components/projects/project-links";
import { Reveal } from "@/components/ui/reveal";
import { ScrollTrigger } from "@/lib/motion";
import { families, projects, type Project, type ProjectFamily } from "@/lib/projects";

type Filter = ProjectFamily | "tous";

/**
 * The projects as alternating rows: a large screenshot, then the project's
 * meta, title, description, technologies and links. The filter answers the
 * question a recruiter arrives with ("show me the security work").
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

  const options: { id: Filter; label: string }[] = [
    { id: "tous", label: "Tout" },
    ...families.map((f) => ({ id: f.id, label: f.label })),
  ];

  return (
    <section
      id="projets"
      tabIndex={-1}
      aria-labelledby="projets-title"
      className="relative mx-auto max-w-[var(--content-max)] px-[var(--gutter)] py-[var(--section-y)] outline-none"
    >
      {/* The section's id was #projects until October 2026; old links still land. */}
      <span id="projects" aria-hidden className="absolute top-0" />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h2 id="projets-title" className="h-section min-w-0 break-words">
            Réalisations
            <br />
            <span className="grad-text">documentées.</span>
          </h2>
          <p className="mt-5 text-[1.15rem] text-muted-foreground">
            {projects.length} réalisations documentées
          </p>
        </div>
        <div role="group" aria-label="Filtrer les projets par domaine" className="flex flex-wrap gap-1">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={filter === o.id}
              onClick={() => setFilter(o.id)}
              className="filter-pill"
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length > 1 ? "projets affichés" : "projet affiché"}
      </p>

      <ul className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
        {visible.map((p, i) => (
          <li key={p.slug} className="min-w-0">
            <ProjectRow project={p} index={projects.indexOf(p) + 1} flip={i % 2 === 1} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectRow({ project: p, index, flip }: { project: Project; index: number; flip: boolean }) {
  const href = `/projets/${p.slug}`;
  const titleId = `projet-${p.slug}`;
  const family = families.find((f) => p.families[0] === f.id)?.label;

  return (
    <Reveal>
      <article
        aria-labelledby={titleId}
        className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16"
      >
        {/* The picture repeats the title link for the pointer; keyboard and
            screen reader users get the single link on the title. */}
        <Link
          href={href}
          transitionTypes={["nav-forward"]}
          tabIndex={-1}
          aria-hidden
          data-cursor="Voir"
          className={`block min-w-0 ${flip ? "lg:order-2" : ""}`}
        >
          <ViewTransition name={`visual-${p.slug}`} share="morph" default="none">
            <ProjectVisual project={p} />
          </ViewTransition>
        </Link>

        <div className="flex min-w-0 flex-col items-start">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[length:var(--fs-meta)] text-muted-foreground">
            <span className="tabular-nums">{`03.${String(index).padStart(2, "0")}`}</span>
            {p.status ? (
              <StatusChip>{p.status}</StatusChip>
            ) : p.links.demo ? (
              <StatusChip live>En ligne</StatusChip>
            ) : null}
            <span>{p.year}</span>
            {family ? <span>{family}</span> : null}
          </div>

          <h3
            id={titleId}
            className="mt-5 min-w-0 break-words text-[length:var(--fs-h2)] font-semibold leading-[0.95] tracking-[-0.045em]"
          >
            <Link href={href} transitionTypes={["nav-forward"]} className="transition-colors hover:text-accent">
              <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
                <span className="inline-block">{p.title}</span>
              </ViewTransition>
            </Link>
          </h3>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">{p.tagline}</p>

          <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
            {p.technologies.map((t) => (
              <li key={t} className="rounded-full border border-border bg-card px-3 py-1 text-[length:var(--fs-meta)] text-foreground">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={href} transitionTypes={["nav-forward"]} data-cursor="Lire" className="btn btn-primary">
              Lire le projet
              <ArrowUpRight size={17} aria-hidden className="icon-out" />
              <span className="sr-only">{p.title}</span>
            </Link>
            <ProjectLinks project={p} size="lg" />
          </div>
        </div>
      </article>
    </Reveal>
  );
}
