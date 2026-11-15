import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { platform } from "@/data/site";
import { platformJsonLd } from "@/lib/seo";
import { themeBootScript } from "@/lib/theme";
import {
  cormorant,
  manrope,
  notoSansDeva,
  notoSerifDeva,
} from "@/lib/fonts";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

const title = platform.title;
const description = `${platform.title}. ${platform.statement.en}`;

export const viewport: Viewport = {
  themeColor: "#0D0D0C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(platform.siteUrl),
  title: {
    default: title,
    template: `%s — ${platform.title}`,
  },
  description,
  keywords: [platform.title, "Read", "Listen", "Watch"],
  authors: [{ name: platform.creatorName, url: platform.siteUrl }],
  creator: platform.creatorName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    url: platform.siteUrl,
    siteName: platform.title,
    title,
    description,
    images: [
      {
        url: platform.ogImage,
        width: 1200,
        height: 630,
        alt: platform.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [platform.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: platform.siteUrl,
    languages: {
      en: platform.siteUrl,
      hi: platform.siteUrl,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable} ${notoSerifDeva.variable} ${notoSansDeva.variable} h-full bg-ink antialiased`}
    >
      <body className="min-h-full bg-ink font-sans text-ivory">
        <Script id="loi-locale" strategy="beforeInteractive">
          {`try{if(localStorage.getItem('loi-locale')==='hi')document.documentElement.lang='hi'}catch(e){}`}
        </Script>
        <Script id="loi-theme" strategy="beforeInteractive">
          {themeBootScript}
        </Script>
        <Script
          id="platform-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(platformJsonLd) }}
        />
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
