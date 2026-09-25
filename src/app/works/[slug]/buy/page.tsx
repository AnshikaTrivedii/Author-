import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getWork } from "@/data/works";
import { BuyPage } from "@/components/platform/BuyPage";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  return pageMetadata(
    work ? `Work ${work.number}` : "Buy",
    "Order summary for digital access.",
    `/works/${slug}/buy`,
    false,
  );
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<{ offer?: string }>;
}) {
  const { slug } = await params;
  const { offer } = await searchParams;
  const work = getWork(slug);
  if (!work) notFound();
  const selected =
    work.offers.find((item) => item.id === offer) ??
    work.offers.find((item) => item.id.startsWith("complete")) ??
    work.offers[0];
  if (!selected) notFound();

  return (
    <main id="main">
      <BuyPage work={work} offer={selected} />
    </main>
  );
}
