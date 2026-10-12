# Portfolio — Ojewumi Asaph Felix

Code source de [portfolio-ojewumi.tech](https://portfolio-ojewumi.tech) : le
portfolio d'un étudiant en Licence 3 Cybersécurité et Intelligence
Artificielle à l'ESATIC (Abidjan).

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion ·
TypeScript. Toutes les pages sont générées statiquement et déployées sur
Vercel.

## Lancer le projet

```bash
npm install
npm run dev          # http://localhost:3000
```

Vérifier une version de production en local :

```bash
npm run build
npm start
```

`next dev` et `next build` partagent le dossier `.next/` : arrêtez le serveur
de développement avant de lancer un build.

## Où vit le contenu

| Contenu | Fichier |
| --- | --- |
| Nom, école, disponibilité, e-mail, téléphone, liens, CV | `lib/site.ts` |
| Projets (accueil et pages `/projets/<slug>`) | `lib/projects.ts` |
| Classeur de l'étude UEMOA | `lib/case-studies.ts`, `lib/uemoa-*.ts` |
| Compétences et leur preuve | `lib/skills.ts` |
| Formation, certifications, langues | `lib/parcours.ts` |

Ajouter un projet revient à ajouter un objet dans `lib/projects.ts` : la
bande de l'accueil, le filtre, la page détaillée, le sitemap et les données
structurées suivent.

## Remplacer le CV

1. Exportez le nouveau CV en PDF.
2. Remplacez le fichier `public/documents/cv-ojewumi-asaph-felix.pdf` en
   gardant **exactement ce nom**.
3. Lancez `npm run build` : la taille affichée sur les boutons se met à jour,
   et le build s'arrête avec un message explicite si le fichier manque.

Tous les boutons du site pointent vers `/cv`, qui sert ce fichier sous le nom
`CV-Ojewumi-Asaph-Felix.pdf`. Pour changer ce nom ou le chemin, modifiez
l'objet `cv` dans `lib/site.ts`.

## Déployer

Le projet est lié au projet Vercel `portfolio-asaph-main`, publié sur
portfolio-ojewumi.tech.

```bash
vercel --prod
```

La commande envoie le dossier de travail tel quel, fichiers non commités
compris : commitez d'abord pour que GitHub et la production restent
identiques. Vercel installe les dépendances avec pnpm (`pnpm-lock.yaml`) ;
après un changement de dépendance, mettez à jour les deux fichiers de
verrouillage (`npm install` puis `npx pnpm@10 install --lockfile-only`).

## Sécurité

`next.config.mjs` impose une Content-Security-Policy stricte : tout nouvel
hôte externe (police, script, iframe) doit y être ajouté explicitement.
