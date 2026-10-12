"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * The hero's network: the weave's points of light, wired into rings.
 *
 * Nodes snap to the same 22px lattice the CSS weave draws (its dots sit at
 * the box centre plus whole multiples of the pitch), so the network reads as
 * the cloth lighting up rather than a second texture laid on top. The rings
 * echo what the projects work on — identities tied together by what they
 * share, devices on a network — without pretending to be real data.
 *
 * One authored motion: every two to four seconds a shuttle in blue, violet
 * or cyan
 * runs along a ring and the points it crosses glow, then settle. A pointer
 * passing near a ring brightens it. Everything stops when the hero is off
 * screen or the tab is hidden, and nothing moves at all under
 * prefers-reduced-motion — the finished network is drawn once instead.
 *
 * Cost: one 2D canvas, ~150 shapes, and frames only while something is
 * actually changing.
 */

const PITCH = 22;
const INK = "15, 24, 54";
/** The shuttle takes the site's three signal colours in turn. */
const PULSES = ["41, 94, 227", "115, 59, 222", "0, 168, 196"];

type Node = {
  x: number;
  y: number;
  r: number;
  /** Resting opacity. */
  a: number;
  /** 0..1, set by the shuttle, decays back to 0. */
  glow: number;
  /** Intro delay, ms. */
  delay: number;
};

type Edge = { a: number; b: number; delay: number };

type Rect = { x0: number; y0: number; x1: number; y1: number };

type Graph = {
  nodes: Node[];
  edges: Edge[];
  rings: number[][];
  /** Adjacency, for the shuttle's walk. */
  next: Map<number, number[]>;
};

