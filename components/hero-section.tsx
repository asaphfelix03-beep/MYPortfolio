"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

const stats = [
  { label: "Cybersécurité & IA", value: "L3", note: "ESATIC" },
  { label: "Certifications", value: "07", note: "Cisco · IBM · Microsoft" },
  { label: "Projets menés", value: "05", note: "web · mobile · data" },
];

export default function HeroSection() {
  const reduce = useSafeReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 px-5 sm:px-8"
    >
      <div className="absolute inset-0 grid-paper [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left: copy */}
        <div className="lg:col-span-7 min-w-0">
          <motion.div
            {...rise(0)}
            className="inline-flex items-center gap-2.5 rounded-md border border-border bg-card px-3 py-1.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="eyebrow text-foreground">
              Disponible · Stage & Alternance
            </span>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="mt-6 text-[clamp(2.4rem,6.2vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-balance"
          >
            Je sécurise et{" "}
            <span className="display italic font-normal">valorise</span> la donnée
            qui fait avancer{" "}
            <span className="display italic font-normal">vos projets</span>.
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            Étudiant en Cybersécurité et Intelligence Artificielle à l&apos;ESATIC.
            Je conçois des applications web et mobiles fiables, j&apos;analyse des
            jeux de données et j&apos;applique les bonnes pratiques de sécurité à
            chaque étape.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-foreground text-background text-[11px] font-semibold uppercase tracking-[0.14em] hover:opacity-90 transition-opacity"
            >
              Travaillons ensemble
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center px-6 py-3.5 rounded-md border border-foreground/25 text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-secondary transition-colors"
            >
              Voir mes réalisations
            </a>
            <a
              href="/cv"
              download="CV OJEWUMI ASAPH FELIX.pdf"
              className="inline-flex items-center gap-2 px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
            >
              <Download size={15} />
              CV
            </a>
          </motion.div>

          {/* Stats */}
          <motion.dl
            {...rise(0.32)}
            className="mt-12 grid grid-cols-3 gap-5 sm:gap-8 max-w-lg"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="eyebrow text-[9.5px] sm:text-[10px] leading-snug">
                  {s.label}
                </dt>
                <dd className="mt-1.5 display text-3xl sm:text-4xl">
                  {s.value}
                  <span className="ml-1.5 font-sans text-[11px] not-italic text-muted-foreground align-middle">
                    {s.note}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right: framed portrait with floating labels */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 min-w-0"
        >
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="rounded-xl border border-border bg-card p-2.5 shadow-[0_18px_50px_-20px_rgba(28,25,23,0.28)]">
              {/* Source photo is ~square, so a square frame shows it uncropped. */}
              <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
                <Image
                  src="/images/asaph-photo.png"
                  alt="Ojewumi Asaph Felix"
                  fill
                  priority
                  sizes="(max-width: 1024px) 384px, 420px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* floating chips */}
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -top-3 -right-2 sm:-right-4 rounded-md border border-border bg-card px-3 py-2 shadow-sm"
            >
              <span className="eyebrow text-foreground">Cybersécurité</span>
            </motion.div>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.5 }}
              className="absolute -bottom-4 -left-2 sm:-left-5 rounded-md bg-foreground text-background px-4 py-3 shadow-lg"
            >
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] opacity-70">
                Données
              </p>
              <p className="display text-xl leading-none mt-1">Analyse & visualisation</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
