/**
 * Long-form project pages served at /projets/<slug>.
 *
 * The projects section on the home page only has room for a headline and one
 * preview. A spreadsheet project does not survive that treatment: the work is
 * spread across the sheets — the raw series, the controls, the pivot, the
 * dashboard — and none of them means much on its own. So each case study here
 * carries the whole workbook, rebuilt sheet by sheet from its real values,
 * plus the context and the findings that a recruiter actually reads.
 */

export type WorkbookSheet = {
  /** Stable id, also used as the tab's key. */
  id: string;
  /** Tab label — the real sheet name from the workbook. */
  name: string;
  /** Heading shown under the frame. */
  title: string;
  /** What this sheet shows, and why it is in the workbook. */
  caption: string;
  /**
   * What the tab renders. Sheets are rebuilt from the workbook's extracted
   * values rather than shown as screenshots: the reader gets the real cells,
   * nothing can be edited, and no image can drift out of sync with the data.
   */
  content:
    | { kind: "dashboard" }
    | { kind: "charts" }
    /** `grid` is the sheet's name in `sheetGrids` (lib/uemoa-sheets.ts). */
    | { kind: "grid"; grid: string };
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  type: string;
  year: string;
  status?: string;
  /** Opening paragraph, directly under the title. */
  summary: string;
  /** Where the question came from, before any spreadsheet was opened. */
  context: string;
  /** Dataset facts: source, période, périmètre, volume. */
  dataset: { label: string; value: string }[];
  /** How the workbook was built, step by step. */
  method: string[];
  /** What the analysis actually established. */
  findings: { title: string; body: string }[];
  technologies: string[];
  /** File name shown in the viewer's title bar. */
  workbookName: string;
  sheets: WorkbookSheet[];
  /** Downloadable workbook, e.g. /files/analyse.xlsx */
  download?: string;
  repo?: string;
  link?: string;
  linkLabel?: string;
};

/**
 * Figures below are read from PROJET UEMOA.xlsx, sheets « Analyse » and
 * « Tableau de bord ». They are the workbook's own computed values — if the
 * workbook is recalculated on new BCEAO data, they have to be refreshed here.
 */
