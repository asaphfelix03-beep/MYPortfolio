"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { getProject } from "@/lib/projects";

/**
 * The page's signature: one blue signal that draws itself down the page as
 * it is read. It runs in the gutters and crosses between sections, and at
 * three crossings it takes the shape of a real project: a SOC alert spike
 * (SOC Homelab), a fraud graph (SynthID-Graph) and a data curve (UEMOA).
 * Each section title decodes as it comes into view.
 *
 * Decorative only (aria-hidden, no pointer events). Nothing renders without
 * JavaScript; under reduced motion the thread is drawn whole and still.
 */

type Motif = "plain" | "alert" | "graph" | "curve";
/** One per section boundary, in page order: hero, profil, domaines, projets, parcours, contact. */
const CROSSINGS: { motif: Motif; slug?: string }[] = [
  { motif: "plain" },
  { motif: "alert", slug: "soc-homelab" },
  { motif: "graph", slug: "synthid-graph" },
  { motif: "curve", slug: "monnaie-electronique-uemoa" },
  { motif: "plain" },
];

/** The drawing tip sits this far down the viewport. */
const TIP_LINE = 0.62;
/** Titles decode when their top reaches this line. */
const TITLE_LINE = 0.9;
const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#%&<>/";

type Pt = { x: number; y: number; k: number };
type Mark = { x: number; y: number; at: number; kind: "dot" | "ring" | "end" };
type Edge = { x1: number; y1: number; x2: number; y2: number; at: number };
type Label = { x: number; y: number; at: number; text: string };
export type Geo = { w: number; h: number; d: string; total: number; pts: Pt[]; cum: number[]; marks: Mark[]; edges: Edge[]; labels: Label[] };

const smooth = (t: number) => t * t * (3 - 2 * t);

/** Piecewise-linear lookup through (u, v) knots, 0 outside [-1, 1]. */
function knots(u: number, us: number[], vs: number[]) {
  if (u <= us[0] || u >= us[us.length - 1]) return 0;
  let i = 1;
  while (us[i] < u) i++;
  const f = (u - us[i - 1]) / (us[i] - us[i - 1]);
  return vs[i - 1] + f * (vs[i] - vs[i - 1]);
}

const SHAPES = {
  // An alert on a flat baseline: the spike a SIEM shows when a rule fires.
  alert: { width: 150, us: [-1, -0.5, -0.3, -0.1, 0.1, 0.3, 0.5, 1], vs: [0, 0, -0.35, 0.6, -1, 0.3, 0, 0] },
  // A measured series that climbs, then returns to the thread.
  curve: { width: 300, us: [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 0.88, 1], vs: [0, -0.15, -0.08, -0.35, -0.28, -0.55, -0.5, -0.85, -0.7, 0] },
};

