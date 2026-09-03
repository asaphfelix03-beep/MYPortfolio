"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { LogoMark } from "@/components/ui/logo-mark";

const navItems = [
  { name: "Bio", href: "#about" },
  { name: "Expertise", href: "#skills" },
  { name: "Réalisations", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = ["home", ...navItems.map((i) => i.href.slice(1))];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Wordmark */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <span className="w-8 h-8 rounded-md bg-foreground grid place-items-center transition-transform duration-300 group-hover:-translate-y-0.5">
              <LogoMark className="w-5 h-5 text-background" accent="#2E9E6B" />
            </span>
            <span className="font-bold tracking-tight text-[15px] hidden sm:block">
              Asaph Felix
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative text-[15px] transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-foreground"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Magnetic strength={0.3} className="hidden sm:inline-block">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="inline-flex items-center px-4 lg:px-5 py-2.5 rounded-md bg-foreground text-background text-[11px] font-semibold uppercase tracking-[0.12em] hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Me contacter
              </a>
            </Magnetic>

            <button
              onClick={() => setIsOpen((v) => !v)}
              className="lg:hidden w-10 h-10 rounded-md border border-border grid place-items-center text-foreground"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-background"
          >
            <div className="flex flex-col justify-center h-full px-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  className="display text-4xl sm:text-5xl text-left py-4 border-b border-border text-foreground"
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="mt-10 inline-flex items-center justify-center px-6 py-4 rounded-md bg-foreground text-background text-xs font-semibold uppercase tracking-[0.12em]"
              >
                Démarrer une collaboration
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
