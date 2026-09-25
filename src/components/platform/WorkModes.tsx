"use client";

import Link from "next/link";
import type { Work } from "@/data/types";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { moneyLabel } from "@/lib/utils";

export function WorkModes({ work }: { work: Work }) {
  const { t, loc, locale } = useLanguage();

  const items = [
    {
      key: "read" as const,
      href: `/works/${work.slug}#read`,
      detail: `${loc(work.hindi.label)} · ${loc(work.english.label)}`,
      status: moneyLabel(work.hindi.price, locale),
    },
    {
      key: "listen" as const,
      href: `/works/${work.slug}#listen`,
      detail: loc(work.audio.title),
      status: moneyLabel(work.audio.price, locale),
    },
    {
      key: "watch" as const,
      href: `/works/${work.slug}#watch`,
      detail: loc(work.film.duration),
      status: moneyLabel(work.film.price, locale),
    },
  ];

  return (
    <ul className="mt-10 grid gap-px bg-ivory/10 sm:grid-cols-3">
      {items.map((item) => (
        <li key={item.key} className="bg-ink">
          <Link
            href={item.href}
            data-cursor={item.key}
            className="flex min-h-36 flex-col justify-between p-6 transition-colors hover:bg-ink-2"
          >
            <span className="font-serif text-4xl">{t(item.key)}</span>
            <span className="mt-6">
              <span className="block text-sm text-muted">{item.detail}</span>
              <span className="label-meta mt-3 block text-gilt">{item.status}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
