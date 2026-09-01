"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { charts } from "@/lib/uemoa-dashboard";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

/**
 * The four charts of the workbook, redrawn from the same series Excel plots.
 *
 * They always sit on the `.section-dark` card, so the palette is validated
 * against that one surface (#1d1a19) rather than against both themes:
 *   blue #3987e5 / orange #d95926 — all five checks PASS
 *   accent #009965 vs de-emphasis #6b6866 — CVD ΔE 8.9, contrast ≥ 3:1
 * The grey is meant to read as grey: it is a de-emphasis mark, not a
 * categorical slot, so the chroma floor does not apply to it.
 */
const SERIES_1 = "#3987e5"; // comptes ouverts, indice ouverts
const SERIES_2 = "#d95926"; // comptes actifs, indice actifs
const EMPHASIS = "#009965"; // Côte d'Ivoire
const DE_EMPHASIS = "#6b6866"; // les sept autres pays
const SURFACE = "#1d1a19"; // le fond de carte, pour les anneaux et écarts

const NBSP = " "; // insécable : garde « 4,53 % » sur une seule ligne
const nf = new Intl.NumberFormat("fr-FR");
const nf2 = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const axis = {
  tick: { fill: "var(--muted-foreground)", fontSize: 11 },
  tickLine: false,
  axisLine: false,
} as const;

function Frame({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="m-0 rounded-lg border border-border bg-card p-4 sm:p-5">
      <figcaption>
        <p className="text-sm font-semibold text-foreground text-balance">
          {title}
        </p>
        {note ? (
          <p className="mt-0.5 text-[11px] text-muted-foreground">{note}</p>
        ) : null}
      </figcaption>
      <div className="mt-4 h-[260px] w-full">{children}</div>
    </figure>
  );
}

