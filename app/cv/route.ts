import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "CV OJEWUMI ASAPH _FELIX 1.pdf");
  const file = await readFile(filePath);

  return new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="CV-Asaph-Felix.pdf"',
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
