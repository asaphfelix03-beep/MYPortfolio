import { readFile } from "node:fs/promises";
import { cv } from "@/lib/site";
import { cvFilePath, getCvInfo } from "@/lib/cv-file";

/**
 * /cv — the one URL every CV button on the site points to.
 *
 * It serves the file named in `cv.file` (lib/site.ts), not "whatever PDF in
 * public/ looks like a CV": the previous route matched file names on a
 * pattern, so a second matching PDF would have made the download a coin
 * toss. The route is rendered at build time, so the PDF is served from the
 * CDN like any static file, and a missing file stops the build.
 */
export const dynamic = "force-static";

export async function GET() {
  getCvInfo(); // explicit error message if the file is missing
  const file = await readFile(cvFilePath());

  return new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
      // ASCII name for every browser, plus the RFC 5987 form for the ones
      // that read it.
      "Content-Disposition": `attachment; filename="${cv.downloadName}"; filename*=UTF-8''${encodeURIComponent(cv.downloadName)}`,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
