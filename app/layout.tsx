import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kaizen-art.com'),
  title: {
    default: 'Kaizen | Anime & Manga Illustration',
    template: '%s | Kaizen',
  },
  description:
    'Premium anime and manga character illustrations by Kaizen. Commissions open — characters, fan art, full illustrations.',
  keywords: ['anime artist', 'manga illustration', 'commission', 'character design', 'fan art'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Kaizen Portfolio',
    title: 'Kaizen | Anime & Manga Illustration',
    description:
      'Premium anime and manga character illustrations. Commissions open.',
    images: [{ url: '/images/og/og-default.jpg', width: 1200, height: 630, alt: 'Kaizen — Anime & Manga Artist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaizen | Anime & Manga Illustration',
    description: 'Premium anime and manga character illustrations. Commissions open.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Kaizen',
              jobTitle: 'Anime & Manga Illustrator',
              url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kaizen-art.com',
              sameAs: [
                'https://www.instagram.com/kaizen_arts/?hl=en',
                'https://twitter.com/kaizenart',
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#0A0A0A] text-[#F5F5F0] antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
