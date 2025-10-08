import localFont from 'next/font/local';

import type { Metadata } from 'next';

import Navbar from '@/components/navbar';
import Footer from '@/components/sections/footer';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: {
    default: 'Fascinante Digital - Agencia de Marketing Digital',
    template: '%s | Fascinante Digital',
  },
  description:
    'Agencia de Marketing Digital para latinos en EE.UU. Impulsamos negocios hispanos con SEO, diseño web, publicidad digital y analítica avanzada.',
  keywords: [
    'Marketing Digital',
    'SEO',
    'Diseño Web',
    'Agencia Digital',
    'West Palm Beach',
    'Marketing para Latinos',
    'Publicidad Digital',
    'Automatización',
  ],
  authors: [{ name: 'Fascinante Digital' }],
  creator: 'Fascinante Digital',
  publisher: 'Fascinante Digital',
  appleWebApp: {
    title: 'Fascinante',
    statusBarStyle: 'default',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-icon.png' }],
    shortcut: [{ url: '/favicon.ico' }],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Fascinante Digital - Agencia de Marketing Digital',
    description:
      'Agencia de Marketing Digital para latinos en EE.UU. Impulsamos negocios hispanos con SEO, diseño web, publicidad digital y analítica avanzada.',
    siteName: 'Fascinante Digital',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fascinante Digital - Agencia de Marketing Digital',
      },
    ],
    locale: 'es_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fascinante Digital - Agencia de Marketing Digital',
    description:
      'Agencia de Marketing Digital para latinos en EE.UU. Impulsamos negocios hispanos con SEO, diseño web y publicidad digital.',
    images: ['/og-image.jpg'],
    creator: '@FascinanteDigital',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
