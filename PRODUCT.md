# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters, hiring managers and school/company tutors in Côte d'Ivoire and West Africa, reading in French, often on a phone, deciding in under a minute whether to keep reading a student's application. Their job on this site: judge whether this candidate is worth an interview for an internship or a work-study contract (stage / alternance).

Secondary: peers and teachers who land here from a shared link or a GitHub profile.

## Product Purpose

The personal portfolio of Ojewumi Asaph Felix, Licence 3 student in Cybersecurity and Artificial Intelligence at ESATIC, Abidjan. It exists to win interviews for a data / cybersecurity internship or work-study placement. Success is a recruiter making contact, or opening the UEMOA case study and reading it through.

## Positioning

A double profile held as one claim, not two: securing systems **and** making data speak. Neither half is decoration — the security side is carried by the ESATIC track and nine certifications, the data side by finished analyses with their figures, method and quality controls exposed.

What a neighbouring student portfolio cannot truthfully copy: real analyses on public West African data (BCEAO electronic money, Côte d'Ivoire electrification), published with their source data, their method and their reservations, not just a screenshot.

## Operating Context

Read mostly on a phone, on an unreliable or metered connection, often as one tab among several open applications. French throughout. Local references (BCEAO, UEMOA, ESATIC, Treichville) are an asset with this audience and need no translation.

## Capabilities and Constraints

- Next.js 16 (App Router) / React 19 / Tailwind 4 / Framer Motion, statically generated, deployed on Vercel at portfolio-ojewumi.tech.
- Every project has a page at `/projets/<slug>`, built from `lib/projects.ts`; `/projets/monnaie-electronique-uemoa` also renders the six sheets of an Excel workbook as HTML — values, pivot table, quality controls and charts — deliberately not as a downloadable file.
- `/cv` serves exactly `public/documents/cv-ojewumi-asaph-felix.pdf` (configured in `lib/site.ts`) under the name `CV-Ojewumi-Asaph-Felix.pdf`; the build fails if the file is missing.
- Contact form validates its fields, then hands a pre-filled e-mail to the visitor's mail app (Gmail web and copy as fallbacks) and says nothing is sent until they send it; there is no backend.
- Strict Content-Security-Policy in `next.config.mjs`; any new external font, script or frame host has to be added there explicitly.
- No analytics beyond Vercel; no CMS; content lives in typed modules under `lib/` (`site.ts`, `projects.ts`, `skills.ts`, `parcours.ts`).

## Brand Commitments

- Name, portrait photograph, and the French voice of the existing copy.
- The UEMOA case study and its workbook viewer, the nine detailed certifications with issuers, dates and verification links, the portrait, and the CV download — all confirmed by the user as untouchable in a redesign.
- Public source code: the site links to its own repository, and the analysis has its own public repository.
- The user pinned, for the home page redesign, a night-canvas visual world with a vivid accent, oversized geometric display type, a full-bleed illustrated first viewport, a vertical side rail and section-by-section scrolling — inspired in effect, not copied, from kuon-yagi-portfolio.netlify.app. Original artwork and a freely licensed geometric face are a condition of that commitment.

## Evidence on Hand

- Seven projects: SynthID-Graph (synthetic-identity fraud rings, simulated data), Côte d'Ivoire electrification 1960-2023 (live dashboard), UEMOA electronic money 2020-2024 (BCEAO), OIBSIP Data Analytics internship (9 notebooks), CVFacile (live product), N'ti (Android APK) and Matronassist-ci (in progress). Five have a public repository. The pharmaceutical sales analysis and EcoCollect were removed for good on the user's request (Oct 2026).
- Nine certificates as PDFs in `public/certificates/`, four issuers (DataCamp, Microsoft/Coursera, IBM/Coursera, Cisco), two with issuer verification URLs.
- Portrait photograph, CV PDF, N'ti Android package (88 Mo).
- No testimonials, no grades, no employment history, no client references: none exist and none may be invented.

## Product Principles

1. Show the work, never assert it. A figure with its method beats an adjective.
2. The double profile is one sentence, not two columns.
3. A recruiter on a phone must reach the proof and the contact without hunting.
4. Nothing shipped may outrun what the user has actually done.
5. Source stays public and reproducible; what cannot be verified is marked, not smoothed over.

## Accessibility & Inclusion

No formal standard was set by the user. Established in practice: honour `prefers-reduced-motion`, keep touch targets usable one-handed on a phone, and never make content depend on an animation firing.
