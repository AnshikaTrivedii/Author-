"use client";

import { chapterAudio } from "@/data/audience";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function ChapterAudioStrip() {
  const { t, loc } = useLanguage();

  return (
    <section id="chapter-audio" className="scroll-mt-28 bg-ink-2 py-24 lg:py-32">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <p className="label-meta text-gilt">{t("chapterAudioEyebrow")}</p>
        <h2 className="mt-6 max-w-4xl font-serif text-5xl sm:text-6xl">
          {t("chapterAudioHeading")}
        </h2>
        <p className="mt-6 max-w-xl font-serif text-xl italic text-muted">
          {t("chapterAudioKicker")}
        </p>
        <ul className="mt-12 divide-y divide-ivory/10 border-y border-ivory/10">
          {chapterAudio.map((clip) => (
            <li
              key={clip.chapter}
              className="grid items-center gap-4 py-6 sm:grid-cols-12"
            >
              <p className="label-meta text-gilt sm:col-span-2">
                {t("part")} {clip.chapter}
              </p>
              <p className="font-serif text-2xl sm:col-span-6">{loc(clip.label)}</p>
              <p className="label-meta text-muted sm:col-span-2">{clip.duration}</p>
              <button
                type="button"
                disabled
                className="label-meta min-h-11 justify-self-start border border-ivory/20 px-5 py-2 text-muted sm:col-span-2 sm:justify-self-end"
              >
                {t("play")}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">{t("mediaPending")}</p>
      </div>
    </section>
  );
}
