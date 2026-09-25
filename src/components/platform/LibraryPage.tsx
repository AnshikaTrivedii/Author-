"use client";

import { CtaLink } from "@/components/ui/CtaLink";
import { PageIntro } from "@/components/ui/PageIntro";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { purchasedWorksFor } from "@/lib/library";

export function LibraryPage() {
  const { t } = useLanguage();
  const owned = purchasedWorksFor(null);

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("myLibrary")}
        title={t("headingLibraryAccount")}
        kicker={t("librarySignIn")}
      />
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        {owned.length === 0 ? (
          <p className="max-w-xl font-serif text-2xl italic text-muted">
            {t("libraryEmpty")}
          </p>
        ) : null}
        <CtaLink href="/works" className="mt-12">
          {t("exploreWorks")}
        </CtaLink>
      </div>
    </main>
  );
}
