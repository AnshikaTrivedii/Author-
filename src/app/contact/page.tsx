import { pageMetadata } from "@/lib/seo";
import { ContactPage } from "@/components/platform/ContactPage";

export const metadata = pageMetadata(
  "Contact",
  "Write to Echoes of Memories.",
  "/contact",
);

export default function Page() {
  return <ContactPage />;
}
