import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/projects";

export default function NotFound() {
  return (
    <main
      id="contenu"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 py-24 sm:px-8"
    >
      <div
        aria-hidden
        className="weave-field pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(80%_70%_at_70%_40%,black,transparent_75%)]"
      />
      <div className="mx-auto w-full max-w-3xl">
        <p className="label">Erreur 404</p>
        <h1 className="mt-4 text-[clamp(2.2rem,6vw,4rem)] font-light leading-[1.05] text-balance">
          Cette page n&apos;existe pas, ou plus.
        </h1>
        <p className="prose-night mt-5 max-w-xl text-[1.0625rem]">
          L&apos;adresse a peut-être changé. Les projets sont tous accessibles
          depuis l&apos;accueil :
        </p>
        <ul className="mt-6 border-t border-border">
          {projects.map((p) => (
            <li key={p.slug} className="border-b border-border">
              <Link
                href={`/projets/${p.slug}`}
                className="flex min-h-12 items-center justify-between gap-4 py-3 text-[1rem] text-foreground/85 transition-colors hover:text-accent"
              >
                {p.title}
                <span className="label">{p.category}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="btn btn-primary mt-10">
          <ArrowLeft size={17} aria-hidden />
          Revenir à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
