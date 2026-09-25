import { pageMetadata } from "@/lib/seo";
import { AdminPage } from "@/components/platform/AdminPage";

export const metadata = pageMetadata(
  "Admin architecture",
  "Content model for Echoes of Memories works, editions, prices and media.",
  "/admin",
  false,
);

export default function Page() {
  return <AdminPage />;
}
