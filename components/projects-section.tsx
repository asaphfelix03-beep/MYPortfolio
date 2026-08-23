"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

type Project = {
  id: number;
  index: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  type: string;
  year: string;
  status?: string;
  link?: string;
  linkLabel?: string;
  visualization?: string;
  download?: string;
  repo?: string;
};

const projects: Project[] = [
  {
    id: 5,
    index: "01",
    title: "Électrification de la Côte d'Ivoire",
    tagline: "Ce que disent réellement dix-neuf lignes de données publiques",
    description:
      "Analyse de 63 ans d'abonnements à l'électricité (1960–2023) à partir des données ouvertes du Ministère des Mines, du Pétrole et de l'Énergie. Trois régimes de croissance distincts sont identifiés, la contribution du programme PEPT est isolée, et l'accès universel est projeté selon le rythme d'abonnement tenu. La chaîne complète est versionnée : contrôle qualité de la source, base SQLite sous contraintes, cinq requêtes analytiques commentées et 29 tests qui verrouillent chaque chiffre publié.",
    technologies: ["Python", "Pandas", "SQL · SQLite", "Matplotlib", "Jupyter"],
    type: "Analyse de données",
    year: "2026",
    link: "https://asaphfelix03-beep.github.io/electrification-ci/dashboard/",
    linkLabel: "Ouvrir le tableau de bord",
    visualization: "https://asaphfelix03-beep.github.io/electrification-ci/dashboard/",
    repo: "https://github.com/asaphfelix03-beep/electrification-ci",
  },
  {
    id: 3,
    index: "02",
    title: "CVFacile",
    tagline: "Un CV professionnel en quelques minutes, sans créer de compte",
    description:
      "Générateur de CV en ligne qui guide l'utilisateur section par section plutôt que de lui livrer un modèle vide : 55 mises en page adaptées aux différents métiers, aperçu en direct et export PDF prêt à envoyer. La création est gratuite et sans inscription, le paiement n'intervient qu'au téléchargement.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    type: "Produit web",
    year: "2026",
    link: "https://www.cvfacile.site/",
    linkLabel: "Visiter le site",
  },
  {
    id: 2,
    index: "03",
    title: "N'ti",
    tagline: "Apprendre le Baoulé, hors ligne et en autonomie",
    description:
      "Application mobile dédiée à l'apprentissage de la langue Baoulé : leçons, vocabulaire, audios de prononciation, quiz et dictionnaire Baoulé–Français consultable sans connexion.",
    technologies: ["Flutter", "Firebase", "Audio Processing"],
    type: "Application mobile",
    year: "2026",
    download: "/files/nti-app-release.apk",
  },
  {
    id: 1,
    index: "04",
    title: "EcoCollect",
    tagline: "Signaler, localiser et réduire les dépôts sauvages",
    description:
      "Application mobile citoyenne permettant de signaler des dépôts sauvages de déchets, de localiser les points de collecte et de recyclage, et de sensibiliser à l'éco-responsabilité.",
    technologies: ["Flutter", "Django", "PostgreSQL", "Google Maps API"],
    type: "Application mobile",
    year: "2025 — 2026",
    status: "En cours",
  },
  {
    id: 4,
    index: "05",
    title: "Matronassist-ci",
    tagline: "Alléger l'administratif des sages-femmes",
    description:
      "Plateforme de suivi de grossesse qui automatise le travail administratif des sages-femmes et améliore le suivi des patientes grâce à des alertes intelligentes et un partage facilité des données médicales.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Docker"],
    type: "Plateforme web",
    year: "2026",
    status: "En cours",
  },
];

export default function ProjectsSection() {
  const reduce = useSafeReducedMotion();

  return (
    <section
      id="projects"
      className="section-dark relative py-20 sm:py-28 lg:py-32 px-5 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="eyebrow">Projets sélectionnés & résultats</p>
        </Reveal>

        <div className="mt-5 grid lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <Reveal delay={0.06} className="lg:col-span-7 min-w-0">
            <h2 className="display text-[clamp(1.9rem,4.6vw,3.4rem)] text-balance">
              Des projets qui répondent à des besoins{" "}
              <span className="italic">réels</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-5 min-w-0">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
              De l&apos;analyse de données à l&apos;application mobile citoyenne,
              chaque projet part d&apos;un problème concret et se juge à son
              utilité.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 sm:mt-16 space-y-5 sm:space-y-6" stagger={0.1}>
          {projects.map((p) => (
            <RevealItem key={p.id} className="min-w-0">
              <motion.article
                whileHover={reduce ? undefined : { y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8">
                  {/* Meta column */}
                  <div className="lg:col-span-4 min-w-0">
                    <div className="flex items-start gap-4">
                      <span className="display text-3xl leading-none text-muted-foreground/60">
                        {p.index}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="eyebrow text-[10px]">{p.type}</span>
                          {p.status ? (
                            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-accent whitespace-nowrap">
                              {p.status}
                            </span>
                          ) : null}
                        </div>
                        <h3 className="display text-2xl sm:text-3xl mt-2 text-balance">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {p.year}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body column */}
                  <div className="lg:col-span-8 min-w-0">
                    <p className="display italic text-lg sm:text-xl text-foreground/85 text-balance">
                      {p.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {p.description}
                    </p>

                    {p.visualization ? (
                      <div className="mt-5 rounded-lg border border-border bg-background/40 p-2">
                        <div className="mb-2 flex items-center justify-between gap-2 px-1">
                          <p className="eyebrow text-[9.5px]">Aperçu interactif</p>
                          {p.link ? (
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-medium text-accent underline-offset-4 hover:underline"
                            >
                              Plein écran
                            </a>
                          ) : null}
                        </div>
                        <iframe
                          src={p.visualization}
                          title={`${p.title} — visualisation`}
                          loading="lazy"
                          className="project-visualization"
                        />
                      </div>
                    ) : null}

                    {(p.link || p.download || p.repo) && (
                      <div className="mt-5 flex flex-wrap gap-2.5">
                        {p.link ? (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 rounded-md bg-foreground text-background px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] hover:opacity-90 transition-opacity"
                          >
                            {p.linkLabel ?? "Voir le projet"}
                            <ArrowUpRight
                              size={14}
                              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </a>
                        ) : null}
                        {p.repo ? (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] hover:bg-secondary transition-colors"
                          >
                            <Github size={14} />
                            Code source
                          </a>
                        ) : null}
                        {p.download ? (
                          <a
                            href={p.download}
                            download
                            className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] hover:bg-secondary transition-colors"
                          >
                            <Download size={14} />
                            Télécharger
                          </a>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
