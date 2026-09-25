import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/the-book", destination: "/works/smritiyon-ki-anugoonj", permanent: true },
      { source: "/the-story", destination: "/", permanent: true },
      { source: "/inside", destination: "/", permanent: true },
      { source: "/author", destination: "/about", permanent: true },
      { source: "/reviews", destination: "/", permanent: true },
      { source: "/buy", destination: "/free-works", permanent: true },
      {
        source: "/works/work-01",
        destination: "/works/smritiyon-ki-anugoonj",
        permanent: true,
      },
      {
        source: "/works/work-02",
        destination: "/works/ek-sawal-apne-aap-se",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
