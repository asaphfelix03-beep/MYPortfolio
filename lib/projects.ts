/**
 * Every project on the site, as one typed source of truth: the home page's
 * project bands and the /projets/<slug> pages both read from here.
 *
 * Rule for this file: nothing goes in that cannot be checked. Figures come
 * from the project's own public repository, dashboard or workbook, and each
 * project lists those sources. When a fact is unknown — most often "my
 * contribution" on a project with no public trace of it — the field is left
 * out and the page simply omits that block, rather than filling it with a
 * plausible sentence. Missing fields are listed in TODO comments.
 */

/** Filter families on the home page. A project can sit in several. */
export type ProjectFamily = "securite" | "donnees" | "web";

export const families: { id: ProjectFamily; label: string }[] = [
  { id: "securite", label: "Sécurité" },
  { id: "donnees", label: "Données & IA" },
  { id: "web", label: "Web & mobile" },
];

export type ProjectVisual =
  | {
      kind: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      /** CSS object-position, e.g. "50% 20%". */
      position?: string;
      /** Said under the picture on the project page. */
      caption?: string;
    }
  /** The eight UEMOA gauges, drawn live from the workbook's values. */
  | { kind: "uemoa-gauges" }
  /** Matronassist-ci's role matrix, drawn from its README. */
  | { kind: "roles" }
  /** No screenshot exists yet: a typographic cover, with no invented data. */
  | { kind: "cover"; icon: "map"; words: string[] };

export type Project = {
  slug: string;
  title: string;
  /** Shown next to the year: what kind of work this is. */
  category: string;
  families: ProjectFamily[];
  year: string;
  /** Only "En cours" is used: a project still in progress says so. */
  status?: "En cours";
  tagline: string;
  /** Two sentences for the home page band. */
  summary: string;
  problem?: string;
  objective: string;
  /** Verifiable facts only — see the file comment. */
  contribution?: string;
  /** How it was done, in order. */
  steps?: { title: string; items: string[] };
  /** Headline figures, each one sourced. */
  results?: { value: string; label: string }[];
  /** Further results or available features, as plain sentences. */
  highlights?: { title: string; items: string[] };
  /** Detailed findings with a title each (the UEMOA analysis). */
  findings?: { title: string; body: string }[];
  /** Extra titled lists: security measures, known limits. */
  notes?: { title: string; items: string[] }[];
  technologies: string[];
  visual: ProjectVisual;
  links: {
    demo?: { href: string; label: string };
    repo?: string;
    download?: { href: string; label: string; size: string; note: string };
  };
  /** Live page that can be embedded on the project page, on request. */
  embed?: { src: string; title: string };
  /** Slug in lib/case-studies.ts: adds the workbook viewer. */
  caseStudy?: string;
  /** Where the facts above come from. */
  sources: { label: string; href: string }[];
};

const NB = " "; // espace insécable : « 90 % » ne se coupe pas

