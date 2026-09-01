import type { SheetGrid } from "@/lib/uemoa-sheets";

/** 0 → A, 25 → Z, 26 → AA … the workbook's own column headers. */
function columnLetter(index: number) {
  let n = index;
  let out = "";
  while (n >= 0) {
    out = String.fromCharCode(65 + (n % 26)) + out;
    n = Math.floor(n / 26) - 1;
  }
  return out;
}

/**
 * One sheet, rendered as the read-only grid it is. Row numbers and column
 * letters are kept because they are how a reader checks a spreadsheet: they
 * make it possible to point at a cell rather than describe it.
 */
export default function SheetGridView({ sheet }: { sheet: SheetGrid }) {
  const letters = Array.from({ length: sheet.cols }, (_, i) => columnLetter(i));

  return (
    <div className="max-h-[540px] overflow-auto">
      <table className="w-max border-collapse text-[12px]">
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky left-0 top-0 z-20 w-10 border-b border-r border-border bg-secondary px-2 py-1.5 text-[10px] font-medium text-muted-foreground"
            >
              <span className="sr-only">Ligne</span>
            </th>
            {letters.map((l) => (
              <th
                key={l}
                scope="col"
                className="sticky top-0 z-10 min-w-[92px] border-b border-r border-border bg-secondary px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground"
              >
                {l}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sheet.rows.map((row, r) => (
            <tr key={r} className="even:bg-background/25">
              <th
                scope="row"
                className="sticky left-0 z-10 border-b border-r border-border bg-secondary px-2 py-1.5 text-right text-[10px] font-medium text-muted-foreground"
              >
                {r + 1}
              </th>
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`border-b border-r border-border px-2.5 py-1.5 align-top ${
                    cell.n
                      ? "whitespace-nowrap text-right tabular-nums text-foreground"
                      : // Le bloc de définitions tient des phrases entières dans
                        // une seule cellule : sans plafond de largeur, sa colonne
                        // s'étire et repousse les chiffres hors de l'écran.
                        "max-w-[420px] text-muted-foreground"
                  } ${cell.b ? "font-semibold text-foreground" : ""}`}
                >
                  {cell.v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
