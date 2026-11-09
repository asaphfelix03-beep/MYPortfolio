"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { Swash } from "@/components/motion/kinetics";
import { DUR, EASE, gsap, isOnScreen, prefersReducedMotion, REVEAL, STAGGER, START } from "@/lib/motion";

/**
 * Scroll reveals. The server renders everything visible; once hydrated, an
 * element still below the fold is moved to its starting pose and animated in
 * when reached. So without JavaScript, and under reduced motion, the content
 * is simply there.
 */

type Kind = keyof typeof REVEAL;

function useScrollIn<T extends HTMLElement>(animate: (el: T, scrollTrigger: ScrollTrigger.Vars) => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isOnScreen(el)) return;
    const ctx = gsap.context(() => animate(el, { trigger: el, start: START.reveal, once: true }));
    return () => ctx.revert();
    // Runs once: the pose of an element is decided when it mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

export function Reveal({
  children,
  kind = "up",
  className,
}: {
  children: ReactNode;
  kind?: Kind;
  className?: string;
}) {
  const ref = useScrollIn<HTMLDivElement>((el, scrollTrigger) => {
    gsap.from(el, { ...REVEAL[kind], duration: DUR.reveal, ease: EASE.out, scrollTrigger });
  });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type GroupTag = "div" | "ul" | "ol";
type ItemTag = "div" | "li";

/** Parent that staggers its <RevealItem> children as they enter. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: GroupTag;
}) {
  const ref = useScrollIn<HTMLElement>((el, scrollTrigger) => {
    gsap.from(el.querySelectorAll("[data-reveal-item]"), {
      ...REVEAL.up,
      duration: DUR.reveal,
      ease: EASE.out,
      stagger: STAGGER.list,
      scrollTrigger,
    });
  });
  const Tag = as as "div";
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ItemTag;
}) {
  const Tag = as;
  return (
    <Tag data-reveal-item="" className={className}>
      {children}
    </Tag>
  );
}

/**
 * A heading whose words rise out of a mask one after another. The text
 * stays plain text with its spaces, so it reads normally to screen readers
 * and search engines. `_mot_` marks an accent word, set in serif italic.
 */
export function RevealTitle({
  text,
  id,
  className,
}: {
  text: string;
  id?: string;
  className?: string;
}) {
  const ref = useScrollIn<HTMLHeadingElement>((el, scrollTrigger) => {
    gsap.from(el.querySelectorAll("[data-word]"), {
      yPercent: 110,
      duration: DUR.title,
      ease: EASE.title,
      stagger: STAGGER.title,
      scrollTrigger,
    });
  });
  const words = text.split(" ").map((w) => {
    const m = /^_(.+)_(\W*)$/.exec(w);
    return m ? { w: m[1], tail: m[2], accent: true } : { w, tail: "", accent: false };
  });

  return (
    <h2 ref={ref} id={id} className={className}>
      {words.map((x, i) => (
        <Fragment key={i}>
          <span className="mask !inline-block align-bottom">
            <span data-word="" className="inline-block">
              {x.accent ? (
                <>
                  <span className="relative serif-accent text-brand pr-[0.04em]">
                    {x.w}
                    <Swash />
                  </span>
                  {x.tail}
                </>
              ) : (
                x.w
              )}
            </span>
          </span>
          {/* A real space between the masks, so the title still wraps. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h2>
  );
}
