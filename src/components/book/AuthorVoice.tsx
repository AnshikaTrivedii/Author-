"use client";

import { useState } from "react";
import { bookOne } from "@/data/anugoonj";
import { Waveform } from "@/components/platform/MediaPlayer";
import { useLanguage } from "@/components/layout/LanguageProvider";

const speeds = [0.75, 1, 1.25, 1.5];

export function AuthorVoice() {
  const { t, loc } = useLanguage();
  const [speed, setSpeed] = useState(1);

  return (
    <section id="listen" className="scroll-mt-28 bg-ink-2 py-24 lg:py-32">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <p className="label-meta text-gilt">{t("listen")}</p>
        <h2 className="mt-6 font-serif text-5xl sm:text-7xl">
          {loc(bookOne.voiceHeading)}
        </h2>
        <p className="mt-6 max-w-xl font-serif text-2xl italic text-muted">
          {loc(bookOne.voiceSubheading)}
        </p>
        <div className="mt-12 border border-ivory/10 bg-ink p-8 lg:p-12">
          <p className="font-serif text-3xl">{loc(bookOne.title)}</p>
          <p className="label-meta mt-4 text-muted">
            {t("duration")} · [DURATION]
          </p>
          <div className="mt-10">
            <Waveform active={false} />
          </div>
          <div
            className="mt-8 h-px w-full bg-ivory/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
            aria-label={t("duration")}
          />
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button
              type="button"
              className="label-meta min-h-12 border border-gilt px-6 py-3 text-gilt"
              disabled
            >
              {t("play")}
            </button>
            <div className="flex items-center gap-3">
              <span className="label-meta text-muted">{t("speed")}</span>
              {speeds.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSpeed(value)}
                  className={`label-meta min-h-10 px-2 ${speed === value ? "text-gilt" : "text-muted"}`}
                >
                  {value}x
                </button>
              ))}
            </div>
          </div>
          <p className="mt-8 text-sm text-muted">{t("mediaPending")}</p>
        </div>
      </div>
    </section>
  );
}
