"use client";

import { PageIntro } from "@/components/ui/PageIntro";
import { platform } from "@/data/site";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function ContactPage() {
  const { t } = useLanguage();

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("officialEmail")}
        title={t("headingContact")}
        kicker={t("contactBody")}
      />
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <p className="break-all font-serif text-3xl sm:text-6xl">{platform.contactEmail}</p>
        <p className="mt-10 max-w-md text-sm text-muted">{t("futureAddresses")}</p>
      </div>
    </main>
  );
}
