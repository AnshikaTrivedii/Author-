"use client";

import { PageIntro } from "@/components/ui/PageIntro";
import { getLegal } from "@/data/legal";
import { platform } from "@/data/site";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function LegalDocument({ slug }: { slug: string }) {
  const { t, loc, locale } = useLanguage();
  const doc = getLegal(slug);
  if (!doc) return null;

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro eyebrow={t("legalDraft")} title={loc(doc.title)} />
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <p className="label-meta text-gilt">{t("legalDraft")}</p>
        <div className="mt-16 max-w-3xl space-y-16">
          {doc.sections.map((section) => (
            <section key={section.heading.en}>
              <h2 className="font-serif text-4xl">{loc(section.heading)}</h2>
              <p className="mt-6 text-lg text-muted">{loc(section.body)}</p>
            </section>
          ))}
        </div>
        {slug === "copyright" ? (
          <p className="label-meta mt-20">
            © 2026 {locale === "hi" ? platform.creatorNameHi : platform.creatorName}. {t("allRights")}
          </p>
        ) : null}
      </div>
    </main>
  );
}
