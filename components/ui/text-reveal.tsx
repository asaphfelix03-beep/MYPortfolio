"use client";

import { motion, type Variants } from "framer-motion";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

/** One run of a heading, optionally set in the italic display face. */
export type RevealPart = { text: string; italic?: boolean };

type Token = { word: string; italic: boolean; space: boolean };

/**
 * Splits the parts into words while remembering, for each one, whether a space
 * actually preceded it in the source text.
 *
 * Without that flag the trailing "." of a heading like "…vos projets." would be
 * treated as its own word and rendered as " ." — every mixed-face heading on
 * the site ends that way, so the flag is what makes the effect usable at all.
 */
function tokenize(parts: RevealPart[]): Token[] {
  const tokens: Token[] = [];
  let previousCharWasSpace = true;

  for (const part of parts) {
    const chunks = part.text.split(/(\s+)/);
    for (const chunk of chunks) {
      if (chunk === "") continue;
      if (/^\s+$/.test(chunk)) {
        previousCharWasSpace = true;
        continue;
      }
      tokens.push({
        word: chunk,
        italic: Boolean(part.italic),
        space: previousCharWasSpace && tokens.length > 0,
      });
      previousCharWasSpace = false;
    }
  }
  return tokens;
}

/**
 * Same reveal as {@link WordReveal}, for headings that mix the roman and the
 * italic display face — which every section title on this site does.
 */
export function WordRevealRich({
  parts,
  className,
  italicClassName = "display italic font-normal",
  delay = 0,
  stagger = 0.055,
  as: Tag = "span",
}: {
  parts: RevealPart[];
  className?: string;
  italicClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3";
}) {
  const reduce = useSafeReducedMotion();
  const tokens = tokenize(parts);

  const plain = (
    <>
      {parts.map((p, i) =>
        p.italic ? (
          <span key={i} className={italicClassName}>
            {p.text}
          </span>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  );

  if (reduce) return <Tag className={className}>{plain}</Tag>;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {tokens.map((t, i) => (
        <span key={`${t.word}-${i}`}>
          {t.space ? " " : null}
          {/* The clip lives on the wrapper so the word can slide out of it.
              pb/-mb give descenders room: without it, the "j" of "projets"
              is shaved off by the overflow clip. */}
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              variants={word}
              className={`inline-block ${t.italic ? italicClassName : ""}`}
            >
              {t.word}
            </motion.span>
          </span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Reveals a heading word by word, each word rising out of its own clipped row.
 * Words stay whole so text still wraps and reads normally.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3";
}) {
  const reduce = useSafeReducedMotion();
  const words = text.split(" ");

  if (reduce) return <Tag className={className}>{text}</Tag>;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { y: "110%" },
    show: {
      y: "0%",
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </motion.span>
  );
}
