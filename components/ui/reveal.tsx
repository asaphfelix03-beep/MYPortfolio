"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment, type ReactNode } from "react";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { IN_VIEW_MARGIN } from "@/lib/motion";

/**
 * Scroll reveals. Each section uses a different entrance so the page has a
 * rhythm rather than one fade repeated: titles rise word by word, project
 * cards lift, skills slide in from the side, panels scale up, pictures are
 * uncovered by a mask. Opacity and transform only — an animated blur
 * repaints whole elements on every frame, which phones feel.
 */

type Kind = "up" | "left" | "right" | "scale" | "clip";

const ease = [0.22, 1, 0.36, 1] as const;

const from: Record<Kind, Record<string, number | string>> = {
  up: { opacity: 0, y: 44 },
  left: { opacity: 0, x: -48 },
  right: { opacity: 0, x: 48 },
  scale: { opacity: 0, scale: 0.94, y: 24 },
  clip: { opacity: 0.4, clipPath: "inset(0 0 100% 0 round 1.25rem)", scale: 1.04 },
};

const to: Record<Kind, Record<string, number | string>> = {
  up: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1, y: 0 },
  clip: { opacity: 1, clipPath: "inset(0 0 0% 0 round 1.25rem)", scale: 1 },
};

export function Reveal({
  children,
  delay = 0,
  kind = "up",
  className,
  duration = 0.95,
}: {
  children: ReactNode;
  delay?: number;
  kind?: Kind;
  className?: string;
  duration?: number;
}) {
  const reduce = useSafeReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={from[kind]}
      whileInView={to[kind]}
      viewport={{ once: true, margin: IN_VIEW_MARGIN }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

type GroupTag = "div" | "ul" | "ol";
type ItemTag = "div" | "li";

/** Parent that staggers its <RevealItem> children as they enter. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: GroupTag;
}) {
  const reduce = useSafeReducedMotion();
  const Tag = as;
  if (reduce) return <Tag className={className}>{children}</Tag>;

  const M = motion[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <M
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: IN_VIEW_MARGIN }}
    >
      {children}
    </M>
  );
}

const itemVariants = (kind: Kind): Variants => ({
  hidden: from[kind],
  show: { ...to[kind], transition: { duration: 0.8, ease } },
});

export function RevealItem({
  children,
  className,
  kind = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  kind?: Kind;
  as?: ItemTag;
}) {
  const reduce = useSafeReducedMotion();
  const Tag = as;
  if (reduce) return <Tag className={className}>{children}</Tag>;

  const M = motion[as];
  return (
    <M className={className} variants={itemVariants(kind)}>
      {children}
    </M>
  );
}

/**
 * A heading whose words rise out of a mask one after another. The text
 * stays plain text with its spaces, so it reads normally to screen readers
 * and search engines.
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
  const reduce = useSafeReducedMotion();
  // `_mot_` marks the accent word, set in serif italic.
  const words = text.split(" ").map((w) => {
    const m = /^_(.+)_(\W*)$/.exec(w);
    return m ? { w: m[1], tail: m[2], accent: true } : { w, tail: "", accent: false };
  });
  const render = (x: (typeof words)[number]) =>
    x.accent ? (
      <>
        <span className="serif-accent text-brand pr-[0.04em]">{x.w}</span>
        {x.tail}
      </>
    ) : (
      x.w
    );

  if (reduce) {
    return (
      <h2 id={id} className={className}>
        {words.map((x, i) => (
          <Fragment key={i}>
            {render(x)}
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </h2>
    );
  }

  return (
    <motion.h2
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: IN_VIEW_MARGIN }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease } },
              }}
            >
              {render(w)}
            </motion.span>
          </span>
          {/* A real space between the masks, so the title still wraps. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.h2>
  );
}
