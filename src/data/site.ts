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
    en: ["One life • many stages • countless memories"],
    hi: ["एक जीवन • अनेक पड़ाव • अनगिनत स्मृतियाँ"],
  },
  statement: {
    en: "A cinematic home for stories that can be read, listened to, and watched.",
    hi: "ऐसी कथाओं का सिनेमाई घर जिन्हें पढ़ा, सुना और देखा जा सकता है।",
  },
  siteUrl: "https://www.echoesofmemories.com",
  ogImage: "/images/og/legacy-of-india.jpg",
  heroImage: "/images/hero/echoes-hero.jpg",
  heroVideo:
    "https://orion-led-quotations.s3.ap-south-1.amazonaws.com/quotations/Book+content+/WhatsApp+Video+2026-11-14+at+12.17.10.mp4",
  creatorName: "Sanjay Kumar Rai",
  creatorNameHi: "संजय कुमार राय",
  contactEmail: "contact@[domain].com",
  domainPlaceholder: "[domain].com",
};

export const navItems: NavItem[] = [
  { label: { en: "Works", hi: "कृतियाँ" }, href: "/works" },
  { label: { en: "Listen", hi: "सुनें" }, href: "/audio-video" },
  { label: { en: "Films", hi: "फिल्में" }, href: "/films" },
  { label: { en: "About", hi: "परिचय" }, href: "/about" },
];

/** Secondary destinations — nav “More” and home community strip */
export const navMoreItems: NavItem[] = [
  { label: { en: "Free works", hi: "निःशुल्क कृतियाँ" }, href: "/free-works" },
  { label: { en: "Gift a chapter", hi: "अध्याय भेंट करें" }, href: "/gift" },
  { label: { en: "Reading circles", hi: "पठन मंडल" }, href: "/reading-circles" },
  { label: { en: "Letters", hi: "पत्र" }, href: "/letters" },
  { label: { en: "Making of", hi: "निर्माण" }, href: "/making-of" },
  { label: { en: "Places", hi: "स्थान" }, href: "/places" },
  { label: { en: "Author's desk", hi: "लेखक की मेज़" }, href: "/desk" },
  { label: { en: "Contact", hi: "संपर्क" }, href: "/contact" },
];

export type FooterGroup = {
  title: Copy;
  items: NavItem[];
};

export const footerGroups: FooterGroup[] = [
  {
    title: { en: "Read & watch", hi: "पढ़ें और देखें" },
    items: [
      {
        label: { en: "The Book", hi: "पुस्तक" },
        href: "/works/smritiyon-ki-anugoonj",
      },
      { label: { en: "All works", hi: "सभी कृतियाँ" }, href: "/works" },
      { label: { en: "Free works", hi: "निःशुल्क कृतियाँ" }, href: "/free-works" },
      { label: { en: "Listen", hi: "सुनें" }, href: "/audio-video" },
      { label: { en: "Films", hi: "फिल्में" }, href: "/films" },
    ],
  },
  {
    title: { en: "Community", hi: "साझा" },
    items: [
      { label: { en: "Gift a chapter", hi: "अध्याय भेंट करें" }, href: "/gift" },
      {
        label: { en: "Reading circles", hi: "पठन मंडल" },
        href: "/reading-circles",
      },
      { label: { en: "Letters", hi: "पत्र" }, href: "/letters" },
      { label: { en: "Making of", hi: "निर्माण" }, href: "/making-of" },
      { label: { en: "Places", hi: "स्थान" }, href: "/places" },
    ],
  },
  {
    title: { en: "About", hi: "परिचय" },
    items: [
      { label: { en: "About", hi: "परिचय" }, href: "/about" },
      { label: { en: "Author's desk", hi: "लेखक की मेज़" }, href: "/desk" },
      { label: { en: "Contact", hi: "संपर्क" }, href: "/contact" },
    ],
  },
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

export const footerSocial: NavItem[] = [
  {
    label: { en: "Instagram", hi: "Instagram" },
    href: "https://www.instagram.com/indian.legacies/",
  },
  {
    label: { en: "Facebook", hi: "Facebook" },
    href: "https://www.facebook.com/indian.legacies",
  },
  {
    label: { en: "YouTube", hi: "YouTube" },
    href: "https://www.youtube.com/@YOURLEGACY007",
  },
];
