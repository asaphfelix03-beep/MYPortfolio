/**
 * Asaph Felix monogram — a geometric "A" built from two chevrons with a
 * deliberate gap at the apex, plus an accent crossbar.
 *
 * Drawn on a 100×100 grid with round joins so it stays legible from 16px
 * (browser tab) up to the 180px touch icon. Colours default to
 * `currentColor` for the strokes and the brand green for the crossbar, so
 * the same file serves the nav, the favicon and the touch icon.
 */
export function LogoMark({
  className,
  stroke = "currentColor",
  accent = "#1F7A54",
  title,
}: {
  className?: string;
  stroke?: string;
  accent?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      {/* left chevron */}
      <path
        d="M20 82 L44 26"
        stroke={stroke}
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* right chevron — the gap between the two is the signature */}
      <path
        d="M56 26 L80 82"
        stroke={stroke}
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* accent crossbar */}
      <path
        d="M35 62 L65 62"
        stroke={accent}
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}
