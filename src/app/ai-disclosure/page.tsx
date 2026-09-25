import { pageMetadata } from "@/lib/seo";
import { AiDisclosurePage } from "@/components/platform/AiDisclosurePage";

export const metadata = pageMetadata(
  "AI-assisted content disclosure",
  "Selected visual and production elements may be created or assisted using AI tools.",
  "/ai-disclosure",
);

export default function Page() {
  return <AiDisclosurePage />;
}