function TooltipBox({
  active,
  payload,
  label,
  unit,
  digits = 0,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; color?: string }[];
  label?: string | number;
  unit?: string;
  digits?: number;
}) {
  if (!active || !payload?.length) return null;
  const format = (v: number) =>
    digits === 2 ? nf2.format(v) : nf.format(Math.round(v));
  return (
    <div className="rounded-md border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur-sm">
      <p className="text-[11px] font-semibold text-foreground">{label}</p>
      <ul className="mt-1.5 space-y-1">
        {payload.map((p) => (
          <li key={p.name} className="flex items-center gap-2 text-[11px]">
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: p.color }}
            />
            <span className="text-muted-foreground">{p.name}</span>
            <span className="ml-auto tabular-nums font-medium text-foreground">
              {format(p.value ?? 0)}
              {unit ?? ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const legendStyle = {
  fontSize: 11,
  color: "var(--muted-foreground)",
  paddingTop: 8,
} as const;

/** Labels only the last point of a series, so the endpoint carries the value. */
function endLabel(format: (v: number) => string, lastIndex: number) {
  return function EndLabel(props: {
    x?: number;
    y?: number;
    value?: number;
    index?: number;
  }) {
    const { x, y, value, index } = props;
    // Recharts label renderers must return an element, so the skipped points
    // get an empty group rather than null.
    if (index !== lastIndex || value == null || x == null || y == null) {
      return <g />;
    }
    return (
      <text
        x={x}
        y={y - 10}
        textAnchor="end"
        fill="var(--foreground)"
        fontSize={11}
        fontWeight={600}
      >
        {format(value)}
      </text>
    );
  };
}

export function ComptesChart() {
  const reduce = useSafeReducedMotion();
  return (
    <Frame
      title="Comptes ouverts contre comptes actifs, 2020-2024"
      note="En millions de comptes. Les deux séries partent du même axe."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={charts.comptes as unknown as Record<string, number>[]}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          barGap={2}
          barCategoryGap="30%"
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeWidth={1}
          />
          <XAxis dataKey="annee" {...axis} />
          <YAxis
            {...axis}
            width={44}
            ticks={[0, 50e6, 100e6, 150e6, 200e6, 250e6]}
            tickFormatter={(v: number) => `${Math.round(v / 1e6)}${NBSP}M`}
          />
          <Tooltip
            cursor={{ fill: "var(--muted)", opacity: 0.35 }}
            content={<TooltipBox />}
          />
          <Legend wrapperStyle={legendStyle} iconType="circle" iconSize={8} />
          <Bar
            dataKey="ouverts"
            name="Comptes ouverts"
            fill={SERIES_1}
            maxBarSize={24}
            radius={[4, 4, 0, 0]}
            isAnimationActive={!reduce}
          />
          <Bar
            dataKey="actifs"
            name="Comptes actifs"
            fill={SERIES_2}
            maxBarSize={24}
            radius={[4, 4, 0, 0]}
            isAnimationActive={!reduce}
          />
        </BarChart>
      </ResponsiveContainer>
    </Frame>
  );
}

export function TauxZoneChart() {
  const reduce = useSafeReducedMotion();
  const data = charts.tauxZone as unknown as Record<string, number>[];
  return (
    <Frame
      title="Taux d'activité de la zone UEMOA (%)"
      note="Comptes actifs rapportés aux comptes ouverts, recalculé chaque année."
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 18, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeWidth={1}
          />
          <XAxis dataKey="annee" {...axis} />
          <YAxis
            {...axis}
            width={44}
            domain={[0, 50]}
            ticks={[0, 10, 20, 30, 40, 50]}
            tickFormatter={(v: number) => `${v}${NBSP}%`}
          />
          <Tooltip content={<TooltipBox unit={`${NBSP}%`} digits={2} />} />
          {/* Single series: the title names it, so no legend box. */}
          <Line
            type="monotone"
            dataKey="taux"
            name="Taux d'activité"
            stroke={SERIES_1}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            dot={{ r: 4, fill: SERIES_1, stroke: SURFACE, strokeWidth: 2 }}
            activeDot={{ r: 5, stroke: SURFACE, strokeWidth: 2 }}
            isAnimationActive={!reduce}
            label={endLabel((v) => `${nf2.format(v)}${NBSP}%`, data.length - 1)}
          />
        </LineChart>
      </ResponsiveContainer>
    </Frame>
  );
}

export function IndicesChart() {
  const reduce = useSafeReducedMotion();
  const data = charts.indices as unknown as Record<string, number>[];
  return (
    <Frame
      title="Divergence des rythmes — indices base 100 en 2020"
      note="Deux séries d'échelles différentes ramenées à une base commune, sur un seul axe."
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 18, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeWidth={1}
          />
          <XAxis dataKey="annee" {...axis} />
          <YAxis {...axis} width={44} domain={[80, 280]} />
          <Tooltip content={<TooltipBox digits={2} />} />
          <Legend wrapperStyle={legendStyle} iconType="plainline" iconSize={14} />
          <Line
            type="monotone"
            dataKey="ouverts"
            name="Indice comptes ouverts"
            stroke={SERIES_1}
            strokeWidth={2}
            strokeLinecap="round"
            dot={{ r: 4, fill: SERIES_1, stroke: SURFACE, strokeWidth: 2 }}
            activeDot={{ r: 5, stroke: SURFACE, strokeWidth: 2 }}
            isAnimationActive={!reduce}
            label={endLabel((v) => nf2.format(v), data.length - 1)}
          />
          <Line
            type="monotone"
            dataKey="actifs"
            name="Indice comptes actifs"
            stroke={SERIES_2}
            strokeWidth={2}
            strokeLinecap="round"
            dot={{ r: 4, fill: SERIES_2, stroke: SURFACE, strokeWidth: 2 }}
            activeDot={{ r: 5, stroke: SURFACE, strokeWidth: 2 }}
            isAnimationActive={!reduce}
            label={endLabel((v) => nf2.format(v), data.length - 1)}
          />
        </LineChart>
      </ResponsiveContainer>
    </Frame>
  );
}

export function TauxPaysChart() {
  const reduce = useSafeReducedMotion();
  const data = charts.tauxPays as unknown as {
    pays: string;
    taux: number;
  }[];
  return (
    <Frame
      title="Taux d'activité par pays en 2024 (%)"
      note="Tri croissant. La Côte d'Ivoire est mise en évidence ; les sept autres pays sont le contexte."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 44, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            horizontal={false}
            stroke="var(--border)"
            strokeWidth={1}
          />
          <XAxis
            type="number"
            domain={[0, 72]}
            ticks={[0, 20, 40, 60]}
            {...axis}
            tickFormatter={(v: number) => `${v}${NBSP}%`}
          />
          <YAxis type="category" dataKey="pays" width={92} {...axis} />
          <Tooltip
            cursor={{ fill: "var(--muted)", opacity: 0.35 }}
            content={<TooltipBox unit={`${NBSP}%`} digits={2} />}
          />
          <Bar
            dataKey="taux"
            name="Taux d'activité"
            maxBarSize={18}
            radius={[0, 4, 4, 0]}
            isAnimationActive={!reduce}
            label={{
              position: "right",
              fill: "var(--foreground)",
              fontSize: 11,
              formatter: (v: number) => `${nf2.format(v)}${NBSP}%`,
            }}
          >
            {data.map((d) => (
              <Cell
                key={d.pays}
                fill={d.pays === "Cote d'Ivoire" ? EMPHASIS : DE_EMPHASIS}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Frame>
  );
}
