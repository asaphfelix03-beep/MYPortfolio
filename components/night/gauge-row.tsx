"use client";

import { motion } from "framer-motion";
import { dashboard } from "@/lib/uemoa-dashboard";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { IN_VIEW_MARGIN } from "@/lib/motion";

/** The scale every gauge shares, so the row can be read by sweeping it. */
const SCALE_MAX = 70;

const nf = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * The eight UEMOA countries as one row of identical gauges.
 *
 * Identical is the point: the same scale, the same track, the same width, so
 * the reader takes the whole zone in one sweep instead of opening eight
 * figures one by one. Two marks break the row, and only two — amber for Côte
 * d'Ivoire, the country the analysis is about, and red for Niger, the single
 * value the workbook itself flags as anomalous. Every other country stays in
 * the cloth's own grey.
 */
export default function GaugeRow() {
  const reduce = useSafeReducedMotion();
  const countries = dashboard.ranking;

  return (
    <div className="flex h-full flex-col justify-center gap-5 p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[9.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Taux d&apos;activité des comptes · 2024
        </p>
        <p className="text-[9.5px] tabular-nums tracking-[0.18em] text-muted-foreground/70">
          0 – {SCALE_MAX} %
        </p>
      </div>

      <ul className="flex items-end justify-between gap-1.5 sm:gap-2.5">
        {countries.map((c, i) => {
          const isSubject = c.pays === "Cote d'Ivoire";
          const isAnomaly = c.rank === 1;
          const fill = Math.min(c.taux / SCALE_MAX, 1);

          const tone = isAnomaly
            ? "bg-[oklch(0.62_0.2_25)]"
            : isSubject
              ? "bg-accent"
              : "bg-muted-foreground/45";

          return (
            <li key={c.pays} className="flex min-w-0 flex-1 flex-col items-center">
              <span
                className={`mb-2 text-[9.5px] tabular-nums ${
                  isSubject
                    ? "text-accent"
                    : isAnomaly
                      ? "text-[oklch(0.7_0.18_25)]"
                      : "text-muted-foreground/70"
                }`}
              >
                {nf.format(c.taux)}
              </span>

              {/* The face is drawn in full so the shared scale is visible:
                  eight identical instruments, not eight free-floating bars. */}
              <div className="relative flex h-24 w-full items-end border border-border bg-secondary/30 sm:h-28">
                <motion.span
                  className={`block w-full ${tone}`}
                  style={{ originY: 1 }}
                  initial={reduce ? { height: `${fill * 100}%` } : { height: 0 }}
                  whileInView={{ height: `${fill * 100}%` }}
                  viewport={{ once: true, margin: IN_VIEW_MARGIN }}
                  transition={{
                    duration: 0.9,
                    delay: reduce ? 0 : 0.06 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              {/* Le pays sujet se repere aussi sans la couleur : sa luminance
                  est proche de celle des barres de contexte, donc l'identite
                  ne peut pas reposer sur la seule teinte. */}
              <span
                className={`mt-2 h-20 text-[9px] uppercase leading-none tracking-[0.18em] [writing-mode:vertical-rl] ${
                  isSubject
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {c.pays}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Le Niger tient la valeur la plus basse de la zone et la Côte d&apos;Ivoire
        la deuxième, alors qu&apos;elle concentre 40,1 % des comptes ouverts. Les
        six feuilles du classeur sont consultables sur la page du projet.
      </p>
    </div>
  );
}
