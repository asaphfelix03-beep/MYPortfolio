"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { Download, Home, User, Layers, FolderKanban, Route, Mail, type LucideIcon } from "lucide-react";
import { LogoMark } from "@/components/ui/logo-mark";
import { ThemeToggle } from "@/components/motion/theme-toggle";
import { sections, site, type CvInfo } from "@/lib/site";

const icons: Record<string, LucideIcon> = {
  ouverture: Home,
  profil: User,
  domaines: Layers,
  projets: FolderKanban,
  parcours: Route,
  contact: Mail,
};

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
        className="pointer-events-none fixed inset-x-0 top-3 z-50 grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-[max(12px,1.2vw)]"
      >
        <Link
          href={onHome ? "#top" : "/"}
          transitionTypes={back}
          aria-label={`${site.shortName}, retour à l'accueil`}
          className="pointer-events-auto grid h-11 w-11 shrink-0 place-items-center justify-self-start rounded-full bg-foreground"
        >
          <LogoMark className="h-5 w-5 text-background" accent="var(--accent-fill)" />
        </Link>

        <nav aria-label="Navigation principale" className="pointer-events-auto hidden md:block">
          <ul
            className={`glass flex items-center gap-0.5 rounded-full p-1 transition-shadow duration-300 ${
              scrolled ? "shadow-[var(--shadow-soft)]" : ""
            }`}
          >
            {sections.map((s) => {
              const Icon = icons[s.id];
              const current = active === s.id;
              return (
                <li key={s.id}>
                  <Link
                    href={href(s.id)}
                    transitionTypes={back}
                    onClick={(e) => goTo(e, s.id)}
                    aria-current={current ? "location" : undefined}
                    className={`flex h-10 items-center gap-2 rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors duration-200 ${
                      current
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {Icon && <Icon size={16} aria-hidden />}
                    {s.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="pointer-events-auto col-start-3 flex items-center gap-2 justify-self-end">
          <ThemeToggle />
          <a
            href={cv.href}
            download={cv.downloadName}
            aria-label={`${cv.label}, ${cv.size}`}
            className="glass hidden h-10 items-center gap-2 rounded-full px-3.5 text-[0.9375rem] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground lg:flex"
          >
            <Download size={15} aria-hidden />
            CV
          </a>
          <a href={href("contact")} onClick={(e) => goTo(e, "contact")} className="btn btn-signal btn-sm whitespace-nowrap">
            Me contacter
          </a>
        </div>
      </header>

      <nav
        aria-label="Navigation mobile"
        style={{ viewTransitionName: "site-tabs" }}
        className="glass fixed inset-x-0 bottom-0 z-50 pb-[max(12px,var(--safe-bottom))] md:hidden"
      >
        <ul className="flex h-[var(--tabbar-h)] items-stretch justify-between px-2">
          {sections.map((s) => {
            const Icon = icons[s.id];
            const current = active === s.id;
            return (
              <li key={s.id} className="flex-1">
                <Link
                  href={href(s.id)}
                  transitionTypes={back}
                  onClick={(e) => goTo(e, s.id)}
                  aria-current={current ? "location" : undefined}
                  className={`flex h-full flex-col items-center justify-center gap-1 rounded-lg text-[0.6875rem] font-medium transition-colors duration-200 ${
                    current ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {Icon && <Icon size={20} aria-hidden strokeWidth={current ? 2.25 : 1.75} />}
                  {s.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
