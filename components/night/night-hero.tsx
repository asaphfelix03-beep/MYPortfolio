"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import { Magnetic } from "@/components/ui/magnetic";
import { Unveil } from "@/components/ui/unveil";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

const figures = [
  { label: "Cybersécurité & IA", value: "L3", note: "ESATIC" },
  { label: "Certifications", value: "09", count: 9, note: "4 organismes" },
  { label: "Projets menés", value: "06", count: 6, note: "Sécurité · Données · Web" },
];

/**
 * The first viewport of the woven night.
 *
 * The name is set as cloth — two tracked uppercase lines at display scale —
 * and the claim sits under it as one sentence, because the double profile is
 * a single argument and not two columns. The portrait is woven in: the same
 * warp-and-weft that makes the ground passes over the photograph, so the
 * person is part of the cloth rather than pasted onto it.
 */
export default function NightHero() {
  const reduce = useSafeReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -18]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 sm:pt-28"
    >
      {/* The cloth. Densest behind the portrait, thinning toward the type so
          the headline never fights the texture it sits on. */}
      <div
        aria-hidden
        className="weave-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_90%_at_78%_38%,black,transparent_72%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 sm:px-8 md:pl-20 lg:grid-cols-12 lg:gap-12">
        <motion.div
          style={reduce ? undefined : { y: copyY }}
          className="min-w-0 lg:col-span-7"
        >
          <h1>
            <motion.span
              {...rise(0.08)}
              className="woven-title block text-[clamp(2.6rem,8.5vw,6rem)] text-foreground"
            >
              Ojewumi
              <br />
              Asaph
              <br />
              Felix
            </motion.span>
            <motion.span
              {...rise(0.2)}
              className="mt-7 block max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Je sécurise et valorise la donnée qui fait avancer vos projets.
            </motion.span>
          </h1>

          <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap gap-3">
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#contact"
                className="group inline-flex w-full items-center justify-center gap-2 bg-accent px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-foreground transition-opacity hover:opacity-90"
              >
                Travaillons ensemble
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </Magnetic>
            <a
              href="#projects"
              className="inline-flex w-full items-center justify-center border border-border px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-accent hover:text-accent sm:w-auto"
            >
              Voir mes réalisations
            </a>
            <a
              href="/cv"
              download="CV OJEWUMI ASAPH FELIX.pdf"
              className="inline-flex w-full items-center justify-center gap-2 px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground sm:w-auto"
            >
              <Download size={15} />
              CV
            </a>
          </motion.div>
        </motion.div>

        {/* The portrait, woven in. */}
        <motion.div
          style={reduce ? undefined : { y: portraitY }}
          className="min-w-0 lg:col-span-5"
        >
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <Unveil
              delay={0.3}
              className="night-plate relative aspect-square overflow-hidden border border-border bg-secondary"
            >
              <Image
                src="/images/asaph-photo.jpg"
                alt="Ojewumi Asaph Felix"
                fill
                priority
                sizes="(max-width: 1024px) 384px, 420px"
                className="object-cover object-center"
              />
              {/* The same cloth passes over the photograph. */}
              <span
                aria-hidden
                className="weave-field absolute inset-0 opacity-60 mix-blend-overlay"
              />
            </Unveil>

            <p className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <span>Abidjan · Côte d&apos;Ivoire</span>
              <span className="text-accent">ESATIC</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* The bottom hairline carries the figures, set as registration marks. */}
      {/* The bottom hairline carries the availability chip and the figures,
          set as registration marks along the edge of the cloth. */}
      <motion.div
        {...rise(0.42)}
        className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-border px-5 py-7 sm:px-8 md:pl-20 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
      >
        <p className="inline-flex shrink-0 items-center gap-2.5 self-start text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground lg:mb-2">
          <span className="relative flex h-1.5 w-1.5">
            {!reduce && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Stage de 3 mois · dès fin février 2027
        </p>

        <dl className="grid w-full grid-cols-3 gap-5 sm:gap-8 lg:max-w-2xl">
        {figures.map((f) => (
          <div key={f.label} className="min-w-0">
            <dt className="min-h-[2.75em] text-[9.5px] font-medium uppercase leading-snug tracking-[0.22em] text-muted-foreground sm:min-h-0">
              {f.label}
            </dt>
            <dd className="woven-title mt-2 text-3xl text-foreground sm:text-4xl">
              {f.count ? (
                <CountUp value={f.count} prefix="0" className="tabular-nums" />
              ) : (
                f.value
              )}
              <span className="mt-1.5 block text-[11px] normal-case leading-snug tracking-normal text-muted-foreground sm:mt-0 sm:ml-2 sm:inline">
                {f.note}
              </span>
            </dd>
          </div>
        ))}
        </dl>
      </motion.div>
    </section>
  );
}
