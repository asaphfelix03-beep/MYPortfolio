"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Award,
  FileText,
  ExternalLink,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

type Certification = {
  title: string;
  issuer: string;
  date: string | null;
  file: string | null;
  /** Issuer-hosted verification page, when the credential offers one. */
  verify?: string;
};

const certifications: Certification[] = [
  {
    title: "Associate Data Analyst",
    issuer: "DataCamp · Certification",
    date: "Août 2026",
    file: "/certificates/datacamp-associate-data-analyst.pdf",
  },
  {
    title: "Data Analysis with SQL, Excel & Power BI",
    issuer: "Microsoft · Coursera · Spécialisation",
    date: "Août 2026",
    file: "/certificates/microsoft-data-analysis-sql-excel-powerbi.pdf",
    verify: "https://coursera.org/verify/specialization/UPNCJ04RATC5",
  },
  {
    title: "Databases and SQL for Data Science with Python",
    issuer: "IBM · Coursera",
    date: "Août 2026",
    file: "/certificates/databases-sql-data-science-python.pdf",
    verify: "https://coursera.org/verify/UVGR2UKXALOP",
  },
  {
    title: "Notions de base sur les réseaux",
    issuer: "Cisco Networking Academy",
    date: "Août 2026",
    file: "/certificates/networking-basics.pdf",
  },
  {
    title: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    date: "Juillet 2026",
    file: "/certificates/data-analytics-essentials.pdf",
  },
  {
    title: "Introduction à la science des données",
    issuer: "Cisco Networking Academy",
    date: "Juillet 2026",
    file: "/certificates/introduction-data-science.pdf",
  },
  {
    title: "Introduction à l'IA moderne",
    issuer: "Cisco Networking Academy",
    date: "Juillet 2026",
    file: "/certificates/introduction-modern-ai.pdf",
  },
  {
    title: "Data Science Essentials with Python",
    issuer: "Cisco Networking Academy",
    date: "Juillet 2026",
    file: "/certificates/data-science-essentials-python.pdf",
  },
  {
    title: "Cybersecurity Defense Analyst Pathway Exam",
    issuer: "Cisco Networking Academy",
    date: "Juillet 2026",
    file: "/certificates/cybersecurity-defense-analyst.pdf",
  },
];

