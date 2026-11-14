"use client";

import { Fragment, useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { domainIcons } from "@/components/domaines-section";
import { gsap, prefersReducedMotion, WORD_SCRUB } from "@/lib/motion";
import { education, experience, qualities } from "@/lib/parcours";
import { site } from "@/lib/site";
import { skillDomains } from "@/lib/skills";

const accentWords = new Set(["Licence", "cybersécurité", "intelligence", "artificielle", "stage"]);
const lead = `Étudiant en ${site.level} à l'${site.school.short}, je me forme à la cybersécurité et à l'intelligence artificielle, avec ${qualities
  .slice(0, 3)
  .map((q) => q.toLowerCase())
  .join(", ")}. Je cherche un stage de trois mois à partir de fin février 2027.`;
const words = lead.split(" ");

const today = [
  { title: experience[0].title, org: experience[0].org },
  ...education.filter((e) => e.current).map((e) => ({ title: e.title, org: e.school })),
];

const tagTone = ["bg-signal-soft text-accent", "bg-muted text-foreground", "bg-muted text-violet"];
const short = (n: string) => n.split(/[:,]/)[0].trim();

export function ProfilSection() {
  const root = useRef<HTMLElement>(null);
  const lede = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !lede.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-w]",
        { opacity: WORD_SCRUB.dim },
        { opacity: 1, ease: "none", stagger: 1, scrollTrigger: { trigger: lede.current, start: WORD_SCRUB.start, end: WORD_SCRUB.end, scrub: true } },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="profil" tabIndex={-1} aria-labelledby="profil-title" className="mx-auto max-w-[var(--content-max)] px-[var(--gutter)] py-[var(--section-y)]">
      <h2 id="profil-title" className="h-section min-w-0 break-words">
        Qui suis-<span className="grad-text">je ?</span>
      </h2>
      <p ref={lede} className="lead mt-10 min-w-0 max-w-[60rem] break-words">
        <span className="sr-only">{lead}</span>
        <span aria-hidden>
          {words.map((w, i) => (
            <Fragment key={i}>
              <span data-w="" className={accentWords.has(w.replace(/[,.]/g, "")) ? "text-accent" : undefined}>
                {w}
              </span>{" "}
            </Fragment>
          ))}
        </span>
      </p>

      <p className="mt-16 text-[length:var(--fs-meta)] text-muted-foreground">Aujourd&apos;hui</p>
      <ul className="mt-3 grid gap-x-16 md:grid-cols-2">
        {today.map((r) => (
          <li key={r.title} className="hairline-row py-6">
            <p className="text-[length:var(--fs-h3)] font-medium leading-[1.1] tracking-[-0.03em]">{r.title}</p>
            <p className="mt-2 text-muted-foreground">{r.org}</p>
          </li>
        ))}
      </ul>

      <h3 className="mt-28 text-[length:var(--fs-h3)] font-medium tracking-[-0.03em]">Compétences</h3>
      <p className="mt-2 text-muted-foreground">Cinq domaines, du plus proche de ma formation au plus appliqué.</p>
      <div className="weave-field mt-10 rounded-2xl p-4 sm:p-8">
        <div className="mx-auto hidden w-fit items-center gap-3 rounded-full bg-card px-6 py-3 shadow-[var(--shadow-soft)] xl:flex">
          <ShieldCheck size={18} aria-hidden className="text-accent" />
          <span className="font-medium">
            {site.shortName} : <span className="grad-text">{site.domain}</span>
          </span>
        </div>
        <svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none" className="hidden h-14 w-full xl:block">
          {[10, 30, 50, 70, 90].map((x) => (
            <path key={x} d={`M50 0 V5 H${x} V10`} fill="none" stroke="var(--accent)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {skillDomains.map((d) => {
            const Icon = domainIcons[d.id] ?? ShieldCheck;
            return (
              <li key={d.id} className="min-w-0 rounded-lg bg-card p-5 shadow-[var(--shadow-soft)]">
                <span className="flex size-10 items-center justify-center rounded-full bg-signal-soft text-accent">
                  <Icon size={18} aria-hidden />
                </span>
                <p className="mt-4 min-w-0 break-words font-semibold leading-tight">{d.title}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {d.skills.slice(0, 3).map((s, i) => (
                    <li key={s.name} className={`tag max-w-full truncate ${tagTone[i % 3]}`}>
                      {short(s.name)}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
