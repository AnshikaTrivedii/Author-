"use client";

import { useLanguage } from "@/components/layout/LanguageProvider";

export function VisionMission() {
  const { t } = useLanguage();

  return (
    <section
      id="vision"
      aria-label={`${t("visionHeading")}. ${t("missionHeading")}`}
      className="scroll-mt-28 border-t border-ivory/10 bg-ink py-16 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1680px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            {t("visionHeading")}
          </h2>
          <p className="mt-6 max-w-md font-serif text-xl leading-snug text-ivory/80 italic">
            {t("visionBody")}
          </p>
        </div>
        <div>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            {t("missionHeading")}
          </h2>
          <p className="mt-6 max-w-lg font-serif text-xl leading-snug text-ivory/80 italic">
            {t("missionBody")}
          </p>
        </div>
      </div>
    </section>
  );
}
