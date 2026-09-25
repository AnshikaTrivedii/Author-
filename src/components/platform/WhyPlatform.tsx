"use client";

import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function WhyPlatform() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-ink py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <Reveal className="lg:col-span-6">
          <p className="label-meta text-gilt">{t("headingPhilosophy")}</p>
          <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.9] tracking-[-0.03em] sm:text-7xl">
            {t("modesIntro")}
          </h2>
          <p className="label-meta mt-10 tracking-[0.32em] text-ivory">
            {t("read")} · {t("listen")} · {t("watch")}
          </p>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <PlaceholderMedia
            src="/images/stills/ghats.jpg"
            alt=""
            width={1200}
            height={1500}
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="aspect-[4/5]"
            kenBurns
          />
        </div>
      </div>
    </section>
  );
}
