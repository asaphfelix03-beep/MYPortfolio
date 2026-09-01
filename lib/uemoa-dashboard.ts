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

export const dashboard = {
  "title": "MONNAIE ÉLECTRONIQUE UEMOA — SYNTHÈSE 2020-2024",
  "subtitle": "Comptes ouverts vs comptes actifs — position de la Côte d'Ivoire  •  5 années  •  8 pays",
  "kpis": [
    {
      "label": "TCAC COMPTES OUVERTS",
      "value": "27,46 %",
      "note": "par an, 2020→2024"
    },
    {
      "label": "TCAC COMPTES ACTIFS",
      "value": "15,76 %",
      "note": "par an, 2020→2024"
    },
    {
      "label": "ÉCART DE RYTHME",
      "value": "+11,70 pts",
      "note": "ouverts moins actifs"
    },
    {
      "label": "TAUX D'ACTIVITÉ 2024",
      "value": "30,90 %",
      "note": "contre 45,43 % en 2020"
    },
    {
      "label": "CÔTE D'IVOIRE — TAUX",
      "value": "26,46 %",
      "note": "-4,44 pts sous la moyenne UEMOA"
    },
    {
      "label": "RANG (TAUX CROISSANT)",
      "value": "2 / 8",
      "note": "z = -0,49 (proche de la moyenne)"
    },
    {
      "label": "PART DES OUVERTS UEMOA",
      "value": "40,1 %",
      "note": "mais 34,3 % des comptes actifs"
    },
    {
      "label": "DÉFICIT D'ACTIVATION",
      "value": "-36,1 M",
      "note": "comptes, vs maintien du taux 2020"
    }
  ],
  "answerTitle": "RÉPONSE À LA QUESTION DE RECHERCHE",
  "answer": "Non. Entre 2020 et 2024, les comptes ouverts progressent de 27,46 % par an contre 15,76 % pour les comptes actifs, soit un écart de 11,70 points annuels. Le taux d'activité recule donc chaque année, de 45,43 % à 30,90 % (-14,52 points). La Côte d'Ivoire se classe 2e sur 8 par taux croissant (26,46 %) tout en concentrant 40,1 % des comptes ouverts de la zone.",
  "rankingTitle": "CLASSEMENT PAR TAUX D'ACTIVITÉ 2024 (croissant)",
  "ranking": [
    {
      "rank": 1,
      "pays": "Niger",
      "taux": 4.53,
      "ouverts": 9746822,
      "actifs": 441764
    },
    {
      "rank": 2,
      "pays": "Cote d'Ivoire",
      "taux": 26.46,
      "ouverts": 99649204,
      "actifs": 26370627
    },
    {
      "rank": 3,
      "pays": "Benin",
      "taux": 29.99,
      "ouverts": 37524005,
      "actifs": 11252487
    },
    {
      "rank": 4,
      "pays": "Mali",
      "taux": 33.92,
      "ouverts": 18129935,
      "actifs": 6148800
    },
    {
      "rank": 5,
      "pays": "Senegal",
      "taux": 34.4,
      "ouverts": 42579300,
      "actifs": 14648818
    },
    {
      "rank": 6,
      "pays": "Burkina",
      "taux": 36.51,
      "ouverts": 23708070,
      "actifs": 8654640
    },
    {
      "rank": 7,
      "pays": "Togo",
      "taux": 48.35,
      "ouverts": 12553441,
      "actifs": 6069075
    },
    {
      "rank": 8,
      "pays": "Guinee-Bissau",
      "taux": 67.99,
      "ouverts": 4820141,
      "actifs": 3277322
    }
  ]
} as const;

export const charts = {
  "comptes": [
    {
      "annee": "2020",
      "ouverts": 94226056,
      "actifs": 42803234
    },
    {
      "annee": "2021",
      "ouverts": 131006798,
      "actifs": 57364445
    },
    {
      "annee": "2022",
      "ouverts": 157465685,
      "actifs": 65469887
    },
    {
      "annee": "2023",
      "ouverts": 209025380,
      "actifs": 68864678
    },
    {
      "annee": "2024",
      "ouverts": 248710918,
      "actifs": 76863533
    }
  ],
  "tauxZone": [
    {
      "annee": "2020",
      "taux": 45.43
    },
    {
      "annee": "2021",
      "taux": 43.79
    },
    {
      "annee": "2022",
      "taux": 41.58
    },
    {
      "annee": "2023",
      "taux": 32.95
    },
    {
      "annee": "2024",
      "taux": 30.9
    }
  ],
  "indices": [
    {
      "annee": "2020",
      "ouverts": 100.0,
      "actifs": 100.0
    },
    {
      "annee": "2021",
      "ouverts": 139.03,
      "actifs": 134.02
    },
    {
      "annee": "2022",
      "ouverts": 167.11,
      "actifs": 152.96
    },
    {
      "annee": "2023",
      "ouverts": 221.83,
      "actifs": 160.89
    },
    {
      "annee": "2024",
      "ouverts": 263.95,
      "actifs": 179.57
    }
  ],
  "tauxPays": [
    {
      "pays": "Niger",
      "taux": 4.53
    },
    {
      "pays": "Cote d'Ivoire",
      "taux": 26.46
    },
    {
      "pays": "Benin",
      "taux": 29.99
    },
    {
      "pays": "Mali",
      "taux": 33.92
    },
    {
      "pays": "Senegal",
      "taux": 34.4
    },
    {
      "pays": "Burkina",
      "taux": 36.51
    },
    {
      "pays": "Togo",
      "taux": 48.35
    },
    {
      "pays": "Guinee-Bissau",
      "taux": 67.99
    }
  ]
} as const;