/** Builds the thread from the sections' measured boxes, in `main` coordinates. */
export function buildGeo(main: HTMLElement): Geo | null {
  const secs = Array.from(main.querySelectorAll<HTMLElement>(":scope > section"));
  if (secs.length < 2) return null;
  const css = (el: Element | null, p: "paddingTop" | "paddingBottom" | "paddingLeft") => (el ? parseFloat(getComputedStyle(el)[p]) || 0 : 0);

  const ref = secs[1];
  const padX = css(ref, "paddingLeft") || 16;
  const L = ref.offsetLeft + padX / 2;
  const R = ref.offsetLeft + ref.offsetWidth - padX / 2;
  const mid = (L + R) / 2;

  const pts: Pt[] = [];
  const push = (x: number, y: number, k = y) => pts.push({ x, y, k });
  const pending: { idx: number; make: (at: number) => void }[] = [];
  const marks: Mark[] = [];
  const edges: Edge[] = [];
  const labels: Label[] = [];
  const later = (idx: number, make: (at: number) => void) => pending.push({ idx, make });

  let side = R;
  push(R, secs[0].offsetHeight * 0.5);
  later(0, (at) => marks.push({ x: R, y: pts[0].y, at, kind: "dot" }));

  for (let i = 1; i < secs.length; i++) {
    const prev = secs[i - 1];
    const next = secs[i];
    const yc = next.offsetTop;
    const gap = Math.min(css(prev, "paddingBottom") || css(prev.firstElementChild, "paddingBottom"), css(next, "paddingTop")) || 40;
    const H = gap * 0.75;
    const amp = gap * 0.7;
    const last = i === secs.length - 1;
    const x0 = side;
    const x1 = last ? mid : side === R ? L : R;
    const motif = last ? "plain" : (CROSSINGS[i - 1]?.motif ?? "plain");
    const span = Math.abs(x1 - x0);
    const S = Math.min(1, span / 560);
    const showLabel = gap >= 64;

    push(x0, yc - H);
    const from = pts.length;
    const shape = motif === "alert" || motif === "curve" ? SHAPES[motif] : null;
    const half = shape ? (shape.width * S) / 2 : 0;
    const n = Math.max(32, Math.ceil(span / 2));
    for (let j = 1; j <= n; j++) {
      const t = j / n;
      const x = x0 + (x1 - x0) * smooth(t);
      const yb = yc - H + 2 * H * t;
      push(x, yb + (shape ? knots((x - mid) / half, shape.us, shape.vs) * amp : 0), yb);
    }
    const nearest = (x: number) => {
      let best = from;
      for (let j = from; j < pts.length; j++) if (Math.abs(pts[j].x - x) < Math.abs(pts[best].x - x)) best = j;
      return best;
    };
    const title = CROSSINGS[i - 1]?.slug ? getProject(CROSSINGS[i - 1].slug!)?.title : undefined;

    if (motif === "alert") {
      const peak = nearest(mid + 0.1 * half);
      later(peak, (at) => marks.push({ x: pts[peak].x, y: pts[peak].y, at, kind: "ring" }));
      if (title && showLabel) later(peak, (at) => labels.push({ x: mid + half + 14, y: yc - 14, at, text: title }));
    } else if (motif === "curve") {
      for (const u of [-0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75]) {
        const idx = nearest(mid + u * half);
        later(idx, (at) => marks.push({ x: pts[idx].x, y: pts[idx].y, at, kind: "dot" }));
      }
      const first = nearest(mid - half);
      if (title && showLabel) later(first, (at) => labels.push({ x: mid - half, y: yc + amp * 0.45 + 12, at, text: title }));
    } else if (motif === "graph") {
      const gHalf = 120 * S;
      const nodes = [-0.85, -0.3, 0.3, 0.85].map((u) => nearest(mid + u * gHalf));
      for (const idx of nodes) later(idx, (at) => marks.push({ x: pts[idx].x, y: pts[idx].y, at, kind: "dot" }));
      const [, b, c] = nodes;
      later(c, (at) => {
        const A = { x: pts[b].x + 34 * S, y: pts[b].y - amp * 0.8 };
        const B = { x: pts[c].x + 30 * S, y: pts[c].y + amp * 0.7 };
        edges.push({ x1: pts[b].x, y1: pts[b].y, x2: A.x, y2: A.y, at });
        edges.push({ x1: A.x, y1: A.y, x2: pts[c].x, y2: pts[c].y, at });
        edges.push({ x1: pts[c].x, y1: pts[c].y, x2: B.x, y2: B.y, at });
        marks.push({ ...A, at, kind: "dot" }, { ...B, at, kind: "dot" });
        if (title && showLabel) labels.push({ x: A.x + 12, y: A.y + 4, at, text: title });
      });
    }
    side = x1;
  }
  const end = pts.length - 1;
  later(end, (at) => marks.push({ x: pts[end].x, y: pts[end].y, at, kind: "end" }));

  const cum = [0];
  for (let j = 1; j < pts.length; j++) cum.push(cum[j - 1] + Math.hypot(pts[j].x - pts[j - 1].x, pts[j].y - pts[j - 1].y));
  for (const p of pending) p.make(cum[p.idx]);

  const d = pts.map((p, j) => `${j ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join("");
  return { w: main.clientWidth, h: main.offsetHeight, d, total: cum[cum.length - 1], pts, cum, marks, edges, labels };
}

/** Where the tip is when the reading line is at `k` (main coordinates). */
export function tipAt(g: Geo, k: number) {
  const { pts, cum } = g;
  const n = pts.length - 1;
  if (k <= pts[0].k) return { len: 0, x: pts[0].x, y: pts[0].y };
  if (k >= pts[n].k) return { len: g.total, x: pts[n].x, y: pts[n].y };
  let lo = 0;
  let hi = n;
  while (hi - lo > 1) {
    const m = (lo + hi) >> 1;
    if (pts[m].k <= k) lo = m;
    else hi = m;
  }
  const a = pts[lo];
  const b = pts[hi];
  const f = b.k === a.k ? 1 : (k - a.k) / (b.k - a.k);
  return { len: cum[lo] + f * (cum[hi] - cum[lo]), x: a.x + f * (b.x - a.x), y: a.y + f * (b.y - a.y) };
}

/** Scrambles a text node into its own text, left to right. Returns a cancel that restores it. */
function decode(node: Text, ms: number) {
  const final = node.nodeValue ?? "";
  const start = performance.now();
  let raf = 0;
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / ms);
    const fixed = Math.floor(p * final.length);
    let out = final.slice(0, fixed);
    for (let i = fixed; i < final.length; i++) out += /\s/.test(final[i]) ? final[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    node.nodeValue = out;
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(raf);
    node.nodeValue = final;
  };
}

/** Decodes every text node under `el`; used by the hero for the owner's name. */
export function decodeText(el: Element, ms = 900) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const stops: (() => void)[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) if (n.nodeValue?.trim()) stops.push(decode(n as Text, ms));
  return () => stops.forEach((s) => s());
}

export function SignalThread() {
  const svg = useRef<SVGSVGElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  // Measure, and measure again whenever the page's height changes (fonts, images, the projects filter).
  useEffect(() => {
    const main = svg.current?.parentElement;
    if (!main) return;
    let t = 0;
    const measure = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => setGeo(buildGeo(main)), 120);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(main);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const el = svg.current;
    const main = el?.parentElement;
    if (!el || !main || !geo) return;
    const path = el.querySelector<SVGPathElement>("[data-thread]");
    const head = el.querySelector<SVGGElement>("[data-head]");
    const items = Array.from(el.querySelectorAll<SVGElement>("[data-at]")).map((node) => ({ node, at: Number(node.dataset.at), on: false }));
    const still = prefersReducedMotion();

    if (still || !path || !head) {
      if (path) path.style.strokeDashoffset = "0";
      items.forEach((i) => i.node.setAttribute("data-on", ""));
      return;
    }

    // Section titles: the gradient word of each h2 decodes as it arrives.
    const titles = Array.from(main.querySelectorAll<HTMLElement>(":scope > section h2 .grad-text"))
      .filter((t) => t.childNodes.length === 1 && t.firstChild?.nodeType === Node.TEXT_NODE)
      .map((t) => ({ t, done: false }));
    const stops: (() => void)[] = [];

    const update = () => {
      const top = main.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const tip = tipAt(geo, vh * TIP_LINE - top);
      path.style.strokeDashoffset = String(geo.total - tip.len);
      head.setAttribute("transform", `translate(${tip.x.toFixed(1)} ${tip.y.toFixed(1)})`);
      head.style.opacity = tip.len > 0 && tip.len < geo.total ? "1" : "0";
      for (const i of items) {
        const on = tip.len >= i.at;
        if (on !== i.on) {
          i.on = on;
          i.node.toggleAttribute("data-on", on);
        }
      }
      for (const h of titles) {
        if (h.done || h.t.getBoundingClientRect().top > vh * TITLE_LINE) continue;
        h.done = true;
        // Titles already above the fold on arrival keep their text as is.
        if (h.t.getBoundingClientRect().bottom > 0) stops.push(decode(h.t.firstChild as Text, 700));
      }
    };
    const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
    update();
    return () => {
      st.kill();
      stops.forEach((s) => s());
    };
  }, [geo]);

  const dot = "[transform-box:fill-box] origin-center scale-50 opacity-0 data-[on]:scale-100 data-[on]:opacity-100 motion-safe:transition-[opacity,transform] motion-safe:duration-500";

  return (
    <svg
      ref={svg}
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute left-0 top-0 -z-10 overflow-visible"
      width={geo?.w ?? 0}
      height={geo?.h ?? 0}
      viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
    >
      {geo ? (
        <>
          <path d={geo.d} fill="none" stroke="var(--border)" strokeWidth="1" />
          <path
            data-thread=""
            d={geo.d}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: geo.total, strokeDashoffset: geo.total }}
          />
          {geo.edges.map((e, i) => (
            <line
              key={`e${i}`}
              data-at={e.at}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              pathLength={1}
              stroke="var(--accent)"
              strokeWidth="1.25"
              className="[stroke-dasharray:1] [stroke-dashoffset:1] data-[on]:[stroke-dashoffset:0] motion-safe:transition-[stroke-dashoffset] motion-safe:duration-700"
            />
          ))}
          {geo.marks.map((m, i) => (
            <g key={`m${i}`} data-at={m.at} className={dot}>
              {m.kind !== "dot" ? (
                <circle cx={m.x} cy={m.y} r={m.kind === "end" ? 9 : 7} fill="var(--accent)" opacity="0.25" className="[transform-box:fill-box] origin-center motion-safe:animate-ping" />
              ) : null}
              <circle cx={m.x} cy={m.y} r={m.kind === "end" ? 6 : 4} fill="var(--background)" stroke="var(--accent)" strokeWidth="1.75" />
            </g>
          ))}
          {geo.labels.map((l, i) => (
            <text key={`l${i}`} data-at={l.at} x={l.x} y={l.y} fill="var(--muted-foreground)" fontSize="12" className="font-medium opacity-0 data-[on]:opacity-100 motion-safe:transition-opacity motion-safe:duration-500">
              {l.text}
            </text>
          ))}
          <g data-head="" style={{ opacity: 0 }}>
            <circle r="12" fill="var(--accent)" opacity="0.18" />
            <circle r="4.5" fill="var(--accent)" />
          </g>
        </>
      ) : null}
    </svg>
  );
}
