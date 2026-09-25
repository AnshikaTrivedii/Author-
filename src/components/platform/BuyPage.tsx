"use client";

import { PageIntro } from "@/components/ui/PageIntro";
import { CheckoutForm } from "@/components/platform/CheckoutForm";
import { StatusBadge } from "@/components/platform/StatusBadge";
import type { Offer, Work } from "@/data/types";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { moneyLabel } from "@/lib/utils";

export function BuyPage({ work, offer }: { work: Work; offer: Offer }) {
  const { t, loc, locale } = useLanguage();

  return (
    <div className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("buyNow")}
        title={loc(work.title)}
        kicker={loc(offer.label)}
      />
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:grid lg:grid-cols-12 lg:px-12">
        <aside className="lg:col-span-4">
          <StatusBadge
            label={work.pricingModel === "paid" ? t("badgePaid") : t("badgeFree")}
            tone={work.pricingModel === "paid" ? "paid" : "free"}
          />
          <ul className="mt-10 space-y-4 font-serif text-2xl">
            {work.whatYouReceive.map((item) => (
              <li key={item.en}>{loc(item)}</li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            {t("editionOnline")} / {t("editionDownload")}
          </p>
          <p className="mt-3 font-serif text-xl">{moneyLabel(offer.price, locale)}</p>
        </aside>
        <div className="lg:col-span-7 lg:col-start-6">
          <CheckoutForm work={work} offer={offer} />
        </div>
      </div>
    </div>
  );
}
