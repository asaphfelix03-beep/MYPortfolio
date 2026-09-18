"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { IN_VIEW_MARGIN } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Uncovers an image: a curtain opens from the top down while the image itself
 * settles back from a slight zoom.
 *
 * The two motions run at once on purpose — the curtain alone reads as a wipe,
 * the zoom alone as a jolt; together the image looks like it is being placed
 * rather than switched on.
 *
 * The element that watches the viewport is never the one that is clipped.
 * Chrome's IntersectionObserver measures a target through its own clip-path,
 * so a fully clipped element has no visible area and never counts as entering
 * the screen: the curtain stayed shut and the image blank for good. It only
 * appeared to work when the element was already in view at load, or when a
 * test jumped straight to it. The outer frame here keeps its real box and
 * drives the clipped layer through variants.
 */
export function Unveil({
  children,
  className,
  delay = 0,
  duration = 1.05,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduce = useSafeReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  const curtain: Variants = {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    shown: {
      clipPath: "inset(0 0 0% 0)",
      transition: { duration, delay, ease },
    },
  };

  const settle: Variants = {
    hidden: { scale: 1.14 },
    shown: { scale: 1, transition: { duration: duration + 0.25, delay, ease } },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: IN_VIEW_MARGIN }}
    >
      {/* Both layers stay positioned and full-size so a `fill` image inside
          still resolves its box against the frame rather than escaping it. */}
      <motion.div variants={curtain} className="relative h-full w-full">
        <motion.div variants={settle} className="relative h-full w-full">
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
