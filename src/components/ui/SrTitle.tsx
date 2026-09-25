"use client";

import { useLanguage } from "@/components/layout/LanguageProvider";
import type { UiKey } from "@/data/dictionary";

export function SrTitle({ k }: { k: UiKey }) {
  const { t } = useLanguage();
  return <h1 className="sr-only">{t(k)}</h1>;
}
