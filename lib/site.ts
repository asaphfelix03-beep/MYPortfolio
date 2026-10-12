/**
 * The facts the whole site repeats — name, school, availability, contact
 * details, profiles and the CV — kept in one place so the hero, the
 * navigation, the contact band, the footer and the metadata can never drift
 * apart.
 */

export const site = {
  url: "https://portfolio-ojewumi.tech",
  name: "Ojewumi Asaph Felix",
  shortName: "Asaph Felix",
  domain: "Cybersécurité et intelligence artificielle",
  school: {
    name: "École Supérieure Africaine des TICs",
    short: "ESATIC",
    city: "Abidjan",
  },
  level: "Licence 3",
  location: "Treichville, Abidjan · Côte d'Ivoire",
  city: "Abidjan",
  country: "Côte d'Ivoire",
  /** What the user is looking for, as stated on the site since September 2026. */
  availability: {
    sentence:
      "Je cherche un stage de trois mois à partir de fin février 2027, en analyse de données ou en cybersécurité.",
    short: "Stage de 3 mois dès fin février 2027",
    /** Follows the word "Disponible" in the hero's bottom line. */
    after: "pour un stage de 3 mois dès fin février 2027",
  },
  email: "asaphfelix02@gmail.com",
  phone: { display: "+225 01 53 06 91 11", href: "tel:+2250153069111" },
  links: {
    github: "https://github.com/asaphfelix03-beep",
    linkedin: "https://www.linkedin.com/in/asaph-felix-ojewumi-469054324/",
    /** The repository that actually builds this site. */
    source: "https://github.com/asaphfelix03-beep/MYPortfolio",
  },
} as const;

/**
 * The downloadable CV.
 *
 * To publish a new version, replace the file at
 *   public/documents/cv-ojewumi-asaph-felix.pdf
 * keeping that exact name. Every button on the site points to `/cv`, which
 * serves that file with the download name below; nothing else needs to
 * change. The build stops with an explicit message if the file is missing,
 * so a broken CV link can never be deployed.
 */
export const cv = {
  /** Path inside public/. */
  file: "documents/cv-ojewumi-asaph-felix.pdf",
  /** Stable public URL: downloads the file. */
  href: "/cv",
  /** Same file opened in the browser's PDF viewer instead of downloaded. */
  viewHref: "/documents/cv-ojewumi-asaph-felix.pdf",
  /** Name the visitor's browser saves the file under. */
  downloadName: "CV-Ojewumi-Asaph-Felix.pdf",
  label: "Télécharger mon CV (PDF)",
} as const;

/** Size and date of the CV file, read at build time on the server. */
export type CvInfo = {
  href: string;
  viewHref: string;
  downloadName: string;
  label: string;
  /** e.g. "375 Ko" */
  size: string;
};

/** The home page's sections, in reading order. */
export const sections = [
  { id: "projets", label: "Projets" },
  { id: "competences", label: "Compétences" },
  { id: "parcours", label: "Parcours" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
