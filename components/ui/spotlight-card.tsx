"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { ReactNode, PointerEvent } from "react";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

/**
 * Card that tilts toward the pointer and carries a light that follows it.
 * Tilt is skipped for touch input and when the user prefers reduced motion.
 */
export function SpotlightCard({
  children,
  className = "",
  tilt = 6,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  const reduce = useSafeReducedMotion();

  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const rx = useSpring(useMotionValue(0), { stiffness: 260, damping: 22 });
  const ry = useSpring(useMotionValue(0), { stiffness: 260, damping: 22 });

  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${px}% ${py}%, oklch(0.7 0.11 220 / 0.14), transparent 70%)`;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width;
    const cy = (e.clientY - r.top) / r.height;
    px.set(cx * 100);
    py.set(cy * 100);
    ry.set((cx - 0.5) * tilt * 2);
    rx.set(-(cy - 0.5) * tilt * 2);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    px.set(50);
    py.set(50);
  };

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={
        reduce
          ? undefined
          : { rotateX: rx, rotateY: ry, transformPerspective: 900 }
      }
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group relative ${className}`}
    >
      {/* pointer-following light */}
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
