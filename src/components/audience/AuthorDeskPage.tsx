"use client";

import { PageIntro } from "@/components/ui/PageIntro";
import { deskUpdates } from "@/data/audience";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function AuthorDeskPage() {
  const { t, loc } = useLanguage();

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("deskEyebrow")}
        title={t("deskHeading")}
        kicker={t("deskKicker")}
      />
      <ul className="mx-auto max-w-[900px] divide-y divide-ivory/10 border-y border-ivory/10 px-5 sm:px-8">
        {deskUpdates.map((update) => (
          <li key={update.date} className="py-10">
            <p className="label-meta text-gilt">{update.date}</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">{loc(update.title)}</h2>
            <p className="mt-4 text-lg text-muted">{loc(update.body)}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