const uemoa: CaseStudy = {
  slug: "monnaie-electronique-uemoa",
  title: "Monnaie électronique dans l'UEMOA",
  tagline: "Les comptes se multiplient deux fois plus vite qu'ils ne servent",
  type: "Analyse de données",
  year: "2026",
  summary:
    "Entre 2020 et 2024, les comptes de monnaie électronique ouverts dans l'UEMOA passent de 94 à 249 millions. Cette analyse confronte cette croissance à celle des comptes réellement actifs, et situe la Côte d'Ivoire parmi les huit pays de la zone. Les deux séries ne progressent pas au même rythme, et l'écart se creuse chaque année.",
  context:
    "L'ouverture de comptes est le chiffre que l'on cite pour mesurer l'inclusion financière. Mais un compte ouvert n'est pas un compte utilisé. La question posée au classeur était simple : la croissance des comptes s'accompagne-t-elle d'une croissance équivalente de l'usage ? Et où se situe la Côte d'Ivoire, premier marché de la zone, dans cette comparaison ?",
  dataset: [
    { label: "Source", value: "BCEAO — monnaie électronique" },
    { label: "Période", value: "2020 – 2024 (5 années)" },
    { label: "Périmètre", value: "8 pays de l'UEMOA" },
    { label: "Volume", value: "Zone : 5 × 16 · Pays : 8 × 17 indicateurs" },
  ],
  method: [
    "Import des deux tables sources via Power Query — les requêtes « bceao_uemoa_2020_2024 » pour la série annuelle de la zone et « bceao_pays_2024 » pour la coupe par pays.",
    "Correction du format : les colonnes de taux fournies sont stockées en texte avec un point décimal, que la locale fr-FR ne convertit pas. Reprises via SUBSTITUTE dans des colonnes de contrôle.",
    "Recalcul de tous les taux d'activité depuis les effectifs bruts, sans jamais reprendre la colonne fournie — puis comparaison des deux pour vérifier la cohérence de la source.",
    "Six contrôles automatiques : divergence des taux recalculés, réconciliation de la somme des 8 pays avec le total de la zone, détection des pays hors de l'intervalle moyenne ± 2 écarts-types, et repérage des séries en recul.",
    "Calcul des indicateurs : TCAC géométrique, indices base 100 pour comparer deux séries d'échelles différentes, z-scores, quartiles, et effet de structure de la zone avec et sans la Côte d'Ivoire.",
    "Restitution : un tableau croisé dynamique, six graphiques et un tableau de bord d'une page qui répond à la question de recherche en un paragraphe.",
  ],
  findings: [
    {
      title: "11,70 points d'écart, chaque année",
      body: "Les comptes ouverts croissent de 27,46 % par an, les comptes actifs de 15,76 % seulement. Le taux d'activité de la zone tombe de 45,43 % en 2020 à 30,90 % en 2024, soit 14,52 points perdus — dont 8,63 sur la seule année 2023.",
    },
    {
      title: "36 millions de comptes non activés",
      body: "Maintenir le taux d'activité de 2020 aurait demandé 113 millions de comptes actifs en 2024. On en observe 76,9 millions. L'écart absolu entre comptes ouverts et comptes actifs a été multiplié par 3,34 en cinq ans.",
    },
    {
      title: "La Côte d'Ivoire pèse sur la moyenne",
      body: "Elle concentre 40,1 % des comptes ouverts de la zone mais seulement 34,3 % des comptes actifs, avec un taux d'activité de 26,46 % — 2e plus faible sur 8. Hors Côte d'Ivoire, le taux de la zone remonterait de 30,90 % à 33,87 %.",
    },
  ],
  technologies: [
    "Excel",
    "Power Query",
    "Tableau croisé dynamique",
    "INDEX / MATCH",
    "Statistiques descriptives",
    "Graphiques dynamiques",
  ],
  workbookName: "PROJET UEMOA.xlsx",
  /**
   * Sheets in workbook order, except that the dashboard leads: it is the
   * sheet that answers the question, and the one worth seeing first.
   */
  sheets: [
    {
      id: "tableau-de-bord",
      name: "Tableau de bord",
      title: "La synthèse en une page",
      caption:
        "Huit indicateurs clés, la réponse écrite à la question de recherche, le classement des huit pays par taux d'activité, et deux graphiques : la divergence des rythmes en indices base 100 et la chute du taux d'activité de la zone.",
      content: { kind: "dashboard" },
    },
    {
      id: "analyse",
      name: "Analyse",
      title: "Sept blocs de calcul, entièrement formulés",
      caption:
        "Rythme de croissance comparé, décomposition de la baisse du taux, dispersion entre pays, position de la Côte d'Ivoire, effet de structure, contrôles qualité, et un bloc de définitions. Aucune valeur n'est saisie en dur : chaque cellule remonte aux feuilles sources par INDEX/MATCH.",
      content: { kind: "grid", grid: "Analyse" },
    },
    {
      id: "uemoa",
      name: "UEMOA",
      title: "La série annuelle de la zone",
      caption:
        "Cinq années, seize indicateurs : comptes, points de services, volumes et valeurs de transactions, P2P, paiements, flux intra-UEMOA. Les colonnes de droite portent les taux recalculés et le verdict de chaque contrôle de cohérence.",
      content: { kind: "grid", grid: "UEMOA" },
    },
    {
      id: "pays",
      name: "PAYS",
      title: "La coupe par pays, 2024",
      caption:
        "Les huit pays membres et dix-sept indicateurs chacun, enrichis des mesures de position : rang, écart à la moyenne simple et pondérée, écart à la médiane, z-score et poids dans les totaux de la zone.",
      content: { kind: "grid", grid: "PAYS" },
    },
    {
      id: "tcd",
      name: "TCD_Pays",
      title: "Le tableau croisé dynamique",
      caption:
        "Comptes ouverts et comptes actifs agrégés par pays. Il sert aussi de contrôle : son total général doit retomber exactement sur les totaux de la feuille UEMOA, ce que vérifie le bloc qualité.",
      content: { kind: "grid", grid: "TCD_Pays" },
    },
    {
      id: "graphiques",
      name: "Graphiques",
      title: "Les visualisations de travail",
      caption:
        "Comptes ouverts contre comptes actifs en barres, l'évolution du taux d'activité, le classement par pays avec la Côte d'Ivoire mise en évidence, et la divergence des rythmes en indices base 100.",
      content: { kind: "charts" },
    },
  ],
  // Le depot de l'analyse : donnees sources en CSV, calculs, controles
  // qualite et script d'extraction. Le classeur .xlsx n'y est pas publie.
  repo: "https://github.com/asaphfelix03-beep/analyse-data-BCEAO",
  link: "https://github.com/asaphfelix03-beep/analyse-data-BCEAO#readme",
  linkLabel: "Lire l'analyse complete",
};

export const caseStudies: CaseStudy[] = [uemoa];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
