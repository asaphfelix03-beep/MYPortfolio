"use client";

import Link from "next/link";
import { Reveal, RevealGroup, RevealItem, RevealTitle } from "@/components/ui/reveal";
import { levels, skillDomains, type SkillLevel, type SkillProof } from "@/lib/skills";

/**
 * Skills as a ledger: five domains, and on every line the proof — the
 * project that uses it, the certificate that covers it — or the honest
 * admission that it is still a notion. A recruiter can check any line in
 * one click instead of taking a logo wall on trust.
 */
export default function SkillsSection() {
  return (
    <section
      id="competences"
      tabIndex={-1}
      aria-labelledby="competences-title"
      className="relative px-5 py-20 outline-none sm:px-8 sm:py-28 lg:py-32"
    >
      <span id="skills" aria-hidden className="absolute top-0" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <RevealTitle id="competences-title" className="h-section" text="Ce que je sais faire, et où le _vérifier_" />
          </div>
          <Reveal delay={0.06} className="min-w-0 lg:col-span-5">
            <p className="prose-night text-base sm:text-[1.0625rem]">
              Chaque compétence renvoie à sa preuve : un projet publié ici,
              une certification ou la formation à l&apos;ESATIC. Ce qui
              n&apos;est encore qu&apos;une notion est présenté comme tel.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <ul aria-label="Légende" className="mt-10 flex flex-wrap gap-x-8 gap-y-3 sm:mt-12">
            {(Object.keys(levels) as SkillLevel[]).map((l) => (
              <li key={l} className="flex items-center gap-3 text-[0.875rem] text-muted-foreground">
                <LevelMark level={l} />
                <span title={levels[l].description}>{levels[l].label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-8 grid gap-5">
          {skillDomains.map((d, i) => (
            <Reveal key={d.id} kind={i % 2 ? "right" : "left"}>
              <div className="surface group grid gap-5 p-6 transition-shadow duration-500 hover:shadow-[var(--shadow-lift)] sm:p-8 lg:grid-cols-12 lg:gap-12">
                <div className="min-w-0 lg:col-span-4">
                  <span aria-hidden className={`mb-4 block h-1 w-12 rounded-full transition-[width] duration-500 group-hover:w-20 ${domainColor[i % domainColor.length]}`} />
                  <h3 className="h-title text-[1.375rem] sm:text-[1.5rem]">{d.title}</h3>
                  <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {d.description}
                  </p>
                </div>

                <RevealGroup as="ul" stagger={0.07} className="min-w-0 lg:col-span-8">
                  {d.skills.map((s) => (
                    <RevealItem
                      as="li"
                      kind="right"
                      key={s.name}
                      className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-1 border-b border-border/50 py-3.5 last:border-b-0 sm:grid-cols-[auto_1fr_auto] sm:gap-x-6"
                    >
                      <LevelMark level={s.level} />
                      <span className="text-[0.9375rem] leading-snug text-foreground text-pretty">
                        {s.name}
                        <span className="sr-only"> ({levels[s.level].label})</span>
                      </span>
                      <span className="col-start-2 text-[0.8125rem] leading-snug text-muted-foreground sm:col-start-3 sm:max-w-[16rem] sm:text-right">
                        {s.proofs.length ? (
                          <Proofs proofs={s.proofs} />
                        ) : (
                          "Pas encore de projet publié"
                        )}
                      </span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Three marks that differ by shape, not only by colour: a filled amber
 * square for what has been put to work, an outlined square for what has
 * been studied, a dashed one for a notion.
 */
const domainColor = ["bg-blue", "bg-sage", "bg-cyan", "bg-blue", "bg-sage"];

function LevelMark({ level }: { level: SkillLevel }) {
  const shape =
    level === "projet"
      ? "rounded-full bg-[image:var(--grad-brand)]"
      : level === "formation"
        ? "rounded-full border-2 border-blue"
        : "rounded-full border border-dashed border-muted-foreground";
  return (
    <span
      aria-hidden
      className={`inline-block h-2.5 w-2.5 shrink-0 translate-y-[0.05em] ${shape}`}
    />
  );
}

function Proofs({ proofs }: { proofs: SkillProof[] }) {
  return (
    <>
      {proofs.map((p, i) => (
        <span key={p.label}>
          {i > 0 ? ", " : null}
          {p.href ? (
            p.href.startsWith("/") ? (
              <Link href={p.href} className="link-line inline-block py-1.5 text-foreground/80 hover:text-accent">
                {p.label}
              </Link>
            ) : (
              <a href={p.href} className="link-line inline-block py-1.5 text-foreground/80 hover:text-accent">
                {p.label}
              </a>
            )
          ) : (
            p.label
          )}
        </span>
      ))}
    </>
  );
}
