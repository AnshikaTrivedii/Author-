"use client";

import { useLanguage } from "@/components/layout/LanguageProvider";
import type { Work } from "@/data/types";
import { cn } from "@/lib/utils";

export function WorkDetailSubnav({ work }: { work: Work }) {
  const { t } = useLanguage();
  const paid = work.pricingModel === "paid";

  const links = [
    { href: "#read", label: t("read") },
    ...(work.audio.available ? [{ href: "#listen", label: t("listen") }] : []),
    ...(work.film.available ? [{ href: "#watch", label: t("watch") }] : []),
    ...(paid ? [{ href: "#buy", label: t("buyNow") }] : []),
  ];

  return (
    <nav
      aria-label={t("workJumpNav")}
      className="sticky top-24 z-40 border-b border-ivory/8 bg-ink/90 backdrop-blur-md sm:top-[6.75rem]"
    >
      <div className="mx-auto flex max-w-[1680px] gap-1 overflow-x-auto px-5 py-3 sm:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            data-cursor="view"
            className={cn(
              "label-meta shrink-0 rounded-full border border-transparent px-4 py-2 text-muted transition-colors hover:border-ivory/15 hover:text-ivory",
            )}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
