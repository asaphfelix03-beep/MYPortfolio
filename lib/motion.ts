import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP is safe to import on the server; only the plugin needs a window.
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Every duration of the site's motion, in seconds. */
export const DUR = {
  fast: 0.25,
  magnet: 0.5,
  cursor: 0.35,
  settle: 1.2,
  fade: 0.7,
  reveal: 0.9,
  title: 0.9,
  heroLine: 1.1,
  heroMock: 1.4,
  counter: 1.6,
  rollDigit: 1.4,
  wordmark: 1.2,
  swash: 1.1,
  lenis: 1.15,
  // The loader adds up to 1.5 s, under the 1.6 s the brief allows.
  loaderIn: 0.55,
  loaderHold: 0.2,
  loaderOut: 0.75,
} as const;

export const EASE = {
  out: "power3.out",
  title: "power4.out",
  inOut: "power3.inOut",
  linear: "none",
  settle: "elastic.out(1, 0.45)",
  expo: "expo.out",
} as const;

export const STAGGER = {
  title: 0.08,
  list: 0.07,
  letters: 0.04,
  digits: 0.06,
} as const;

/** Where a scroll-triggered entrance fires. */
export const START = {
  reveal: "top 88%",
  counter: "top 82%",
  wordmark: "top 92%",
} as const;

/** Share of the viewport above which an element counts as already on screen. */
export const ON_SCREEN_LINE = 0.88;

export const REVEAL = {
  up: { opacity: 0, y: 44 },
  left: { opacity: 0, x: -48 },
  right: { opacity: 0, x: 48 },
  scale: { opacity: 0, scale: 0.94, y: 24 },
  clip: { clipPath: "inset(0 0 100% 0)" },
} as const;

/** Keep in sync with the first-paint pose in app/globals.css (html.motion). */
export const HERO = {
  lineFrom: { y: 0, yPercent: 110 },
  fadeFrom: { opacity: 0, y: 18 },
  mockFrom: { y: 60, rotateY: -24, scale: 0.94 },
  /** Fades start this long before the title lines finish. */
  overlap: "-=0.75",
  mockAt: 0.15,
  parallaxY: 70,
} as const;

/** How far the orange section travels as it slides over the previous one. */
export const OVERLAP_Y = 140;
export const OVERLAP_START = "top bottom";
export const OVERLAP_END = "top 45%";

export const MAGNET_STRENGTH = 0.3;

/** Marquee speed: scroll velocity (px/s) per extra unit of playback rate. */
export const MARQUEE = { velocityPerRate: 900, maxBoost: 3 } as const;

/** Fired by the loader when the curtain starts to lift. */
export const INTRO_DONE = "intro:done";
export const INTRO_FLAG = "intro-seen";
/** If hydration has not happened by then, the page gives up its entrance. */
export const MOTION_FAILSAFE_MS = 4000;

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Elements already visible when the page loads keep their place: animating
    them would flash the server-rendered content away and delay LCP. */
export function isOnScreen(el: Element) {
  return el.getBoundingClientRect().top < window.innerHeight * ON_SCREEN_LINE;
}

/** Framer-only pages (project charts) still read this margin. */
export const IN_VIEW_MARGIN = "-60px 0px" as const;

/** Lead paragraphs light up word by word as they scroll through the view
 *  (grey to ink), as in the reference art direction. */
export const WORD_SCRUB = { start: "top 82%", end: "bottom 50%", dim: 0.2 } as const;

/** Domain and timeline lists: the row nearest this line becomes active. */
export const ACTIVE_LINE = "center center";
