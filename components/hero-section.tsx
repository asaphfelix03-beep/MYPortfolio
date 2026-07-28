"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-12" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        style={{ opacity, scale, y }}
        className="max-w-5xl mx-auto text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Profile image */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative w-32 h-32 mx-auto mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-60 blur-sm" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/50 p-1">
              <Image
                src="/images/asaph-photo.png"
                alt="Ojewumi Asaph Felix"
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent rounded-full flex items-center justify-center border-2 border-background"
            >
              <Sparkles size={14} className="text-background" />
            </motion.div>
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-background/80 border border-primary/20 text-sm font-medium text-muted-foreground"
          >
            Étudiant en cybersécurité et intelligence artificielle
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="text-foreground">Ojewumi Asaph Felix</span>
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2 text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-6 font-light"
          >
            <span>Étudiant en</span>
            <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary font-medium border border-primary/30">
              Cybersécurité
            </span>
            <span>&</span>
            <span className="px-3 py-1 rounded-lg bg-accent/20 text-accent font-medium border border-accent/30">
              Intelligence Artificielle
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty"
          >
            Je conçois des expériences numériques sécurisées et performantes,
            en alliant cybersécurité, intelligence artificielle et développement web.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <Button
              onClick={scrollToAbout}
              size="lg"
              className="px-8 py-4 rounded-full border border-primary/30 bg-background/90 text-primary-foreground hover:bg-background hover:border-primary transition-all"
            >
              Découvrir mon profil
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 rounded-full border border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary transition-all"
              asChild
            >
              <a href="#contact">Me contacter</a>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="px-8 py-4 rounded-full text-muted-foreground hover:text-primary transition-all"
              asChild
            >
              <a href="/cv" download="CV-Asaph-Felix.pdf">
                <Download size={20} className="mr-2" />
                Télécharger le CV
              </a>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { icon: Mail, href: "mailto:asaphfelix02@gmail.com", label: "Email" },
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-xl glass border border-primary/30 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
                aria-label={social.label}
              >
                <social.icon size={22} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">Défiler</span>
          <ArrowDown size={24} />
        </motion.button>
      </motion.div>
    </section>
  );
}
