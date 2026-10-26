/**
 * Skills, each tied to its proof.
 *
 * The earlier version listed technologies as equals — Hadoop beside Python —
 * which claimed a mastery the site could not back. Here every entry says how
 * it was acquired:
 *   - "projet"     used in a project shown on this site (linked);
 *   - "formation"  covered by a certification or the ESATIC course;
 *   - "notions"    encountered, not yet put to work in a published project.
 * Moving an entry up a level should follow a new project or certificate.
 */

export type SkillLevel = "projet" | "formation" | "notions";

export const levels: Record<SkillLevel, { label: string; description: string }> = {
  projet: {
    label: "Pratiqué en projet",
    description: "Mis en œuvre dans un projet publié",
  },
  formation: {
    label: "Formation ou certification",
    description: "Étudié à l'ESATIC ou validé par une certification",
  },
  notions: {
    label: "Notions",
    description: "Abordé, pas encore mis en œuvre dans un projet publié",
  },
};

export type SkillProof = {
  label: string;
  /** Project page, certification anchor or external page. */
  href?: string;
};

export type Skill = {
  name: string;
  level: SkillLevel;
  proofs: SkillProof[];
};

export type SkillDomain = {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
};

const p = (slug: string, label: string): SkillProof => ({ label, href: `/projets/${slug}` });
const cert = (label: string): SkillProof => ({ label, href: "#certifications" });
const esatic: SkillProof = { label: "Licence ESATIC", href: "#formation" };

export const skillDomains: SkillDomain[] = [
  {
    id: "cyber",
    title: "Cybersécurité et défense",
    description: "Protéger les systèmes et les données, de la conception à la détection.",
    skills: [
      {
        name: "Détection de fraude par analyse de graphe",
        level: "projet",
        proofs: [p("synthid-graph", "SynthID-Graph")],
      },
      {
        name: "Cryptographie appliquée : OPRF, chiffrement homomorphe Paillier, HMAC",
        level: "projet",
        proofs: [p("synthid-graph", "SynthID-Graph")],
      },
      {
        name: "Authentification et contrôle d'accès : hachage scrypt, sessions, rôles",
        level: "projet",
        proofs: [p("matronassist-ci", "Matronassist-ci")],
      },
      {
        name: "Analyse de défense et supervision",
        level: "formation",
        proofs: [cert("Cisco · Cybersecurity Defense Analyst")],
      },
      {
        name: "Sécurité des réseaux, tests d'intrusion, analyse de vulnérabilités",
        level: "formation",
        proofs: [esatic],
      },
    ],
  },
  {
    id: "data",
    title: "Analyse de données et visualisation",
    description: "Nettoyer, contrôler, mesurer, puis montrer ce que disent les chiffres.",
    skills: [
      {
        name: "Python, Pandas, Matplotlib, Jupyter",
        level: "projet",
        proofs: [p("electrification-cote-divoire", "Électrification")],
      },
      {
        name: "SQL : requêtes, contraintes d'intégrité, rapport de qualité",
        level: "projet",
        proofs: [p("electrification-cote-divoire", "Électrification"), cert("IBM · Coursera")],
      },
      {
        name: "Excel avancé : Power Query, tableau croisé dynamique, INDEX / MATCH",
        level: "projet",
        proofs: [p("monnaie-electronique-uemoa", "UEMOA")],
      },
      {
        name: "Statistiques descriptives : TCAC, indices base 100, z-scores",
        level: "projet",
        proofs: [p("monnaie-electronique-uemoa", "UEMOA")],
      },
      {
        name: "Tableaux de bord",
        level: "projet",
        proofs: [
          p("electrification-cote-divoire", "Électrification"),
          p("monnaie-electronique-uemoa", "UEMOA"),
        ],
      },
      {
        name: "Power BI",
        level: "formation",
        proofs: [cert("Microsoft · Coursera")],
      },
    ],
  },
  {
    id: "ia",
    title: "Intelligence artificielle et data science",
    description: "Des modèles évalués honnêtement : sans fuite du futur, sur des cas jamais vus.",
    skills: [
      {
        name: "Gradient boosting avec LightGBM",
        level: "projet",
        proofs: [p("synthid-graph", "SynthID-Graph")],
      },
      {
        name: "Réseaux de neurones sur graphe : GCN, GraphSAGE (PyTorch Geometric)",
        level: "projet",
        proofs: [p("synthid-graph", "SynthID-Graph")],
      },
      {
        name: "Évaluation sans fuite temporelle, démarche CRISP-DM",
        level: "projet",
        proofs: [p("synthid-graph", "SynthID-Graph")],
      },
      {
        name: "Apprentissage automatique : régression, K-Means, forêts aléatoires (scikit-learn)",
        level: "projet",
        proofs: [p("oibsip", "Stage OIBSIP")],
      },
      {
        name: "Fondamentaux de la data science et de l'IA",
        level: "formation",
        proofs: [cert("Cisco · 3 certificats"), cert("DataCamp")],
      },
    ],
  },
  {
    id: "dev",
    title: "Développement web et mobile",
    description: "Des applications construites de bout en bout, du modèle de données à l'interface.",
    skills: [
      {
        name: "Next.js, React, TypeScript, Tailwind CSS",
        level: "projet",
        proofs: [p("cvfacile", "CVFacile"), p("matronassist-ci", "Matronassist-ci")],
      },
      {
        name: "API validées par schéma : Prisma, zod",
        level: "projet",
        proofs: [p("matronassist-ci", "Matronassist-ci")],
      },
      {
        name: "Application installable et hors ligne (PWA), appels WebRTC",
        level: "projet",
        proofs: [p("matronassist-ci", "Matronassist-ci")],
      },
      {
        name: "Flutter et Firebase",
        level: "projet",
        proofs: [p("nti", "N'ti")],
      },
      {
        name: "Node.js, Express, Django",
        level: "notions",
        proofs: [],
      },
    ],
  },
  {
    id: "infra",
    title: "Bases de données, réseaux et infrastructure",
    description: "Stocker, relier et faire tourner les systèmes sur lesquels reposent les données.",
    skills: [
      {
        name: "PostgreSQL, SQLite, Neo4j, Firebase",
        level: "projet",
        proofs: [
          p("matronassist-ci", "Matronassist-ci"),
          p("electrification-cote-divoire", "Électrification"),
          p("synthid-graph", "SynthID-Graph"),
        ],
      },
      {
        name: "Docker",
        level: "projet",
        proofs: [p("synthid-graph", "SynthID-Graph")],
      },
      {
        name: "Git et intégration continue (GitHub Actions)",
        level: "projet",
        proofs: [
          p("synthid-graph", "SynthID-Graph"),
          p("electrification-cote-divoire", "Électrification"),
        ],
      },
      {
        name: "Déploiement sur AWS EC2",
        level: "projet",
        proofs: [{ label: "hxh-guide (GitHub)", href: "https://github.com/asaphfelix03-beep/hxh-guide" }],
      },
      {
        name: "Réseaux : notions de base, routage, pare-feu, VPN",
        level: "formation",
        proofs: [cert("Cisco · Notions de base sur les réseaux"), esatic],
      },
      {
        name: "Big Data : Hadoop, Spark, Kafka ; MongoDB ; Linux",
        level: "notions",
        proofs: [],
      },
    ],
  },
];
