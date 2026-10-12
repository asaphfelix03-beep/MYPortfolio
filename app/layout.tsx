import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Jost } from 'next/font/google'
import { site } from '@/lib/site'
import './globals.css'

// The night's single voice: a geometric sans with real character in the
// caps, self-hosted by next/font so the strict CSP needs no new host. The
// editorial serif and the second sans of the light world are gone with it:
// every page is in the night now, and two fewer families means two fewer
// font files preloaded on every visit.
// Loaded as the variable font: one file covers every weight the pages use,
// including the workbook viewer's bold cells.
const jost = Jost({
  subsets: ['latin'],
  variable: '--font-geo',
  display: 'swap',
})

const title = `${site.name} | Cybersécurité & intelligence artificielle`
const description =
  "Portfolio d'Ojewumi Asaph Felix, étudiant en Licence 3 Cybersécurité et Intelligence Artificielle à l'ESATIC (Abidjan). Détection de fraude sur graphe, analyses de données publiques ivoiriennes, applications web et mobiles. Disponible pour un stage dès fin février 2027."

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.shortName}`,
  },
  description,
  applicationName: site.shortName,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    'Ojewumi Asaph Felix',
    'Asaph Felix',
    'cybersécurité',
    'intelligence artificielle',
    'analyse de données',
    'ESATIC',
    'Abidjan',
    'stage',
    'portfolio',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    locale: 'fr_FR',
    url: site.url,
    siteName: site.shortName,
    title,
    description,
    firstName: 'Asaph Felix',
    lastName: 'Ojewumi',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ojewumi Asaph Felix, cybersécurité et intelligence artificielle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: { telephone: false },
  // Icons come from app/icon.svg and app/apple-icon.png, fingerprinted by
  // Next so browsers never keep a stale favicon.
}

export const viewport: Viewport = {
  themeColor: '#f8fafe',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // data-scroll-behavior tells Next to suspend the CSS smooth scroll
    // during route changes; without it, arriving on /#section from a
    // project page overshot the section by several hundred pixels.
    <html lang="fr" className={jost.variable} data-scroll-behavior="smooth">
      <body className="bg-background text-foreground antialiased">
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
