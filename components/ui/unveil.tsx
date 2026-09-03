"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

/**
 * Uncovers an image: the frame opens from the top down while the image itself
 * settles back from a slight zoom.
 *
 * The two motions run at once on purpose — the frame alone reads as a wipe,
 * the zoom alone as a jolt; together the image looks like it is being placed
 * rather than switched on.
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

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease }}
    >
      {/* Carries the zoom, and stays positioned so a `fill` image inside still
          resolves its box against this wrapper rather than escaping it. */}
      <motion.div
        className="relative h-full w-full"
        initial={{ scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: duration + 0.25, delay, ease }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
