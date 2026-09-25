import type { MetadataRoute } from "next";
import { platform } from "@/data/site";
import { publishedWorks, worksWithFilm } from "@/data/works";

const routes = [
  "",
  "/free-works",
  "/works",
  "/audio-video",
  "/films",
  "/about",
  "/contact",
  "/ai-disclosure",
  "/copyright",
  "/terms",
  "/privacy",
  "/refund-cancellation",
  "/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = routes.map((path) => ({
    url: `${platform.siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const works = publishedWorks().map((work) => ({
    url: `${platform.siteUrl}/works/${work.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const films = worksWithFilm().map((work) => ({
    url: `${platform.siteUrl}/films/${work.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...works, ...films];
}
