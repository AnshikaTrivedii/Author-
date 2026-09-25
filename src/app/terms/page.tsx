import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getLegal } from "@/data/legal";
import { LegalDocument } from "@/components/platform/LegalDocument";

export const metadata = pageMetadata(
  "Terms of use",
  "Draft terms of use and digital content purchase policy.",
  "/terms",
);

export default function Page() {
  if (!getLegal("terms")) notFound();
  return <LegalDocument slug="terms" />;
}
