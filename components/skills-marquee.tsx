"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Download } from "lucide-react";
import { Magnetic } from "@/components/motion/kinetics";
import { RevealTitle } from "@/components/ui/reveal";
import { DUR, gsap, MARQUEE, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { projects } from "@/lib/projects";
import type { CvInfo } from "@/lib/site";
import { skillDomains } from "@/lib/skills";

const skills = skillDomains.flatMap((d) => d.skills.map((s) => s.name.split(" : ")[0]));
const technologies = [...new Set(projects.flatMap((p) => p.technologies))];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-3 pr-3">
      {items.map((item) => (
        <li key={item} className="tag whitespace-nowrap text-[0.9375rem]">
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee-row marquee-mask overflow-hidden">
      <div className={`marquee flex w-max ${reverse ? "marquee-reverse" : ""}`}>
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}

/** The closing section: two opposed rows that speed up with the scroll. */
export default function SkillsMarquee({ cv }: { cv: CvInfo }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const animations = el.querySelectorAll(".marquee");
    const setRate = (rate: number) =>
      animations.forEach((m) => m.getAnimations().forEach((a) => a.updatePlaybackRate(rate)));
    const settle = gsap.delayedCall(DUR.fast, () => setRate(1)).pause();
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        setRate(1 + Math.min(MARQUEE.maxBoost, Math.abs(self.getVelocity()) / MARQUEE.velocityPerRate));
        settle.restart(true);
      },
    });
    return () => {
      trigger.kill();
      settle.kill();
    };
  }, []);

  return (
    <section ref={root} id="competences" tabIndex={-1} aria-labelledby="competences-title" className="relative overflow-hidden py-20 outline-none sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealTitle id="competences-title" className="h-section" text="Ce que je sais _faire_" />
      </div>
      <div className="mt-12 space-y-3" data-cursor="Glisser">
        <Row items={skills} />
        <Row items={technologies} reverse />
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center gap-3 px-5 sm:px-8">
        <Magnetic>
          <a href="#contact" className="btn btn-primary">
            Démarrer un échange
            <ArrowRight size={17} aria-hidden className="icon-go" />
          </a>
        </Magnetic>
        <a href={cv.href} download={cv.downloadName} className="btn btn-outline">
          <Download size={16} aria-hidden />
          Télécharger le CV
          <span className="sr-only">, {cv.size}</span>
        </a>
      </div>
    </section>
  );
}
