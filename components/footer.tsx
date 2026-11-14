import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sections, site, type CvInfo } from "@/lib/site";

export default function Footer({
  cv,
  onHome = true,
}: {
  cv: CvInfo;
  onHome?: boolean;
}) {
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const link =
    "inline-flex min-h-10 items-center gap-1 text-[0.9375rem] text-muted-foreground transition-colors duration-200 hover:text-foreground";
  const external = [
    { label: "GitHub", href: site.links.github },
    { label: "LinkedIn", href: site.links.linkedin },
    { label: "Code source", href: site.links.source },
  ];

  return (
    <footer className="p-[max(12px,1.2vw)] pb-[calc(var(--tabbar-space)+12px)] md:pb-[max(12px,1.2vw)]">
      <div className="theme-ink relative isolate flex min-h-[80svh] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card px-[var(--gutter)] pt-[var(--section-y)]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 80% 0%, var(--accent), transparent 70%), radial-gradient(50% 40% at 0% 100%, var(--violet), transparent 70%)",
          }}
        />
        <div className="mx-auto w-full max-w-[var(--content-max)]">
          <p className="min-w-0 max-w-[18ch] break-words text-[clamp(2rem,calc(var(--fs-h1)*0.6),6.5rem)] font-medium leading-[0.95] tracking-[-0.05em] text-foreground">
            {site.availability.sentence}
          </p>
          <nav aria-label="Pied de page" className="mt-12">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <Link href={href(s.id)} className={link}>
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className={link}>
                  {site.email}
                </a>
              </li>
              {external.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {l.label}
                    <ArrowUpRight size={14} aria-hidden />
                    <span className="sr-only">(nouvel onglet)</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={cv.href} download={cv.downloadName} className={link}>
                  CV
                  <span className="sr-only">, {cv.label}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16">
          <p className="pb-4 text-[0.8125rem] text-muted-foreground">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p
            aria-hidden
            className="-mb-[0.12em] select-none whitespace-nowrap text-center text-[clamp(3rem,13vw,16rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-foreground/15"
          >
            {site.shortName}
          </p>
        </div>
      </div>
    </footer>
  );
}
