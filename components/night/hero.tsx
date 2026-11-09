"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { Magnetic } from "@/components/motion/kinetics";
import { DUR, EASE, gsap, HERO, INTRO_DONE, prefersReducedMotion, STAGGER } from "@/lib/motion";
import { certifications } from "@/lib/parcours";
import { projects, publicRepoCount } from "@/lib/projects";
import { site, type CvInfo } from "@/lib/site";

const shots = projects.flatMap((p) =>
  p.visual.kind === "image"
    ? [{ slug: p.slug, title: p.title, category: p.category, src: p.visual.src, alt: p.visual.alt, pos: p.visual.position }]
    : [],
);

const figures = [
  { value: projects.length, label: "projets" },
  { value: certifications.length, label: "certifications" },
  { value: publicRepoCount, label: "dépôts publics" },
];

const accent = "serif-accent font-normal text-brand";

/**
 * Three masked title lines, the real figures, the calls to action, and my
 * projects in a tilted browser frame. The CSS holds the entrance pose from
 * first paint (html.motion in the layout); GSAP plays it after the loader.
 */
export default function Hero({ cv }: { cv: CvInfo }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const intro = document.documentElement.classList.contains("intro");
    let timeline: gsap.core.Timeline;
    const ctx = gsap.context(() => {
      timeline = gsap
        .timeline({ paused: intro })
        // y is named because GSAP would otherwise keep the CSS pose as an offset.
        .fromTo("[data-hero-line]", HERO.lineFrom, { y: 0, yPercent: 0, duration: DUR.heroLine, ease: EASE.title, stagger: STAGGER.title })
        .fromTo("[data-hero-fade]", HERO.fadeFrom, { opacity: 1, y: 0, duration: DUR.fade, ease: EASE.out, stagger: STAGGER.list }, HERO.overlap)
        .fromTo("[data-hero-mock]", HERO.mockFrom, { y: 0, rotateY: 0, scale: 1, duration: DUR.heroMock, ease: EASE.title }, HERO.mockAt);

      if (matchMedia("(min-width: 1024px)").matches) {
        gsap.to("[data-parallax]", {
          y: HERO.parallaxY,
          ease: EASE.linear,
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, root);
    const play = () => timeline.play();
    if (intro) window.addEventListener(INTRO_DONE, play, { once: true });
    return () => {
      window.removeEventListener(INTRO_DONE, play);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="top" aria-labelledby="hero-title" className="relative px-5 pb-16 pt-24 sm:px-8 md:pt-32 lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:min-h-[calc(100svh-11rem)] lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-7">
          <p data-hero-fade="" className="kicker">
            <span aria-hidden className="signal-dot inline-block h-2 w-2 rounded-full bg-accent-fill" />
            <span>
              {site.shortName} <span className="text-muted-foreground">· {site.availability.short}</span>
            </span>
          </p>

          <h1 id="hero-title" className="display-name mt-6 text-[clamp(2.4rem,5.2vw,5rem)]">
            <span className="mask">
              <span data-hero-line="" className="block">
                Des <span className={accent}>systèmes</span> sûrs,{" "}
              </span>
            </span>
            <span className="mask">
              <span data-hero-line="" className="block">
                des <span className={accent}>données</span>{" "}
              </span>
            </span>
            <span className="mask">
              <span data-hero-line="" className="block">
                qui parlent.
              </span>
            </span>
          </h1>

          <p data-hero-fade="" className="prose-night mt-6 max-w-[34rem] text-base sm:text-[1.0625rem]">
            Étudiant en cybersécurité et intelligence artificielle. Chaque projet
            présenté ici a sa méthode et ses sources.
          </p>

          <ul aria-label="En chiffres" data-hero-fade="" className="mt-6 flex flex-wrap gap-2">
            {figures.map((f) => (
              <li key={f.label} className="flex items-baseline gap-1.5 rounded-full border border-border bg-card px-4 py-2">
                <span className="figure text-[1.125rem] text-foreground">{f.value}</span>
                <span className="text-[0.875rem] text-muted-foreground">{f.label}</span>
              </li>
            ))}
          </ul>

          <div data-hero-fade="" className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#contact" className="btn btn-primary">
                Démarrer un échange
                <ArrowRight size={17} aria-hidden className="icon-go" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#projets" className="btn btn-outline">
                Voir les projets
              </a>
            </Magnetic>
            <a href={cv.href} download={cv.downloadName} className="btn btn-quiet">
              <Download size={16} aria-hidden />
              Télécharger le CV
              <span className="sr-only">, {cv.size}</span>
            </a>
          </div>
        </div>

        <div data-parallax="" className="min-w-0 lg:col-span-5">
          <Carousel />
        </div>
      </div>
    </section>
  );
}

function Carousel() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const shot = shots[index];

  const go = (delta: number) => {
    const el = track.current;
    if (!el) return;
    const next = (index + delta + shots.length) % shots.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };
  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div>
      <div className="mock-stage">
        <div className="mock-tilt">
          <div data-hero-mock="" className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)]">
            <div aria-hidden className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <i className="h-2.5 w-2.5 rounded-full bg-accent-fill" />
              <i className="h-2.5 w-2.5 rounded-full bg-border" />
              <i className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="mono-label ml-3 truncate">
                {new URL(site.url).host}/projets/{shot.slug}
              </span>
            </div>
            {/* Native scroll-snap: swipes on touch and needs no JavaScript. */}
            <div
              ref={track}
              onScroll={onScroll}
              tabIndex={0}
              role="group"
              aria-roledescription="carrousel"
              aria-label="Aperçus de mes projets"
              data-cursor="Glisser"
              className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
            >
              {shots.map((s, i) => (
                <div key={s.slug} className="relative aspect-[16/10] w-full shrink-0 snap-center">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 520px, 90vw"
                    className="object-cover"
                    style={{ objectPosition: s.pos }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <Link href={`/projets/${shot.slug}`} transitionTypes={["nav-forward"]} aria-live="polite" data-cursor="Voir" className="link-line min-w-0 py-2">
          <span className="block truncate font-semibold">{shot.title}</span>
          <span className="block truncate text-[0.875rem] text-muted-foreground">{shot.category}</span>
        </Link>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Projet précédent" className="btn btn-outline h-11 w-11 px-0">
            <ArrowLeft size={17} aria-hidden />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Projet suivant" className="btn btn-outline h-11 w-11 px-0">
            <ArrowRight size={17} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
