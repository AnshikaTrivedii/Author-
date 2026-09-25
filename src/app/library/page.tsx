import { pageMetadata } from "@/lib/seo";
import { LibraryPage } from "@/components/platform/LibraryPage";

export const metadata = pageMetadata(
  "My library",
  "Purchased digital works appear here after a completed payment.",
  "/library",
  false,
);

export default function Page() {
  return <LibraryPage />;
}
