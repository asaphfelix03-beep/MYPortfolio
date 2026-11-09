"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { DUR, gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Inertial wheel scrolling (Lenis), driven by GSAP's clock so scroll-linked
 * animations and the scroll itself share one frame. Touch keeps the native
 * scroll, and nothing is smoothed for visitors who ask for reduced motion.
 * Anchor links are handled by Lenis; the CSS scroll-margin keeps titles clear
 * of the header.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Swapped fonts change the page height, which moves every trigger.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ duration: DUR.lenis, anchors: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (seconds: number) => lenis.raf(seconds * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
  return null;
}
