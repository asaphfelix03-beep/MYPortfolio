"use client";

import { useState } from "react";
import { MonitorPlay } from "lucide-react";

/**
 * A live page from another site, loaded only when asked for.
 *
 * The home page used to embed the electrification dashboard straight away:
 * every visitor paid for a second website's scripts and data, phone or not,
 * whether they scrolled to it or not. Here the screenshot does the job until
 * the reader chooses the live version.
 */
export function EmbedOnDemand({ src, title }: { src: string; title: string }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="btn btn-outline mt-6">
        <MonitorPlay size={17} aria-hidden />
        Afficher le tableau de bord interactif ici
        <span className="font-normal text-muted-foreground">(site externe)</span>
      </button>
    );
  }

  return (
    <div className="mt-6 border border-border">
      <iframe src={src} title={title} loading="lazy" className="project-visualization block" />
    </div>
  );
}
