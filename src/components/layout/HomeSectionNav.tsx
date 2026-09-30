"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { cn } from "@/lib/utils";

const sections = [
  { id: "story", key: "homeNavStory" as const },
  { id: "inside", key: "homeNavChapters" as const },
  { id: "listen", key: "homeNavListen" as const },
  { id: "watch", key: "homeNavWatch" as const },
  { id: "free", key: "homeNavFree" as const },
  { id: "community", key: "homeNavCommunity" as const },
] as const;

export function HomeSectionNav() {
  const { t } = useLanguage();
  const [active, setActive] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries[0]?.target.id) {
          setActive(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label={t("homeNavLabel")}
      className={cn(
        "sticky top-16 z-40 border-b border-ivory/8 bg-ink/90 backdrop-blur-md transition-[opacity,transform] duration-500 sm:top-[4.75rem]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
      )}
    >
      <div className="mx-auto flex max-w-[1680px] gap-1 overflow-x-auto px-5 py-3 sm:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map(({ id, key }) => (
          <a
            key={id}
            href={`#${id}`}
            data-cursor="view"
            className={cn(
              "label-meta shrink-0 rounded-full border px-4 py-2 transition-colors",
              active === id
                ? "border-gilt/50 bg-gilt/10 text-ivory"
                : "border-transparent text-muted hover:border-ivory/15 hover:text-ivory",
            )}
          >
            {t(key)}
          </a>
        ))}
      </div>
    </nav>
  );
}
