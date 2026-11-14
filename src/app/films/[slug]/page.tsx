import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { findManagedWork } from "@/lib/admin-data";
import { FilmPage } from "@/components/platform/FilmPage";

type Params = { slug: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const work = await findManagedWork(slug);
  return pageMetadata(
    work ? `Work ${work.number} — film` : "Film",
    work?.film.synopsis.en ?? "Film presentation.",
    `/films/${slug}`,
  );
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const work = await findManagedWork(slug);
  if (!work?.film.available || work.status === "unpublished") notFound();
  return (
    <main id="main">
      <FilmPage work={work} />
    </main>
  );
}
