"use client";

import { CtaLink } from "@/components/ui/CtaLink";
import { PageIntro } from "@/components/ui/PageIntro";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function CheckoutSuccess() {
  const { t } = useLanguage();

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro eyebrow={t("headingSuccess")} title={t("headingSuccess")} kicker={t("successBody")} />
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <CtaLink href="/library">{t("myLibrary")}</CtaLink>
      </div>
    </main>
  );
}
