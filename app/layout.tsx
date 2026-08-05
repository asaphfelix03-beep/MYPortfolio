import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const siteUrl = 'https://portfolio-ojewumi.tech'
const title = 'Asaph Felix | Cybersécurité & Intelligence Artificielle'
const description =
  'Portfolio de Ojewumi Asaph Felix - Étudiant en Cybersécurité et Intelligence Artificielle à Abidjan. Projets en analyse de données, sécurité des réseaux et développement web et mobile.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'Asaph Felix',
    title,
    description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ojewumi Asaph Felix — Cybersécurité, données et développement',
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
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${instrument.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
