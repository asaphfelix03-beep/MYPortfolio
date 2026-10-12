import Link from "next/link";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand";
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
    <footer className="theme-ink px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
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

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-[0.8125rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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
