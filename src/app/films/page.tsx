import { pageMetadata } from "@/lib/seo";
import { FilmsIndex } from "@/components/platform/FilmsIndex";
import { managedWorks } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata(
  "Films",
  "Short films and forthcoming film presentations from Echoes of Memories.",
  "/films",
);

export default async function Page() {
  const works = (await managedWorks()).filter(
    (work) => work.status !== "unpublished" && work.film.available,
  );
  return <FilmsIndex works={works} />;
}
