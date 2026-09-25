import type { Money } from "@/data/types";
import type { Locale } from "@/lib/locale";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function isPlaceholderHref(href: string) {
  return href.startsWith("[") || href.includes("[") || href.trim() === "";
}

export function moneyLabel(money: Money, locale: Locale) {
  if (money.amount === 0) return locale === "hi" ? "निःशुल्क" : "FREE";
  return locale === "hi" ? money.display.hi : money.display.en;
}

export function allowsDownload(accessType: string) {
  return accessType === "DOWNLOAD" || accessType === "ONLINE_AND_DOWNLOAD";
}

export function allowsOnline(accessType: string) {
  return accessType === "ONLINE" || accessType === "ONLINE_AND_DOWNLOAD";
}
