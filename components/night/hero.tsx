"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { NetworkField } from "@/components/night/network-field";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { site, type CvInfo } from "@/lib/site";
import { projects, publicRepoCount } from "@/lib/projects";
import { certifications } from "@/lib/parcours";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const numberWords: Record<number, string> = {
  4: "quatre", 5: "cinq", 6: "six", 7: "sept", 8: "huit", 9: "neuf", 10: "dix",
};

/** Facts floating around the portrait — each one checkable further down. */
const badges = [
  { value: "90 %", label: "anneaux de fraude détectés", note: "SynthID-Graph", tone: "bg-violet", pos: "-left-24 top-[4%]", d: 1100 },
  { value: `${certifications.length}`, label: "certifications", note: "Cisco · IBM · Microsoft · DataCamp", tone: "bg-blue", pos: "-right-14 top-[52%]", d: 1300 },
  { value: "63 ans", label: "de données analysées", note: "Électrification CI", tone: "bg-cyan", pos: "-left-20 bottom-[2%]", d: 1500 },
];

/**
 * The first viewport: who (the name, swept once by light), what
 * (cybersecurity in blue, AI in violet), and the three ways forward. The
 * portrait opens like a shutter inside drifting colour fields and the data
 * network; the cluster follows the mouse a little, and the hero lifts away
 * on scroll. The entrance is CSS so it starts with the first frame.
 */
