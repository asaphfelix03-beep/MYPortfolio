"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BarChart3, BrainCircuit, Code2, Network, ShieldCheck, type LucideIcon } from "lucide-react";
import { ACTIVE_LINE, gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { projects } from "@/lib/projects";
import { levels, skillDomains, type SkillDomain } from "@/lib/skills";

export const domainIcons: Record<string, LucideIcon> = {
  cyber: ShieldCheck,
  data: BarChart3,
  ia: BrainCircuit,
  dev: Code2,
  infra: Network,
};

/** First project page cited by the domain's skills that has a screenshot. */
function shotOf(d: SkillDomain) {
  for (const s of d.skills)
    for (const pr of s.proofs) {
      const slug = pr.href?.startsWith("/projets/") ? pr.href.slice(9) : null;
      const v = projects.find((p) => p.slug === slug)?.visual;
      if (v?.kind === "image") return v;
    }
  return null;
}

function Detail({ d }: { d: SkillDomain }) {
  const shot = shotOf(d);
  const Icon = domainIcons[d.id] ?? ShieldCheck;
  return (
    <div className="surface overflow-hidden">
      <div className="relative aspect-[16/10] bg-signal-soft">
        {shot ? (
          <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 560px, 90vw" className="object-cover" style={{ objectPosition: shot.position }} />
        ) : (
          <Icon aria-hidden className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 text-accent" />
        )}
      </div>
      <div className="p-6 sm:p-8">
        <p className="text-muted-foreground">{d.description}</p>
        <ul className="mt-5 grid gap-3">
          {d.skills.map((s) => (
            <li key={s.name} className="flex gap-3 text-[0.9375rem]">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <span className="min-w-0">
                {s.name}
                <span className="block text-[length:var(--fs-meta)] text-muted-foreground">{levels[s.level].label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function DomainesSection() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion() || !matchMedia("(min-width: 1024px)").matches) return;
    const ctx = gsap.context(() => {
      root.current?.querySelectorAll<HTMLElement>("[data-row]").forEach((row, i) =>
        ScrollTrigger.create({
          trigger: row,
          start: ACTIVE_LINE,
          end: () => `+=${row.offsetHeight}`,
          onToggle: (self) => self.isActive && setActive(i),
        }),
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="domaines" tabIndex={-1} aria-labelledby="domaines-title" className="mx-auto max-w-[var(--content-max)] px-[var(--gutter)] py-[var(--section-y)]">
      <h2 id="domaines-title" className="h-section min-w-0 break-words">
        Ce que je
        <br />
        <span className="grad-text">sais faire.</span>
      </h2>
      <p className="mt-4 text-[1.15rem] text-muted-foreground">Chaque compétence dit comment je l&apos;ai acquise.</p>

      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <ol>
          {skillDomains.map((d, i) => {
            const on = i === active;
            return (
              <li key={d.id} data-row="" className="hairline-row">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full min-w-0 items-baseline gap-5 py-6 text-left transition-colors duration-200 ${on ? "text-foreground" : "text-mute-2 hover:text-foreground"}`}
                >
                  <span className="text-[length:var(--fs-meta)] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 break-words text-[length:var(--fs-h2)] font-medium leading-[1.02] tracking-[-0.04em]">{d.title}</span>
                </button>
                {on && (
                  <div className="pb-6 lg:hidden">
                    <Detail d={d} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <Detail d={skillDomains[active]} />
          </div>
        </div>
      </div>
    </section>
  );
}
