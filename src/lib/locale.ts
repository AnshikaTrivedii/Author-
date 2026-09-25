export type Locale = "en" | "hi";

export type Copy = {
  en: string;
  hi: string;
};

export type CopyLines = {
  en: string[];
  hi: string[];
};

export const locales: Locale[] = ["en", "hi"];
export const localeStorageKey = "loi-locale";

export function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "hi";
}
