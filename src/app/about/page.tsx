import { pageMetadata } from "@/lib/seo";
import { AboutPage } from "@/components/platform/AboutPage";

export const metadata = pageMetadata(
  "About",
  "Sanjay Kumar Rai, engineer, valuer, and author of Echoes of Memories.",
  "/about",
);

export default function Page() {
  return <AboutPage />;
}
