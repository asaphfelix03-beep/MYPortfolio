import { statSync } from "node:fs";
import path from "node:path";
import { cv, type CvInfo } from "@/lib/site";

/**
 * Server-only: resolves the CV on disk. Imported by the /cv route and by
 * server components; a client component importing it fails the build,
 * which is the point — the browser has no filesystem.
 */

export function cvFilePath() {
  return path.join(process.cwd(), "public", cv.file);
}

/**
 * Throws with the exact path to fill when the PDF is missing, so the build
 * fails loudly instead of shipping a CV button that answers 404.
 */
export function getCvInfo(): CvInfo {
  const file = cvFilePath();
  let bytes: number;
  try {
    bytes = statSync(file).size;
  } catch {
    throw new Error(
      `CV introuvable. Déposez le PDF du CV à cet emplacement exact : public/${cv.file}`,
    );
  }

  return {
    href: cv.href,
    viewHref: cv.viewHref,
    downloadName: cv.downloadName,
    label: cv.label,
    size: formatSize(bytes),
  };
}

/** 383 542 → "375 Ko", 2 400 000 → "2,3 Mo" (French units, base 1024). */
export function formatSize(bytes: number) {
  const ko = bytes / 1024;
  if (ko < 1000) return `${Math.max(1, Math.round(ko))} Ko`;
  const mo = ko / 1024;
  return `${mo.toLocaleString("fr-FR", { maximumFractionDigits: mo < 10 ? 1 : 0 })} Mo`;
}
