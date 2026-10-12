"use client";

import { useCallback, useId, useRef, useState } from "react";
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
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const sheet = sheets[active];
  const count = sheets.length;

  const go = useCallback(
    (delta: number) => setActive((i) => (i + delta + count) % count),
    [count],
  );

  // The tab pattern: arrow keys move between sheets while focus is on the
  // tabs, Home and End jump to the ends. It used to listen on the whole
  // window, which also hijacked the arrow keys a reader uses to scroll the
  // page or a wide sheet sideways.
  const onTabKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let target: number | null = null;
    if (e.key === "ArrowRight") target = (i + 1) % count;
    if (e.key === "ArrowLeft") target = (i - 1 + count) % count;
    if (e.key === "Home") target = 0;
    if (e.key === "End") target = count - 1;
    if (target === null) return;
    e.preventDefault();
    setActive(target);
    tabs.current[target]?.focus();
  };

  if (!sheet) return null;

  return (
    <div>
      <div className="overflow-hidden border border-border bg-card">
        {/* Title bar */}
        <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary/50 px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span aria-hidden className="grid h-5 w-5 shrink-0 place-items-center bg-accent text-[10px] font-bold text-accent-foreground">
              X
            </span>
            <p className="truncate text-[12px] font-medium text-muted-foreground">
              {workbookName}
            </p>
            <span className="hidden shrink-0 border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground sm:inline">
              Lecture seule
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Feuille précédente"
              className="grid h-9 w-9 place-items-center text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
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
              className="grid h-9 w-9 place-items-center text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Sheet */}
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${active}`}
          tabIndex={0}
          className="bg-background/40 focus-visible:outline-offset-[-2px]"
        >
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
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`${uid}-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`${uid}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`shrink-0 border-t-2 px-3 py-2 text-[13px] font-medium transition-colors ${
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
        <p className="text-[1.125rem] text-foreground">{sheet.title}</p>
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
      <p className="label">{dashboard.title}</p>
      <p className="mt-2 text-sm text-muted-foreground text-pretty">
        {dashboard.subtitle}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {dashboard.kpis.map((k) => (
          <div
            key={k.label}
            className="border border-border bg-card p-4"
          >
            <p className="text-[12px] font-medium text-muted-foreground text-balance">
              {k.label}
            </p>
            <p className="figure mt-2 text-2xl text-foreground">
              {k.value}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground text-pretty">
              {k.note}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 border border-accent/35 bg-accent/[0.07] p-5">
        <p className="text-[12px] font-medium text-accent">
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
        <p className="text-[12px] font-medium text-muted-foreground">
          {dashboard.rankingTitle}
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-3 text-[12px] font-medium text-muted-foreground">
                  Rang
                </th>
                <th className="py-2 pr-3 text-[12px] font-medium text-muted-foreground">
                  Pays
                </th>
                <th className="py-2 pr-3 text-right text-[12px] font-medium text-muted-foreground">
                  Taux d&apos;activité
                </th>
                <th className="py-2 pr-3 text-right text-[12px] font-medium text-muted-foreground">
                  Comptes ouverts
                </th>
                <th className="py-2 text-right text-[12px] font-medium text-muted-foreground">
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
