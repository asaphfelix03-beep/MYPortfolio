"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cross-fades two icons (copy/copied, menu/close) instead of swapping them:
 * scale 0.25→1, opacity 0→1, blur 4px→0, spring with no bounce.
 */
export function SwapIcon({ on, off, active }: { on: ReactNode; off: ReactNode; active: boolean }) {
  return (
    <span className="relative inline-grid place-items-center">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={active ? "on" : "off"}
          className="inline-grid"
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        >
          {active ? on : off}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
