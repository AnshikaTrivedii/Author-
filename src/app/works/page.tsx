import { pageMetadata } from "@/lib/seo";
import { WorksLibrary } from "@/components/platform/WorksLibrary";
import { managedWorks } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata(
  "Works",
  "The Echoes of Memories library — works to read, listen to, and watch.",
  "/works",
);

export default async function Page() {
  const works = (await managedWorks()).filter((work) => work.status !== "unpublished");
  return <WorksLibrary works={works} />;
}
