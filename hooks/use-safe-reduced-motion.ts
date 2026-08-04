"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * `useReducedMotion` reports false during SSR and on the very first client
 * render, so branching render output on it directly makes the hydrated tree
 * disagree with the server HTML. Staying false until after mount keeps the
 * first client render identical to the server, then flips on.
 */
export function useSafeReducedMotion(): boolean {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && !!prefersReduced;
}
