"use client";

import Link from "next/link";
import type { Work } from "@/data/types";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { moneyLabel } from "@/lib/utils";

export function WorkModes({ work }: { work: Work }) {
  const { t, loc, locale } = useLanguage();
  const readLang = locale === "hi" ? "hi" : "en";
  const readEdition = readLang === "hi" ? work.hindi : work.english;
  const readHref = readEdition.fileKey
    ? `/works/${work.slug}/read/${readLang}`
    : `/works/${work.slug}#read`;

  const items = [
    {
      key: "read" as const,
      href: readHref,
      detail: `${loc(work.hindi.label)} · ${loc(work.english.label)}`,
      status: moneyLabel(work.hindi.price, locale),
    },
  ];

  return (
    <ul className="mt-10 grid max-w-sm">
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
