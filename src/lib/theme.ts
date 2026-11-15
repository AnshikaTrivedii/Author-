import type { Copy } from "@/lib/locale";

export type ThemeId = "heritage" | "indigo" | "maroon" | "peacock";

export const themeStorageKey = "loi-theme";
export const defaultTheme: ThemeId = "heritage";

export const themes: Array<{ id: ThemeId; label: Copy; ink: string; gilt: string }> = [
  { id: "heritage", label: { en: "Heritage Gold", hi: "विरासत स्वर्ण" }, ink: "#0d0d0c", gilt: "#a68a63" },
  { id: "indigo", label: { en: "Midnight Indigo", hi: "रात्रि नील" }, ink: "#0a0e1a", gilt: "#d1a85a" },
  { id: "maroon", label: { en: "Royal Maroon", hi: "राजसी मरून" }, ink: "#140a0b", gilt: "#d4915a" },
  { id: "peacock", label: { en: "Peacock Teal", hi: "मयूर हरित" }, ink: "#061413", gilt: "#c9ab6c" },
];

export function isTheme(value: string | null): value is ThemeId {
  return themes.some((theme) => theme.id === value);
}

export const themeBootScript = `try{var t=localStorage.getItem('${themeStorageKey}');if(${JSON.stringify(
  themes.map((theme) => theme.id),
)}.indexOf(t)>-1)document.documentElement.dataset.theme=t}catch(e){}`;