export const projects: Project[] = [
  {
    slug: "synthid-graph",
    title: "SynthID-Graph",
    category: "Sécurité & IA",
    families: ["securite", "donnees"],
    year: "2026",
    tagline: "Seul, un fraudeur rusé est invisible. Son réseau, lui, le trahit.",
    summary:
      "Détecter les anneaux d'identités synthétiques avant qu'ils ne vident les comptes, par l'analyse de graphe et une coopération entre banques chiffrée de bout en bout. Preuve de concept sur des données entièrement simulées.",
    problem:
      "Une identité synthétique associe un vrai numéro d'identité à un nom et à des contacts inventés. Elle se comporte en client modèle pendant des mois, puis vide d'un coup tous ses plafonds de crédit : c'est le « bust-out ». Vue seule, elle est irréprochable, et les règles classiques passent à côté.",
    objective:
      "Tester une hypothèse : un fraudeur gère des dizaines d'identités à la fois, et elles partagent forcément des traces — un téléphone, un appareil, un employeur fictif. Le réseau devrait trahir ce que le profil cache, à condition de croiser les données de plusieurs banques sans qu'aucune donnée personnelle ne circule.",
    contribution:
      "Seul contributeur du dépôt public : simulateur, graphe, modèles, couche cryptographique, tests et rapport.",
    steps: {
      title: "La démarche (CRISP-DM)",
      items: [
        "Simuler le terrain : un simulateur multi-agents produit 3 banques, 20 684 identités et 110 anneaux de fraude sur 36 mois, avec des pièges réalistes — foyers, colocations, IP mobiles partagées, impayés légitimes.",
        "Protéger les données dès l'entrée : chaque donnée personnelle devient un jeton HMAC propre à la banque, après résolution des quasi-doublons.",
        "Construire le graphe : 198 000 nœuds et 682 000 relations dans Neo4j, explorés en Cypher et avec Graph Data Science (WCC, Louvain).",
        "Calculer les caractéristiques « à la date T » — profil, comportement, graphe — sans jamais utiliser d'information future, ce que vérifie un test automatisé.",
        "Comparer règles classiques, LightGBM, GCN et GraphSAGE hétérogène (PyTorch Geometric), sur un découpage temporel avec des anneaux jamais vus à l'entraînement.",
        "Faire coopérer les banques sans partager de données : jetons communs par OPRF et compteurs chiffrés Paillier 3072 bits, agrégés sans être lus.",
        "Produire des alertes exploitables : budget d'alertes réaliste et dossier d'enquête généré pour chaque alerte.",
      ],
    },
    results: [
      {
        value: `90${NB}%`,
        label: "des anneaux les plus rusés détectés avant le bust-out, contre 15 % avec les règles classiques",
      },
      { value: `212${NB}j`, label: "d'anticipation médiane avant le bust-out" },
      { value: "0", label: "donnée personnelle reçue par le serveur commun aux banques" },
    ],
    highlights: {
      title: "Autres résultats mesurés",
      items: [
        "PR-AUC de 0,765 pour le meilleur ensemble (LightGBM + GraphSAGE), mesurée à une prévalence de fraude de 1 %.",
        "Une attaque par dictionnaire retrouve 100 % des valeurs protégées par un simple SHA-256, 0 % avec les jetons OPRF.",
        "1,2 % des clients honnêtes qui partagent des traces (foyers, colocations) sont alertés, contre 2,0 % avec les règles.",
        "18 tests automatisés : absence de fuite temporelle, absence de données personnelles, exactitude cryptographique.",
      ],
    },
    notes: [
      {
        title: "Limites, documentées dans le dépôt",
        items: [
          "Les données sont entièrement simulées : les chiffres dépendent des hypothèses du générateur.",
          "Une seule graine aléatoire et 20 anneaux rusés au test : 5 points d'écart représentent un seul anneau.",
          "Le réseau de neurones sur graphe seul ne bat pas un LightGBM nourri de bonnes caractéristiques de graphe ; c'est leur combinaison qui l'emporte.",
        ],
      },
    ],
    technologies: ["Python", "Neo4j · GDS", "PyTorch Geometric", "LightGBM", "OPRF · Paillier", "Docker"],
    visual: {
      kind: "image",
      src: "/images/projets/synthid-graph.webp",
      alt: "Extrait du graphe Neo4j : des identités reliées par leurs points de contact partagés forment des anneaux.",
      width: 1436,
      height: 1370,
      position: "50% 45%",
      caption: "Un extrait du graphe dans Neo4j : les identités d'un anneau se rejoignent par leurs points de contact partagés.",
    },
    links: { repo: "https://github.com/asaphfelix03-beep/synthid-graph" },
    sources: [
      { label: "README du dépôt synthid-graph", href: "https://github.com/asaphfelix03-beep/synthid-graph#readme" },
    ],
  },
  {
    slug: "electrification-cote-divoire",
    title: "Électrification de la Côte d'Ivoire",
    category: "Analyse de données",
    families: ["donnees"],
    year: "2026",
    tagline: "Ce que disent réellement dix-neuf lignes de données publiques",
    summary:
      "63 ans d'abonnements à l'électricité (1960–2023), à partir des données ouvertes du Ministère des Mines, du Pétrole et de l'Énergie : trois régimes de croissance, la part du programme PEPT, et l'année de l'accès universel selon le rythme d'abonnement.",
    problem:
      "Le jeu de données tient en 19 lignes et 3 colonnes. Son pas de temps est irrégulier — décennal jusqu'en 2010, annuel ensuite —, 9 valeurs manquent, et le chiffre phare, 4 millions d'abonnés, n'a pas de dénominateur. Lu sans précaution, il fait dire n'importe quoi.",
    objective:
      "Répondre à quatre questions : la croissance est-elle régulière ? Quelle part revient au programme PEPT ? Que représentent 4 millions d'abonnés rapportés aux ménages ? En quelle année l'accès universel serait-il atteint ?",
    contribution:
      "Seul contributeur du dépôt public : préparation des données, base SQL, analyse, tests et tableau de bord.",
    steps: {
      title: "Trois décisions de méthode, puis le contrôle",
      items: [
        "Raisonner en taux de croissance annuel moyen plutôt qu'en écarts bruts, pour comparer des pas de dix ans et d'un an.",
        "Imputer 0 aux 9 valeurs PEPT manquantes — le programme n'existait pas encore — et tracer ce choix dans une colonne dédiée plutôt que d'interpoler.",
        "Rapporter les abonnés aux ménages (recensements 2014 et 2021 de l'INS) : un abonné est un contrat, pas une personne.",
        "Déclarer les règles métier dans la base SQLite (contraintes CHECK) et générer un rapport de qualité à chaque exécution.",
        "Couvrir chaque chiffre publié par un test de non-régression, puis publier un tableau de bord interactif.",
      ],
    },
    results: [
      {
        value: `+13,3${NB}%`,
        label: "d'abonnés par an depuis 2014, contre +5,0 % par an entre 1990 et 2014",
      },
      { value: `63${NB}%`, label: "de la croissance récente portée par le seul programme PEPT" },
      { value: `≈${NB}68${NB}%`, label: "des ménages abonnés en 2023, contre ≈ 30 % en 2014" },
    ],
    highlights: {
      title: "Autres résultats",
      items: [
        "Plus d'abonnés ajoutés en dix ans (+2,82 millions, 2014–2023) qu'en 53 ans (+1,21 million, 1960–2013).",
        "Accès universel en 2031, 2033 ou 2042 selon le rythme d'abonnement tenu : des scénarios, pas des prévisions.",
        "29 tests passent. Ils ont déjà corrigé la documentation, qui annonçait 14 valeurs manquantes au lieu de 9.",
      ],
    },
    notes: [
      {
        title: "Limite assumée",
        items: [
          "Aucun intervalle de confiance n'est produit : sans modèle statistique estimé, il serait fictif.",
        ],
      },
    ],
    technologies: ["Python", "Pandas", "SQL · SQLite", "Matplotlib", "Jupyter"],
    visual: {
      kind: "image",
      src: "/images/projets/electrification-dashboard.webp",
      alt: "Tableau de bord publié : 4 048 259 abonnés en 2023, rythme d'abonnement, part du PEPT et taux de pénétration des ménages.",
      width: 1200,
      height: 750,
      position: "0% 0%",
      caption: "Le haut du tableau de bord publié sur GitHub Pages.",
    },
    links: {
      demo: {
        href: "https://asaphfelix03-beep.github.io/electrification-ci/dashboard/",
        label: "Ouvrir le tableau de bord",
      },
      repo: "https://github.com/asaphfelix03-beep/electrification-ci",
    },
    embed: {
      src: "https://asaphfelix03-beep.github.io/electrification-ci/dashboard/",
      title: "Tableau de bord de l'électrification de la Côte d'Ivoire",
    },
    sources: [
      { label: "README du dépôt electrification-ci", href: "https://github.com/asaphfelix03-beep/electrification-ci#readme" },
      { label: "Tableau de bord", href: "https://asaphfelix03-beep.github.io/electrification-ci/dashboard/" },
    ],
  },
  {
    slug: "monnaie-electronique-uemoa",
    title: "Monnaie électronique dans l'UEMOA",
    category: "Analyse de données",
    families: ["donnees"],
    year: "2026",
    tagline: "Les comptes se multiplient deux fois plus vite qu'ils ne servent",
    summary:
      "Analyse sous Excel des comptes de monnaie électronique de l'UEMOA entre 2020 et 2024, à partir des séries de la BCEAO. Le classeur se consulte feuille par feuille, contrôles qualité compris.",
    problem:
      "L'ouverture de comptes est le chiffre que l'on cite pour mesurer l'inclusion financière. Mais un compte ouvert n'est pas un compte utilisé.",
    objective:
      "La croissance des comptes s'accompagne-t-elle d'une croissance équivalente de l'usage ? Et où se situe la Côte d'Ivoire, premier marché de la zone, parmi les huit pays ?",
    contribution:
      "Classeur construit de bout en bout : import Power Query, contrôles qualité, calculs, tableau croisé dynamique et tableau de bord.",
    // Steps, findings and the workbook come from lib/case-studies.ts.
    results: [
      { value: `27,46${NB}%`, label: "de croissance annuelle des comptes ouverts, contre 15,76 % pour les comptes actifs" },
      { value: `30,90${NB}%`, label: "de taux d'activité en 2024, contre 45,43 % en 2020" },
      { value: `26,46${NB}%`, label: "pour la Côte d'Ivoire, 2e plus faible des huit pays" },
    ],
    technologies: ["Excel", "Power Query", "Tableau croisé dynamique", "INDEX / MATCH", "Statistiques descriptives"],
    visual: { kind: "uemoa-gauges" },
    links: { repo: "https://github.com/asaphfelix03-beep/analyse-data-BCEAO" },
    caseStudy: "monnaie-electronique-uemoa",
    sources: [
      { label: "Classeur PROJET UEMOA.xlsx (feuilles Analyse et Tableau de bord)", href: "#classeur" },
      { label: "Dépôt analyse-data-BCEAO", href: "https://github.com/asaphfelix03-beep/analyse-data-BCEAO#readme" },
    ],
  },
  {
    slug: "cvfacile",
    title: "CVFacile",
    category: "Produit web",
    families: ["web"],
    year: "2026",
    tagline: "Un CV professionnel en quelques minutes, sans créer de compte",
    summary:
      "Générateur de CV en ligne qui guide section par section, montre l'aperçu A4 en direct et livre un PDF à texte sélectionnable. La création est gratuite et sans inscription ; le paiement n'intervient qu'au téléchargement.",
    problem:
      "La plupart des générateurs de CV livrent un formulaire vide : le candidat ne sait pas ce qui manque, ni ce qu'un recruteur cherchera.",
    objective:
      "Guider la construction du CV plutôt que son remplissage, et livrer un document lisible par les logiciels de tri des recruteurs.",
    contribution: "Conception et développement de bout en bout.",
    highlights: {
      title: "Fonctionnalités en ligne",
      items: [
        "Import d'un ancien CV, en PDF ou en Word, dont le contenu se range dans les champs.",
        "Aperçu A4 aux dimensions réelles, mis à jour à chaque frappe.",
        "Score de complétion qui signale ce qu'un recruteur cherchera et ne trouve pas encore.",
        "Comparaison avec une annonce : les mots qu'elle emploie et que le CV ne reprend nulle part.",
        "Mises en page par métier et 46 thèmes de couleurs.",
        "PDF vectoriel à texte sélectionnable, payé 1 000 F par Wave au téléchargement.",
      ],
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    visual: {
      kind: "image",
      src: "/images/projets/cvfacile.webp",
      alt: "Page d'accueil de CVFacile : « Votre CV mérite mieux qu'un modèle Word ».",
      width: 1600,
      height: 1000,
      position: "50% 0%",
    },
    links: { demo: { href: "https://www.cvfacile.site/", label: "Visiter cvfacile.site" } },
    sources: [{ label: "cvfacile.site", href: "https://www.cvfacile.site/" }],
  },
  {
    slug: "nti",
    title: "N'ti",
    category: "Application mobile",
    families: ["web"],
    year: "2026",
    tagline: "Apprendre le Baoulé, hors ligne et en autonomie",
    summary:
      "Application mobile d'apprentissage de la langue Baoulé : leçons, vocabulaire, audios de prononciation, quiz et dictionnaire Baoulé–Français consultable sans connexion.",
    objective: "Permettre d'apprendre le Baoulé en autonomie, y compris sans connexion internet.",
    // TODO(contenu) : contribution personnelle, problème précis et étapes de
    // réalisation — rien de public ne permet de les écrire.
    highlights: {
      title: "Fonctionnalités",
      items: [
        "Leçons et vocabulaire.",
        "Audios de prononciation.",
        "Quiz.",
        "Dictionnaire Baoulé–Français consultable hors ligne.",
      ],
    },
    technologies: ["Flutter", "Firebase", "Traitement audio"],
    visual: {
      kind: "image",
      src: "/images/projets/nti.webp",
      alt: "Écran d'accueil de N'ti sur un téléphone : progression, mot du jour et raccourcis vers les leçons, le quiz et le dictionnaire.",
      width: 630,
      height: 840,
      position: "50% 22%",
      caption: "Visuel de présentation fourni avec l'application.",
    },
    links: {
      download: {
        href: "/files/nti-app-release.apk",
        label: "Télécharger l'APK",
        size: "88 Mo",
        note: "Fichier Android à installer manuellement. Préférez une connexion Wi-Fi.",
      },
    },
    sources: [{ label: "Application N'ti (APK)", href: "/files/nti-app-release.apk" }],
  },
  {
    slug: "ecocollect",
    title: "EcoCollect",
    category: "Application mobile",
    families: ["web"],
    year: "2025 — 2026",
    status: "En cours",
    tagline: "Signaler, localiser et réduire les dépôts sauvages",
    summary:
      "Application mobile citoyenne pour signaler les dépôts sauvages de déchets, localiser les points de collecte et de recyclage, et sensibiliser à l'éco-responsabilité.",
    objective:
      "Donner aux habitants un moyen simple de signaler un dépôt sauvage et de trouver le point de collecte le plus proche.",
    // TODO(contenu) : captures, dépôt, contribution — projet en cours.
    highlights: {
      title: "Fonctionnalités prévues",
      items: [
        "Signalement des dépôts sauvages de déchets.",
        "Localisation des points de collecte et de recyclage.",
        "Sensibilisation à l'éco-responsabilité.",
      ],
    },
    technologies: ["Flutter", "Django", "PostgreSQL", "Google Maps API"],
    visual: { kind: "cover", icon: "map", words: ["Signaler", "Localiser", "Recycler"] },
    links: {},
    sources: [{ label: "Description d'origine du projet sur ce portfolio", href: "/#projets" }],
  },
  {
    slug: "matronassist-ci",
    title: "Matronassist-ci",
    category: "Plateforme web",
    families: ["web", "securite"],
    year: "2026",
    status: "En cours",
    tagline: "Alléger l'administratif des sages-femmes",
    summary:
      "Plateforme de suivi de grossesse : les matrones tiennent les dossiers de leurs patientes, les patientes suivent leur grossesse et échangent avec leur matrone, l'administration pilote le réseau. Installable sur mobile, utilisable hors connexion.",
    problem:
      "Le suivi de grossesse impose aux sages-femmes un travail administratif lourd, souvent dans des zones où le réseau est mal assuré.",
    objective:
      "Automatiser l'administratif, améliorer le suivi des patientes par des alertes et faciliter le partage des données médicales, sans perdre une saisie quand le réseau tombe.",
    contribution: "Seul auteur des commits du dépôt public.",
    highlights: {
      title: "Ce que contient le dépôt",
      items: [
        "Comptes et rôles : administration, matrone, patiente.",
        "Dossiers de grossesse, consultations et constantes vitales, agenda, journal de grossesse.",
        "Alertes recalculées depuis l'état réel des dossiers : constantes hors seuils, rendez-vous non clôturés, suivis sans consultation depuis plus de 60 jours.",
        "Messagerie et appels audio/vidéo pair-à-pair (WebRTC) entre une patiente et sa matrone.",
        "Hors connexion : les saisies sont mises en file et rejouées automatiquement au retour du réseau.",
      ],
    },
    notes: [
      {
        title: "Sécurité applicative",
        items: [
          "Mots de passe hachés avec scrypt et comparés à temps constant.",
          "Sessions : seule l'empreinte SHA-256 du jeton est stockée, une fuite de la base ne permet pas de rejouer une session.",
          "Anti-énumération : même message et même coût de calcul, que le compte existe ou non.",
          "Contrôle d'accès dans chaque route ; un dossier hors périmètre répond 404 et non 403, pour ne pas révéler son existence.",
        ],
      },
      {
        title: "Ce qui reste à faire, selon le dépôt",
        items: [
          "Limiter les tentatives de connexion et journaliser les accès aux dossiers médicaux.",
          "Configurer un serveur TURN : sans lui, une partie des appels échoue derrière les réseaux restrictifs.",
        ],
      },
    ],
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "WebRTC", "PWA"],
    visual: { kind: "roles" },
    links: { repo: "https://github.com/asaphfelix03-beep/Matronassist-ci-" },
    sources: [
      { label: "README du dépôt Matronassist-ci", href: "https://github.com/asaphfelix03-beep/Matronassist-ci-#readme" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Previous and next project, wrapping around, for the project pages. */
export function getNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return {
    previous: projects[(i - 1 + n) % n],
    next: projects[(i + 1) % n],
  };
}

/** How many projects link to public source code. */
export const publicRepoCount = projects.filter((p) => p.links.repo).length;
