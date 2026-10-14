"use client";

import { useEffect, useRef } from "react";

/**
 * A ring that trails the mouse and swells over anything clickable; over an
 * element with `data-cursor="…"` it shows that word. The system cursor
 * stays visible, so precision and accessibility are untouched. Mouse only,
 * and off under reduced motion.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el || !matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      el.dataset.on = "1";
      const t = (e.target as Element).closest<HTMLElement>("[data-cursor], a, button, [role=button], input, textarea");
      const word = t?.dataset.cursor ?? "";
      el.dataset.state = word ? "label" : t ? "hover" : "";
      if (label.current) label.current.textContent = word;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => (el.dataset.on = "");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ring} aria-hidden className="cursor-ring">
      <span ref={label} />
    </div>
  );
}
