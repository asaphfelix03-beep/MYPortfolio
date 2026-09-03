"use client";

import { motion } from "framer-motion";
import { Shield, Database, Code2, Network, LineChart } from "lucide-react";
import { WordRevealRich } from "@/components/ui/text-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { brandIcons } from "@/lib/brand-icons";

const pillars = [
  {
    icon: Shield,
    title: "Sécurité par défaut",
    body: "Sécurité des réseaux, tests d'intrusion, cryptographie et supervision. La protection des données pensée dès la conception, pas ajoutée après coup.",
    footer: "Défense & analyse",
  },
  {
    icon: LineChart,
    title: "La donnée qui décide",
    body: "Nettoyage, agrégation et exploration de jeux de données réels. Je transforme des fichiers bruts en tendances lisibles et en visualisations qui éclairent une décision.",
    footer: "Analyse de données",
  },
  {
    icon: Code2,
    title: "Des applications qui tiennent",
    body: "Applications web et mobiles construites de bout en bout, du modèle de données à l'interface, avec le souci du détail et de la fiabilité.",
    footer: "Web & mobile",
  },
];

const domains = [
  { icon: Code2, label: "Développement Full-stack", items: "React · Node.js · TypeScript · SQL" },
  { icon: Database, label: "Big Data", items: "Hadoop · Spark · Kafka · NoSQL" },
  { icon: Network, label: "Réseaux & Infrastructure", items: "Routage · Firewall · VPN · Monitoring" },
];

export default function SkillsSection() {
  const reduce = useSafeReducedMotion();

  return (
    <section id="skills" className="relative py-20 sm:py-28 lg:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="eyebrow">Écosystème de travail</p>
        </Reveal>

        <div className="mt-5 grid lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <Reveal delay={0.06} className="lg:col-span-8 min-w-0">
            <h2 className="display text-[clamp(1.9rem,4.6vw,3.4rem)] text-balance">
              <WordRevealRich
                italicClassName="italic"
                parts={[
                  { text: "Une expertise à la croisée de la sécurité, de la donnée et du " },
                  { text: "code", italic: true },
                  { text: "." },
                ]}
              />
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-4 min-w-0">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
              Une sélection de technologies pratiquées en cours, en projet et en
              autoformation, de l&apos;analyse de données au durcissement réseau.
            </p>
          </Reveal>
        </div>

        {/* Infinite technology marquee */}
        <div className="mt-12 sm:mt-16 border-y border-border py-7 marquee-mask overflow-hidden">
          <div
            className={
              reduce
                ? "flex flex-wrap justify-center gap-x-9 gap-y-6"
                : // .animate-marquee pauses on hover (see globals.css), which
                  // makes the per-logo colour reveal reachable.
                  "flex w-max animate-marquee gap-10 sm:gap-14"
            }
          >
            {/* Duplicated once so the -50% translation loops seamlessly.
                The copy is aria-hidden so screen readers hear each tech once. */}
            {(reduce ? brandIcons : [...brandIcons, ...brandIcons]).map((icon, i) => (
              <span
                key={`${icon.title}-${i}`}
                title={icon.title}
                aria-hidden={i >= brandIcons.length ? true : undefined}
                className="group/logo shrink-0 grid place-items-center"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  aria-label={i < brandIcons.length ? icon.title : undefined}
                  className="h-7 w-7 sm:h-8 sm:w-8 fill-[var(--brand)] opacity-70 saturate-[0.85] transition duration-300 group-hover/logo:opacity-100 group-hover/logo:saturate-100 group-hover/logo:scale-110"
                  style={{ "--brand": `#${icon.hex}` } as React.CSSProperties}
                >
                  <path d={icon.path} />
                </svg>
              </span>
            ))}
          </div>
        </div>

        {/* Three pillars */}
        <RevealGroup
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
          stagger={0.1}
        >
          {pillars.map((p) => (
            <RevealItem key={p.title} className="h-full">
              <SpotlightCard className="card-paper h-full p-6 sm:p-7 flex flex-col">
                <p.icon size={20} className="text-accent" />
                <h3 className="mt-5 text-base font-bold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty flex-1">
                  {p.body}
                </p>
                <p className="display italic text-lg mt-5 text-foreground/70">
                  {p.footer}
                </p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Secondary domains */}
        <RevealGroup
          className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6"
          stagger={0.08}
        >
          {domains.map((d) => (
            <RevealItem key={d.label}>
              <div className="flex items-start gap-3.5 rounded-xl border border-border bg-secondary/40 p-5">
                <d.icon size={18} className="text-foreground mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold tracking-tight">{d.label}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{d.items}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
