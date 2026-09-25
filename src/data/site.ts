import type { NavItem, Platform } from "./types";
import type { Copy } from "@/lib/locale";

export const toBeProvided = "[CONTENT TO BE PROVIDED]";

export const copyToBeProvided: Copy = {
  en: "[CONTENT TO BE PROVIDED]",
  hi: "[सामग्री उपलब्ध कराई जाएगी]",
};

export const pricePlaceholder: Copy = {
  en: "[PRICE]",
  hi: "[मूल्य]",
};

export const namePlaceholder = "[NAME]";

export const platform: Platform = {
  title: "Echoes of Memories",
  titleLines: {
    en: ["ECHOES", "OF", "MEMORIES"],
    hi: ["स्मृतियों की", "अनुगूँज"],
  },
  tagline: {
    en: ["एक जीवन • अनेक पड़ाव • अनगिनत स्मृतियाँ"],
    hi: ["एक जीवन • अनेक पड़ाव • अनगिनत स्मृतियाँ"],
  },
  statement: {
    en: "A cinematic home for stories that can be read, listened to, and watched.",
    hi: "ऐसी कथाओं का सिनेमाई घर जिन्हें पढ़ा, सुना और देखा जा सकता है।",
  },
  siteUrl: "https://www.echoesofmemories.com",
  ogImage: "/images/og/legacy-of-india.jpg",
  heroImage: "/images/hero/echoes-hero.jpg",
  heroVideo: "/videos/echoes-hero.mp4",
  creatorName: "Sanjay Kumar Rai",
  creatorNameHi: "संजय कुमार राय",
  contactEmail: "contact@[domain].com",
  domainPlaceholder: "[domain].com",
};

export const navItems: NavItem[] = [
  {
    label: { en: "The Book", hi: "पुस्तक" },
    href: "/works/smritiyon-ki-anugoonj",
  },
  { label: { en: "Works", hi: "कृतियाँ" }, href: "/works" },
  { label: { en: "Free works", hi: "निःशुल्क कृतियाँ" }, href: "/free-works" },
  { label: { en: "Films", hi: "फिल्में" }, href: "/films" },
  { label: { en: "Listen", hi: "सुनें" }, href: "/audio-video" },
  { label: { en: "About", hi: "परिचय" }, href: "/about" },
];

export const footerPrimary: NavItem[] = [
  { label: { en: "Read", hi: "पढ़ें" }, href: "/works" },
  { label: { en: "Listen", hi: "सुनें" }, href: "/audio-video" },
  { label: { en: "Watch", hi: "देखें" }, href: "/films" },
  { label: { en: "Works", hi: "कृतियाँ" }, href: "/works" },
  { label: { en: "Films", hi: "फिल्में" }, href: "/films" },
  { label: { en: "About", hi: "परिचय" }, href: "/about" },
  { label: { en: "Contact", hi: "संपर्क" }, href: "/contact" },
];

export const footerLegal: NavItem[] = [
  { label: { en: "Copyright", hi: "कॉपीराइट" }, href: "/copyright" },
  { label: { en: "Terms", hi: "नियम" }, href: "/terms" },
  { label: { en: "Privacy", hi: "गोपनीयता" }, href: "/privacy" },
  {
    label: { en: "Refund & Cancellation", hi: "वापसी एवं रद्दीकरण" },
    href: "/refund-cancellation",
  },
  { label: { en: "Disclaimer", hi: "अस्वीकरण" }, href: "/disclaimer" },
  { label: { en: "AI Disclosure", hi: "एआई प्रकटीकरण" }, href: "/ai-disclosure" },
];
