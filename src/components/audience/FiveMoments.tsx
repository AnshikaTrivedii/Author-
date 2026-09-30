"use client";

import { useMemo, useState } from "react";
import { fiveMomentPrompts } from "@/data/audience";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { cn } from "@/lib/utils";

export function FiveMoments() {
  const { t, loc, locale } = useLanguage();
  const [selected, setSelected] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const list = useMemo(
    () => selected.map((index) => fiveMomentPrompts[index]).filter(Boolean),
    [selected],
  );

  function toggle(index: number) {
    setSelected((current) => {
      if (current.includes(index)) return current.filter((value) => value !== index);
      if (current.length >= 5) return current;
      return [...current, index];
    });
  }

  function download() {
    const lines = list.map((item, index) => `${index + 1}. ${locale === "hi" ? item.hi : item.en}`);
    const body = `${t("fiveHeading")}\n\n${lines.join("\n")}\n`;
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "five-moments.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function copyList() {
    const lines = list.map((item, index) => `${index + 1}. ${locale === "hi" ? item.hi : item.en}`);
    await navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="five-moments" className="scroll-mt-28 bg-ink-2 py-24 lg:py-32">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <p className="label-meta text-gilt">{t("fiveEyebrow")}</p>
        <h2 className="mt-6 max-w-4xl font-serif text-5xl sm:text-6xl">{t("fiveHeading")}</h2>
        <p className="mt-6 max-w-xl font-serif text-xl italic text-muted">{t("fiveKicker")}</p>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fiveMomentPrompts.map((prompt, index) => {
            const active = selected.includes(index);
            return (
              <li key={prompt.en}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(index)}
                  className={cn(
                    "min-h-24 w-full border px-5 py-5 text-left transition-colors",
                    active
                      ? "border-gilt text-ivory"
                      : "border-ivory/10 text-muted hover:border-ivory/30 hover:text-ivory",
                  )}
                >
                  <span className="font-serif text-xl">{loc(prompt)}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="label-meta mt-8 text-muted">
          {selected.length}/5 {t("fiveSelected")}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            disabled={selected.length !== 5}
            onClick={download}
            className="label-meta min-h-12 border border-gilt bg-gilt px-8 py-4 text-ink disabled:opacity-40"
          >
            {t("fiveDownload")}
          </button>
          <button
            type="button"
            disabled={selected.length !== 5}
            onClick={() => void copyList()}
            className="label-meta min-h-12 border border-ivory/20 px-8 py-4 text-ivory disabled:opacity-40"
          >
            {copied ? t("copied") : t("fiveCopy")}
          </button>
        </div>
      </div>
    </section>
  );
}
