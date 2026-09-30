export const readerResumeKey = "loi-reader-resume";

export type ReaderResume = {
  slug: string;
  lang: "hi" | "en";
};

export function readReaderResume(): ReaderResume | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(readerResumeKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ReaderResume;
    if (parsed?.slug && (parsed.lang === "hi" || parsed.lang === "en")) {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
}
