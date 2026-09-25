import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getWork, publishedWorks } from "@/data/works";
import { WorkDetail } from "@/components/platform/WorkDetail";
import { platform } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams() {
  return publishedWorks().map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return pageMetadata("Work", platform.statement.en, "/works");
  const title = work.title.en;
  return pageMetadata(title, work.description.en, `/works/${work.slug}`);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work || work.status === "unpublished") notFound();

  return (
    <main id="main">
      <WorkDetail work={work} />
    </main>
  );
}
