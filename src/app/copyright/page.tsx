import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getLegal } from "@/data/legal";
import { LegalDocument } from "@/components/platform/LegalDocument";

export const metadata = pageMetadata(
  "Copyright",
  "Copyright for books, audio, films, photographs and website content.",
  "/copyright",
);

export default function Page() {
  if (!getLegal("copyright")) notFound();
  return <LegalDocument slug="copyright" />;
}
