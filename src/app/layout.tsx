import type { Metadata, Viewport } from "next";
import { platform } from "@/data/site";
import { platformJsonLd } from "@/lib/seo";
import {
  cormorant,
  manrope,
  notoSansDeva,
  notoSerifDeva,
} from "@/lib/fonts";
import { AmbientSound } from "@/components/audience/AmbientSound";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import { Navbar } from "@/components/layout/Navbar";
import { ReloadToLanding } from "@/components/layout/ReloadToLanding";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SkipLink } from "@/components/layout/SkipLink";
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
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable} ${notoSerifDeva.variable} ${notoSansDeva.variable} h-full bg-ink antialiased`}
    >
      <body className="min-h-full bg-ink font-sans text-ivory">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('loi-locale')==='hi')document.documentElement.lang='hi'}catch(e){}`,
          }}
        />
        <div className="grain" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(platformJsonLd) }}
        />
        <ReloadToLanding />
        <LanguageProvider>
          <SkipLink />
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
          <AmbientSound />
        </LanguageProvider>
      </body>
    </html>
  );
}
