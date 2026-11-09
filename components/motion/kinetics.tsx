"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { DUR, EASE, gsap, isOnScreen, MAGNET_STRENGTH, prefersReducedMotion, ScrollTrigger, STAGGER, START } from "@/lib/motion";

/** Runs a GSAP setup after hydration, unless the visitor asked for stillness. */
function useMotion<T extends HTMLElement | SVGElement>(setup: (el: T) => void, skipIfOnScreen = true) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || (skipIfOnScreen && isOnScreen(el))) return;
    const ctx = gsap.context(() => setup(el));
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

/** Pulls its child toward the mouse and lets it settle back on leave. */
export function Magnetic({
  children,
  strength = MAGNET_STRENGTH,
  className = "inline-block",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
    const x = gsap.quickTo(el, "x", { duration: DUR.magnet, ease: EASE.out });
    const y = gsap.quickTo(el, "y", { duration: DUR.magnet, ease: EASE.out });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * strength);
      y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: DUR.settle, ease: EASE.settle, overwrite: true });
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
    };
  }, [strength]);
  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}

/** A hand-drawn stroke under an accent word, drawn once it comes into view. */
export function Swash({ at = "-bottom-[0.06em]" }: { at?: string }) {
  const ref = useMotion<SVGPathElement>((el) => {
    gsap.from(el, {
      strokeDashoffset: 1,
      duration: DUR.swash,
      ease: EASE.inOut,
      scrollTrigger: { trigger: el, start: START.reveal, once: true },
    });
  });
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute ${at} left-0 h-[0.16em] w-full overflow-visible text-accent`}
    >
      <path
        ref={ref}
        d="M3 10.5C46 4.5 104 2.5 197 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={0}
      />
    </svg>
  );
}

/** The closing wordmark: each letter rises out of its line once the footer shows. */
export function Wordmark({ first, last, className }: { first: string; last: string; className?: string }) {
  const ref = useMotion<HTMLParagraphElement>((el) => {
    gsap.from(el.querySelectorAll("[data-letter]"), {
      yPercent: 130,
      duration: DUR.wordmark,
      ease: EASE.expo,
      stagger: STAGGER.letters,
      scrollTrigger: { trigger: el, start: START.wordmark, once: true },
    });
  });
  const letters = [
    ...first.split("").map((c) => ({ c, serif: false })),
    { c: " ", serif: false },
    ...last.split("").map((c) => ({ c, serif: true })),
  ];
  return (
    <p ref={ref} aria-hidden className={className}>
      <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
        {letters.map((l, i) =>
          l.c === " " ? (
            " "
          ) : (
            <span key={i} data-letter="" className={`inline-block ${l.serif ? "serif-accent font-normal text-brand" : ""}`}>
              {l.c}
            </span>
          ),
        )}
      </span>
    </p>
  );
}

/**
 * A figure whose digits roll up through 0–9 into place once it shows. The
 * server renders the final digits, so the real value shows without
 * JavaScript. Screen readers get the plain value.
 */
export function RollingFigure({ value }: { value: string }) {
  const ref = useMotion<HTMLSpanElement>((el) => {
    el.querySelectorAll<HTMLElement>("[data-roll]").forEach((col, i) => {
      // The server positions the column with CSS; GSAP needs it clean to start at 0.
      col.style.transform = "";
      gsap.fromTo(
        col,
        { yPercent: 0 },
        {
          yPercent: -Number(col.dataset.roll) * 10,
          duration: DUR.rollDigit,
          ease: EASE.expo,
          delay: i * STAGGER.digits,
          scrollTrigger: { trigger: el, start: START.counter, once: true },
        },
      );
    });
  });
  return (
    <span ref={ref} aria-label={value} role="img" className="inline-flex whitespace-pre">
      {value.split("").map((c, i) =>
        /\d/.test(c) ? (
          <span key={i} aria-hidden className="roll-col">
            <span data-roll={c} style={{ transform: `translateY(${-Number(c) * 10}%)` }}>
              {"0123456789".split("").map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden>
            {c}
          </span>
        ),
      )}
    </span>
  );
}

/** Counts from 0 to a real value when reached; the server renders the value. */
export function Counter({ value }: { value: number }) {
  const ref = useMotion<HTMLSpanElement>((el) => {
    const state = { n: 0 };
    el.textContent = "0";
    ScrollTrigger.create({
      trigger: el,
      start: START.counter,
      once: true,
      onEnter: () => {
        gsap.to(state, {
          n: value,
          duration: DUR.counter,
          ease: EASE.out,
          onUpdate: () => {
            el.textContent = String(Math.round(state.n));
          },
        });
      },
    });
  });
  return <span ref={ref}>{value}</span>;
}
