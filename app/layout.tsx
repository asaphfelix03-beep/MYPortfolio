import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { site } from '@/lib/site'
import { INTRO_FLAG, MOTION_FAILSAFE_MS } from '@/lib/motion'
import { SmoothScroll } from '@/components/motion/smooth-scroll'
import { Cursor } from '@/components/motion/cursor'
import { Loader } from '@/components/motion/loader'
import { ScrollProgress } from '@/components/motion/scroll-progress'
import { Spotlight } from '@/components/motion/spotlight'
import './globals.css'

// Four voices with four jobs: an expressive grotesque for titles, a humanist
// sans for reading, a serif italic for the accent word of a title, a mono
// for small labels. Self-hosted by next/font, so the strict CSP needs no
// new host.
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-geo',
  display: 'swap',
})

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-serif',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-code',
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbf9' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0d0b' },
  ],
  colorScheme: 'light dark',
}

// Runs before first paint so a stored or system dark theme never flashes light.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`

// Also before first paint: html.motion lets the CSS hold the hero in its
// entrance pose and html.intro shows the curtain. Without JavaScript or with
// reduced motion neither class exists, so everything is simply visible. The
// timer lifts both if the page never hydrates.
const motionScript = `(function(){var h=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;h.classList.add('motion');var s;try{s=sessionStorage.getItem('${INTRO_FLAG}')}catch(e){}if(!s)h.classList.add('intro');setTimeout(function(){if(!('motionReady' in h.dataset))h.classList.remove('motion','intro')},${MOTION_FAILSAFE_MS})})()`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // data-scroll-behavior tells Next to suspend the CSS smooth scroll
    // during route changes; without it, arriving on /#section from a
    // project page overshot the section by several hundred pixels.
    <html lang="fr" className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript + ';' + motionScript }} />
      </head>
      <body className="bg-background pb-20 text-foreground antialiased md:pb-0">
        <Loader />
        <ScrollProgress />
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        {children}
        <SmoothScroll />
        <Cursor />
        <Spotlight />
        <div aria-hidden className="grain" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
