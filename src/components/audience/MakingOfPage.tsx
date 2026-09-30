"use client";

import { PageIntro } from "@/components/ui/PageIntro";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { makingOfStills } from "@/data/audience";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function MakingOfPage() {
  const { t, loc } = useLanguage();

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("makingEyebrow")}
        title={t("makingHeading")}
        kicker={t("makingKicker")}
      />
      <ul className="mx-auto grid max-w-[1680px] gap-10 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-12">
        {makingOfStills.map((still) => (
          <li key={still.image + still.caption.en}>
            <PlaceholderMedia
              src={still.image}
              alt=""
              width={1000}
              height={1250}
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="aspect-[4/5]"
            />
            <p className="mt-5 font-serif text-xl italic text-muted">{loc(still.caption)}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
