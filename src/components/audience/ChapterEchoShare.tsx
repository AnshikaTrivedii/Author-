"use client";

import { useState } from "react";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { chapterEchoes } from "@/data/audience";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { platform } from "@/data/site";

export function ChapterEchoShare() {
  const { t, loc, locale } = useLanguage();
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("");
  const echo = chapterEchoes[index] ?? chapterEchoes[0];

  async function share() {
    const line = locale === "hi" ? echo.line.hi : echo.line.en;
    const url = `${platform.siteUrl}/echo/${echo.chapter}`;
    const payload = { title: platform.title, text: line, url };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        setStatus(t("echoShared"));
        return;
      }
      await navigator.clipboard.writeText(`${line}\n${url}`);
      setStatus(t("copied"));
    } catch {
      setStatus(t("echoShareFailed"));
    }
  }

  return (
    <section id="echo" className="scroll-mt-28 bg-ink py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1680px] items-end gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-6">
          <p className="label-meta text-gilt">{t("echoEyebrow")}</p>
          <h2 className="mt-6 font-serif text-5xl sm:text-6xl">{t("echoHeading")}</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {chapterEchoes.map((item, itemIndex) => (
              <button
                key={item.chapter}
                type="button"
                onClick={() => setIndex(itemIndex)}
                className={`label-meta min-h-10 px-3 ${index === itemIndex ? "text-gilt" : "text-muted"}`}
              >
                {t("part")} {item.chapter}
              </button>
            ))}
          </div>
          <p className="mt-10 font-serif text-3xl leading-snug italic sm:text-4xl">
            {loc(echo.line)}
          </p>
          <button
            type="button"
            onClick={() => void share()}
            className="label-meta mt-10 min-h-12 border border-gilt px-8 py-4 text-gilt"
          >
            {t("echoShare")}
          </button>
          {status ? <p className="mt-4 text-sm text-muted">{status}</p> : null}
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
    </section>
  );
}
