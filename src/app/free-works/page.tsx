import { pageMetadata } from "@/lib/seo";
import { FreeWorksPage } from "@/components/platform/FreeWorksPage";
import { managedWorks } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata(
  "Free works",
  "Free stories from Echoes of Memories.",
  "/free-works",
);

export default async function Page() {
  const works = (await managedWorks()).filter(
    (work) => work.pricingModel === "free" && work.status === "published",
  );
  return <FreeWorksPage works={works} />;
}
