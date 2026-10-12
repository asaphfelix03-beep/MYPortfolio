import Image from "next/image";
import { MapPin, Pill } from "lucide-react";
import GaugeRow from "@/components/night/gauge-row";
import type { Project } from "@/lib/projects";

/**
 * The picture of a project: a real screenshot when there is one, or a
 * figure drawn from the project's own data when a screenshot would show
 * less (the UEMOA gauges, Matronassist-ci's access matrix).
 */
export function ProjectVisual({
  project,
  variant = "card",
  priority = false,
}: {
  project: Project;
  variant?: "card" | "page";
  priority?: boolean;
}) {
  const v = project.visual;

  if (v.kind === "uemoa-gauges") {
    return (
      <div className="theme-ink relative h-full min-h-[20rem] overflow-hidden rounded-[1.25rem]">
        <span aria-hidden className="weave-field pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative h-full">
          <GaugeRow onProjectPage={variant === "page"} />
        </div>
      </div>
    );
  }

  if (v.kind === "roles") return <RolesVisual />;

  if (v.kind === "cover") {
    const Icon = v.icon === "pill" ? Pill : MapPin;
    return (
      <div
        role="img"
        aria-label={`Couverture du projet ${project.title} : aucune capture publiée pour l'instant.`}
        className={`relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-[1.25rem] p-7 sm:p-9 ${
          v.icon === "pill"
            ? "bg-[linear-gradient(135deg,oklch(0.95_0.04_292),oklch(0.97_0.02_264))]"
            : "bg-[linear-gradient(135deg,oklch(0.95_0.05_195),oklch(0.97_0.02_150))]"
        }`}
      >
        <span aria-hidden className="weave-field pointer-events-none absolute inset-0 opacity-70" />
        <span className={`relative grid h-14 w-14 place-items-center rounded-2xl bg-card shadow-[var(--shadow-soft)] ${v.icon === "pill" ? "text-violet" : "text-cyan-ink"}`}>
          <Icon size={26} aria-hidden />
        </span>
        <p aria-hidden className="relative flex flex-wrap gap-x-5 gap-y-1 text-[clamp(1.6rem,3.6vw,2.6rem)] font-medium leading-none tracking-[-0.03em] text-foreground/80">
          {v.words.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </p>
      </div>
    );
  }

  const isPortrait = v.height > v.width;

  return (
    <div
      className={`night-plate relative ring-1 ring-border ${
        variant === "card"
          ? "aspect-[16/10]"
          : isPortrait
            ? "aspect-[4/5] sm:aspect-[16/10]"
            : "aspect-[16/10]"
      }`}
    >
      <Image
        src={v.src}
        alt={v.alt}
        fill
        priority={priority}
        sizes={variant === "card" ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1280px) 1200px, 100vw"}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        style={{ objectPosition: v.position ?? "50% 50%" }}
      />
    </div>
  );
}

const roles = [
  {
    name: "Administration",
    scope: "Tout le réseau : comptes des matrones, dossiers, statistiques globales.",
  },
  {
    name: "Matrone",
    scope: "Uniquement les patientes qui lui sont rattachées.",
  },
  {
    name: "Patiente",
    scope: "Uniquement son propre dossier.",
  },
];

/**
 * Matronassist-ci has no public demo yet, so instead of a mock-up its visual
 * is the thing that defines it best: who can see which medical record. The
 * three rows are the README's authorisation table.
 */
function RolesVisual() {
  return (
    <figure className="theme-ink relative flex h-full min-h-[20rem] flex-col justify-center overflow-hidden rounded-[1.25rem] p-6 sm:p-9">
      <span
        aria-hidden
        className="weave-field pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(90%_80%_at_80%_20%,black,transparent)]"
      />
      <figcaption className="relative label">Qui voit quel dossier médical</figcaption>
      <ul className="relative mt-5 grid border-t border-border sm:grid-cols-3">
        {roles.map((r) => (
          <li
            key={r.name}
            className="border-b border-border py-4 sm:border-b-0 sm:border-r sm:px-5 sm:py-5 sm:first:pl-0 sm:last:border-r-0"
          >
            <p className="text-[1.25rem] font-light text-foreground">{r.name}</p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">{r.scope}</p>
          </li>
        ))}
      </ul>
      <p className="relative mt-5 max-w-md text-[0.875rem] leading-relaxed text-muted-foreground">
        Un dossier hors périmètre répond <span className="text-foreground">404</span>, pas{" "}
        <span className="text-foreground">403</span> : son existence même reste cachée.
      </p>
    </figure>
  );
}
