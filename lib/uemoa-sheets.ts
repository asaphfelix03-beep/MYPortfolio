/**
 * Contenu de PROJET UEMOA.xlsx, extrait via scripts/extract-uemoa.py.
 *
 * Le classeur est rendu en HTML plutôt que servi en téléchargement : le
 * visiteur voit les mêmes feuilles, les mêmes valeurs et les mêmes graphiques,
 * sans qu'aucun fichier modifiable ne quitte le site.
 *
 * NE PAS ÉDITER À LA MAIN — relancer le script après toute modification du
 * classeur source.
 */

export type Cell = {
  /** Valeur déjà formatée pour l'affichage (séparateurs et décimales fr-FR). */
  v: string;
  /** Nombre : aligné à droite dans la grille. */
  n?: boolean;
  /** Gras dans le classeur d'origine : titres de blocs et en-têtes. */
  b?: boolean;
};

export type SheetGrid = {
  name: string;
  cols: number;
  rows: Cell[][];
};

export const sheetGrids: SheetGrid[] = [
  {
    "name": "Analyse",
    "cols": 4,
    "rows": [
      [
        {
          "v": "ANALYSE — Comptes de monnaie électronique UEMOA 2020-2024",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "1. RYTHME DE CROISSANCE COMPARÉ (UEMOA)",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Indicateur",
          "b": true
        },
        {
          "v": "Comptes ouverts",
          "b": true
        },
        {
          "v": "Comptes actifs",
          "b": true
        },
        {
          "v": "Écart",
          "b": true
        }
      ],
      [
        {
          "v": "Nombre d'années de la série"
        },
        {
          "v": "5",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Valeur première année"
        },
        {
          "v": "94 226 056",
          "n": true
        },
        {
          "v": "42 803 234",
          "n": true
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Valeur dernière année"
        },
        {
          "v": "248 710 918",
          "n": true
        },
        {
          "v": "76 863 533",
          "n": true
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Multiplicateur sur la période"
        },
        {
          "v": "2,64",
          "n": true
        },
        {
          "v": "1,80",
          "n": true
        },
        {
          "v": "0,84",
          "n": true
        }
      ],
      [
        {
          "v": "TCAC annuel moyen (%)",
          "b": true
        },
        {
          "v": "27,46",
          "n": true,
          "b": true
        },
        {
          "v": "15,76",
          "n": true,
          "b": true
        },
        {
          "v": "11,70",
          "n": true,
          "b": true
        }
      ],
      [
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "2. DÉCOMPOSITION DE LA BAISSE DU TAUX D'ACTIVITÉ",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Taux d'activité première année (%)"
        },
        {
          "v": "45,43",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Taux d'activité dernière année (%)"
        },
        {
          "v": "30,90",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Variation totale (points)",
          "b": true
        },
        {
          "v": "-14,52",
          "n": true,
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Actifs requis pour maintenir le taux initial"
        },
        {
          "v": "112 979 701",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Actifs réellement observés"
        },
        {
          "v": "76 863 533",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Déficit d'activation (comptes)",
          "b": true
        },
        {
          "v": "-36 116 168",
          "n": true,
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Écart absolu ouverts-actifs, première année"
        },
        {
          "v": "51 422 822",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Écart absolu ouverts-actifs, dernière année"
        },
        {
          "v": "171 847 385",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Multiplicateur de l'écart"
        },
        {
          "v": "3,34",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Année de la plus forte baisse du taux"
        },
        {
          "v": "2023",
          "n": true
        },
        {
          "v": "-8,63",
          "n": true
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "3. DISPERSION DU TAUX D'ACTIVITÉ ENTRE PAYS (2024)",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Moyenne simple, non pondérée (%)"
        },
        {
          "v": "35,27",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Moyenne pondérée par les comptes ouverts (%)",
          "b": true
        },
        {
          "v": "30,90",
          "n": true,
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Écart pondérée − simple (points)"
        },
        {
          "v": "-4,36",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Médiane (%)"
        },
        {
          "v": "34,16",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Écart-type (points)"
        },
        {
          "v": "18,11",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Coefficient de variation (%)"
        },
        {
          "v": "51,4",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Minimum (%)"
        },
        {
          "v": "4,53",
          "n": true
        },
        {
          "v": "Niger"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Maximum (%)"
        },
        {
          "v": "67,99",
          "n": true
        },
        {
          "v": "Guinee-Bissau"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Étendue (points)"
        },
        {
          "v": "63,46",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "1er quartile (%)"
        },
        {
          "v": "29,11",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "3e quartile (%)"
        },
        {
          "v": "39,47",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Écart interquartile (points)"
        },
        {
          "v": "10,36",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "4. POSITION DE LA CÔTE D'IVOIRE (2024)",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Taux d'activité (%)",
          "b": true
        },
        {
          "v": "26,46",
          "n": true,
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Rang par taux croissant (1 = plus faible)"
        },
        {
          "v": "2",
          "n": true
        },
        {
          "v": "sur 8 pays"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Écart à la moyenne simple (points)"
        },
        {
          "v": "-8,80",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Écart à la moyenne pondérée UEMOA (points)"
        },
        {
          "v": "-4,44",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Écart à la médiane (points)"
        },
        {
          "v": "-7,70",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Z-score"
        },
        {
          "v": "-0,49",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Poids dans les comptes ouverts UEMOA (%)",
          "b": true
        },
        {
          "v": "40,1",
          "n": true,
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Poids dans les comptes actifs UEMOA (%)"
        },
        {
          "v": "34,3",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Écart de poids ouverts − actifs (points)"
        },
        {
          "v": "5,76",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Croissance des comptes ouverts 2023→2024 (%)"
        },
        {
          "v": "22,76",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Rang par croissance (1 = plus forte)"
        },
        {
          "v": "3",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "5. EFFET DE STRUCTURE — UEMOA AVEC ET SANS LA CÔTE D'IVOIRE (2024)",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Périmètre",
          "b": true
        },
        {
          "v": "Comptes ouverts",
          "b": true
        },
        {
          "v": "Comptes actifs",
          "b": true
        },
        {
          "v": "Taux d'activité (%)",
          "b": true
        }
      ],
      [
        {
          "v": "UEMOA — 8 pays"
        },
        {
          "v": "248 710 918",
          "n": true
        },
        {
          "v": "76 863 533",
          "n": true
        },
        {
          "v": "30,90",
          "n": true
        }
      ],
      [
        {
          "v": "Côte d'Ivoire seule"
        },
        {
          "v": "99 649 204",
          "n": true
        },
        {
          "v": "26 370 627",
          "n": true
        },
        {
          "v": "26,46",
          "n": true
        }
      ],
      [
        {
          "v": "UEMOA hors Côte d'Ivoire",
          "b": true
        },
        {
          "v": "149 061 714",
          "n": true,
          "b": true
        },
        {
          "v": "50 492 906",
          "n": true,
          "b": true
        },
        {
          "v": "33,87",
          "n": true,
          "b": true
        }
      ],
      [
        {
          "v": "Effet Côte d'Ivoire sur le taux de zone (points)",
          "b": true
        },
        {
          "v": "-2,97",
          "n": true,
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Lecture",
          "b": true
        },
        {
          "v": "Retirer la CI ferait passer le taux de zone de 30,90% à 33,87%"
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "6. QUALITÉ DES DONNÉES — CONTRÔLES AUTOMATIQUES",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Contrôle",
          "b": true
        },
        {
          "v": "Résultat",
          "b": true
        },
        {
          "v": "Statut",
          "b": true
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Lignes UEMOA dont le taux recalculé diverge (>0,011 pt)"
        },
        {
          "v": "0",
          "n": true
        },
        {
          "v": "OK"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Pays dont le taux recalculé diverge (>0,011 pt)"
        },
        {
          "v": "0",
          "n": true
        },
        {
          "v": "OK"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Somme des 8 pays − total UEMOA 2024 (ouverts)"
        },
        {
          "v": "0",
          "n": true
        },
        {
          "v": "OK"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Somme des 8 pays − total UEMOA 2024 (actifs)"
        },
        {
          "v": "0",
          "n": true
        },
        {
          "v": "OK"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Pays hors intervalle moyenne ± 2 écarts-types"
        },
        {
          "v": "0",
          "n": true
        },
        {
          "v": "aucun"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Années où les points de services reculent"
        },
        {
          "v": "1",
          "n": true
        },
        {
          "v": "signalé"
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "7. NOTES MÉTHODOLOGIQUES ET DÉFINITIONS",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Terme",
          "b": true
        },
        {
          "v": "Définition / unité",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Taux d'activité"
        },
        {
          "v": "Comptes actifs ÷ comptes ouverts, en %. Recalculé depuis les effectifs bruts, jamais repris de la colonne fournie."
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "TCAC"
        },
        {
          "v": "Taux de croissance annuel moyen géométrique : (Vf/Vi)^(1/(n-1))-1, avec n = nombre d'années. Lisse les à-coups annuels."
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Indice base 100"
        },
        {
          "v": "Valeur de l'année ÷ valeur 2020 × 100. Permet de comparer deux séries d'échelles différentes."
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Ratio de rythme"
        },
        {
          "v": "Indice ouverts ÷ indice actifs. Égal à 1 si les deux séries progressent au même rythme ; supérieur à 1 si les ouverts vont plus vite."
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Moyenne pondérée"
        },
        {
          "v": "Somme des actifs ÷ somme des ouverts sur les 8 pays. Diffère de la moyenne simple des 8 taux, qui donne le même poids à chaque pays."
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Z-score"
        },
        {
          "v": "(valeur − moyenne simple) ÷ écart-type d'échantillon. Exprime l'écart en nombre d'écarts-types."
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Déficit d'activation"
        },
        {
          "v": "Comptes actifs observés − comptes actifs requis pour maintenir le taux de 2020. Grandeur arithmétique, sans portée causale."
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Effet Côte d'Ivoire"
        },
        {
          "v": "Différence entre le taux de zone à 8 pays et le taux hors CI. Mesure une contribution comptable, pas une relation de cause."
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "RÉSERVES SUR LES DONNÉES",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Niger"
        },
        {
          "v": "Taux d'activité de 4,53%, soit z=-1,70. Ratio arithmétiquement exact mais isolé : à confronter à l'annexe 2 BCEAO."
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Guinée-Bissau"
        },
        {
          "v": "Taux d'activité le plus élevé (67,99 %) mais taux de points de services actifs le plus faible après le Niger (22,86 %). Combinaison atypique."
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Points de services"
        },
        {
          "v": "Seule série UEMOA en recul : 1 678 067 en 2023 → 1 590 243 en 2024. Rupture non expliquée par les données fournies."
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Format source"
        },
        {
          "v": "Les colonnes de taux fournies sont stockées en texte avec point décimal (la locale fr-FR attend la virgule). Converties via SUBSTITUTE dans les colonnes de contrôle."
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Portée"
        },
        {
          "v": "Tous les constats sont descriptifs. Aucune relation causale ne peut être établie à partir de ces seules séries agrégées."
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ]
    ]
  },
  {
    "name": "UEMOA",
    "cols": 38,
    "rows": [
      [
        {
          "v": "annee",
          "b": true
        },
        {
          "v": "nb_initiatives",
          "b": true
        },
        {
          "v": "comptes_ouverts",
          "b": true
        },
        {
          "v": "comptes_actifs",
          "b": true
        },
        {
          "v": "taux_activite_pct",
          "b": true
        },
        {
          "v": "points_services",
          "b": true
        },
        {
          "v": "volume_transactions",
          "b": true
        },
        {
          "v": "valeur_transactions_mds_fcfa",
          "b": true
        },
        {
          "v": "volume_p2p",
          "b": true
        },
        {
          "v": "valeur_p2p_mds_fcfa",
          "b": true
        },
        {
          "v": "volume_paiements",
          "b": true
        },
        {
          "v": "valeur_paiements_mds_fcfa",
          "b": true
        },
        {
          "v": "volume_intra_uemoa",
          "b": true
        },
        {
          "v": "valeur_intra_uemoa_mds_fcfa",
          "b": true
        },
        {
          "v": "taux_digitalisation_nette_pct",
          "b": true
        },
        {
          "v": "ecart_ouverts_actifs",
          "b": true
        },
        {
          "v": "ecart_ouverts_actifs_calc",
          "b": true
        },
        {
          "v": "taux_recalcule_pct",
          "b": true
        },
        {
          "v": "taux_fourni_pct",
          "b": true
        },
        {
          "v": "ecart_pts",
          "b": true
        },
        {
          "v": "verdict",
          "b": true
        },
        {
          "v": "croissance_ouverts_pct",
          "b": true
        },
        {
          "v": "croissance_actifs_pct",
          "b": true
        },
        {
          "v": "ecart_croissances_pts",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": "MESURES DE RYTHME (base 2020)",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "2020",
          "n": true
        },
        {
          "v": "42",
          "n": true
        },
        {
          "v": "94 226 056",
          "n": true
        },
        {
          "v": "42 803 234",
          "n": true
        },
        {
          "v": "45.43"
        },
        {
          "v": "1 074 254",
          "n": true
        },
        {
          "v": "3 497 284 116",
          "n": true
        },
        {
          "v": "41 455",
          "n": true
        },
        {
          "v": "369 040 897",
          "n": true
        },
        {
          "v": "7 593",
          "n": true
        },
        {
          "v": "1 638 014 665",
          "n": true
        },
        {
          "v": "4 590",
          "n": true
        },
        {
          "v": "31 684 871",
          "n": true
        },
        {
          "v": "1 713",
          "n": true
        },
        {
          "v": "19.02"
        },
        {
          "v": "51 422 822",
          "n": true
        },
        {
          "v": "51 422 822",
          "n": true
        },
        {
          "v": "45,43",
          "n": true
        },
        {
          "v": "45,43",
          "n": true
        },
        {
          "v": "-0,00",
          "n": true
        },
        {
          "v": "OK"
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": "annee_txt",
          "b": true
        },
        {
          "v": "indice_ouverts_100",
          "b": true
        },
        {
          "v": "indice_actifs_100",
          "b": true
        },
        {
          "v": "ecart_indices_pts",
          "b": true
        },
        {
          "v": "ratio_rythme",
          "b": true
        },
        {
          "v": "var_taux_activite_pts",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": "Année",
          "b": true
        },
        {
          "v": "Comptes ouverts",
          "b": true
        },
        {
          "v": "Comptes actifs",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": "Année",
          "b": true
        },
        {
          "v": "Taux d'activité (%)",
          "b": true
        }
      ],
      [
        {
          "v": "2021",
          "n": true
        },
        {
          "v": "40",
          "n": true
        },
        {
          "v": "131 006 798",
          "n": true
        },
        {
          "v": "57 364 445",
          "n": true
        },
        {
          "v": "43.79"
        },
        {
          "v": "1 392 899",
          "n": true
        },
        {
          "v": "5 146 453 719",
          "n": true
        },
        {
          "v": "63 895",
          "n": true
        },
        {
          "v": "621 945 022",
          "n": true
        },
        {
          "v": "13 476",
          "n": true
        },
        {
          "v": "2 119 602 578",
          "n": true
        },
        {
          "v": "5 809",
          "n": true
        },
        {
          "v": "43 769 934",
          "n": true
        },
        {
          "v": "2 375",
          "n": true
        },
        {
          "v": "15.46"
        },
        {
          "v": "73 642 353",
          "n": true
        },
        {
          "v": "73 642 353",
          "n": true
        },
        {
          "v": "43,79",
          "n": true
        },
        {
          "v": "43,79",
          "n": true
        },
        {
          "v": "-0,00",
          "n": true
        },
        {
          "v": "OK"
        },
        {
          "v": "39,0",
          "n": true
        },
        {
          "v": "34,0",
          "n": true
        },
        {
          "v": "5,0",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "2020"
        },
        {
          "v": "100,0",
          "n": true
        },
        {
          "v": "100,0",
          "n": true
        },
        {
          "v": "0,0",
          "n": true
        },
        {
          "v": "1,000",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": "2020"
        },
        {
          "v": "94 226 056",
          "n": true
        },
        {
          "v": "42 803 234",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "2020"
        },
        {
          "v": "45,4",
          "n": true
        }
      ],
      [
        {
          "v": "2022",
          "n": true
        },
        {
          "v": "46",
          "n": true
        },
        {
          "v": "157 465 685",
          "n": true
        },
        {
          "v": "65 469 887",
          "n": true
        },
        {
          "v": "41.58"
        },
        {
          "v": "1 648 134",
          "n": true
        },
        {
          "v": "7 106 303 126",
          "n": true
        },
        {
          "v": "96 133",
          "n": true
        },
        {
          "v": "1 100 519 735",
          "n": true
        },
        {
          "v": "22 901",
          "n": true
        },
        {
          "v": "3 229 085 972",
          "n": true
        },
        {
          "v": "9 567",
          "n": true
        },
        {
          "v": "64 752 386",
          "n": true
        },
        {
          "v": "3 468",
          "n": true
        },
        {
          "v": "9.96"
        },
        {
          "v": "91 995 798",
          "n": true
        },
        {
          "v": "91 995 798",
          "n": true
        },
        {
          "v": "41,58",
          "n": true
        },
        {
          "v": "41,58",
          "n": true
        },
        {
          "v": "-0,00",
          "n": true
        },
        {
          "v": "OK"
        },
        {
          "v": "20,2",
          "n": true
        },
        {
          "v": "14,1",
          "n": true
        },
        {
          "v": "6,1",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "2021"
        },
        {
          "v": "139,0",
          "n": true
        },
        {
          "v": "134,0",
          "n": true
        },
        {
          "v": "5,0",
          "n": true
        },
        {
          "v": "1,037",
          "n": true
        },
        {
          "v": "-1,64",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "2021"
        },
        {
          "v": "131 006 798",
          "n": true
        },
        {
          "v": "57 364 445",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "2021"
        },
        {
          "v": "43,8",
          "n": true
        }
      ],
      [
        {
          "v": "2023",
          "n": true
        },
        {
          "v": "63",
          "n": true
        },
        {
          "v": "209 025 380",
          "n": true
        },
        {
          "v": "68 864 678",
          "n": true
        },
        {
          "v": "32.95"
        },
        {
          "v": "1 678 067",
          "n": true
        },
        {
          "v": "9 412 109 082",
          "n": true
        },
        {
          "v": "130 150",
          "n": true
        },
        {
          "v": "1 631 767 999",
          "n": true
        },
        {
          "v": "32 561",
          "n": true
        },
        {
          "v": "4 199 031 444",
          "n": true
        },
        {
          "v": "12 759",
          "n": true
        },
        {
          "v": "82 630 962",
          "n": true
        },
        {
          "v": "4 242",
          "n": true
        },
        {
          "v": "6.39"
        },
        {
          "v": "140 160 702",
          "n": true
        },
        {
          "v": "140 160 702",
          "n": true
        },
        {
          "v": "32,95",
          "n": true
        },
        {
          "v": "32,95",
          "n": true
        },
        {
          "v": "-0,00",
          "n": true
        },
        {
          "v": "OK"
        },
        {
          "v": "32,7",
          "n": true
        },
        {
          "v": "5,2",
          "n": true
        },
        {
          "v": "27,6",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "2022"
        },
        {
          "v": "167,1",
          "n": true
        },
        {
          "v": "153,0",
          "n": true
        },
        {
          "v": "14,2",
          "n": true
        },
        {
          "v": "1,093",
          "n": true
        },
        {
          "v": "-2,21",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "2022"
        },
        {
          "v": "157 465 685",
          "n": true
        },
        {
          "v": "65 469 887",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "2022"
        },
        {
          "v": "41,6",
          "n": true
        }
      ],
      [
        {
          "v": "2024",
          "n": true
        },
        {
          "v": "69",
          "n": true
        },
        {
          "v": "248 710 918",
          "n": true
        },
        {
          "v": "76 863 533",
          "n": true
        },
        {
          "v": "30.9"
        },
        {
          "v": "1 590 243",
          "n": true
        },
        {
          "v": "11 921 750 329",
          "n": true
        },
        {
          "v": "160 415",
          "n": true
        },
        {
          "v": "2 346 903 141",
          "n": true
        },
        {
          "v": "42 763",
          "n": true
        },
        {
          "v": "5 378 672 826",
          "n": true
        },
        {
          "v": "15 424",
          "n": true
        },
        {
          "v": "102 172 785",
          "n": true
        },
        {
          "v": "5 661",
          "n": true
        },
        {
          "v": "7.52"
        },
        {
          "v": "171 847 385",
          "n": true
        },
        {
          "v": "171 847 385",
          "n": true
        },
        {
          "v": "30,90",
          "n": true
        },
        {
          "v": "30,90",
          "n": true
        },
        {
          "v": "0,00",
          "n": true
        },
        {
          "v": "OK"
        },
        {
          "v": "19,0",
          "n": true
        },
        {
          "v": "11,6",
          "n": true
        },
        {
          "v": "7,4",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "2023"
        },
        {
          "v": "221,8",
          "n": true
        },
        {
          "v": "160,9",
          "n": true
        },
        {
          "v": "60,9",
          "n": true
        },
        {
          "v": "1,379",
          "n": true
        },
        {
          "v": "-8,63",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "2023"
        },
        {
          "v": "209 025 380",
          "n": true
        },
        {
          "v": "68 864 678",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "2023"
        },
        {
          "v": "32,9",
          "n": true
        }
      ],
      [
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": "2024"
        },
        {
          "v": "264,0",
          "n": true
        },
        {
          "v": "179,6",
          "n": true
        },
        {
          "v": "84,4",
          "n": true
        },
        {
          "v": "1,470",
          "n": true
        },
        {
          "v": "-2,04",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "2024"
        },
        {
          "v": "248 710 918",
          "n": true
        },
        {
          "v": "76 863 533",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "2024"
        },
        {
          "v": "30,9",
          "n": true
        }
      ]
    ]
  },
  {
    "name": "PAYS",
    "cols": 32,
    "rows": [
      [
        {
          "v": "pays",
          "b": true
        },
        {
          "v": "comptes_ouverts_2024",
          "b": true
        },
        {
          "v": "comptes_ouverts_2023",
          "b": true
        },
        {
          "v": "comptes_actifs_2024",
          "b": true
        },
        {
          "v": "taux_activite_2024_pct",
          "b": true
        },
        {
          "v": "points_services_2024",
          "b": true
        },
        {
          "v": "points_services_actifs_2024",
          "b": true
        },
        {
          "v": "taux_pts_services_actifs_pct",
          "b": true
        },
        {
          "v": "commerces_inscrits_2024",
          "b": true
        },
        {
          "v": "commerces_actifs_2024",
          "b": true
        },
        {
          "v": "volume_transactions_2024",
          "b": true
        },
        {
          "v": "volume_transactions_2023",
          "b": true
        },
        {
          "v": "valeur_transactions_2024_millions_fcfa",
          "b": true
        },
        {
          "v": "volume_intra_uemoa_2024",
          "b": true
        },
        {
          "v": "valeur_intra_uemoa_2024_millions_fcfa",
          "b": true
        },
        {
          "v": "taux_commerces_actifs_pct",
          "b": true
        },
        {
          "v": "croissance_comptes_pct",
          "b": true
        },
        {
          "v": "",
          "b": true
        },
        {
          "v": "taux_activite_recalc",
          "b": true
        },
        {
          "v": "ecart_vs_fourni_pts",
          "b": true
        },
        {
          "v": "croissance_ouverts_23_24_pct",
          "b": true
        },
        {
          "v": "taux_commerces_actifs_calc",
          "b": true
        },
        {
          "v": "rang_taux_activite_croissant",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": "ecart_moy_simple_pts",
          "b": true
        },
        {
          "v": "ecart_mediane_pts",
          "b": true
        },
        {
          "v": "z_score",
          "b": true
        },
        {
          "v": "poids_ouverts_uemoa_pct",
          "b": true
        },
        {
          "v": "poids_actifs_uemoa_pct",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": "SOURCE GRAPHIQUE — tri croissant",
          "b": true
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Benin",
          "b": true
        },
        {
          "v": "37 524 005",
          "n": true
        },
        {
          "v": "32 368 553",
          "n": true
        },
        {
          "v": "11 252 487",
          "n": true
        },
        {
          "v": "29.99"
        },
        {
          "v": "324 976",
          "n": true
        },
        {
          "v": "235 198",
          "n": true
        },
        {
          "v": "72.37"
        },
        {
          "v": "462 772",
          "n": true
        },
        {
          "v": "280 470",
          "n": true
        },
        {
          "v": "2 548 350 605",
          "n": true
        },
        {
          "v": "2 090 988 221",
          "n": true
        },
        {
          "v": "12 034 715",
          "n": true
        },
        {
          "v": "8 529 568",
          "n": true
        },
        {
          "v": "230 453",
          "n": true
        },
        {
          "v": "60.61"
        },
        {
          "v": "15.93"
        },
        {
          "v": ""
        },
        {
          "v": "29,99",
          "n": true
        },
        {
          "v": "-0,00",
          "n": true
        },
        {
          "v": "15,9",
          "n": true
        },
        {
          "v": "60,6",
          "n": true
        },
        {
          "v": "3",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "-5,28",
          "n": true
        },
        {
          "v": "-4,17",
          "n": true
        },
        {
          "v": "-0,29",
          "n": true
        },
        {
          "v": "15,1",
          "n": true
        },
        {
          "v": "14,6",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "Pays",
          "b": true
        },
        {
          "v": "Taux d'activité 2024 (%)",
          "b": true
        }
      ],
      [
        {
          "v": "Burkina",
          "b": true
        },
        {
          "v": "23 708 070",
          "n": true
        },
        {
          "v": "20 142 783",
          "n": true
        },
        {
          "v": "8 654 640",
          "n": true
        },
        {
          "v": "36.51"
        },
        {
          "v": "149 369",
          "n": true
        },
        {
          "v": "107 781",
          "n": true
        },
        {
          "v": "72.16"
        },
        {
          "v": "59 243",
          "n": true
        },
        {
          "v": "12 370",
          "n": true
        },
        {
          "v": "2 174 926 797",
          "n": true
        },
        {
          "v": "1 854 227 137",
          "n": true
        },
        {
          "v": "20 139 735",
          "n": true
        },
        {
          "v": "22 642 507",
          "n": true
        },
        {
          "v": "1 459 952",
          "n": true
        },
        {
          "v": "20.88"
        },
        {
          "v": "17.7"
        },
        {
          "v": ""
        },
        {
          "v": "36,51",
          "n": true
        },
        {
          "v": "-0,00",
          "n": true
        },
        {
          "v": "17,7",
          "n": true
        },
        {
          "v": "20,9",
          "n": true
        },
        {
          "v": "6",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "1,24",
          "n": true
        },
        {
          "v": "2,35",
          "n": true
        },
        {
          "v": "0,07",
          "n": true
        },
        {
          "v": "9,5",
          "n": true
        },
        {
          "v": "11,3",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "Niger"
        },
        {
          "v": "4,5",
          "n": true
        }
      ],
      [
        {
          "v": "Cote d'Ivoire",
          "b": true
        },
        {
          "v": "99 649 204",
          "n": true
        },
        {
          "v": "81 176 085",
          "n": true
        },
        {
          "v": "26 370 627",
          "n": true
        },
        {
          "v": "26.46"
        },
        {
          "v": "424 562",
          "n": true
        },
        {
          "v": "290 988",
          "n": true
        },
        {
          "v": "68.54"
        },
        {
          "v": "2 719 463",
          "n": true
        },
        {
          "v": "1 166 732",
          "n": true
        },
        {
          "v": "2 549 268 326",
          "n": true
        },
        {
          "v": "1 918 024 400",
          "n": true
        },
        {
          "v": "55 728 543",
          "n": true
        },
        {
          "v": "32 963 867",
          "n": true
        },
        {
          "v": "1 924 535",
          "n": true
        },
        {
          "v": "42.9"
        },
        {
          "v": "22.76"
        },
        {
          "v": ""
        },
        {
          "v": "26,46",
          "n": true
        },
        {
          "v": "0,00",
          "n": true
        },
        {
          "v": "22,8",
          "n": true
        },
        {
          "v": "42,9",
          "n": true
        },
        {
          "v": "2",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "-8,80",
          "n": true
        },
        {
          "v": "-7,70",
          "n": true
        },
        {
          "v": "-0,49",
          "n": true
        },
        {
          "v": "40,1",
          "n": true
        },
        {
          "v": "34,3",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "Cote d'Ivoire"
        },
        {
          "v": "26,5",
          "n": true
        }
      ],
      [
        {
          "v": "Guinee-Bissau",
          "b": true
        },
        {
          "v": "4 820 141",
          "n": true
        },
        {
          "v": "3 629 520",
          "n": true
        },
        {
          "v": "3 277 322",
          "n": true
        },
        {
          "v": "67.99"
        },
        {
          "v": "37 321",
          "n": true
        },
        {
          "v": "8 533",
          "n": true
        },
        {
          "v": "22.86"
        },
        {
          "v": "3 014",
          "n": true
        },
        {
          "v": "712",
          "n": true
        },
        {
          "v": "83 548 588",
          "n": true
        },
        {
          "v": "72 924 806",
          "n": true
        },
        {
          "v": "689 090",
          "n": true
        },
        {
          "v": "1 816 250",
          "n": true
        },
        {
          "v": "79 850",
          "n": true
        },
        {
          "v": "23.62"
        },
        {
          "v": "32.8"
        },
        {
          "v": ""
        },
        {
          "v": "67,99",
          "n": true
        },
        {
          "v": "0,00",
          "n": true
        },
        {
          "v": "32,8",
          "n": true
        },
        {
          "v": "23,6",
          "n": true
        },
        {
          "v": "8",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "32,72",
          "n": true
        },
        {
          "v": "33,83",
          "n": true
        },
        {
          "v": "1,81",
          "n": true
        },
        {
          "v": "1,9",
          "n": true
        },
        {
          "v": "4,3",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "Benin"
        },
        {
          "v": "30,0",
          "n": true
        }
      ],
      [
        {
          "v": "Mali",
          "b": true
        },
        {
          "v": "18 129 935",
          "n": true
        },
        {
          "v": "16 936 371",
          "n": true
        },
        {
          "v": "6 148 800",
          "n": true
        },
        {
          "v": "33.92"
        },
        {
          "v": "138 955",
          "n": true
        },
        {
          "v": "90 313",
          "n": true
        },
        {
          "v": "64.99"
        },
        {
          "v": "39 751",
          "n": true
        },
        {
          "v": "21 919",
          "n": true
        },
        {
          "v": "1 271 890 183",
          "n": true
        },
        {
          "v": "1 004 371 892",
          "n": true
        },
        {
          "v": "18 744 827",
          "n": true
        },
        {
          "v": "17 319 792",
          "n": true
        },
        {
          "v": "1 054 433",
          "n": true
        },
        {
          "v": "55.14"
        },
        {
          "v": "7.05"
        },
        {
          "v": ""
        },
        {
          "v": "33,92",
          "n": true
        },
        {
          "v": "-0,00",
          "n": true
        },
        {
          "v": "7,0",
          "n": true
        },
        {
          "v": "55,1",
          "n": true
        },
        {
          "v": "4",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "-1,35",
          "n": true
        },
        {
          "v": "-0,24",
          "n": true
        },
        {
          "v": "-0,07",
          "n": true
        },
        {
          "v": "7,3",
          "n": true
        },
        {
          "v": "8,0",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "Mali"
        },
        {
          "v": "33,9",
          "n": true
        }
      ],
      [
        {
          "v": "Niger",
          "b": true
        },
        {
          "v": "9 746 822",
          "n": true
        },
        {
          "v": "8 388 462",
          "n": true
        },
        {
          "v": "441 764",
          "n": true
        },
        {
          "v": "4.53"
        },
        {
          "v": "135 564",
          "n": true
        },
        {
          "v": "39 263",
          "n": true
        },
        {
          "v": "28.96"
        },
        {
          "v": "3 540",
          "n": true
        },
        {
          "v": "298",
          "n": true
        },
        {
          "v": "31 980 545",
          "n": true
        },
        {
          "v": "28 053 623",
          "n": true
        },
        {
          "v": "480 220",
          "n": true
        },
        {
          "v": "154 425",
          "n": true
        },
        {
          "v": "4 933",
          "n": true
        },
        {
          "v": "8.42"
        },
        {
          "v": "16.19"
        },
        {
          "v": ""
        },
        {
          "v": "4,53",
          "n": true
        },
        {
          "v": "0,00",
          "n": true
        },
        {
          "v": "16,2",
          "n": true
        },
        {
          "v": "8,4",
          "n": true
        },
        {
          "v": "1",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "-30,74",
          "n": true
        },
        {
          "v": "-29,63",
          "n": true
        },
        {
          "v": "-1,70",
          "n": true
        },
        {
          "v": "3,9",
          "n": true
        },
        {
          "v": "0,6",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "Senegal"
        },
        {
          "v": "34,4",
          "n": true
        }
      ],
      [
        {
          "v": "Senegal",
          "b": true
        },
        {
          "v": "42 579 300",
          "n": true
        },
        {
          "v": "38 076 659",
          "n": true
        },
        {
          "v": "14 648 818",
          "n": true
        },
        {
          "v": "34.4"
        },
        {
          "v": "298 359",
          "n": true
        },
        {
          "v": "125 292",
          "n": true
        },
        {
          "v": "41.99"
        },
        {
          "v": "412 172",
          "n": true
        },
        {
          "v": "218 583",
          "n": true
        },
        {
          "v": "2 874 467 953",
          "n": true
        },
        {
          "v": "2 133 525 249",
          "n": true
        },
        {
          "v": "48 487 972",
          "n": true
        },
        {
          "v": "13 489 809",
          "n": true
        },
        {
          "v": "724 996",
          "n": true
        },
        {
          "v": "53.03"
        },
        {
          "v": "11.83"
        },
        {
          "v": ""
        },
        {
          "v": "34,40",
          "n": true
        },
        {
          "v": "0,00",
          "n": true
        },
        {
          "v": "11,8",
          "n": true
        },
        {
          "v": "53,0",
          "n": true
        },
        {
          "v": "5",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "-0,86",
          "n": true
        },
        {
          "v": "0,24",
          "n": true
        },
        {
          "v": "-0,05",
          "n": true
        },
        {
          "v": "17,1",
          "n": true
        },
        {
          "v": "19,1",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "Burkina"
        },
        {
          "v": "36,5",
          "n": true
        }
      ],
      [
        {
          "v": "Togo",
          "b": true
        },
        {
          "v": "12 553 441",
          "n": true
        },
        {
          "v": "8 306 947",
          "n": true
        },
        {
          "v": "6 069 075",
          "n": true
        },
        {
          "v": "48.35"
        },
        {
          "v": "81 137",
          "n": true
        },
        {
          "v": "65 043",
          "n": true
        },
        {
          "v": "80.16"
        },
        {
          "v": "5 771",
          "n": true
        },
        {
          "v": "1 816",
          "n": true
        },
        {
          "v": "387 317 332",
          "n": true
        },
        {
          "v": "309 993 754",
          "n": true
        },
        {
          "v": "4 110 201",
          "n": true
        },
        {
          "v": "5 256 567",
          "n": true
        },
        {
          "v": "181 996",
          "n": true
        },
        {
          "v": "31.47"
        },
        {
          "v": "51.12"
        },
        {
          "v": ""
        },
        {
          "v": "48,35",
          "n": true
        },
        {
          "v": "-0,00",
          "n": true
        },
        {
          "v": "51,1",
          "n": true
        },
        {
          "v": "31,5",
          "n": true
        },
        {
          "v": "7",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "13,08",
          "n": true
        },
        {
          "v": "14,19",
          "n": true
        },
        {
          "v": "0,72",
          "n": true
        },
        {
          "v": "5,0",
          "n": true
        },
        {
          "v": "7,9",
          "n": true
        },
        {
          "v": ""
        },
        {
          "v": "Togo"
        },
        {
          "v": "48,3",
          "n": true
        }
      ],
      [
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": "Guinee-Bissau"
        },
        {
          "v": "68,0",
          "n": true
        }
      ]
    ]
  },
  {
    "name": "TCD_Pays",
    "cols": 3,
    "rows": [
      [
        {
          "v": "TCD — Comptes ouverts vs actifs par pays (2024)",
          "b": true
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": ""
        },
        {
          "v": ""
        },
        {
          "v": ""
        }
      ],
      [
        {
          "v": "Étiquettes de lignes",
          "b": true
        },
        {
          "v": "Somme de comptes_ouverts_2024",
          "b": true
        },
        {
          "v": "Somme de comptes_actifs_2024",
          "b": true
        }
      ],
      [
        {
          "v": "Benin"
        },
        {
          "v": "37 524 005",
          "n": true
        },
        {
          "v": "11 252 487",
          "n": true
        }
      ],
      [
        {
          "v": "Burkina"
        },
        {
          "v": "23 708 070",
          "n": true
        },
        {
          "v": "8 654 640",
          "n": true
        }
      ],
      [
        {
          "v": "Cote d'Ivoire"
        },
        {
          "v": "99 649 204",
          "n": true
        },
        {
          "v": "26 370 627",
          "n": true
        }
      ],
      [
        {
          "v": "Guinee-Bissau"
        },
        {
          "v": "4 820 141",
          "n": true
        },
        {
          "v": "3 277 322",
          "n": true
        }
      ],
      [
        {
          "v": "Mali"
        },
        {
          "v": "18 129 935",
          "n": true
        },
        {
          "v": "6 148 800",
          "n": true
        }
      ],
      [
        {
          "v": "Niger"
        },
        {
          "v": "9 746 822",
          "n": true
        },
        {
          "v": "441 764",
          "n": true
        }
      ],
      [
        {
          "v": "Senegal"
        },
        {
          "v": "42 579 300",
          "n": true
        },
        {
          "v": "14 648 818",
          "n": true
        }
      ],
      [
        {
          "v": "Togo"
        },
        {
          "v": "12 553 441",
          "n": true
        },
        {
          "v": "6 069 075",
          "n": true
        }
      ],
      [
        {
          "v": "Total général"
        },
        {
          "v": "248 710 918",
          "n": true
        },
        {
          "v": "76 863 533",
          "n": true
        }
      ]
    ]
  }
];
