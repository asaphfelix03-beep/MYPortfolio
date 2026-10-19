import Link from "next/link";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand";
import { Magnetic, Swash, Wordmark } from "@/components/motion/kinetics";
import { sections, site, type CvInfo } from "@/lib/site";

export default function Footer({
  cv,
  onHome = true,
}: {
  cv: CvInfo;
  onHome?: boolean;
}) {
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  const elsewhere = [
    { label: "GitHub", href: site.links.github, icon: <GithubIcon size={15} /> },
    { label: "LinkedIn", href: site.links.linkedin, icon: <LinkedinIcon size={15} /> },
  ];

  return (
    <footer className="theme-ink overflow-hidden px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex items-end justify-between gap-6 border-b border-border pb-10">
          <p className="max-w-md text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.035em]">
            Un stage à pourvoir ? <span className="relative serif-accent font-normal text-accent">Parlons-en.<Swash delay={0.3} /></span>
          </p>
          {/* The closing call: a disc that grows on hover. */}
          <Magnetic strength={0.35} className="shrink-0">
          <a
            href={href("contact")}
            className="group grid h-28 w-28 shrink-0 place-items-center rounded-full bg-accent text-center text-[0.875rem] font-medium text-accent-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 active:scale-[0.96] sm:h-36 sm:w-36"
          >
            <span className="flex flex-col items-center gap-1">
              <ArrowUpRight size={20} aria-hidden className="transition-transform duration-500 group-hover:rotate-45" />
              Écrire
            </span>
          </a>
          </Magnetic>
        </div>
        <div className="grid gap-10 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <p className="text-[1.75rem] font-light leading-tight">{site.name}</p>
            <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-muted-foreground">
              Étudiant en cybersécurité et intelligence artificielle à
              l&apos;{site.school.short}, {site.school.city}.
            </p>
          </div>

          <nav aria-label="Pied de page" className="sm:col-span-3">
            <p className="label">Sur ce site</p>
            <ul className="mt-3">
              {sections.map((s) => (
                <li key={s.id}>
                  <Link
                    href={href(s.id)}
                    className="inline-flex min-h-10 items-center text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-4">
            <p className="label">Ailleurs</p>
            <ul className="mt-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-10 items-center gap-2.5 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail size={15} aria-hidden />
                  {site.email}
                </a>
              </li>
              {elsewhere.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-go inline-flex min-h-10 items-center gap-2.5 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.icon}
                    {l.label}
                    <ArrowUpRight size={14} aria-hidden className="icon-out" />
                    <span className="sr-only">(nouvel onglet)</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={cv.href}
                  download={cv.downloadName}
                  className="inline-flex min-h-10 items-center gap-2.5 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Download size={15} aria-hidden />
                  {cv.label}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Wordmark
          first="Asaph"
          last="Felix"
          className="mt-14 select-none whitespace-nowrap text-[clamp(3.5rem,13vw,11rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-foreground/90"
        />
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-[0.8125rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <a
            href={site.links.source}
            target="_blank"
            rel="noopener noreferrer"
            className="link-go inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            Code source de ce site, conçu et développé en Côte d&apos;Ivoire
            <ArrowUpRight size={13} aria-hidden className="icon-out" />
            <span className="sr-only">(nouvel onglet)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
