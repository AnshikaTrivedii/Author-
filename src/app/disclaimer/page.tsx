import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getLegal } from "@/data/legal";
import { LegalDocument } from "@/components/platform/LegalDocument";

export const metadata = pageMetadata(
  "Disclaimer",
  "Draft disclaimer. Subject to legal review.",
  "/disclaimer",
);

export default function Page() {
  if (!getLegal("disclaimer")) notFound();
  return <LegalDocument slug="disclaimer" />;
}
