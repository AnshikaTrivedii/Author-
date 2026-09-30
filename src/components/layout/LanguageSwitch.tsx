"use client";

import { useLanguage } from "@/components/layout/LanguageProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/locale";

const options: Array<{ id: Locale; label: string }> = [
  { id: "en", label: "EN" },
  { id: "hi", label: "हिन्दी" },
];

export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn("flex items-baseline gap-2", className)}
    >
      {options.map((option, index) => (
        <span key={option.id} className="flex items-baseline gap-2">
          {index > 0 ? (
            <span className="text-[0.65rem] !text-ivory/50" aria-hidden="true">
              |
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => setLocale(option.id)}
            aria-pressed={locale === option.id}
            className={cn(
              "label-meta transition-colors duration-300",
              locale === option.id ? "!text-gilt" : "!text-ivory/80 hover:!text-ivory",
            )}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
