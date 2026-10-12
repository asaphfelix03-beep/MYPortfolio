/**
 * Education, certifications, languages and participations — the facts of
 * the "Parcours" band, unchanged from the previous site.
 */

export type Certification = {
  title: string;
  issuer: string;
  /** Kind of credential, when the issuer names it. */
  kind?: string;
  date: string;
  file: string;
  /** Issuer-hosted verification page, when the credential offers one. */
  verify?: string;
};

export const certifications: Certification[] = [
  {
    title: "Associate Data Analyst",
    issuer: "DataCamp",
    kind: "Certification",
    date: "Août 2026",
    file: "/certificates/datacamp-associate-data-analyst.pdf",
  },
  {
    title: "Data Analysis with SQL, Excel & Power BI",
    issuer: "Microsoft · Coursera",
    kind: "Spécialisation",
    date: "Août 2026",
    file: "/certificates/microsoft-data-analysis-sql-excel-powerbi.pdf",
    verify: "https://coursera.org/verify/specialization/UPNCJ04RATC5",
  },
  {
    title: "Databases and SQL for Data Science with Python",
    issuer: "IBM · Coursera",
    date: "Août 2026",
    file: "/certificates/databases-sql-data-science-python.pdf",
    verify: "https://coursera.org/verify/UVGR2UKXALOP",
  },
  {
    title: "Notions de base sur les réseaux",
    issuer: "Cisco Networking Academy",
    date: "Août 2026",
    file: "/certificates/networking-basics.pdf",
  },
  {
    title: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    date: "Juillet 2026",
    file: "/certificates/data-analytics-essentials.pdf",
  },
  {
    title: "Introduction à la science des données",
    issuer: "Cisco Networking Academy",
    date: "Juillet 2026",
    file: "/certificates/introduction-data-science.pdf",
  },
  {
    title: "Introduction à l'IA moderne",
    issuer: "Cisco Networking Academy",
    date: "Juillet 2026",
    file: "/certificates/introduction-modern-ai.pdf",
  },
  {
    title: "Data Science Essentials with Python",
    issuer: "Cisco Networking Academy",
    date: "Juillet 2026",
    file: "/certificates/data-science-essentials-python.pdf",
  },
  {
    title: "Cybersecurity Defense Analyst Pathway Exam",
    issuer: "Cisco Networking Academy",
    date: "Juillet 2026",
    file: "/certificates/cybersecurity-defense-analyst.pdf",
  },
];

/** Distinct issuing organisations: DataCamp, Microsoft, IBM, Cisco. */
export const issuerCount = 4;

/** From the October 2026 CV, confirmed by the public OIBSIP repository. */
export const experience = [
  {
    period: "Sept. 2026 — aujourd'hui",
    title: "Stagiaire Data Analytics",
    org: "Oasis Infobyte (OIBSIP) · à distance",
    summary:
      "Six projets d'analyse de données publiés sur GitHub : nettoyage, analyse exploratoire, segmentation RFM + K-Means, analyse de sentiment, prédiction de prix immobiliers et de la qualité de vins.",
    tools: ["Python", "pandas", "scikit-learn", "seaborn", "NLTK"],
    href: "https://github.com/asaphfelix03-beep/OIBSIP",
  },
];

export const education = [
  {
    period: "2026 — 2027",
    title: "Licence 3 · Cybersécurité et Intelligence Artificielle",
    school: "École Supérieure Africaine des TICs (ESATIC)",
    current: true,
  },
  {
    period: "2024 — 2026",
    title: "Licence 2 · Cybersécurité et Intelligence Artificielle",
    school: "École Supérieure Africaine des TICs (ESATIC)",
  },
  {
    period: "Juin 2024",
    title: "Baccalauréat série D",
    school: "Lycée Moderne de Treichville",
  },
];

export const languages = [
  { name: "Français", level: "Courant" },
  { name: "Anglais", level: "Technique" },
];

export const qualities = ["Rigueur", "Curiosité", "Créativité", "Esprit d'équipe"];

export const participations = [
  { title: "Hackathons tech", note: "Participation active" },
  { title: "ECOWAS Hackathon", note: "Compétition régionale" },
];
