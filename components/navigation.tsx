"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";

const navItems = [
  { name: "Accueil", href: "#home" },
  { name: "À propos", href: "#about" },
  { name: "Compétences", href: "#skills" },
  { name: "Projets", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "py-2 bg-background/80 backdrop-blur-xl border-b border-border/50" 
            : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick("#home")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="relative w-10 h-10 rounded-xl bg-background/90 border border-primary/40 flex items-center justify-center transition-colors">
                  <Code2 size={20} className="text-primary" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                  Asaph
                </span>
                <span className="text-muted-foreground">.dev</span>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 p-1.5 rounded-full glass border border-border/50">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-background/90 text-primary font-medium text-sm hover:bg-background hover:border-primary transition-all"
            >
              Me contacter
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 rounded-xl glass border border-border/50 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/98 backdrop-blur-xl" 
            />
            <div className="relative flex flex-col items-center justify-center h-full">
              <div className="flex flex-col items-center gap-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`px-8 py-4 text-2xl font-medium transition-colors rounded-xl ${
                        isActive 
                          ? "text-primary bg-primary/10" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.name}
                    </motion.button>
                  );
                })}
              </div>
              
              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.3 }}
                className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-lg"
              >
                Me contacter
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
