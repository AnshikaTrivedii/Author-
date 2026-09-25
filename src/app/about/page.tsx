import { pageMetadata } from "@/lib/seo";
import { AboutPage } from "@/components/platform/AboutPage";

export const metadata = pageMetadata(
  "About",
  "Why Echoes of Memories exists — a creative journey in words, voice and film.",
  "/about",
);

export default function Page() {
  return <AboutPage />;
}
