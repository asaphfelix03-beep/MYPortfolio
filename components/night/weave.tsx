"use client";

import type { ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { IN_VIEW_MARGIN } from "@/lib/motion";

/**
 * The cloth's furniture: the selvedge that closes the page on its left edge,
 * and the registers — the horizontal bands a pagne is woven in — that every
 * section of the page sits inside.
 */

/**
 * The selvedge: the finished edge of the cloth.
 *
 * It carries a real measure rather than decorating the margin — the amber
 * thread's length is the actual reading position, so the edge answers "how
 * far in am I" at a glance. On phones the rail's type would eat a seventh of
 * the width, so it thins to the thread alone.
 */
export function Selvedge() {
  const reduce = useSafeReducedMotion();
  const { scrollYProgress } = useScroll();
  const thread = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-0 z-40 w-[3px] md:w-14 md:border-r md:border-border"
    >
      {/* The thread runs the full height; its filled part is the progress. */}
      <div className="absolute inset-y-0 left-0 w-[3px] md:left-1/2 md:w-px md:-translate-x-1/2 bg-border/70" />
      <motion.div
        style={{ scaleY: reduce ? 1 : thread }}
        className="absolute inset-y-0 left-0 w-[3px] origin-top bg-accent md:left-1/2 md:w-px md:-translate-x-1/2"
      />

      <span className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <span className="block whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground [writing-mode:vertical-rl]">
          Défiler
        </span>
      </span>
    </div>
  );
}

/**
 * One register of the cloth: a full-bleed band opened by a hairline, its
 * number set out in the selvedge gutter the way a plate is numbered in the
 * margin rather than titled inside the picture.
 *
 * The shuttle is the page's one authored motion: when a band enters, the
 * weft thread shoots across it left to right, and the cloth is what carries
 * the state — no chrome is added to say "this section is active".
 */
export function Register({
  index,
  children,
  className = "",
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  const reduce = useSafeReducedMotion();

  return (
    <div className={`relative border-t border-border ${className}`}>
      {/* The cloth behind the band, fading out downward so the texture reads
          at the seam and never competes with the text below it. */}
      <div
        aria-hidden
        className="weave-field pointer-events-none absolute inset-x-0 top-0 h-64 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      {/* The shuttle crossing the warp. */}
      <motion.div
        aria-hidden
        className="absolute left-0 top-0 h-px origin-left bg-accent"
        initial={reduce ? { width: "100%" } : { width: "100%", scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: IN_VIEW_MARGIN }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      <span
        aria-hidden
        className="absolute left-4 top-6 text-[11px] font-medium tabular-nums tracking-[0.3em] text-muted-foreground/70 md:left-5"
      >
        {index}
      </span>

      {children}
    </div>
  );
}
