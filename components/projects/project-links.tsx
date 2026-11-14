import { ArrowUpRight, Download } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand";
import type { Project } from "@/lib/projects";

/**
 * The ways out of a project: its live version, its code, its download.
 * External links say so (icon + "nouvel onglet" for screen readers), and a
 * download states its size before anyone spends 88 Mo of data on it.
 */
export function ProjectLinks({
  project,
  size = "md",
}: {
  project: Project;
  size?: "md" | "lg";
}) {
  const { demo, repo, download } = project.links;
  if (!demo && !repo && !download) return null;

  const base =
    size === "lg"
      ? "btn btn-outline"
      : "link-go inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground";

  return (
    <>
      {demo ? (
        <a href={demo.href} target="_blank" rel="noopener noreferrer" className={base}>
          {demo.label}
          <ArrowUpRight size={16} aria-hidden className="icon-out" />
          <span className="sr-only">(nouvel onglet)</span>
        </a>
      ) : null}
      {repo ? (
        <a href={repo} target="_blank" rel="noopener noreferrer" className={base}>
          <GithubIcon size={16} />
          Code source
          <ArrowUpRight size={16} aria-hidden className="icon-out" />
          <span className="sr-only">sur GitHub (nouvel onglet)</span>
        </a>
      ) : null}
      {download ? (
        <a href={download.href} download className={base}>
          <Download size={16} aria-hidden className="icon-down" />
          {download.label}
          <span className="text-muted-foreground">({download.size})</span>
        </a>
      ) : null}
    </>
  );
}

export function StatusChip({ children, live = false }: { children: string; live?: boolean }) {
  return <span className={`chip ${live ? "chip-signal" : ""}`}>{children}</span>;
}
