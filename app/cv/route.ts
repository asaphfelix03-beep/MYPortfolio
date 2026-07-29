import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const publicDir = path.join(process.cwd(), "public");
  const files = await readdir(publicDir);
  const cvFile = files.find((file) =>
    file.toLowerCase().includes("cv") &&
    file.toLowerCase().includes("ojewumi") &&
    file.toLowerCase().endsWith(".pdf")
  );

  if (!cvFile) {
    return new Response("CV introuvable", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const filePath = path.join(publicDir, cvFile);
  const file = await readFile(filePath);

  return new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="CV OJEWUMI ASAPH FELIX.pdf"',
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
