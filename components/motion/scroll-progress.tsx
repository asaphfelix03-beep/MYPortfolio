"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";

/** A thin accent rule along the top edge that fills as the page is read. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const setScale = gsap.quickSetter(el, "scaleX");
    const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: (self) => setScale(self.progress) });
    return () => st.kill();
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
