"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, BadgeCheck, Download, FileText } from "lucide-react";
import { ACTIVE_LINE, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { certifications, education, experience, participations } from "@/lib/parcours";
import type { CvInfo } from "@/lib/site";

type Kind = "formation" | "experience" | "certification" | "participation";

type Entry = {
  id: string;
  kind: Kind;
  meta?: string;
  current?: boolean;
  title: string;
  org?: string;
  body?: string;
  tools?: string[];
  links?: { href: string; label: string; sr: string; icon: "out" | "file" | "verify" }[];
};

const KIND_LABEL: Record<Kind, string> = {
  formation: "Formation",
  experience: "Expérience",
  certification: "Certification",
  participation: "Participation",
};

const FILTERS: { id: Kind | "tout"; label: string }[] = [
  { id: "tout", label: "Tout" },
  { id: "formation", label: "Formation" },
  { id: "experience", label: "Expériences" },
  { id: "certification", label: "Certifications" },
  { id: "participation", label: "Participations" },
];

const entries: Entry[] = [
  ...experience.map<Entry>((x) => ({
    id: `exp-${x.title}`,
    kind: "experience",
    meta: x.period,
    current: /aujourd/i.test(x.period),
    title: x.title,
    org: x.org,
    body: x.summary,
    tools: x.tools,
    links: [{ href: x.href, label: "Voir les 9 projets du stage", sr: "sur GitHub (nouvel onglet)", icon: "out" }],
  })),
  ...education.map<Entry>((e) => ({
    id: `edu-${e.title}`,
    kind: "formation",
    meta: e.period,
    current: e.current,
    title: e.title,
    org: e.school,
  })),
  ...certifications.map<Entry>((c) => ({
    id: `cert-${c.title}`,
    kind: "certification",
    meta: c.date,
    title: c.title,
    org: `${c.issuer}${c.kind ? `, ${c.kind.toLowerCase()}` : ""}`,
    links: [
      { href: c.file, label: "Certificat", sr: `${c.title}, PDF (nouvel onglet)`, icon: "file" },
      ...(c.verify
        ? [{ href: c.verify, label: "Vérifier", sr: `l'authenticité de ${c.title} (nouvel onglet)`, icon: "verify" as const }]
        : []),
    ],
  })),
  ...participations.map<Entry>((p) => ({
    id: `part-${p.title}`,
    kind: "participation",
    title: p.title,
    org: p.note,
  })),
];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The path so far as a timeline. On desktop a sticky "reading position"
 * block follows the entry nearest the middle of the screen; the others fade.
 */
export default function ParcoursSection({ cv }: { cv: CvInfo }) {
  const [filter, setFilter] = useState<Kind | "tout">("tout");
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(false);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  const filters = FILTERS.filter((f) => f.id === "tout" || entries.some((e) => e.kind === f.id));
  const visible = useMemo(() => (filter === "tout" ? entries : entries.filter((e) => e.kind === filter)), [filter]);
  const shown = Math.min(active, visible.length - 1);
  const current = visible[shown];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setFade(true);
    setActive(0);
    const triggers = refs.current.slice(0, visible.length).map((el, i) =>
      el
        ? ScrollTrigger.create({
            trigger: el,
            start: ACTIVE_LINE,
            onEnter: () => setActive(i),
            onLeaveBack: () => setActive(Math.max(i - 1, 0)),
          })
        : null,
    );
    ScrollTrigger.refresh();
    return () => triggers.forEach((t) => t?.kill());
  }, [visible]);

  return (
    <section
      id="parcours"
      tabIndex={-1}
      aria-labelledby="parcours-title"
      className="relative mx-auto max-w-[var(--content-max)] px-[var(--gutter)] py-[var(--section-y)] outline-none"
    >
      <span id="about" aria-hidden className="absolute top-0" />
      <span id="experience" aria-hidden className="absolute top-0" />
      <span id="formation" aria-hidden className="absolute top-0" />
      <span id="certifications" aria-hidden className="absolute top-0" />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h2 id="parcours-title" className="h-section min-w-0 break-words">
            Un parcours
            <br />
            <span className="grad-text">qui se construit.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[1.15rem] text-muted-foreground text-pretty">
            Je me forme à l&apos;ESATIC, à Abidjan, sur deux disciplines qui se répondent : protéger les systèmes et
            faire parler les données. J&apos;apprends autant par les projets que par la certification.
          </p>
        </div>
        <div role="group" aria-label="Filtrer le parcours" className="flex flex-wrap gap-1">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className="filter-pill"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="hidden lg:block">
          <div className="sticky top-32" aria-hidden>
            <p className="text-[length:var(--fs-meta)] text-muted-foreground">Position de lecture</p>
            <p className="mt-4 flex items-baseline gap-3 font-semibold leading-none tracking-[-0.05em]">
              <span className="text-[9rem] tabular-nums">{pad(shown + 1)}</span>
              <span className="text-[2rem] text-muted-foreground tabular-nums">/ {pad(visible.length)}</span>
            </p>
            <p className="mt-6 max-w-sm text-[length:var(--fs-h3)] font-semibold leading-tight tracking-[-0.03em] text-pretty">
              {current?.title}
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <ol className="relative">
            <span aria-hidden className="absolute bottom-0 left-[0.5rem] top-0 w-px bg-border" />
            {visible.map((e, i) => (
              <li
                key={e.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                style={{ opacity: fade && i !== active ? 0.35 : 1 }}
                className="relative pb-14 pl-10 transition-opacity duration-300 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.35rem] h-[1.0625rem] w-[1.0625rem] rounded-full border border-foreground bg-background"
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[length:var(--fs-meta)] text-muted-foreground">
                  <span>{KIND_LABEL[e.kind]}</span>
                  {e.meta ? <span>{e.meta}</span> : null}
                  {e.current ? <span className="chip chip-signal">En cours</span> : null}
                </div>
                <h3 className="mt-3 min-w-0 break-words text-[length:var(--fs-h3)] font-semibold leading-tight tracking-[-0.03em] text-balance">
                  {e.title}
                </h3>
                {e.org ? <p className="mt-1.5 text-[1.0625rem] text-muted-foreground">{e.org}</p> : null}
                {e.body ? (
                  <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-muted-foreground text-pretty">{e.body}</p>
                ) : null}
                {e.tools ? (
                  <ul aria-label="Outils" className="mt-4 flex flex-wrap gap-2">
                    {e.tools.map((t) => (
                      <li key={t} className="rounded-full border border-border bg-card px-3 py-1 text-[length:var(--fs-meta)]">
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {e.links ? (
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                    {e.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-go inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-accent"
                      >
                        {l.icon === "file" ? <FileText size={15} aria-hidden /> : null}
                        {l.icon === "verify" ? <BadgeCheck size={15} aria-hidden /> : null}
                        {l.label}
                        {l.icon !== "file" ? <ArrowUpRight size={15} aria-hidden className="icon-out" /> : null}
                        <span className="sr-only"> {l.sr}</span>
                      </a>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ol>

          <a href={cv.href} download={cv.downloadName} className="btn btn-outline mt-14">
            <Download size={17} aria-hidden className="icon-down" />
            Télécharger mon CV
            <span className="font-normal text-muted-foreground">(PDF, {cv.size})</span>
          </a>
        </div>
      </div>
    </section>
  );
}
