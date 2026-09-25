import type { Metadata } from "next";
import { platform } from "@/data/site";

export function pageMetadata(
  title: string,
  description: string,
  path = "",
  index = true,
): Metadata {
  const canonical = `${platform.siteUrl}${path}`;
  const fullTitle =
    title === platform.title ? title : `${title} — ${platform.title}`;

  return {
    title,
    description,
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
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
      title: fullTitle,
      description,
      images: [platform.ogImage],
    },
  };
}

export const platformJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: platform.title,
  url: platform.siteUrl,
  inLanguage: ["en", "hi"],
  creator: {
    "@type": "Person",
    name: platform.creatorName,
  },
};
