import type { LegalDoc } from "./types";
import { copyToBeProvided } from "./site";

const draftBody = copyToBeProvided;

export const legalDocs: LegalDoc[] = [
  {
    slug: "terms",
    title: { en: "Terms of use", hi: "उपयोग की शर्तें" },
    draft: true,
    sections: [
      {
        heading: { en: "Digital content purchase policy", hi: "डिजिटल सामग्री क्रय नीति" },
        body: draftBody,
      },
      {
        heading: { en: "Access and licence", hi: "पहुँच और लाइसेंस" },
        body: draftBody,
      },
    ],
  },
  {
    slug: "privacy",
    title: { en: "Privacy policy", hi: "गोपनीयता नीति" },
    draft: true,
    sections: [
      {
        heading: { en: "Information we may hold", hi: "जानकारी जो रखी जा सकती है" },
        body: draftBody,
      },
      {
        heading: { en: "Accounts and purchases", hi: "खाते और खरीद" },
        body: draftBody,
      },
    ],
  },
  {
    slug: "refund-cancellation",
    title: { en: "Refund & cancellation", hi: "वापसी एवं रद्दीकरण" },
    draft: true,
    sections: [
      {
        heading: { en: "Digital goods", hi: "डिजिटल वस्तुएँ" },
        body: draftBody,
      },
    ],
  },
  {
    slug: "disclaimer",
    title: { en: "Disclaimer", hi: "अस्वीकरण" },
    draft: true,
    sections: [
      {
        heading: { en: "Editorial and legal", hi: "संपादकीय और कानूनी" },
        body: draftBody,
      },
    ],
  },
  {
    slug: "copyright",
    title: { en: "Copyright", hi: "कॉपीराइट" },
    draft: true,
    sections: [
      {
        heading: { en: "Books", hi: "पुस्तकें" },
        body: draftBody,
      },
      {
        heading: { en: "Articles", hi: "लेख" },
        body: draftBody,
      },
      {
        heading: { en: "Scripts", hi: "पटकथाएँ" },
        body: draftBody,
      },
      {
        heading: { en: "Translations", hi: "अनुवाद" },
        body: draftBody,
      },
      {
        heading: { en: "Audio recordings", hi: "श्रव्य रिकॉर्डिंग" },
        body: draftBody,
      },
      {
        heading: { en: "Voice recordings", hi: "स्वर रिकॉर्डिंग" },
        body: draftBody,
      },
      {
        heading: { en: "Films", hi: "फिल्में" },
        body: draftBody,
      },
      {
        heading: { en: "Videos", hi: "वीडियो" },
        body: draftBody,
      },
      {
        heading: { en: "Photographs", hi: "चित्र" },
        body: draftBody,
      },
      {
        heading: { en: "Artwork", hi: "कलाकृति" },
        body: draftBody,
      },
      {
        heading: { en: "Website content", hi: "वेबसाइट सामग्री" },
        body: draftBody,
      },
      {
        heading: { en: "Logo and branding", hi: "प्रतीक और पहचान" },
        body: draftBody,
      },
    ],
  },
];

export function getLegal(slug: string) {
  return legalDocs.find((doc) => doc.slug === slug);
}
