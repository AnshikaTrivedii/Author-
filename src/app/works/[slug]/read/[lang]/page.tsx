import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { findManagedWork } from "@/lib/admin-data";
import { Reader } from "@/components/platform/Reader";
import { canAccessPublicly } from "@/lib/access";

type Params = { slug: string; lang: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, lang } = await params;
  const work = await findManagedWork(slug);
  const language = lang === "hi" ? "Hindi" : "English";
  return pageMetadata(
    work ? `Work ${work.number} — ${language}` : "Read",
    "Read the Hindi or English edition.",
    `/works/${slug}/read/${lang}`,
  );
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug, lang } = await params;
  const work = await findManagedWork(slug);
  if (!work || (lang !== "hi" && lang !== "en")) notFound();
  const edition = lang === "hi" ? work.hindi : work.english;
  const allowed =
    canAccessPublicly(work, "read") && edition.status === "published";

  return (
    <main id="main">
      <Reader work={work} edition={edition} allowed={allowed} />
    </main>
  );
}
