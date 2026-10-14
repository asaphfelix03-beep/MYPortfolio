import { brandIcons } from "@/lib/brand-icons";

/** Only tools put to work in a published project or a certificate. */
const shown = new Set([
  "Python", "pandas", "NumPy", "Jupyter", "PostgreSQL", "JavaScript", "TypeScript",
  "React", "Flutter", "Dart", "Firebase", "Docker", "Git", "Cisco",
]);
const icons = brandIcons.filter((i) => shown.has(i.title));

/**
 * The strip of tools under the hero. It drifts slowly, stops under the
 * pointer, and lays out still for reduced motion. The second copy exists
 * only to make the loop seamless, so it is hidden from screen readers.
 */
export function TechMarquee() {
  return (
    <section aria-label="Outils utilisés dans mes projets" className="border-y border-border bg-card py-7">
      <div className="marquee-mask overflow-hidden">
        <ul className="marquee flex w-max gap-14">
          {[...icons, ...icons].map((icon, i) => (
            <li
              key={`${icon.title}-${i}`}
              aria-hidden={i >= icons.length || undefined}
              className="group flex shrink-0 items-center gap-3 text-muted-foreground"
            >
              <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7 fill-current transition-colors duration-300 group-hover:fill-[var(--brand)]" style={{ "--brand": `#${icon.hex}` } as React.CSSProperties}>
                <path d={icon.path} />
              </svg>
              <span className="text-[0.9375rem] font-medium text-foreground/70">{icon.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
