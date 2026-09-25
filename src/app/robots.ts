import type { MetadataRoute } from "next";
import { platform } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/library", "/checkout", "/api/"],
    },
    sitemap: `${platform.siteUrl}/sitemap.xml`,
  };
}
