import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Register, Selvedge } from "@/components/night/weave";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ProjectVisual } from "@/components/projects/project-visual";
import { ProjectLinks, StatusChip } from "@/components/projects/project-links";
import { EmbedOnDemand } from "@/components/projects/embed-on-demand";
import { getCaseStudy } from "@/lib/case-studies";
import { getCvInfo } from "@/lib/cv-file";
import { getNeighbours, getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

/**
 * One page per project, all on the same skeleton: what the problem was,
 * what was done about it, what came out — figures first — and where to
 * check it. A block whose facts are not known is left out rather than
 * filled with a plausible sentence.
 *
 * The UEMOA analysis keeps its workbook viewer: its method, findings and
 * six sheets come from lib/case-studies.ts, unchanged.
 */

// Only the UEMOA page shows the workbook; loading it lazily keeps recharts
// and the extracted sheets (~170 Ko of JavaScript) off every other project
// page. It is still rendered on the server, so the cells are in the HTML.
const WorkbookViewer = dynamic(() => import("@/components/workbook-viewer"));

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projets/${project.slug}` },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url: `/projets/${project.slug}`,
      title: `${project.title} | ${site.shortName}`,
      description: project.summary,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const cv = getCvInfo();
  const study = p.caseStudy ? getCaseStudy(p.caseStudy) : undefined;
  const { previous, next } = getNeighbours(p.slug);

  const steps = p.steps ?? (study ? { title: "La méthode", items: study.method } : undefined);
  const findings = p.findings ?? study?.findings;
  const caption = p.visual.kind === "image" ? p.visual.caption : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    headline: p.tagline,
    description: p.summary,
    url: `${site.url}/projets/${p.slug}`,
    inLanguage: "fr",
    dateCreated: p.year,
    keywords: p.technologies.join(", "),
    author: { "@type": "Person", name: site.name, url: site.url },
    ...(p.links.repo ? { sameAs: p.links.repo } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation cv={cv} onHome={false} />
      <Selvedge />

      <main id="contenu" tabIndex={-1} className="relative overflow-x-clip outline-none md:pl-14">
        {/* Title */}
        <section className="relative isolate overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36">
          <div
            aria-hidden
            className="weave-field pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(90%_80%_at_85%_0%,black,transparent_70%)]"
          />
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Fil d'Ariane">
              <ol className="flex flex-wrap items-center gap-2 text-[0.875rem] text-muted-foreground">
                <li>
                  <Link
                    href="/#projets"
                    className="link-go inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-foreground"
                  >
                    <ArrowLeft size={15} aria-hidden />
                    Projets
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-foreground/80">
                  {p.title}
                </li>
              </ol>
            </nav>

            <p className="rise-in label mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-2 sm:mt-10">
              <span>{p.category}</span>
              <span aria-hidden>·</span>
              <span>{p.year}</span>
              {p.status ? <StatusChip>{p.status}</StatusChip> : null}
            </p>
            <h1
              className="rise-in mt-4 text-[clamp(2.4rem,6.4vw,4.75rem)] font-light leading-[1.02] tracking-[-0.015em] text-balance"
              style={{ "--d": "60ms" } as React.CSSProperties}
            >
              {p.title}
            </h1>
            <p
              className="rise-in mt-5 max-w-3xl text-[clamp(1.15rem,2vw,1.45rem)] font-light leading-snug text-foreground/85 text-pretty"
              style={{ "--d": "120ms" } as React.CSSProperties}
            >
              {p.tagline}
            </p>
            <p
              className="rise-in prose-night mt-6 max-w-2xl text-[1.0625rem]"
              style={{ "--d": "180ms" } as React.CSSProperties}
            >
              {p.summary}
            </p>
            <div
              className="rise-in mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ "--d": "240ms" } as React.CSSProperties}
            >
              <ProjectLinks project={p} size="lg" />
            </div>
            {p.links.download ? (
              <p className="mt-3 text-[0.875rem] text-muted-foreground">{p.links.download.note}</p>
            ) : null}
          </div>
        </section>

        {/* The picture */}
        <section aria-label="Aperçu" className="px-5 sm:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Not a scroll reveal: this is in the first screen, and content
                hidden until hydration is content a phone waits seconds for. */}
            <figure className="group rise-in" style={{ "--d": "300ms" } as React.CSSProperties}>
              <ProjectVisual project={p} variant="page" priority />
              {caption ? (
                <figcaption className="mt-3 text-[0.8125rem] text-muted-foreground">{caption}</figcaption>
              ) : null}
            </figure>
            {p.embed ? <EmbedOnDemand src={p.embed.src} title={p.embed.title} /> : null}
          </div>
        </section>

        {/* In short */}
        <Register className="mt-16 sm:mt-20">
          <section aria-labelledby="bref" className="px-5 py-16 sm:px-8 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-4">
                <h2 id="bref" className="h-section text-[clamp(1.75rem,3.2vw,2.5rem)]">
                  En bref
                </h2>
              </Reveal>
              <Reveal delay={0.06} className="min-w-0 lg:col-span-8">
                <dl className="divide-y divide-border border-y border-border">
                  {p.problem ? <Row term="Le problème">{p.problem}</Row> : null}
                  <Row term="L'objectif">{p.objective}</Row>
                  {p.contribution ? <Row term="Ma contribution">{p.contribution}</Row> : null}
                  {study
                    ? study.dataset.map((d) => (
                        <Row key={d.label} term={d.label}>
                          {d.value}
                        </Row>
                      ))
                    : null}
                  <Row term="Technologies">
                    <ul className="flex flex-wrap gap-1.5">
                      {(study?.technologies ?? p.technologies).map((t) => (
                        <li key={t} className="tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </Row>
                </dl>
              </Reveal>
            </div>
          </section>
        </Register>

        {/* How */}
        {steps ? (
          <Register>
            <section aria-labelledby="demarche" className="px-5 py-16 sm:px-8 sm:py-20">
              <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-12">
                <Reveal className="lg:col-span-4">
                  <h2 id="demarche" className="h-section text-[clamp(1.75rem,3.2vw,2.5rem)]">
                    {steps.title}
                  </h2>
                </Reveal>
                {/* One reveal for the whole list: wrapping each <li> in an
                    animated <div> would break the list for screen readers. */}
                <Reveal className="min-w-0 lg:col-span-8">
                  <ol className="border-t border-border">
                    {steps.items.map((step, i) => (
                      <li
                        key={step}
                        className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-5 sm:grid-cols-[3.5rem_1fr]"
                      >
                        <span aria-hidden className="figure text-[1.375rem] text-muted-foreground/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[0.9375rem] leading-relaxed text-foreground/85 text-pretty sm:text-base">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            </section>
          </Register>
        ) : null}

        {/* What came out */}
        {p.results?.length || p.highlights || findings?.length ? (
          <Register>
            <section aria-labelledby="resultats" className="px-5 py-16 sm:px-8 sm:py-20">
              <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                  <Reveal className="lg:col-span-4">
                    <h2 id="resultats" className="h-section text-[clamp(1.75rem,3.2vw,2.5rem)]">
                      {p.results?.length || findings?.length ? "Résultats" : p.highlights?.title}
                    </h2>
                  </Reveal>

                  <div className="min-w-0 space-y-12 lg:col-span-8">
                    {p.results?.length ? (
                      <Reveal>
                        <dl className="grid gap-x-8 gap-y-8 border-t border-border pt-6 sm:grid-cols-3">
                          {p.results.map((r) => (
                            <div key={r.value} className="flex flex-col-reverse">
                              <dt className="mt-2.5 text-[0.875rem] leading-snug text-muted-foreground text-pretty">
                                {r.label}
                              </dt>
                              <dd className="figure text-foreground text-[clamp(2rem,4vw,2.75rem)]">
                                {r.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </Reveal>
                    ) : null}

                    {findings?.length ? (
                      <RevealGroup className="grid gap-px border border-border bg-border md:grid-cols-3">
                        {findings.map((f) => (
                          <RevealItem key={f.title} className="bg-background">
                            <article className="h-full p-6">
                              <h3 className="text-[1.125rem] leading-snug text-foreground text-balance">
                                {f.title}
                              </h3>
                              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground text-pretty">
                                {f.body}
                              </p>
                            </article>
                          </RevealItem>
                        ))}
                      </RevealGroup>
                    ) : null}

                    {p.highlights ? (
                      <Reveal>
                        {p.results?.length || findings?.length ? (
                          <h3 className="h-title text-[1.25rem]">{p.highlights.title}</h3>
                        ) : null}
                        <ul className="mt-4 border-t border-border">
                          {p.highlights.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-4 border-b border-border py-4 text-[0.9375rem] leading-relaxed text-foreground/85 text-pretty sm:text-base"
                            >
                              <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-accent" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          </Register>
        ) : null}

        {/* The UEMOA workbook itself */}
        {study ? (
          <Register>
            <section id="classeur" aria-labelledby="classeur-title" className="px-5 py-16 sm:px-8 sm:py-20">
              <div className="mx-auto max-w-7xl">
                <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
                  <Reveal className="lg:col-span-7">
                    <h2 id="classeur-title" className="h-section text-[clamp(1.75rem,3.2vw,2.5rem)]">
                      Le classeur, feuille par feuille
                    </h2>
                  </Reveal>
                  <Reveal delay={0.06} className="lg:col-span-5">
                    <p className="prose-night text-[0.9375rem]">
                      Rien n&apos;est caché derrière une capture unique. Chaque
                      onglet est une feuille du classeur, dans l&apos;ordre où
                      elle a été construite, avec ses valeurs réelles — totaux
                      et contrôles qualité compris. La page est du HTML, pas un
                      tableur : rien n&apos;est modifiable.
                    </p>
                  </Reveal>
                </div>
                <div className="theme-ink mt-10 rounded-[1.5rem] p-3 sm:p-5">
                  <WorkbookViewer sheets={study.sheets} workbookName={study.workbookName} />
                </div>
              </div>
            </section>
          </Register>
        ) : null}

        {/* Limits, security notes */}
        {p.notes?.length ? (
          <Register>
            <section aria-labelledby="a-savoir" className="px-5 py-16 sm:px-8 sm:py-20">
              <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-12">
                <Reveal className="lg:col-span-4">
                  <h2 id="a-savoir" className="h-section text-[clamp(1.75rem,3.2vw,2.5rem)]">
                    À savoir
                  </h2>
                </Reveal>
                <div className="grid min-w-0 gap-10 lg:col-span-8 md:grid-cols-2">
                  {p.notes.map((n) => (
                    <Reveal key={n.title}>
                      <h3 className="h-title text-[1.125rem]">{n.title}</h3>
                      <ul className="mt-4 border-t border-border">
                        {n.items.map((item) => (
                          <li
                            key={item}
                            className="border-b border-border py-3.5 text-[0.9375rem] leading-relaxed text-muted-foreground text-pretty"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          </Register>
        ) : null}

        {/* Sources, and the way on */}
        <Register>
          <div className="px-5 py-12 sm:px-8 sm:py-14">
            <div className="mx-auto max-w-7xl">
              <p className="text-[0.875rem] text-muted-foreground">
                Sources des informations de cette page :{" "}
                {p.sources.map((s, i) => (
                  <span key={s.href}>
                    {i > 0 ? ", " : null}
                    {s.href.startsWith("#") || s.href.startsWith("/") ? (
                      <a href={s.href} className="link-line text-foreground/80 hover:text-accent">
                        {s.label}
                      </a>
                    ) : (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-line text-foreground/80 hover:text-accent"
                      >
                        {s.label}
                        <span className="sr-only"> (nouvel onglet)</span>
                      </a>
                    )}
                  </span>
                ))}
                .
              </p>

              <nav
                aria-label="Autres projets"
                className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2"
              >
                <Link
                  href={`/projets/${previous.slug}`}
                  className="link-go group/prev flex flex-col gap-2 bg-background p-6 transition-colors hover:bg-card sm:p-8"
                >
                  <span className="label inline-flex items-center gap-1.5">
                    <ArrowLeft size={14} aria-hidden />
                    Projet précédent
                  </span>
                  <span className="text-[1.375rem] font-light text-foreground">{previous.title}</span>
                </Link>
                <Link
                  href={`/projets/${next.slug}`}
                  className="link-go flex flex-col items-end gap-2 bg-background p-6 text-right transition-colors hover:bg-card sm:p-8"
                >
                  <span className="label inline-flex items-center gap-1.5">
                    Projet suivant
                    <ArrowRight size={14} aria-hidden className="icon-go" />
                  </span>
                  <span className="text-[1.375rem] font-light text-foreground">{next.title}</span>
                </Link>
              </nav>
            </div>
          </div>
        </Register>
      </main>

      <div className="theme-ink md:pl-14">
        <Footer cv={cv} onHome={false} />
      </div>
    </>
  );
}

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
      <dt className="label pt-0.5">{term}</dt>
      <dd className="text-[0.9375rem] leading-relaxed text-foreground/85 text-pretty sm:text-base">
        {children}
      </dd>
    </div>
  );
}
