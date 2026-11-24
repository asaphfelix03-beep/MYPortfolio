"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { Magnetic } from "@/components/motion/kinetics";
import { DUR, EASE, gsap, INTRO_DONE, prefersReducedMotion, REVEAL, STAGGER } from "@/lib/motion";
import { projects } from "@/lib/projects";
import { site, type CvInfo } from "@/lib/site";

const shots = projects
  .flatMap((p) => (p.visual.kind === "image" ? [{ title: p.title, src: p.visual.src, alt: p.visual.alt, pos: p.visual.position }] : []))
  .slice(0, 2);

const [first, ...rest] = site.name.split(" ");
const lines = [first, rest.join(" ")];

/**
 * The owner's name set full width, a highlighter stroke drawn under each line
 * once the curtain lifts; the field, one sentence and two actions below, two
 * real projects beside them.
 */
export default function Hero({ cv }: { cv: CvInfo }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-in]", { ...REVEAL.up, duration: DUR.reveal, ease: EASE.out, stagger: STAGGER.list });
      gsap.from("[data-tile]", { ...REVEAL.scale, duration: DUR.reveal, ease: EASE.title, stagger: STAGGER.title });
    }, root);
    // The page's one orchestrated moment: the stroke is drawn line by line.
    const draw = () => {
      ctx.add(() => {
        gsap.fromTo("[data-mark]", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: EASE.inOut, stagger: 0.22, delay: 0.15 });
      });
    };
    const waiting = document.documentElement.classList.contains("intro");
    if (waiting) window.addEventListener(INTRO_DONE, draw, { once: true });
    else draw();
    return () => {
      window.removeEventListener(INTRO_DONE, draw);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="ouverture" tabIndex={-1} aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto max-w-[var(--content-max)] px-[var(--gutter)] pb-16 pt-28 lg:pt-32">
        <h1
          id="hero-title"
          aria-label={site.name}
          className="relative isolate min-w-0 break-words text-[length:var(--fs-display)] font-bold leading-[0.9] tracking-[-0.045em]"
        >
          {lines.map((line) => (
            <span key={line} className="relative block w-fit max-w-full">
              {line}
              <span
                aria-hidden
                data-mark=""
                className="absolute -inset-x-[0.06em] bottom-[0.08em] -z-10 h-[0.3em] origin-left bg-[var(--mark)]"
              />
            </span>
          ))}
        </h1>

        <div className="mt-10 grid items-end gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-5">
            <div data-in="" className="flex items-center gap-4">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border">
                <Image
                  src="/images/asaph-photo.webp"
                  alt={`Portrait de ${site.name}`}
                  fill
                  priority
                  sizes="56px"
                  className="object-cover object-top"
                />
              </span>
              <div className="leading-snug">
                <p className="text-[clamp(1.125rem,1.4vw,1.3rem)] font-semibold tracking-[-0.02em]">
                  Cybersécurité &amp; intelligence artificielle
                </p>
                <p className="text-[length:var(--fs-meta)] text-muted-foreground">
                  Étudiant en {site.level}, {site.school.short}, {site.school.city}
                </p>
              </div>
            </div>
            <p data-in="" className="mt-6 max-w-[34rem] text-[1.125rem] leading-relaxed text-muted-foreground text-pretty">
              {site.availability.sentence}
            </p>
            <div data-in="" className="mt-7 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#projets" className="btn btn-primary">
                  Voir les réalisations
                  <ArrowRight size={17} aria-hidden className="icon-go" />
                </a>
              </Magnetic>
              <a href={cv.href} download={cv.downloadName} className="btn btn-outline">
                <Download size={16} aria-hidden />
                Télécharger le CV
                <span className="sr-only">, {cv.size}</span>
              </a>
            </div>
          </div>

          <ul aria-label="Deux réalisations" className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-4 lg:col-span-7">
            {shots.map((s, i) => (
              <li key={s.title} data-tile="" className="min-w-0">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-l)] bg-muted ring-1 ring-border">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: s.pos }}
                  />
                </div>
                <p className="mt-2 truncate text-[length:var(--fs-meta)] text-muted-foreground">{s.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
