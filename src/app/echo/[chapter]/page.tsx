import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { CtaLink } from "@/components/ui/CtaLink";
import { chapterEchoes } from "@/data/audience";

type Params = { chapter: string };

export function generateStaticParams() {
  return chapterEchoes.map((echo) => ({ chapter: echo.chapter }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { chapter } = await params;
  const echo = chapterEchoes.find((item) => item.chapter === chapter);
  if (!echo) return pageMetadata("Echo", "A shared line from the book.", "/echo");
  return pageMetadata(echo.line.en, echo.line.en, `/echo/${chapter}`);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { chapter } = await params;
  const echo = chapterEchoes.find((item) => item.chapter === chapter);
  if (!echo) notFound();

  return (
    <main id="main" className="bg-ink pb-28">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 pt-28 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pt-36">
        <div className="lg:col-span-6">
          <p className="label-meta text-gilt">Part {echo.chapter}</p>
          <h1 className="mt-6 font-serif text-4xl leading-snug sm:text-6xl">
            {echo.line.en}
          </h1>
          <p className="mt-8 font-serif text-3xl leading-snug text-muted">
            {echo.line.hi}
          </p>
          <CtaLink href="/#echo" className="mt-12" cursor="explore">
            More echoes
          </CtaLink>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <PlaceholderMedia
            src={echo.image}
            alt=""
            width={1200}
            height={1500}
            sizes="(min-width: 1024px) 36vw, 100vw"
            className="aspect-[4/5]"
          />
        </div>
      </div>
    </main>
  );
}
