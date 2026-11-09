"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { SwapIcon } from "@/components/ui/swap-icon";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Light/dark switch. The head script in the layout sets `.dark` before
 * first paint; this button only flips it, stores the choice, and reveals
 * the new theme as a circle growing from the button where the browser
 * supports view transitions.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    const apply = () => {
      root.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
      flushSync(() => setDark(next));
    };
    if (prefersReducedMotion() || !document.startViewTransition) return apply();

    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`);
    root.classList.add("theme-vt");
    document.startViewTransition(apply).finished.finally(() => root.classList.remove("theme-vt"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Passer en thème clair" : "Passer en thème sombre"}
      className="btn btn-outline btn-sm w-10 px-0"
    >
      <SwapIcon active={dark} on={<Sun size={16} aria-hidden />} off={<Moon size={16} aria-hidden />} />
    </button>
  );
}
