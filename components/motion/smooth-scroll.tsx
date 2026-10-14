"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Inertial wheel scrolling (Lenis). Touch keeps the native scroll, and
 * nothing is smoothed for visitors who ask for reduced motion. Anchor links
 * are handled by Lenis; the CSS scroll-margin keeps titles clear of the header.
 */
export function SmoothScroll() {
  // The layout persists across client navigations, so once the opening
  // curtain has played this flag keeps it from replaying on the way back home.
  useEffect(() => {
    const t = window.setTimeout(() => (document.documentElement.dataset.introPlayed = ""), 1600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, anchors: true });
    window.__lenis = lenis;
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
  return null;
}
