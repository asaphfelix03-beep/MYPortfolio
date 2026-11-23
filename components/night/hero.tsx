"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { Magnetic } from "@/components/motion/kinetics";
import { decodeText } from "@/components/motion/decode-text";
import { DUR, EASE, gsap, INTRO_DONE, prefersReducedMotion, REVEAL, STAGGER } from "@/lib/motion";
import { projects } from "@/lib/projects";
import { site, type CvInfo } from "@/lib/site";

const shots = projects
  .flatMap((p) => (p.visual.kind === "image" ? [{ title: p.title, src: p.visual.src, alt: p.visual.alt, pos: p.visual.position }] : []))
  .slice(0, 2);

const [first, ...rest] = site.name.split(" ");
const float = "motion-safe:animate-[float-y_7s_ease-in-out_infinite]";

/** The owner's name as the title, the field, one sentence, two actions; two real projects beside it. */
export default function Hero({ cv }: { cv: CvInfo }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-in]", { ...REVEAL.up, duration: DUR.reveal, ease: EASE.out, stagger: STAGGER.list });
      gsap.from("[data-tile]", { ...REVEAL.scale, duration: DUR.reveal, ease: EASE.title, stagger: STAGGER.title });
    }, root);
    // The owner's name decodes once the intro curtain has lifted.
    const name = root.current?.querySelector("[data-decrypt]");
    let stop: (() => void) | undefined;
    const run = () => {
      if (name) stop = decodeText(name, 900);
    };
    const waiting = document.documentElement.classList.contains("intro");
    if (waiting) window.addEventListener(INTRO_DONE, run, { once: true });
    else run();
    return () => {
      window.removeEventListener(INTRO_DONE, run);
      stop?.();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="ouverture" tabIndex={-1} aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[var(--content-max)] items-center gap-12 px-[var(--gutter)] pb-16 pt-28 md:min-h-[min(900px,100svh)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:pt-32">
        <div className="min-w-0">
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
            <p className="text-[length:var(--fs-meta)] leading-snug text-muted-foreground">
              Étudiant en {site.level}
              <br />
              {site.school.short}, {site.school.city}
            </p>
          </div>
          <h1
            id="hero-title"
            data-in=""
            data-decrypt=""
            aria-label={site.name}
            className="mt-10 min-w-0 break-words text-[clamp(2.75rem,5.4vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em] lg:mt-14"
          >
            {first}
            <br />
            <span className="grad-text">{rest.join(" ")}</span>
          </h1>
          <p data-in="" className="mt-6 text-[clamp(1.25rem,1.6vw,1.5rem)] font-medium leading-snug tracking-[-0.02em]">
            Cybersécurité &amp; intelligence artificielle
          </p>
          <p data-in="" className="mt-4 max-w-[32rem] text-[1.0625rem] text-muted-foreground text-pretty">
            {site.availability.sentence}
          </p>
          <div data-in="" className="mt-8 flex flex-wrap items-center gap-3">
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

        <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-4 lg:min-h-[min(44rem,calc(100svh-9rem))] lg:grid-cols-1 lg:grid-rows-2">
          {shots.map((s, i) => (
            <div
              key={s.title}
              data-tile=""
              style={{ animationDelay: `${i * -2.5}s` }}
              className={`relative aspect-[16/10] overflow-hidden rounded-lg bg-muted shadow-[var(--shadow-soft)] ring-1 ring-border lg:aspect-auto lg:h-full ${float}`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 760px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: s.pos }}
              />
              <span className="glass absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full px-3 py-1 text-[length:var(--fs-meta)] font-medium">
                {s.title}
              </span>
              <span aria-hidden className="glass absolute bottom-3 left-3 flex gap-1 rounded-full px-2 py-1.5">
                {shots.map((_, d) => (
                  <i key={d} className={`h-1.5 w-1.5 rounded-full ${d === i ? "bg-foreground" : "bg-mute-2"}`} />
                ))}
              </span>
              <span className="glass absolute bottom-3 right-3 rounded-full px-2.5 py-1 text-[length:var(--fs-meta)] font-medium">
                {i + 1}/{shots.length}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
