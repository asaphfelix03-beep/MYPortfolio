const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#%&<>/";

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
