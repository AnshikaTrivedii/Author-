import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getWork, worksWithFilm } from "@/data/works";
import { FilmPage } from "@/components/platform/FilmPage";

type Params = { slug: string };

export function generateStaticParams() {
  return worksWithFilm().map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  return pageMetadata(
    work ? `Work ${work.number} — film` : "Film",
    work?.film.synopsis.en ?? "Film presentation.",
    `/films/${slug}`,
  );
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work?.film.available || work.status === "unpublished") notFound();
  return (
    <main id="main">
      <FilmPage work={work} />
    </main>
  );
}
