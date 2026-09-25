import { pageMetadata } from "@/lib/seo";
import { WorksLibrary } from "@/components/platform/WorksLibrary";

export const metadata = pageMetadata(
  "Works",
  "The Echoes of Memories library — works to read, listen to, and watch.",
  "/works",
);

export default function Page() {
  return <WorksLibrary />;
}
