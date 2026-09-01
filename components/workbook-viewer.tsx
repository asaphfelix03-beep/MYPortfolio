"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { WorkbookSheet } from "@/lib/case-studies";
import { dashboard } from "@/lib/uemoa-dashboard";
import { sheetGrids } from "@/lib/uemoa-sheets";
import SheetGridView from "@/components/sheet-grid";
import {
  ComptesChart,
  IndicesChart,
  TauxPaysChart,
  TauxZoneChart,
} from "@/components/uemoa-charts";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

/**
 * Browses the workbook the way the workbook itself is browsed: one sheet at a
 * time, tabs along the bottom.
 *
 * The sheets are rendered from the workbook's extracted values rather than
 * served as a file. A visitor sees the same cells, the same totals and the
 * same charts, and there is nothing to modify — the page is HTML, not a
 * spreadsheet. It also means no screenshot can go stale against the data.
 */
export default function WorkbookViewer({
  sheets,
  workbookName,
}: {
  sheets: WorkbookSheet[];
  workbookName: string;
}) {
  const reduce = useSafeReducedMotion();
  const [active, setActive] = useState(0);

  const sheet = sheets[active];
  const count = sheets.length;

  const go = useCallback(
    (delta: number) => setActive((i) => (i + delta + count) % count),
    [count],
  );

  // Arrow keys page through the sheets, unless the reader is typing somewhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!sheet) return null;

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {/* Title bar */}
        <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary/50 px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-[3px] bg-accent text-[10px] font-bold text-accent-foreground">
              X
            </span>
            <p className="truncate text-[12px] font-medium text-muted-foreground">
              {workbookName}
            </p>
            <span className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:inline">
              Lecture seule
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Feuille précédente"
              className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="tabular-nums px-1 text-[11px] text-muted-foreground">
              {active + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Feuille suivante"
              className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Sheet */}
        <div className="bg-background/40">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={sheet.id}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <SheetContent sheet={sheet} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sheet tabs, as in the workbook itself */}
        <div
          role="tablist"
          aria-label="Feuilles du classeur"
          className="flex gap-1 overflow-x-auto border-t border-border bg-secondary/50 px-2 py-1.5"
        >
          {sheets.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-md border-t-2 px-3 py-1.5 text-[12px] font-medium transition-colors ${
                  isActive
                    ? "border-accent bg-card text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-card/60 hover:text-foreground"
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* The caption comments the sheet, so it sits outside the frame. */}
      <div className="mt-4">
        <p className="display text-lg text-foreground">{sheet.title}</p>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
          {sheet.caption}
        </p>
      </div>
    </div>
  );
}

function SheetContent({ sheet }: { sheet: WorkbookSheet }) {
  const content = sheet.content;
  if (content.kind === "dashboard") return <DashboardSheet />;
  if (content.kind === "charts") return <ChartsSheet />;

  const grid = sheetGrids.find((g) => g.name === content.grid);
  if (!grid) return null;
  return <SheetGridView sheet={grid} />;
}

function DashboardSheet() {
  return (
    <div className="p-5 sm:p-7">
      <p className="eyebrow text-[10px]">{dashboard.title}</p>
      <p className="mt-2 text-sm text-muted-foreground text-pretty">
        {dashboard.subtitle}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {dashboard.kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-lg border border-border bg-card p-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground text-balance">
              {k.label}
            </p>
            <p className="display mt-2 text-2xl tabular-nums text-foreground">
              {k.value}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground text-pretty">
              {k.note}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-accent/35 bg-accent/[0.07] p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
          {dashboard.answerTitle}
        </p>
        <p className="mt-2.5 text-sm leading-relaxed text-foreground/90 text-pretty">
          {dashboard.answer}
        </p>
      </div>

      {/* The two charts the dashboard sheet itself carries. */}
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <IndicesChart />
        <TauxZoneChart />
      </div>

      <div className="mt-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {dashboard.rankingTitle}
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Rang
                </th>
                <th className="py-2 pr-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Pays
                </th>
                <th className="py-2 pr-3 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Taux d&apos;activité
                </th>
                <th className="py-2 pr-3 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Comptes ouverts
                </th>
                <th className="py-2 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Comptes actifs
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboard.ranking.map((r) => {
                const isCI = r.pays === "Cote d'Ivoire";
                return (
                  <tr
                    key={r.pays}
                    className={`border-b border-border/70 ${
                      isCI ? "bg-accent/[0.07]" : ""
                    }`}
                  >
                    <td className="py-2 pr-3 tabular-nums text-muted-foreground">
                      {r.rank}
                    </td>
                    <td
                      className={`py-2 pr-3 ${
                        isCI ? "font-semibold text-foreground" : "text-foreground/85"
                      }`}
                    >
                      {r.pays}
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums text-foreground">
                      {r.taux.toFixed(2).replace(".", ",")} %
                    </td>
                    <td className="py-2 pr-3 text-right tabular-nums text-muted-foreground">
                      {r.ouverts.toLocaleString("fr-FR")}
                    </td>
                    <td className="py-2 text-right tabular-nums text-muted-foreground">
                      {r.actifs.toLocaleString("fr-FR")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ChartsSheet() {
  return (
    <div className="grid gap-4 p-5 sm:p-7 lg:grid-cols-2">
      <ComptesChart />
      <TauxZoneChart />
      <TauxPaysChart />
      <IndicesChart />
    </div>
  );
}
