"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { Magnetic } from "@/components/motion/kinetics";
import { DUR, EASE, gsap, prefersReducedMotion, REVEAL, STAGGER } from "@/lib/motion";
import { projects } from "@/lib/projects";
import { site, type CvInfo } from "@/lib/site";

const shots = projects
  .flatMap((p) => (p.visual.kind === "image" ? [{ title: p.title, src: p.visual.src, alt: p.visual.alt, pos: p.visual.position }] : []))
  .slice(0, 2);

const [first, ...rest] = site.name.split(" ");
const float = "motion-safe:animate-[float-y_7s_ease-in-out_infinite]";

/** Name, three-line title, one sentence, two actions; the owner's photo and two real projects in a bento. */
export default function Hero({ cv }: { cv: CvInfo }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-in]", { ...REVEAL.up, duration: DUR.reveal, ease: EASE.out, stagger: STAGGER.list });
      gsap.from("[data-tile]", { ...REVEAL.scale, duration: DUR.reveal, ease: EASE.title, stagger: STAGGER.title });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="ouverture" tabIndex={-1} aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[var(--content-max)] items-center gap-12 px-[var(--gutter)] pb-16 pt-28 md:min-h-[min(900px,100svh)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10 lg:pt-32">
        <div className="min-w-0">
          <p data-in="" className="text-[1.25rem] font-medium">
            {first} <span className="text-accent">{rest[0]}</span> {rest.slice(1).join(" ")}
          </p>
          <h1 id="hero-title" data-in="" className="mt-10 min-w-0 break-words text-[clamp(2.6rem,4.5vw,4.05rem)] font-normal leading-none tracking-[-0.04em] lg:mt-16">
            <span className="grad-text">Cybersécurité</span>
            <br />
            &amp; intelligence
            <br />
            <span className="grad-text">artificielle</span>
          </h1>
          <p data-in="" className="mt-6 max-w-[32rem] text-[1.0625rem] text-muted-foreground">
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

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 sm:gap-4 lg:min-h-[min(46rem,calc(100svh-8rem))] lg:grid-rows-2">
          <div data-tile="" className={`relative row-span-2 min-h-[22rem] overflow-hidden rounded-lg bg-muted ${float}`}>
            <Image
              src="/images/asaph-photo.webp"
              alt={`Portrait de ${site.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 360px, 45vw"
              className="object-cover object-top"
            />
          </div>
          {shots.map((s, i) => (
            <div
              key={s.title}
              data-tile=""
              style={{ animationDelay: `${i * -2.5}s` }}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-muted lg:aspect-auto lg:h-full ${float}`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 360px, 45vw"
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
