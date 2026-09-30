import { pageMetadata } from "@/lib/seo";
import { AuthorDeskPage } from "@/components/audience/AuthorDeskPage";

export const metadata = pageMetadata(
  "Author's desk",
  "Short dated notes from the desk: voice takes, translation and film work.",
  "/desk",
);

export default function Page() {
  return <AuthorDeskPage />;
}