const education = [
  {
    period: "2026 — 2027",
    title: "Licence 3 · Cybersécurité et Intelligence Artificielle",
    school: "École Supérieure Africaine des TICs (ESATIC)",
    current: true,
  },
  {
    period: "2024 — 2026",
    title: "Licence 2 · Cybersécurité et Intelligence Artificielle",
    school: "École Supérieure Africaine des TICs (ESATIC)",
  },
  {
    period: "Juin 2024",
    title: "Baccalauréat série D",
    school: "Lycée Moderne de Treichville",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="eyebrow">Présentation & parcours</p>
        </Reveal>

        {/* Lead statement */}
        <div className="mt-5 grid lg:grid-cols-12 gap-8 lg:gap-12">
          <Reveal delay={0.06} className="lg:col-span-7 min-w-0">
            <h2 className="display text-[clamp(1.9rem,4.6vw,3.4rem)] text-balance">
              Étudiant aujourd&apos;hui, ingénieur de{" "}
              <span className="italic">confiance</span> demain.
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-5 min-w-0">
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground text-pretty">
              Je m&apos;appelle Ojewumi Asaph Felix. Je me forme à l&apos;ESATIC,
              à Abidjan, sur deux disciplines qui se répondent : protéger les
              systèmes et faire parler les données. Rigoureux et curieux,
              j&apos;apprends autant par les projets que par la certification.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 sm:mt-16 grid lg:grid-cols-12 gap-6">
          {/* Identity card */}
          <Reveal delay={0.06} className="lg:col-span-4 min-w-0">
            <div className="card-paper overflow-hidden h-full">
              <div className="relative aspect-square bg-secondary">
                <Image
                  src="/images/asaph-photo.png"
                  alt="Ojewumi Asaph Felix"
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="display text-2xl">Ojewumi Asaph Felix</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Cybersécurité & Intelligence Artificielle
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} className="text-accent shrink-0" />
                  Treichville, Abidjan · Côte d&apos;Ivoire
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {["Rigoureux", "Curieux", "Créatif", "Team player"].map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-border grid grid-cols-2 gap-4">
                  <div>
                    <p className="eyebrow text-[10px]">Français</p>
                    <p className="display text-xl mt-0.5">Courant</p>
                  </div>
                  <div>
                    <p className="eyebrow text-[10px]">Anglais</p>
                    <p className="display text-xl mt-0.5">Technique</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Education + certifications */}
          <div className="lg:col-span-8 min-w-0 space-y-6">
            <Reveal delay={0.12}>
              <div className="card-paper p-6 sm:p-8">
                <div className="flex items-center gap-2.5">
                  <GraduationCap size={17} className="text-accent" />
                  <p className="eyebrow text-foreground">Formation</p>
                </div>

                <ol className="mt-6 space-y-6">
                  {education.map((e) => (
                    <li
                      key={e.title}
                      className="relative pl-6 border-l border-border"
                    >
                      <span
                        className={`absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full ${
                          e.current ? "bg-accent" : "bg-border"
                        }`}
                      />
                      <p className="eyebrow text-[10px]">{e.period}</p>
                      <h4 className="mt-1.5 text-[15px] sm:text-base font-bold tracking-tight text-balance">
                        {e.title}
                      </h4>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {e.school}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            {/* Certifications */}
            <Reveal delay={0.18}>
              <div className="card-paper p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <Award size={17} className="text-accent" />
                    <p className="eyebrow text-foreground">Certifications</p>
                  </div>
                  <span className="display text-2xl leading-none">
                    {certifications.length}
                  </span>
                </div>

                <RevealGroup className="mt-5 divide-y divide-border" stagger={0.05}>
                  {certifications.map((cert) => (
                    <RevealItem key={cert.title}>
                      <div className="group/cert flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0 -mx-2 px-2 rounded-md hover:bg-secondary/60 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText
                            size={15}
                            className="text-muted-foreground shrink-0 transition-colors group-hover/cert:text-accent"
                          />
                          <div className="min-w-0">
                            {/* Two lines on phones so long course names stay readable. */}
                            <p className="text-[13px] sm:text-sm font-semibold tracking-tight line-clamp-2 sm:truncate">
                              {cert.title}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">
                              {cert.issuer}
                              {cert.date ? ` · ${cert.date}` : ""}
                            </p>
                          </div>
                        </div>

                        {cert.file ? (
                          <div className="flex items-center gap-0.5 shrink-0">
                            {cert.verify ? (
                              <a
                                href={cert.verify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-md text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                                aria-label={`Vérifier l'authenticité du certificat : ${cert.title}`}
                                title="Vérifier l'authenticité"
                              >
                                <BadgeCheck size={15} />
                              </a>
                            ) : null}
                            <a
                              href={cert.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-md text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                              aria-label={`Voir le certificat : ${cert.title}`}
                              title="Voir le certificat"
                            >
                              <ExternalLink size={15} />
                            </a>
                          </div>
                        ) : (
                          <span className="eyebrow text-[9px] shrink-0">
                            En cours
                          </span>
                        )}
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </Reveal>

            {/* Distinctions */}
            <Reveal delay={0.24}>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Hackathons Tech", desc: "Participation active" },
                  { title: "Ecowas Hackathon", desc: "Compétition régionale" },
                ].map((d) => (
                  <motion.div
                    key={d.title}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="card-paper p-6"
                  >
                    <p className="eyebrow text-[10px]">Distinction</p>
                    <h4 className="display text-xl mt-2">{d.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
