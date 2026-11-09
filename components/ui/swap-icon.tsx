import type { ReactNode } from "react";

/** Swaps two icons (copy/copied, sun/moon): the new one pops in, keyed so the CSS replays. */
export function SwapIcon({ on, off, active }: { on: ReactNode; off: ReactNode; active: boolean }) {
  return (
    <span key={active ? "on" : "off"} className="swap-in inline-grid place-items-center">
      {active ? on : off}
    </span>
  );
}
