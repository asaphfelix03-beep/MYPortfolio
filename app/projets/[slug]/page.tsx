import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Download, Github } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import WorkbookViewer from "@/components/workbook-viewer";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const title = `${study.title} | Asaph Felix`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: `/projets/${study.slug}` },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url: `/projets/${study.slug}`,
      title,
      description: study.summary,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Deliberately not the site navigation: its links are hash anchors into
          the home page, which resolve to nothing from here. */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Tous les projets
          </Link>
          <Link
            href="/#contact"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Me contacter
          </Link>
        </div>
      </header>

      {/* Title block */}
      <section className="relative overflow-hidden px-5 pb-14 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
        <div className="grid-paper absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">{study.type}</span>
              <span className="text-sm text-muted-foreground">
                {study.year}
              </span>
              {study.status ? (
                <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-accent">
                  {study.status}
                </span>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="display mt-4 text-[clamp(2rem,5vw,3.6rem)] text-balance">
              {study.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="display mt-3 text-xl italic text-foreground/85 text-balance">
              {study.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
              {study.summary}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-7 flex flex-wrap gap-1.5">
              {study.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          {study.link || study.download || study.repo ? (
            <Reveal delay={0.22}>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {study.link ? (
                  <a
                    href={study.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cta inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-90"
                  >
                    {study.linkLabel ?? "Voir le projet"}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                    />
                  </a>
                ) : null}
                {study.download ? (
                  <a
                    href={study.download}
                    download
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-secondary"
                  >
                    <Download size={14} />
                    Télécharger le classeur
                  </a>
                ) : null}
                {study.repo ? (
                  <a
                    href={study.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-secondary"
                  >
                    <Github size={14} />
                    Code source
                  </a>
                ) : null}
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Context and dataset */}
      <section className="border-t border-border px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Le contexte</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              {study.context}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="eyebrow">Le jeu de données</p>
            <dl className="mt-4 divide-y divide-border border-y border-border">
              {study.dataset.map((d) => (
                <div
                  key={d.label}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {d.label}
                  </dt>
                  <dd className="text-right text-sm text-foreground">
                    {d.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* The workbook itself */}
      <section className="section-dark px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="eyebrow">Le classeur, feuille par feuille</p>
            <h2 className="display mt-4 text-[clamp(1.6rem,3.4vw,2.4rem)] text-balance">
              Rien n&apos;est caché derrière une capture unique.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
              Chaque onglet ci-dessous est une feuille du classeur, dans
              l&apos;ordre où elle a été construite, avec ses valeurs réelles —
              cellule par cellule, totaux et contrôles qualité compris. Rien
              n&apos;est modifiable : la page est du HTML, pas un tableur.
              Naviguez d&apos;une feuille à l&apos;autre au clic ou avec les
              flèches du clavier.
            </p>
          </Reveal>

          <div className="mt-9">
            <WorkbookViewer
              sheets={study.sheets}
              workbookName={study.workbookName}
            />
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="border-t border-border px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="eyebrow">La méthode</p>
          </Reveal>
          <RevealGroup className="mt-6 divide-y divide-border border-y border-border">
            {study.method.map((step, i) => (
              <RevealItem key={step}>
                <div className="flex gap-5 py-4">
                  <span className="display shrink-0 text-lg leading-tight text-muted-foreground/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                    {step}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Findings */}
      <section className="border-t border-border px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="eyebrow">Ce que l&apos;analyse établit</p>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-5 md:grid-cols-3">
            {study.findings.map((f) => (
              <RevealItem key={f.title}>
                <article className="h-full rounded-xl border border-border bg-card p-6">
                  <h3 className="display text-xl leading-tight text-balance">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {f.body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <footer className="section-dark px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Retour aux projets
          </Link>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ojewumi Asaph Felix
          </p>
        </div>
      </footer>
    </main>
  );
}
