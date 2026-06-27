import type { Metadata } from 'next';
import { Ovo } from '@next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { config } from '@/lib/config';

const legan = localFont({
  src: './fonts/Legan.woff',
  variable: '--font-legan',
  weight: '100 900',
});

const thesignature = localFont({
  src: './fonts/Thesignature.ttf',
  variable: '--font-thesignature',
  weight: '100 900',
});

const wonder = localFont({
  src: './fonts/Wonder.woff',
  variable: '--font-wonder',
  weight: '100 900',
});

const ovo = Ovo({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-ovo',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://fikriintan.vercel.app/';

export const metadata: Metadata = {
  title: `The Wedding of ${config.coupleNames}`,
  description: `${config.eventDate} Wedding Invitation of ${config.coupleNames}`,
  openGraph: {
    title: `The Wedding of ${config.coupleNames}`,
    description: `${config.eventDate} Wedding Invitation of ${config.coupleNames}`,
    url: siteUrl,
    siteName: `The Wedding of ${config.coupleNames}`,
    images: [
      {
        url: `${siteUrl}/slide_7.jpg`,
        width: 1200,
        height: 630,
        alt: `The Wedding of ${config.coupleNames}`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: `The Wedding of ${config.coupleNames}`,
    description: `${config.eventDate} Wedding Invitation of ${config.coupleNames}`,
    images: [`${siteUrl}/slide_7.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-[#0a0a0a]  ${ovo.variable} ${thesignature.variable} ${wonder.variable} ${legan.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