export default function Hero({ cv }: { cv: CvInfo }) {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -140]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 18 });
  const sy = useSpring(py, { stiffness: 80, damping: 18 });
  const backX = useTransform(sx, (v) => v * -0.5);
  const backY = useTransform(sy, (v) => v * -0.5);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 24);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 24);
  };

  const count = numberWords[projects.length] ?? String(projects.length);
  const repos = numberWords[publicRepoCount] ?? String(publicRepoCount);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16 sm:pt-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="drift-a absolute -right-[10%] -top-[18%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,oklch(0.75_0.14_265/0.45),transparent_65%)] blur-2xl" />
        <div className="drift-b absolute -bottom-[25%] right-[18%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,oklch(0.8_0.12_205/0.4),transparent_65%)] blur-2xl" />
        <div className="drift-b absolute -left-[12%] top-[30%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_295/0.28),transparent_65%)] blur-2xl" />
      </div>
      <div
        aria-hidden
        className="weave-field pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(120%_90%_at_80%_30%,black,transparent_70%)] lg:[mask-image:radial-gradient(110%_95%_at_78%_45%,black,transparent_72%)]"
      />
      <NetworkField className="fade-in pointer-events-none absolute inset-0 -z-10 h-full w-full" style={delay(700)} />

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-5 py-10 sm:px-8 md:pl-20 lg:grid-cols-12 lg:py-14">
        <motion.div style={reduce ? undefined : { y: copyY, opacity: copyOpacity }} className="min-w-0 lg:col-span-7">
          <p data-network-avoid className="pop-in kicker" style={delay(0)}>
            <span className="relative block h-6 w-6 shrink-0 overflow-hidden rounded-full lg:hidden">
              <Image src="/images/asaph-photo.webp" alt="" fill sizes="24px" className="object-cover object-[50%_25%]" priority />
            </span>
            <span aria-hidden className="hidden h-2 w-2 rounded-full bg-[image:var(--grad-brand)] lg:block" />
            Étudiant en {site.level} à l&apos;{site.school.short}, {site.school.city}
          </p>

          <h1 id="hero-title" className="display-name mt-7 text-[clamp(3.1rem,10.4vw,7rem)] text-foreground">
            {["Ojewumi", "Asaph", "Felix"].map((word, i) => (
              <span key={word} className="line-mask">
                <span data-network-avoid className="line-up name-sweep" style={delay(120 + i * 130)}>
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p data-network-avoid className="rise-in mt-7 text-[clamp(1.35rem,2.6vw,1.9rem)] font-medium leading-snug tracking-[-0.015em]" style={delay(560)}>
            <span className="text-blue">Cybersécurité</span> et <span className="text-violet">intelligence artificielle</span>
          </p>
          <p data-network-avoid className="rise-in prose-night mt-4 max-w-[36rem] text-base sm:text-[1.0625rem]" style={delay(680)}>
            Je sécurise des systèmes et je fais parler les données : détection de
            fraude sur graphe, analyses de données publiques ivoiriennes,
            applications web et mobiles. {capitalize(count)} projets à consulter,
            dont {repos} avec leur code source public.
          </p>

          <div data-network-avoid className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href="#projets" className="pop-in btn btn-primary" style={delay(820)}>
              Voir mes projets
              <ArrowDown size={17} aria-hidden className="icon-down" />
            </a>
            <a href={cv.href} download={cv.downloadName} className="pop-in btn btn-outline" style={delay(920)}>
              <Download size={17} aria-hidden className="icon-down" />
              Télécharger mon CV
              <span className="font-normal text-muted-foreground">(PDF, {cv.size})</span>
            </a>
            <a href="#contact" className="pop-in btn btn-quiet link-line self-start sm:self-auto" style={delay(1020)}>
              Me contacter
            </a>
          </div>
        </motion.div>

        <motion.div style={reduce ? undefined : { y: visualY }} className="hidden min-w-0 lg:col-span-5 lg:block">
          <motion.div style={reduce ? undefined : { x: sx, y: sy }} className="relative ml-auto w-full max-w-[25rem]">
            <motion.div aria-hidden style={reduce ? undefined : { x: backX, y: backY }} className="fade-in absolute -inset-10 -z-10">
              <svg viewBox="0 0 400 400" className="spin-slow h-full w-full">
                <defs>
                  <linearGradient id="orbit" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="oklch(0.53 0.21 264)" />
                    <stop offset="1" stopColor="oklch(0.74 0.13 210)" />
                  </linearGradient>
                </defs>
                <circle cx="200" cy="200" r="196" fill="none" stroke="url(#orbit)" strokeWidth="1.5" strokeDasharray="2 10" />
              </svg>
            </motion.div>

            <div
              data-network-avoid
              className="iris-in relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_oklch(0.4_0.18_275/0.45)] ring-1 ring-black/5"
              style={delay(250)}
            >
              <Image
                src="/images/asaph-photo.webp"
                alt="Portrait d'Ojewumi Asaph Felix"
                fill
                priority
                sizes="(min-width: 1024px) 400px, 0px"
                className="object-cover object-[50%_30%]"
              />
              <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,oklch(0.53_0.21_264/0.25))]" />
            </div>

            {badges.map((b) => (
              <div
                key={b.label}
                data-network-avoid
                className={`pop-in absolute ${b.pos} w-[11.5rem] rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-[var(--shadow-lift)] backdrop-blur-md`}
                style={delay(b.d)}
              >
                <p className="flex items-center gap-2">
                  <span aria-hidden className={`inline-block h-2 w-2 shrink-0 rounded-full ${b.tone}`} />
                  <span className="figure whitespace-nowrap text-[1.5rem] text-foreground">{b.value}</span>
                </p>
                <p className="mt-1 text-[0.8125rem] leading-snug text-foreground/80">{b.label}</p>
                <p className="mt-0.5 text-[0.75rem] text-muted-foreground">{b.note}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="rise-in border-t border-border/80 bg-card/60 backdrop-blur-sm" style={delay(1150)}>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-5 sm:px-8 md:pl-20 lg:flex-row lg:items-center lg:justify-between">
          <p className="flex items-center gap-3 text-[0.9375rem] text-muted-foreground">
            <span aria-hidden className="signal-dot inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-blue" />
            <span>
              <span className="font-medium text-foreground">Disponible</span> {site.availability.after}
            </span>
          </p>
          <a href="#projets" className="group hidden items-center gap-3 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground lg:inline-flex">
            Défiler vers les projets
            <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card">
              <ArrowDown size={15} className="cue" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
