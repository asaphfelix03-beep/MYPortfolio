"use client";

import { useEffect, useRef } from "react";
import { DUR, EASE, gsap, INTRO_DONE, INTRO_FLAG } from "@/lib/motion";
import { site } from "@/lib/site";

/**
 * The opening curtain: first visit of a session only, skippable with a click
 * or any key. The head script decides whether it shows (html.intro), so it
 * is on screen before hydration and never appears without JavaScript or
 * under reduced motion.
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    // Tells the head script's safety timer that the page took over.
    html.dataset.motionReady = "";
    const el = root.current;
    if (!el || !html.classList.contains("intro")) return;

    try {
      sessionStorage.setItem(INTRO_FLAG, "1");
    } catch {
      // Private mode: the curtain will simply play again next visit.
    }

    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      window.dispatchEvent(new Event(INTRO_DONE));
    };
    const tl = gsap
      .timeline({ onComplete: () => html.classList.remove("intro") })
      .fromTo(el.querySelector("[data-loader-name]"), { yPercent: 110 }, { yPercent: 0, duration: DUR.loaderIn, ease: EASE.title })
      .fromTo(el.querySelector(".loader-line"), { scaleX: 0 }, { scaleX: 1, duration: DUR.loaderIn, ease: EASE.inOut }, 0)
      .call(release, undefined, `+=${DUR.loaderHold}`)
      .to(el, { yPercent: -100, duration: DUR.loaderOut, ease: EASE.inOut });

    const skip = () => {
      release();
      tl.progress(1);
    };
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      tl.kill();
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  return (
    <div ref={root} aria-hidden className="loader">
      <p className="loader-name">
        <span data-loader-name="">{site.shortName}</span>
      </p>
      <i className="loader-line" />
    </div>
  );
}
