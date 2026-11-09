import { ArrowUpRight } from "lucide-react";
import { Counter } from "@/components/motion/kinetics";
import { RevealTitle } from "@/components/ui/reveal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand";
import { certifications, issuerCount } from "@/lib/parcours";
import { projects, publicRepoCount } from "@/lib/projects";
import { site } from "@/lib/site";

/** Every figure is computed from lib/, so it cannot drift from the content. */
const figures = [
  { value: projects.length, label: "projets présentés" },
  { value: certifications.length, label: "certifications obtenues" },
  { value: issuerCount, label: "organismes certificateurs" },
  { value: publicRepoCount, label: "dépôts publics" },
];

const links = [
  { href: site.links.github, label: "GitHub", icon: <GithubIcon size={16} />, external: true },
  { href: site.links.linkedin, label: "LinkedIn", icon: <LinkedinIcon size={16} />, external: true },
  { href: `mailto:${site.email}`, label: "E-mail", icon: null, external: false },
];

export default function StatsSection() {
  return (
    <section aria-labelledby="chiffres-title" className="theme-ink relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <RevealTitle id="chiffres-title" className="h-section" text="Ce qui se _vérifie_" />
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {figures.map((f) => (
            <div key={f.label} className="flex flex-col-reverse border-t border-border pt-5">
              <dt className="mt-2 text-[0.9375rem] text-muted-foreground">{f.label}</dt>
              <dd className="figure text-[clamp(3rem,7vw,5.5rem)] leading-none text-foreground">
                <Counter value={f.value} />
              </dd>
            </div>
          ))}
        </dl>
        <ul className="mt-14 flex flex-wrap gap-3">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="btn btn-outline"
              >
                {l.icon}
                {l.label}
                <ArrowUpRight size={15} aria-hidden className="icon-out" />
                {l.external ? <span className="sr-only">(nouvel onglet)</span> : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
