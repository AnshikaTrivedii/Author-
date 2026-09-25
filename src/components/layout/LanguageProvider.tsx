"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { ui, type UiKey } from "@/data/dictionary";
import {
  isLocale,
  localeStorageKey,
  type Copy,
  type CopyLines,
  type Locale,
} from "@/lib/locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: UiKey) => string;
  loc: (copy: Copy) => string;
  lines: (copy: CopyLines) => string[];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("loi-locale", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("loi-locale", onStoreChange);
  };
}

function getLocale(): Locale {
  const stored = window.localStorage.getItem(localeStorageKey);
  return isLocale(stored) ? stored : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore<Locale>(subscribe, getLocale, () => "en");

  useEffect(() => {
    document.documentElement.lang = locale === "hi" ? "hi" : "en";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    window.localStorage.setItem(localeStorageKey, next);
    window.dispatchEvent(new Event("loi-locale"));
  }, []);

  const t = useCallback((key: UiKey) => ui[key][locale], [locale]);
  const loc = useCallback(
    (copy: Copy) => (locale === "hi" ? copy.hi : copy.en),
    [locale],
  );
  const lines = useCallback(
    (copy: CopyLines) => (locale === "hi" ? copy.hi : copy.en),
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, loc, lines }),
    [locale, setLocale, t, loc, lines],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
