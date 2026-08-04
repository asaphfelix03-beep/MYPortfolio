"use client";

import { useEffect, useState } from "react";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

/**
 * Types each role out, holds it, deletes it, then moves to the next one.
 * With reduced motion the first role is simply rendered as static text.
 */
export function RoleRotator({
  roles,
  className,
  typeSpeed = 65,
  deleteSpeed = 35,
  hold = 1800,
}: {
  roles: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  hold?: number;
}) {
  const reduce = useSafeReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const current = roles[index % roles.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), hold);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
      return;
    }

    const t = setTimeout(
      () =>
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        ),
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, roles, reduce, typeSpeed, deleteSpeed, hold]);

  if (reduce) {
    return <span className={className}>{roles[0]}</span>;
  }

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-primary animate-caret" />
    </span>
  );
}
