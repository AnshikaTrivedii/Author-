"use client";

import Link from "next/link";
import { footerGroups, footerLegal, footerSocial, platform } from "@/data/site";
import { useLanguage } from "@/components/layout/LanguageProvider";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M14.2 8.4V6.9c0-.7.5-.9.9-.9h1.5V3.2h-2.3c-2.4 0-3.4 1.6-3.4 3.4v1.8H9v2.6h2v8.8h3.2v-8.8h2.1l.4-2.6h-2.5z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M22.5 12.2s0-3-.4-4.3c-.2-.8-.8-1.4-1.6-1.6C19 5.9 12 5.9 12 5.9s-7 0-8.5.4c-.8.2-1.4.8-1.6 1.6C1.5 9.2 1.5 12.2 1.5 12.2s0 3 .4 4.3c.2.8.8 1.4 1.6 1.6 1.5.4 8.5.4 8.5.4s7 0 8.5-.4c.8-.2 1.4-.8 1.6-1.6.4-1.3.4-4.3.4-4.3zM9.9 15.3V9.1l5.8 3.1-5.8 3.1z" />
    </svg>
  );
}

const socialIcons: Record<string, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
};

export function Footer() {
  const { loc, t, locale } = useLanguage();

  return (
    <footer className="relative border-t border-ivory/10 bg-ink">
      <div className="mx-auto max-w-[1680px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <p className="font-serif text-[2.15rem] leading-[0.92] tracking-[0.08em] text-ivory sm:col-span-2 lg:col-span-1 lg:text-[2.4rem]">
            ECHOES
            <br />
            OF MEMORIES
          </p>

          <nav aria-label="Footer" className="contents">
            {footerGroups.map((group) => (
              <div key={group.title.en}>
                <p className="label-meta text-gilt">{loc(group.title)}</p>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={`${item.href}-${item.label.en}`}>
                      <Link
                        href={item.href}
                        className="label-meta text-ivory/80 transition-colors hover:text-gilt"
                      >
                        {loc(item.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLegal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="label-meta text-muted transition-colors hover:text-gilt"
                >
                  {loc(item.label)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-5">
            {footerSocial.map((item) => {
              const Icon = socialIcons[item.label.en];
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={loc(item.label)}
                    className="text-muted transition-colors hover:text-gilt"
                  >
                    {Icon ? <Icon /> : loc(item.label)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <p className="label-meta">
            © 2026 {locale === "hi" ? platform.creatorNameHi : platform.creatorName}
          </p>
          <p className="label-meta text-muted">{t("allRights")}</p>
        </div>
      </div>
    </footer>
  );
}
