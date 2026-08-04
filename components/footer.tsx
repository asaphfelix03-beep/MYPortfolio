"use client";

import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  { name: "Bio", href: "#about" },
  { name: "Expertise", href: "#skills" },
  { name: "Réalisations", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  {
    icon: Github,
    href: "https://github.com/asaphfelix03-beep/portfolio-asaph",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/asaph-felix-ojewumi-469054324/",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:asaphfelix02@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="section-dark px-5 sm:px-8 py-14 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <p className="display text-3xl sm:text-4xl">Asaph Felix</p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Étudiant en Cybersécurité et Intelligence Artificielle, basé à
              Abidjan.
            </p>
          </div>

          <nav className="sm:col-span-4">
            <p className="eyebrow">Navigation</p>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-3">
            <p className="eyebrow">Me suivre</p>
            <div className="mt-4 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ojewumi Asaph Felix
          </p>
          <p className="text-xs text-muted-foreground">
            Conçu et développé en Côte d&apos;Ivoire
          </p>
        </div>
      </div>
    </footer>
  );
}
