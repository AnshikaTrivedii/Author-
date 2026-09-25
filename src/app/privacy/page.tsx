import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getLegal } from "@/data/legal";
import { LegalDocument } from "@/components/platform/LegalDocument";

export const metadata = pageMetadata(
  "Privacy policy",
  "Draft privacy policy. Subject to legal review.",
  "/privacy",
);

export default function Page() {
  if (!getLegal("privacy")) notFound();
  return <LegalDocument slug="privacy" />;
}
