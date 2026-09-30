"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { freeWorks } from "@/data/works";
import { platform } from "@/data/site";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { PageIntro } from "@/components/ui/PageIntro";
import { CtaLink } from "@/components/ui/CtaLink";

export function GiftChapterPage() {
  const { t, loc } = useLanguage();
  const params = useSearchParams();
  const works = freeWorks();
  const initial = params.get("work") ?? works[0]?.slug ?? "";
  const [slug, setSlug] = useState(initial);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  const work = useMemo(
    () => works.find((entry) => entry.slug === slug) ?? works[0],
    [works, slug],
  );

  const giftUrl = useMemo(() => {
    if (!work) return platform.siteUrl;
    const url = new URL(`${platform.siteUrl}/gift`);
    url.searchParams.set("work", work.slug);
    if (note.trim()) url.searchParams.set("note", note.trim().slice(0, 140));
    return url.toString();
  }, [work, note]);

  async function copyLink() {
    await navigator.clipboard.writeText(giftUrl);
    setStatus(t("copied"));
  }

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("giftEyebrow")}
        title={t("giftHeading")}
        kicker={t("giftKicker")}
      />
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <form className="space-y-8 lg:col-span-6" onSubmit={(event) => event.preventDefault()}>
          <label className="block">
            <span className="label-meta">{t("giftChoose")}</span>
            <select
              value={work?.slug ?? ""}
              onChange={(event) => setSlug(event.target.value)}
              className="mt-3 w-full border border-ivory/15 bg-ink px-4 py-3 text-ivory outline-none focus:border-gilt"
            >
              {works.map((entry) => (
                <option key={entry.id} value={entry.slug}>
                  {loc(entry.title)}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="label-meta">{t("giftNote")}</span>
            <textarea
              rows={4}
              maxLength={140}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
            />
          </label>
          <button
            type="button"
            onClick={() => void copyLink()}
            className="label-meta min-h-12 border border-gilt bg-gilt px-8 py-4 text-ink"
          >
            {t("giftCopy")}
          </button>
          {status ? <p className="text-sm text-gilt">{status}</p> : null}
        </form>
        <div className="border border-ivory/10 bg-ink-2 p-8 lg:col-span-5 lg:col-start-8">
          <p className="label-meta text-gilt">{t("giftPreview")}</p>
          <h2 className="mt-6 font-serif text-4xl">{work ? loc(work.title) : ""}</h2>
          {note ? (
            <p className="mt-6 font-serif text-2xl italic text-muted">{note}</p>
          ) : (
            <p className="mt-6 font-serif text-2xl italic text-muted">{t("giftDefaultNote")}</p>
          )}
          {work ? (
            <CtaLink href={`/works/${work.slug}/read/hi`} className="mt-10" cursor="read">
              {t("readTheStory")}
            </CtaLink>
          ) : null}
        </div>
      </div>
    </main>
  );
}
