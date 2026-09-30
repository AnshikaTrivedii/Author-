"use client";

import { PageIntro } from "@/components/ui/PageIntro";
import { placeMap } from "@/data/audience";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function PlacesMapPage() {
  const { t, loc } = useLanguage();

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("mapEyebrow")}
        title={t("mapHeading")}
        kicker={t("mapKicker")}
      />
      <ol className="mx-auto max-w-[900px] space-y-0 px-5 sm:px-8">
        {placeMap.map((place, index) => (
          <li
            key={place.name.en}
            className="relative border-l border-gilt/40 py-10 pl-10"
          >
            <span className="absolute top-12 -left-[5px] h-2.5 w-2.5 rounded-full bg-gilt" />
            <p className="label-meta text-gilt">0{index + 1}</p>
            <h2 className="mt-4 font-serif text-4xl">{loc(place.name)}</h2>
            <p className="mt-4 font-serif text-xl italic text-muted">{loc(place.note)}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
