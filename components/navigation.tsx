"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { LogoMark } from "@/components/ui/logo-mark";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { sections, site, type CvInfo } from "@/lib/site";

/**
 * The site header, shared by every page.
 *
 * Links are real anchors (`#projets` on the home page, `/#projets`
 * elsewhere), so they work before hydration, open in a new tab and can be
 * crawled. The active section is tracked with an IntersectionObserver rather
 * than by measuring every section on every scroll event.
 */
export default function Navigation({
  cv,
  onHome = true,
}: {
  cv: CvInfo;
  /** False on project pages: anchors then point back to the home page. */
  onHome?: boolean;
}) {
  const reduce = useSafeReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

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
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A section is "current" while it crosses the upper middle of the
      // screen.
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

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) menuButton.current?.focus();
  }, []);

  // The open menu is a modal: the page behind does not scroll, Escape
  // closes it, and Tab stays inside it.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    // The close button lives in the header, above the panel: it belongs to
    // the trap too.
    const focusables = () =>
      [
        menuButton.current,
        ...Array.from(
          panel.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [],
        ),
      ].filter((el): el is HTMLElement => el !== null);
    focusables()[1]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!onHome) {
      setOpen(false);
      return; // a client-side navigation to /#id, handled by Link
    }
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setOpen(false);
    // Wait for the menu to release the page's scroll before moving it.
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", `#${id}`);
      target.focus({ preventScroll: true });
    });
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Navigation principale"
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border px-2.5 pl-3 transition-[background-color,border-color,box-shadow] duration-500 sm:h-16 md:ml-[4.5rem] lg:mx-auto ${
            scrolled || open
              ? "border-border bg-card/80 shadow-[var(--shadow-lift)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link
            href={onHome ? "#top" : "/"}
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${site.shortName}, retour à l'accueil`}
            onClick={(e) => {
              if (!onHome) return;
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
              history.replaceState(null, "", "#top");
            }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-foreground transition-transform duration-300 group-hover:rotate-[-8deg]">
              <LogoMark className="h-5 w-5 text-background" accent="var(--accent)" />
            </span>
            <span className="hidden text-[0.9375rem] font-medium sm:block">
              {site.shortName}
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <Link
                    href={href(s.id)}
                    onClick={(e) => goTo(e, s.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative py-2 text-[0.9375rem] transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={cv.href}
              download={cv.downloadName}
              className="btn btn-outline btn-sm hidden sm:inline-flex"
            >
              <Download size={15} aria-hidden className="icon-down" />
              CV <span className="sr-only">(PDF, {cv.size})</span>
            </a>
            <Link
              href={href("contact")}
              onClick={(e) => goTo(e, "contact")}
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Me contacter
            </Link>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="btn btn-outline btn-sm lg:hidden"
            >
              {open ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
              {open ? "Fermer" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-background pt-16 sm:pt-20 lg:hidden"
          >
            <div aria-hidden className="weave-field pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
            <div className="relative flex min-h-full flex-col justify-between gap-10 px-5 pb-10 pt-8 sm:px-8">
              <ul>
                {sections.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-border"
                  >
                    <Link
                      href={href(s.id)}
                      onClick={(e) => goTo(e, s.id)}
                      className="flex items-baseline justify-between py-5 text-[2rem] font-light leading-none text-foreground"
                    >
                      {s.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <a href={cv.href} download={cv.downloadName} className="btn btn-outline">
                  <Download size={17} aria-hidden />
                  Télécharger mon CV
                  <span className="font-normal text-muted-foreground">(PDF, {cv.size})</span>
                </a>
                <Link
                  href={href("contact")}
                  onClick={(e) => goTo(e, "contact")}
                  className="btn btn-primary"
                >
                  Me contacter
                </Link>
                <a href={`mailto:${site.email}`} className="mt-2 text-center text-[0.9375rem] text-muted-foreground">
                  {site.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
