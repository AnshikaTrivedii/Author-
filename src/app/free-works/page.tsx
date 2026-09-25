import { pageMetadata } from "@/lib/seo";
import { FreeWorksPage } from "@/components/platform/FreeWorksPage";

export const metadata = pageMetadata(
  "Free works",
  "The first two presentations of Echoes of Memories, available to read, listen to, and watch.",
  "/free-works",
);

export default function Page() {
  return <FreeWorksPage />;
}