/** Small seeded generator: the same layout on every visit. */
function seeded(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph(W: number, H: number, avoid: Rect[]): Graph {
  const rand = seeded(2026_10_11);
  const wide = W >= 1024;
  const cx = W / 2;
  const cy = H / 2;

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const rings: number[][] = [];
  const at = new Map<string, number>();
  const edgeKeys = new Set<string>();

  const iMin = Math.ceil(-cx / PITCH) + 1;
  const iMax = Math.floor((W - cx) / PITCH) - 1;
  const jMin = Math.ceil(-cy / PITCH) + 1;
  const jMax = Math.floor((H - cy) / PITCH) - 1;

  /** Under the fixed header, the network would tangle with the links. */
  const headerClear = wide ? 104 : 84;

  /** True when a lattice point would sit on top of text or under the header. */
  const blocked = (i: number, j: number) => {
    const x = cx + i * PITCH;
    const y = cy + j * PITCH;
    if (y < headerClear) return true;
    return avoid.some((r) => x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1);
  };

  const add = (i: number, j: number, r: number, a: number, delay: number) => {
    const ci = Math.min(iMax, Math.max(iMin, i));
    const cj = Math.min(jMax, Math.max(jMin, j));
    const key = `${ci}:${cj}`;
    const found = at.get(key);
    if (found !== undefined) return found;
    nodes.push({ x: cx + ci * PITCH, y: cy + cj * PITCH, r, a, glow: 0, delay });
    at.set(key, nodes.length - 1);
    return nodes.length - 1;
  };

  const link = (a: number, b: number, delay: number) => {
    if (a === b) return;
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (edgeKeys.has(key)) return;
    edgeKeys.add(key);
    edges.push({ a, b, delay });
  };

  // Where the rings live, as fractions of the box. On a wide screen they
  // gather on the right, around the portrait, leaving the name its calm
  // ground. On a phone the name fills the width, so they keep to the
  // upper right, beside its short lines.
  const zone = wide
    ? { x0: 0.5, x1: 0.96, y0: 0.12, y1: 0.84 }
    : { x0: 0.5, x1: 0.94, y0: 0.06, y1: 0.4 };
  const toI = (fx: number) => Math.round((fx * W - cx) / PITCH);
  const toJ = (fy: number) => Math.round((fy * H - cy) / PITCH);

  const ringCount = wide ? 7 : 3;
  const centres: [number, number][] = [];

  for (let k = 0; k < ringCount; k++) {
    // Try a handful of centres and keep the one farthest from the rings
    // already placed — among those whose whole ring stays clear of the text.
    let best: { centre: [number, number]; points: [number, number][] } | null = null;
    let bestDist = -1;
    const count = 5 + Math.floor(rand() * 4);
    const radius = (wide ? 2.4 : 1.9) + rand() * 1.6;
    const angles = Array.from({ length: count }, (_, n) => (n / count) * Math.PI * 2 + rand() * 0.5);

    for (let attempt = 0; attempt < 16; attempt++) {
      const c: [number, number] = [
        toI(zone.x0 + rand() * (zone.x1 - zone.x0)),
        toJ(zone.y0 + rand() * (zone.y1 - zone.y0)),
      ];
      const points = angles.map(
        (angle) =>
          [
            c[0] + Math.round(Math.cos(angle) * radius),
            c[1] + Math.round(Math.sin(angle) * radius * 0.85),
          ] as [number, number],
      );
      if (blocked(c[0], c[1]) || points.some(([i, j]) => blocked(i, j))) continue;
      const d = centres.length
        ? Math.min(...centres.map(([i, j]) => Math.hypot(i - c[0], j - c[1])))
        : 99;
      if (d > bestDist) {
        bestDist = d;
        best = { centre: c, points };
      }
    }
    if (!best) continue;
    centres.push(best.centre);

    const [ci, cj] = best.centre;
    const base = k * 140;
    const ring: number[] = [];

    best.points.forEach(([i, j], n) => {
      const idx = add(i, j, 1.5 + rand() * 0.7, 0.5 + rand() * 0.3, base + n * 45);
      if (!ring.includes(idx)) ring.push(idx);
    });

    for (let n = 0; n < ring.length; n++) {
      link(ring[n], ring[(n + 1) % ring.length], base + n * 45);
    }
    // A chord or two: the shortcuts a real ring always has.
    if (ring.length > 4) {
      link(ring[0], ring[Math.floor(ring.length / 2)], base + 260);
    }
    // A shared point at the centre — the one phone every identity used.
    if (rand() > 0.35 && ring.length > 4) {
      const hub = add(ci, cj, 2.4, 0.8, base + 200);
      for (let s = 0; s < 3; s++) {
        link(hub, ring[Math.floor((s * ring.length) / 3)], base + 240 + s * 50);
      }
    }
    rings.push(ring);
  }

  // A few bridges between neighbouring rings.
  for (let k = 1; k < rings.length; k++) {
    if (rand() > 0.55) continue;
    const a = rings[k - 1];
    const b = rings[k];
    let pair: [number, number] = [a[0], b[0]];
    let d = Infinity;
    for (const x of a) {
      for (const y of b) {
        const dd = Math.hypot(nodes[x].x - nodes[y].x, nodes[x].y - nodes[y].y);
        if (dd < d) {
          d = dd;
          pair = [x, y];
        }
      }
    }
    if (d < PITCH * 9) link(pair[0], pair[1], 900 + k * 60);
  }

  // Loose points: lit crossings of the weave that belong to no ring.
  const loose = wide ? 64 : 18;
  const wider = wide
    ? { x0: 0.38, x1: 1, y0: 0, y1: 1 }
    : { x0: 0.3, x1: 1, y0: 0, y1: 0.5 };
  for (let n = 0; n < loose; n++) {
    const i = toI(wider.x0 + rand() * (wider.x1 - wider.x0));
    const j = toJ(wider.y0 + rand() * (wider.y1 - wider.y0));
    const r = 0.16 + rand() * 0.2;
    const d = 300 + rand() * 900;
    if (!blocked(i, j)) add(i, j, 1.1, r, d);
  }

  const next = new Map<number, number[]>();
  for (const e of edges) {
    next.set(e.a, [...(next.get(e.a) ?? []), e.b]);
    next.set(e.b, [...(next.get(e.b) ?? []), e.a]);
  }

  return { nodes, edges, rings, next };
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function NetworkField({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let W = 0;
    let H = 0;
    let graph: Graph = { nodes: [], edges: [], rings: [], next: new Map() };
    let raf = 0;
    let pulseTimer = 0;
    let visible = true;
    let introStart = Infinity;
    const INTRO = 1900;
    let last = performance.now();
    let fade = 1; // narrower screens get a quieter network

    let pulse: { path: number[]; start: number; step: number; color: string } | null = null;
    let pulseCount = 0;
    let glowColor = PULSES[0];
    const pointer = { x: -1e4, y: -1e4, target: 0, k: 0 };

    // Text the network must leave clear, measured as the tight box of its
    // glyphs (a Range), not of its block: the name's lines are short, and
    // the space beside them is where the rings belong on a phone.
    const measureAvoid = (rect: DOMRect): Rect[] => {
      const host = canvas.parentElement;
      if (!host) return [];
      const pad = 20;
      return Array.from(host.querySelectorAll<HTMLElement>("[data-network-avoid]")).map((el) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const b = range.getBoundingClientRect();
        return {
          x0: b.left - rect.left - pad,
          y0: b.top - rect.top - pad,
          x1: b.right - rect.left + pad,
          y1: b.bottom - rect.top + pad,
        };
      });
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      if (!W || !H) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fade = W >= 1024 ? 1 : 0.75;
      graph = buildGraph(W, H, measureAvoid(rect));
      pulse = null;
    };

    const proximity = (n: Node) => {
      if (pointer.k < 0.01) return 0;
      const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
      const R = 170;
      return d >= R ? 0 : Math.pow(1 - d / R, 2) * pointer.k;
    };

    const draw = (now: number) => {
      const t = reduce ? Infinity : now - introStart;
      const { nodes, edges } = graph;
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;

      for (const e of edges) {
        const p = easeOut(clamp01((t - e.delay) / 650));
        if (p <= 0) continue;
        const A = nodes[e.a];
        const B = nodes[e.b];
        const lift = Math.max(proximity(A), proximity(B));
        const glow = Math.max(A.glow, B.glow);
        ctx.strokeStyle = glow > 0.05
          ? `rgba(${glowColor}, ${(0.18 + glow * 0.3) * fade})`
          : `rgba(${INK}, ${(0.13 + lift * 0.3) * fade})`;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(A.x + (B.x - A.x) * p, A.y + (B.y - A.y) * p);
        ctx.stroke();
      }

      // The shuttle: an amber thread drawn along the walked edges, its
      // head at the current position, its tail fading.
      if (pulse) {
        const pos = (now - pulse.start) / pulse.step;
        ctx.lineWidth = 2;
        for (let s = 0; s < pulse.path.length - 1; s++) {
          if (pos <= s) break;
          // How much of this edge is drawn, and how long ago the head left it.
          const f = Math.min(1, pos - s);
          const age = Math.max(0, pos - (s + 1));
          const alpha = 0.85 - age * 0.34;
          if (alpha <= 0) continue;
          const A = nodes[pulse.path[s]];
          const B = nodes[pulse.path[s + 1]];
          ctx.strokeStyle = `rgba(${pulse.color}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(A.x, A.y);
          ctx.lineTo(A.x + (B.x - A.x) * f, A.y + (B.y - A.y) * f);
          ctx.stroke();
        }
        ctx.lineWidth = 1;
      }

      for (const n of nodes) {
        const p = clamp01((t - n.delay) / 700);
        if (p <= 0) continue;
        const lift = proximity(n);
        ctx.fillStyle = `rgba(${INK}, ${Math.min(1, n.a * 0.75 * (1 + lift * 1.3)) * p * fade})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + lift * 0.8, 0, Math.PI * 2);
        ctx.fill();

        if (n.glow > 0.01) {
          ctx.fillStyle = `rgba(${glowColor}, ${n.glow * 0.2})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 9 * n.glow, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${glowColor}, ${n.glow})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const update = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      for (const n of graph.nodes) {
        if (n.glow > 0) n.glow = Math.max(0, n.glow - dt / 1500);
      }

      pointer.k += (pointer.target - pointer.k) * Math.min(1, dt / 120);
      if (pointer.target === 0 && pointer.k < 0.01) pointer.k = 0;

      if (pulse) {
        // A frame's timestamp can precede the moment the pulse was started,
        // so the position is clamped at the start of the path.
        const pos = Math.max(0, (now - pulse.start) / pulse.step);
        // The point under the shuttle's head is lit; it fades once passed.
        const node = graph.nodes[pulse.path[Math.floor(pos)]];
        if (node && pos < pulse.path.length) node.glow = 1;
        if (pos >= pulse.path.length + 2) pulse = null;
      }
    };

    const busy = (now: number) =>
      (introStart !== Infinity && now - introStart < INTRO) ||
      pulse !== null ||
      pointer.k > 0 ||
      graph.nodes.some((n) => n.glow > 0);

    const frame = (now: number) => {
      raf = 0;
      update(now);
      draw(now);
      if (visible && !document.hidden && busy(now)) {
        raf = requestAnimationFrame(frame);
      }
    };

    const kick = () => {
      if (reduce || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const startPulse = () => {
      const rings = graph.rings.filter((r) => r.length >= 4);
      if (!rings.length) return;
      const ring = rings[Math.floor(Math.random() * rings.length)];
      let at = ring[Math.floor(Math.random() * ring.length)];
      const path = [at];
      const length = 4 + Math.floor(Math.random() * 4);
      for (let s = 0; s < length; s++) {
        const options = (graph.next.get(at) ?? []).filter(
          (n) => n !== path[path.length - 2],
        );
        if (!options.length) break;
        at = options[Math.floor(Math.random() * options.length)];
        path.push(at);
      }
      if (path.length < 3) return;
      glowColor = PULSES[pulseCount++ % PULSES.length];
      pulse = { path, start: performance.now(), step: 260, color: glowColor };
    };

    const schedulePulse = (delay: number) => {
      window.clearTimeout(pulseTimer);
      pulseTimer = window.setTimeout(() => {
        if (visible && !document.hidden && !pulse) {
          startPulse();
          kick();
        }
        schedulePulse(2200 + Math.random() * 1800);
      }, delay);
    };

    // The network waits for the name to land: its rings are laid out
    // around the text, so the text has to be in place before it is
    // measured. Under reduced motion nothing is moving, so it starts now.
    const startTimer = window.setTimeout(
      () => {
        build();
        introStart = performance.now();
        if (reduce) {
          draw(performance.now());
        } else {
          kick();
          schedulePulse(INTRO + 300);
        }
      },
      reduce ? 0 : 700,
    );

    let resizeRaf = 0;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        if (introStart === Infinity) return; // not started yet
        const { width, height } = canvas.getBoundingClientRect();
        if (Math.abs(width - W) < 1 && Math.abs(height - H) < 1) return;
        build();
        // A resize redraws the finished network; it never replays the intro.
        introStart = -1e6;
        if (reduce) draw(performance.now());
        else {
          draw(performance.now());
          kick();
        }
      });
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    intersection.observe(canvas);

    const onVisibility = () => {
      if (!document.hidden) kick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      pointer.x = x;
      pointer.y = y;
      pointer.target = inside ? 1 : 0;
      if (inside || pointer.k > 0) kick();
    };
    if (finePointer && !reduce) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    return () => {
      window.clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      window.clearTimeout(pulseTimer);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} style={style} />;
}
