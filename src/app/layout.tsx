import localFont from 'next/font/local';
import Script from 'next/script';

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
  metadataBase: new URL('https://fascinantedigital.com'),
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
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-icon.png' }],
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
      <head>
        <link
          rel="preload"
          href="/fonts/GeistVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GeistMonoVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
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
        <Script
          id="cal-embed"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
              Cal("init", "30min", {origin:"https://app.cal.com"});
              
              // Configuración responsive: ocultar detalles en móvil, mostrar en desktop
              const isMobile = window.innerWidth < 768;
              Cal.ns["30min"]("ui", {"hideEventTypeDetails": isMobile,"layout":"month_view"});
            `,
          }}
        />
      </body>
    </html>
  );
}
