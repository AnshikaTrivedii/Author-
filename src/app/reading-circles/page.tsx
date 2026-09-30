import { pageMetadata } from "@/lib/seo";
import { ReadingCirclesPage } from "@/components/audience/ReadingCirclesPage";

export const metadata = pageMetadata(
  "Reading circles",
  "Quiet guides for families, friends and rooms reading Echoes of Memories together.",
  "/reading-circles",
);

export default function Page() {
  return <ReadingCirclesPage />;
}
