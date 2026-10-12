"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Download, FileText } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, RevealTitle } from "@/components/ui/reveal";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { IN_VIEW_MARGIN } from "@/lib/motion";
import {
  certifications,
  education,
  experience,
  issuerCount,
  languages,
  participations,
  qualities,
} from "@/lib/parcours";
import { publicRepoCount, projects } from "@/lib/projects";
import type { CvInfo } from "@/lib/site";

/**
 * The path so far: the course, the certificates, and the way of working
 * the published projects show. The portrait already opens the page, so it
 * is not repeated here.
 */
export default function ParcoursSection({ cv }: { cv: CvInfo }) {
  const reduce = useSafeReducedMotion();
  const verifiable = certifications.filter((c) => c.verify).length;

  const approach = [
    {
      title: "Partir d'une question précise",
      body: "L'analyse de l'électrification part de quatre questions, celle de la monnaie électronique d'une seule : un compte ouvert est-il un compte utilisé ?",
    },
    {
      title: "Montrer la méthode et ses limites",
      body: "Contrôles qualité, tests automatisés, limites écrites noir sur blanc : un chiffre publié doit pouvoir être vérifié.",
    },
    {
      title: "Publier le code",
      body: `${publicRepoCount} des ${projects.length} projets présentés ici ont leur dépôt public sur GitHub.`,
    },
  ];

  return (
    <section
      id="parcours"
      tabIndex={-1}
      aria-labelledby="parcours-title"
      className="relative px-5 py-20 outline-none sm:px-8 sm:py-28 lg:py-32"
    >
      <span id="about" aria-hidden className="absolute top-0" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <RevealTitle id="parcours-title" className="h-section" text="Deux disciplines qui se _répondent_" />
          </div>
          <Reveal delay={0.06} className="min-w-0 lg:col-span-5">
            <p className="prose-night text-base sm:text-[1.0625rem]">
              Je m&apos;appelle Ojewumi Asaph Felix. Je me forme à
              l&apos;ESATIC, à Abidjan, sur deux disciplines qui se répondent :
              protéger les systèmes et faire parler les données. J&apos;apprends
              autant par les projets que par la certification.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* Left: how I work, and the person around it. */}
          <div className="min-w-0 space-y-12 lg:col-span-5">
            <Reveal kind="clip" duration={1.3}>
              <figure className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)]">
                <Image
                  src="/images/asaph-photo.webp"
                  alt="Portrait d'Ojewumi Asaph Felix"
                  fill
                  sizes="(min-width: 1024px) 384px, 90vw"
                  className="object-cover object-[50%_30%]"
                />
                <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-card px-4 py-3 shadow-[var(--shadow-soft)]">
                  <span className="block text-[1rem] font-semibold tracking-[-0.02em]">Ojewumi Asaph Felix</span>
                  <span className="mono-label">Abidjan · Côte d&apos;Ivoire</span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal>
              <h3 className="h-title text-[1.375rem]">Ma démarche</h3>
              <ul className="mt-5 border-t border-border">
                {approach.map((a) => (
                  <li key={a.title} className="border-b border-border py-5">
                    <p className="text-[1rem] text-foreground">{a.title}</p>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground text-pretty">
                      {a.body}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
                {languages.map((l) => (
                  <div key={l.name}>
                    <dt className="label">{l.name}</dt>
                    <dd className="mt-1 text-[1.375rem] font-light">{l.level}</dd>
                  </div>
                ))}
                <div className="col-span-2">
                  <dt className="label">Atouts</dt>
                  <dd className="mt-2 text-[0.9375rem] text-foreground/85">
                    {qualities.join(", ")}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="label">Participations</dt>
                  <dd className="mt-2">
                    <ul className="space-y-1.5 text-[0.9375rem]">
                      {participations.map((p) => (
                        <li key={p.title}>
                          <span className="text-foreground">{p.title}</span>
                          <span className="text-muted-foreground"> · {p.note}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal>
              <a href={cv.href} download={cv.downloadName} className="btn btn-outline">
                <Download size={17} aria-hidden className="icon-down" />
                Télécharger mon CV
                <span className="font-normal text-muted-foreground">(PDF, {cv.size})</span>
              </a>
            </Reveal>
          </div>

          {/* Right: the record. */}
          <div className="min-w-0 space-y-14 lg:col-span-7">
            <Reveal kind="right">
              <div id="experience" className="surface relative overflow-hidden p-6 sm:p-8">
                <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-[image:var(--grad-brand)]" />
                <h3 className="h-title text-[1.375rem]">Expérience</h3>
                {experience.map((x) => (
                  <div key={x.title} className="mt-5">
                    <p className="label">
                      {x.period} <span className="text-blue">· en cours</span>
                    </p>
                    <p className="mt-1 text-[1.125rem] font-medium text-foreground">{x.title}</p>
                    <p className="text-[0.9375rem] text-muted-foreground">{x.org}</p>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-foreground/85 text-pretty">{x.summary}</p>
                    <ul aria-label="Outils" className="mt-4 flex flex-wrap gap-1.5">
                      {x.tools.map((t) => (
                        <li key={t} className="tag">{t}</li>
                      ))}
                    </ul>
                    <a
                      href={x.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-go mt-4 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-accent"
                    >
                      Voir les 6 projets du stage
                      <ArrowUpRight size={15} aria-hidden className="icon-out" />
                      <span className="sr-only">sur GitHub (nouvel onglet)</span>
                    </a>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div id="formation" tabIndex={-1} className="outline-none">
                <h3 className="h-title text-[1.375rem]">Formation</h3>
                <ol className="relative mt-6 space-y-7">
                  <motion.span
                    aria-hidden
                    className="absolute bottom-1.5 left-[3.5px] top-1.5 w-px origin-top bg-border"
                    initial={reduce ? undefined : { scaleY: 0 }}
                    whileInView={reduce ? undefined : { scaleY: 1 }}
                    viewport={{ once: true, margin: IN_VIEW_MARGIN }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {education.map((e) => (
                    <li key={e.title} className="relative pl-8">
                      <span
                        aria-hidden
                        className={`absolute left-0 top-[0.45rem] h-2 w-2 rounded-full ${
                          e.current ? "bg-accent" : "bg-border"
                        }`}
                      />
                      <p className="label">
                        {e.period}
                        {e.current ? <span className="text-accent"> · en cours</span> : null}
                      </p>
                      <p className="mt-1 text-[1.0625rem] text-foreground text-balance">{e.title}</p>
                      <p className="mt-0.5 text-[0.9375rem] text-muted-foreground">{e.school}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal>
              <div id="certifications" tabIndex={-1} className="outline-none">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="h-title text-[1.375rem]">
                    Certifications{" "}
                    <span className="text-muted-foreground tabular-nums">{certifications.length}</span>
                  </h3>
                  <p className="text-[0.875rem] text-muted-foreground">
                    {issuerCount} organismes, {verifiable} vérifiables en ligne
                  </p>
                </div>

                <RevealGroup as="ul" stagger={0.06} className="mt-5 border-t border-border">
                  {certifications.map((c) => (
                    <RevealItem
                      as="li"
                      kind="right"
                      key={c.title}
                      className="flex flex-col gap-3 border-b border-border py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                    >
                      <div className="min-w-0">
                        <p className="text-[0.9375rem] text-foreground text-pretty">{c.title}</p>
                        <p className="mt-0.5 text-[0.8125rem] text-muted-foreground">
                          {c.issuer}
                          {c.kind ? `, ${c.kind.toLowerCase()}` : ""} · {c.date}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-1">
                        <a
                          href={c.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-go inline-flex min-h-11 items-center gap-1.5 text-[0.875rem] text-muted-foreground transition-colors hover:text-foreground sm:min-h-0"
                        >
                          <FileText size={15} aria-hidden />
                          Certificat
                          <span className="sr-only">
                            {" "}
                            {c.title}, PDF (nouvel onglet)
                          </span>
                        </a>
                        {c.verify ? (
                          <a
                            href={c.verify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-go inline-flex min-h-11 items-center gap-1.5 text-[0.875rem] text-accent sm:min-h-0"
                          >
                            <BadgeCheck size={15} aria-hidden />
                            Vérifier
                            <ArrowUpRight size={14} aria-hidden className="icon-out" />
                            <span className="sr-only">
                              {" "}
                              l&apos;authenticité de {c.title} sur Coursera (nouvel onglet)
                            </span>
                          </a>
                        ) : null}
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
