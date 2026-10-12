"use client";

import { useEffect, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { site, type CvInfo } from "@/lib/site";
import { projects, publicRepoCount } from "@/lib/projects";
import { certifications } from "@/lib/parcours";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Projects that have a real screenshot, shown as a stack of browser windows. */
const shots = projects.flatMap((p) =>
  p.visual.kind === "image" ? [{ slug: p.slug, title: p.title, category: p.category, src: p.visual.src, alt: p.visual.alt, pos: p.visual.position }] : [],
);

/**
 * The first viewport: the name, one statement with two accent words, three
 * real figures, the three ways forward — and, on the right, the work itself:
 * a stack of project windows that tilts toward the pointer and deals the
 * next card on a click or every few seconds.
 */
export default function Hero({ cv }: { cv: CvInfo }) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-24 sm:pt-28"
    >
      <div
        aria-hidden
        className="weave-field pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(90%_70%_at_75%_40%,black,transparent_75%)]"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-16 sm:px-8 md:pl-20 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-12 lg:gap-10 lg:pb-20">
        <div className="min-w-0 lg:col-span-6">
          <p className="pop-in kicker" style={delay(0)}>
            <span aria-hidden className="signal-dot inline-block h-2 w-2 rounded-full bg-blue" />
            <span>
              Disponible <span className="text-muted-foreground">· stage dès fin février 2027</span>
            </span>
          </p>

          <h1 id="hero-title" className="mt-8">
            <span className="rise-in flex items-center gap-3" style={delay(80)}>
              <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-card shadow-[var(--shadow-soft)]">
                <Image src="/images/asaph-photo.webp" alt="" fill sizes="44px" className="object-cover object-[50%_25%]" priority />
              </span>
              <span className="flex flex-col">
                <span className="text-[1.125rem] font-semibold tracking-[-0.02em] text-foreground">{site.name}</span>
                <span className="mono-label">
                  {site.level} · {site.school.short} · {site.school.city}
                </span>
              </span>
            </span>
            <span className="display-name mt-7 block text-[clamp(2.8rem,6.4vw,5.6rem)] text-foreground">
              <Line d={180}>Sécuriser les</Line>
              <Line d={280}>
                <span className="serif-accent text-brand pr-[0.06em]">systèmes</span>.
              </Line>
              <Line d={380}>Faire parler</Line>
              <Line d={480}>
                les <span className="serif-accent text-brand pr-[0.06em]">données</span>.
              </Line>
            </span>
          </h1>

          <p className="rise-in prose-night mt-7 max-w-[34rem] text-base sm:text-[1.0625rem]" style={delay(620)}>
            Étudiant en <span className="font-medium text-blue">cybersécurité</span> et{" "}
            <span className="font-medium text-sage-ink">intelligence artificielle</span>. Détection
            de fraude sur graphe, analyses de données publiques ivoiriennes,
            applications web et mobiles : chaque projet ici a sa méthode et ses
            sources.
          </p>

          <ul aria-label="En chiffres" className="mt-6 flex flex-wrap gap-2">
            {[
              [`${projects.length}`, "projets"],
              [`${certifications.length}`, "certifications"],
              [`${publicRepoCount}`, "dépôts publics"],
            ].map(([n, l], i) => (
              <li key={l} className="pop-in rounded-full border border-border bg-card px-3.5 py-1.5 text-[0.875rem] shadow-[var(--shadow-soft)]" style={delay(720 + i * 80)}>
                <span className="font-semibold text-foreground">{n}</span> <span className="text-muted-foreground">{l}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href="#projets" className="pop-in btn btn-primary" style={delay(900)}>
              Voir mes projets
              <ArrowDown size={17} aria-hidden className="icon-down" />
            </a>
            <a href={cv.href} download={cv.downloadName} className="pop-in btn btn-outline" style={delay(980)}>
              <Download size={17} aria-hidden className="icon-down" />
              Télécharger mon CV
              <span className="font-normal text-muted-foreground">(PDF, {cv.size})</span>
            </a>
            <a href="#contact" className="pop-in btn btn-quiet link-line self-start sm:self-auto" style={delay(1060)}>
              Me contacter
            </a>
          </div>
        </div>

        <div className="pop-in min-w-0 lg:col-span-6" style={delay(350)}>
          <ProjectStack />
        </div>
      </div>
    </section>
  );
}

function Line({ d, children }: { d: number; children: React.ReactNode }) {
  return (
    <span className="line-mask">
      <span className="line-up" style={delay(d)}>
        {children}
      </span>
    </span>
  );
}

function ProjectStack() {
  const reduce = useSafeReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = shots.length;

  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % n), 5000);
    return () => window.clearInterval(t);
  }, [reduce, paused, n]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };

  const go = (d: number) => setIndex((i) => (i + d + n) % n);
  // Back to front: the two cards behind, then the front card.
  const order = [2, 1, 0].map((k) => (index + k) % n);
  const current = shots[index];

  return (
    <div
      className="relative mx-auto w-full max-w-[38rem] [perspective:1400px]"
      onPointerMove={onMove}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        rx.set(0);
        ry.set(0);
      }}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <motion.div style={reduce ? undefined : { rotateX: rx, rotateY: ry }} className="relative aspect-[16/12] [transform-style:preserve-3d]">
        <AnimatePresence initial={false}>
          {order.map((k, depth) => {
            const s = shots[k];
            const front = depth === 2;
            const back = 2 - depth; // 0 front, 2 farthest
            return (
              <motion.div
                key={s.slug}
                aria-hidden={!front}
                initial={reduce ? false : { opacity: 0, y: -40, scale: 0.85, rotate: 6 }}
                animate={{
                  opacity: back === 2 ? 0.55 : 1,
                  y: back * -34,
                  x: back * 30,
                  scale: 1 - back * 0.06,
                  rotate: back * 4 - 2,
                }}
                exit={reduce ? undefined : { opacity: 0, y: 60, x: -60, rotate: -10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 160, damping: 22 }}
                style={{ zIndex: depth }}
                className="absolute inset-0 overflow-hidden rounded-[1.4rem] border border-border bg-card shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.17_25)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.8_0.14_85)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.72_0.15_150)]" />
                  <span className="mono-label ml-3 truncate normal-case tracking-normal">
                    portfolio-ojewumi.tech/projets/{s.slug}
                  </span>
                </div>
                <div className="relative h-[calc(100%-2.6rem)]">
                  <Image
                    src={s.src}
                    alt={front ? s.alt : ""}
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="object-cover"
                    style={{ objectPosition: s.pos ?? "50% 0%" }}
                    priority={k === 0}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,oklch(0.18_0.05_268/0.92))] px-5 pb-4 pt-12">
                    <p className="mono-label !text-white/70">{s.category}</p>
                    <p className="text-[1.375rem] font-semibold tracking-[-0.03em] text-white">{s.title}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <Link
          href={`/projets/${current.slug}`}
          className="link-go inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-foreground"
        >
          <span aria-live="polite">{current.title}</span>
          <ArrowUpRight size={16} aria-hidden className="icon-out" />
        </Link>
        <div className="flex items-center gap-2">
          <span className="mono-label tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => go(-1)} aria-label="Projet précédent" className="btn btn-outline btn-sm h-11 w-11 !p-0">
            <ArrowLeft size={17} aria-hidden />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Projet suivant" className="btn btn-outline btn-sm h-11 w-11 !p-0">
            <ArrowRight size={17} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
