"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

const expo = [0.16, 1, 0.3, 1] as const;

/** True on a large screen driven by a mouse: the only place the heavier effects run. */
export function useFineDesktop() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return ok;
}

/**
 * Pulls its child toward the pointer and lets it spring back on leave.
 * `strength` is the share of the pointer's offset the child follows.
 */
export function Magnetic({ children, strength = 0.3, className = "inline-block" }: { children: ReactNode; strength?: number; className?: string }) {
  const reduce = useSafeReducedMotion();
  const spring = { stiffness: 180, damping: 11, mass: 0.6 };
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);
  if (reduce) return <span className={className}>{children}</span>;
  return (
    <motion.span
      className={className}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/** A hand-drawn stroke under an accent word, drawn once it comes into view. */
export function Swash({ delay = 0.55, at = "-bottom-[0.06em]" }: { delay?: number; at?: string }) {
  const reduce = useSafeReducedMotion();
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute ${at} left-0 h-[0.16em] w-full overflow-visible text-accent`}
    >
      <motion.path
        d="M3 10.5C46 4.5 104 2.5 197 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}

/**
 * The closing wordmark: each letter rises out of its line once the footer
 * shows, and the whole row eases up as the page reaches its end.
 */
export function Wordmark({ first, last, className }: { first: string; last: string; className?: string }) {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-18%", "0%"]);
  const letters = [...first.split("").map((c) => ({ c, serif: false })), { c: " ", serif: false }, ...last.split("").map((c) => ({ c, serif: true }))];

  if (reduce) {
    return (
      <p aria-hidden className={className}>
        {first} <span className="serif-accent font-normal text-brand">{last}</span>
      </p>
    );
  }
  return (
    // The row is observed, not the letters: they start below its mask, where
    // an observer would never see them.
    <motion.p
      ref={ref}
      aria-hidden
      className={className}
      style={{ y }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
    >
      <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
        {letters.map((l, i) =>
          l.c === " " ? (
            " "
          ) : (
            <motion.span
              key={i}
              className={`inline-block ${l.serif ? "serif-accent font-normal text-brand" : ""}`}
              variants={{ hidden: { y: "130%" }, show: { y: "0%", transition: { duration: 1.2, ease: expo } } }}
            >
              {l.c}
            </motion.span>
          ),
        )}
      </span>
    </motion.p>
  );
}

/** A block that settles from 94 % to full size as it scrolls into place (desktop only). */
export function Lift({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useSafeReducedMotion();
  const fine = useFineDesktop();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  return (
    <motion.div ref={ref} className={className} style={reduce || !fine ? undefined : { scale, transformOrigin: "50% 0%" }}>
      {children}
    </motion.div>
  );
}
