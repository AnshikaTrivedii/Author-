import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getLegal } from "@/data/legal";
import { LegalDocument } from "@/components/platform/LegalDocument";

export const metadata = pageMetadata(
  "Refund & cancellation",
  "Draft refund and cancellation policy. Subject to legal review.",
  "/refund-cancellation",
);

export default function Page() {
  if (!getLegal("refund-cancellation")) notFound();
  return <LegalDocument slug="refund-cancellation" />;
}
