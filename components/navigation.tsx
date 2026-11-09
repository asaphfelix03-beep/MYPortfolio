"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { LogoMark } from "@/components/ui/logo-mark";
import { ThemeToggle } from "@/components/motion/theme-toggle";
import { sections, site, type CvInfo } from "@/lib/site";

/**
 * A centred pill at the top from tablet up, with an accent dot on the current
 * section. On phones the links move to a rounded bar under the thumb and the
 * pill keeps only the logo, the theme switch and the CV.
 */
export default function Navigation({
  cv,
  onHome = true,
}: {
  cv: CvInfo;
  /** False on project pages: anchors then point back to the home page. */
  onHome?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const back = onHome ? undefined : ["nav-back"];

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    // A section is "current" while it crosses the upper middle of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((t) => observer.observe(t));

    // Back in the hero, no section is current.
    const top = document.getElementById("top");
    const topObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    if (top) topObserver.observe(top);
    return () => {
      observer.disconnect();
      topObserver.disconnect();
    };
  }, [onHome]);

  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!onHome) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    if (window.__lenis) window.__lenis.scrollTo(target);
    else target.scrollIntoView();
    history.replaceState(null, "", `#${id}`);
    target.focus({ preventScroll: true });
  };

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
      >
        <div
          className={`flex w-full items-center justify-between gap-1 rounded-full border border-border bg-card/90 p-1.5 backdrop-blur-md transition-shadow duration-300 md:w-fit md:justify-center ${
            scrolled ? "shadow-[var(--shadow-soft)]" : ""
          }`}
        >
          <Link
            href={onHome ? "#top" : "/"}
            transitionTypes={back}
            aria-label={`${site.shortName}, retour à l'accueil`}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-foreground"
          >
            <LogoMark className="h-5 w-5 text-background" accent="var(--accent-fill)" />
          </Link>

          <nav aria-label="Navigation principale" className="hidden md:block">
            <ul className="flex items-center">
              {sections.map((s) => (
                <li key={s.id}>
                  <NavLink
                    href={href(s.id)}
                    label={s.label}
                    current={active === s.id}
                    transitionTypes={back}
                    onClick={(e) => goTo(e, s.id)}
                    className="h-10 gap-2 px-3.5 text-[0.9375rem]"
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <ThemeToggle />
            <a href={cv.href} download={cv.downloadName} className="btn btn-outline btn-sm">
              <Download size={15} aria-hidden />
              CV
              <span className="sr-only">, {cv.size}</span>
            </a>
          </div>
        </div>
      </header>

      <nav
        aria-label="Navigation mobile"
        style={{ viewTransitionName: "site-tabs" }}
        className="fixed inset-x-3 bottom-3 z-50 rounded-full border border-border bg-card/95 p-1 shadow-[var(--shadow-soft)] backdrop-blur-md md:hidden"
      >
        <ul className="flex justify-between">
          {sections.map((s) => (
            <li key={s.id}>
              <NavLink
                href={href(s.id)}
                label={s.label}
                current={active === s.id}
                transitionTypes={back}
                onClick={(e) => goTo(e, s.id)}
                className="h-12 justify-center gap-1 px-2 text-[0.75rem]"
              />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function NavLink({
  label,
  current,
  className,
  ...link
}: {
  href: string;
  label: string;
  current: boolean;
  transitionTypes?: string[];
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  className: string;
}) {
  return (
    <Link
      {...link}
      aria-current={current ? "location" : undefined}
      className={`flex items-center rounded-full font-medium text-foreground transition-colors duration-200 hover:bg-muted ${className}`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 shrink-0 rounded-full bg-accent-fill transition-opacity duration-200 ${current ? "opacity-100" : "opacity-0"}`}
      />
      {label}
    </Link>
  );
}
