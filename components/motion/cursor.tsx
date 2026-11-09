"use client";

import { useEffect, useRef } from "react";
import { DUR, EASE, gsap, prefersReducedMotion } from "@/lib/motion";

/**
 * A dot that trails the mouse, swells over anything clickable and, over an
 * element with `data-cursor="…"`, shows that word. The system cursor stays
 * visible, so precision and accessibility are untouched. Mouse only, and off
 * under reduced motion.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;

    const x = gsap.quickTo(el, "x", { duration: DUR.cursor, ease: EASE.out });
    const y = gsap.quickTo(el, "y", { duration: DUR.cursor, ease: EASE.out });
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x(e.clientX);
      y(e.clientY);
      el.dataset.on = "1";
      const t = (e.target as Element).closest<HTMLElement>("[data-cursor], a, button, [role=button], input, textarea, label");
      const word = t?.dataset.cursor ?? "";
      el.dataset.state = word ? "label" : t ? "hover" : "";
      if (label.current) label.current.textContent = word;
    };
    const leave = () => (el.dataset.on = "");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div ref={root} aria-hidden className="cursor">
      <span className="cursor-face" />
      <span ref={label} className="cursor-label" />
    </div>
  );
}
