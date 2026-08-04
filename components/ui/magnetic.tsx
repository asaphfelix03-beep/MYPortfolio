"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

/**
 * Pulls its child slightly toward the pointer, then springs back on leave.
 * Wraps in an inline-block so it can hug buttons and links.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useSafeReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={`inline-block ${className ?? ""}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}
