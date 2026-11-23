"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, WORD_SCRUB } from "@/lib/motion";
import { education, experience } from "@/lib/parcours";
import { site } from "@/lib/site";

const accentWords = new Set(["cybersécurité", "d'intelligence", "artificielle", "sécuriser", "données", "stage"]);
// Every claim maps to a shipped project (SOC Homelab, SynthID-Graph) or to lib/parcours.ts qualities.
const lead = `Étudiant en ${site.level} de cybersécurité et d'intelligence artificielle à l'${site.school.short}, je conjugue deux exigences : sécuriser les systèmes et faire parler les données. De la supervision d'un SOC à la détection de fraude par graphe, chacun de mes projets expose sa méthode et ses résultats. Rigoureux et curieux, je recherche un stage pour mettre cette double compétence au service d'une équipe exigeante.`;
const words = lead.split(" ");

const today = [
  { title: experience[0].title, org: experience[0].org },
  ...education.filter((e) => e.current).map((e) => ({ title: e.title, org: e.school })),
];

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
    </section>
  );
}
