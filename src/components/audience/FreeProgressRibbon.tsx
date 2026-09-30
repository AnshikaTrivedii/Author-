"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { freeWorks } from "@/data/works";
import { useLanguage } from "@/components/layout/LanguageProvider";

const storageKey = "loi-free-progress";

export function FreeProgressRibbon() {
  const { t, loc } = useLanguage();
  const works = freeWorks();
  const [opened, setOpened] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      setOpened(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      setOpened([]);
    }
  }, []);

  function mark(slug: string) {
    setOpened((current) => {
      const next = current.includes(slug) ? current : [...current, slug];
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  const count = works.filter((work) => opened.includes(work.slug)).length;

  return (
    <div className="border border-ivory/10 bg-ink px-6 py-8">
      <p className="label-meta text-gilt">{t("progressEyebrow")}</p>
      <p className="mt-4 font-serif text-3xl">
        {t("progressHeading")
          .replace("{opened}", String(count))
          .replace("{total}", String(Math.max(works.length, 1)))}
      </p>
      <ul className="mt-8 space-y-4">
        {works.map((work) => {
          const done = opened.includes(work.slug);
          return (
            <li key={work.id} className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href={`/works/${work.slug}`}
                onClick={() => mark(work.slug)}
                className="font-serif text-xl hover:text-gilt"
              >
                {loc(work.title)}
              </Link>
              <span className="label-meta text-muted">
                {done ? t("progressOpened") : t("progressClosed")}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
