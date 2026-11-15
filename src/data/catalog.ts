import type { Copy } from "@/lib/locale";
import type {
  AccessType,
  Edition,
  FilmPresentation,
  Money,
  Work,
  WorkCredits,
} from "./types";
import { copyToBeProvided, platform, pricePlaceholder } from "./site";
import { bookOne, differentStory, questionsBook } from "./anugoonj";

const pendingTax = {
  rate: null as number | null,
  inclusive: true,
  display: { en: "[TAX]", hi: "[कर]" },
};

const pendingMoney: Money = {
  amount: null,
  currency: "INR",
  display: pricePlaceholder,
};

const freeMoney: Money = {
  amount: 0,
  currency: "INR",
  display: { en: "FREE", hi: "निःशुल्क" },
};

const creditPending: Copy = copyToBeProvided;

function publishedEdition(language: "hi" | "en", file: string): Edition {
  const label =
    language === "hi"
      ? { en: "Hindi Edition", hi: "हिन्दी संस्करण" }
      : { en: "English Edition", hi: "अंग्रेज़ी संस्करण" };
  return {
    ...edition(language, label, "free"),
    status: "published",
    fileKey: `https://orion-led-quotations.s3.ap-south-1.amazonaws.com/quotations/Book+content+/${file}`,
  };
}
function edition(
  language: "hi" | "en",
  label: Copy,
  pricing: "free" | "paid",
): Edition {
  return {
    language,
    label,
    version: "1.0",
    publishedAt: { en: "16 November 2026", hi: "16 नवम्बर 2026" },
    status: "published",
    accessType: "ONLINE",
    fileKey: null,
    price: pricing === "free" ? freeMoney : pendingMoney,
  };
}

const pendingCredits: WorkCredits = {
  writtenBy: { en: platform.creatorName, hi: platform.creatorNameHi },
  narratedBy: { en: platform.creatorName, hi: platform.creatorNameHi },
  filmConcept: creditPending,
  direction: creditPending,
  editing: creditPending,
  aiProduction: creditPending,
  music: creditPending,
  other: creditPending,
};

function voiceover(hindiSrc: string, englishSrc: string, poster: string): Work["audio"] {
  return {
    available: true,
    title: { en: "Author's Voice", hi: "लेखक की आवाज़" },
    accessType: "ONLINE",
    src: hindiSrc,
    hindiSrc,
    englishSrc,
    poster,
    duration: { en: "[DURATION]", hi: "[अवधि]" },
    price: freeMoney,
  };
}

function film(pricing: "free" | "paid"): FilmPresentation {
  return {
    available: true,
    title: { en: "[FILM TITLE]", hi: "[फिल्म का शीर्षक]" },
    synopsis: copyToBeProvided,
    duration: { en: "5–7 minutes", hi: "5–7 मिनट" },
    accessType: "ONLINE",
    src: null,
    poster: "/images/stills/cinematic-01.jpg",
    language: { en: "[LANGUAGE]", hi: "[भाषा]" },
    subtitles: { en: "[SUBTITLES]", hi: "[उपशीर्षक]" },
    aiAssisted: true,
    aiTools: { en: "[OPTIONAL TOOL LIST]", hi: "[वैकल्पिक उपकरण सूची]" },
    price: pricing === "free" ? freeMoney : pendingMoney,
  };
}

function freeWork(
  id: string,
  number: string,
  image: string,
  imageAlt: { en: string; hi: string },
): Work {
  return {
    id,
    slug: id,
    number,
    title: { en: "[WORK TITLE]", hi: "[कृति का शीर्षक]" },
    subtitle: { en: "[SUBTITLE]", hi: "[उपशीर्षक]" },
    description: { en: "[SHORT DESCRIPTION]", hi: "[संक्षिप्त विवरण]" },
    about: {
      en: "[100–300 word introduction]",
      hi: "[100–300 शब्दों का परिचय]",
    },
    kind: "story",
    status: "published",
    pricingModel: "free",
    publishedAt: { en: "16 November 2026", hi: "16 नवम्बर 2026" },
    version: "1.0",
    image,
    imageAlt,
    hindi: edition("hi", { en: "Hindi Edition", hi: "हिन्दी संस्करण" }, "free"),
    english: edition(
      "en",
      { en: "English Edition", hi: "अंग्रेज़ी संस्करण" },
      "free",
    ),
    audio: {
      available: true,
      title: { en: "Author's Voice", hi: "लेखक की आवाज़" },
      accessType: "ONLINE",
      src: null,
      poster: image,
      duration: { en: "[DURATION]", hi: "[अवधि]" },
      price: freeMoney,
    },
    film: film("free"),
    credits: pendingCredits,
    whatYouReceive: [
      { en: "Hindi Edition — FREE", hi: "हिन्दी संस्करण — निःशुल्क" },
      { en: "English Edition — FREE", hi: "अंग्रेज़ी संस्करण — निःशुल्क" },
      { en: "Author's Voice — FREE", hi: "लेखक की आवाज़ — निःशुल्क" },
      { en: "Short Film — FREE", hi: "लघु फिल्म — निःशुल्क" },
    ],
    offers: [
      {
        id: "complete-free",
        label: { en: "Complete Digital Access", hi: "पूर्ण डिजिटल पहुँच" },
        includes: [
          { en: "Hindi Edition", hi: "हिन्दी संस्करण" },
          { en: "English Edition", hi: "अंग्रेज़ी संस्करण" },
          { en: "Author's Voice", hi: "लेखक की आवाज़" },
          { en: "Short Film", hi: "लघु फिल्म" },
        ],
        price: freeMoney,
        accessType: "ONLINE",
      },
    ],
    aiAssisted: true,
    tax: pendingTax,
    copyrightOwner: {
      en: platform.creatorName,
      hi: platform.creatorNameHi,
    },
  };
}

export const catalogWorks: Work[] = [
  {
    ...freeWork("work-01", "01", bookOne.image, bookOne.imageAlt),
    slug: bookOne.slug,
    title: bookOne.title,
    subtitle: bookOne.tagline,
    description: bookOne.proposition,
    about: bookOne.about,
    image: bookOne.image,
    hindi: publishedEdition("hi", "Smritiyon_Ki_Anugoonj_Hindi.pdf"),
    english: publishedEdition("en", "Echoes_of_Memories_English.pdf"),
    audio: voiceover(
      "https://orion-led-quotations.s3.ap-south-1.amazonaws.com/quotations/Book+content+/%E0%A4%B8%E0%A5%8D%E0%A4%AE%E0%A5%83%E0%A4%A4%E0%A4%BF%E0%A4%AF%E0%A5%8B%E0%A4%82+%E0%A4%95%E0%A5%80+%E0%A4%85%E0%A4%A8%E0%A5%81%E0%A4%97%E0%A5%82%E0%A4%81%E0%A4%9C+Hindi+Voiceover+.mp3",
      "https://orion-led-quotations.s3.ap-south-1.amazonaws.com/quotations/Book+content+/%E0%A4%B8%E0%A5%8D%E0%A4%AE%E0%A5%83%E0%A4%A4%E0%A4%BF%E0%A4%AF%E0%A5%8B%E0%A4%82+%E0%A4%95%E0%A5%80+%E0%A4%85%E0%A4%A8%E0%A5%81%E0%A4%97%E0%A5%82%E0%A4%81%E0%A4%9C++English+Voiceover.mp3",
      bookOne.image,
    ),
    film: {
      ...film("free"),
      title: bookOne.title,
      poster: "/images/stills/family-photo.jpg",
    },
    credits: {
      ...pendingCredits,
      writtenBy: bookOne.author,
      narratedBy: bookOne.author,
    },
    whatYouReceive: [
      { en: "Hindi Edition — FREE", hi: "हिन्दी संस्करण — निःशुल्क" },
      { en: "English Edition — FREE", hi: "अंग्रेज़ी संस्करण — निःशुल्क" },
      { en: "Author's Voice — FREE", hi: "लेखक की आवाज़ — निःशुल्क" },
      { en: "Short Film — FREE", hi: "लघु फिल्म — निःशुल्क" },
    ],
  },
  {
    ...freeWork("work-02", "02", questionsBook.image, questionsBook.imageAlt),
    slug: questionsBook.slug,
    title: questionsBook.title,
    subtitle: questionsBook.subtitle,
    description: questionsBook.subtitle,
    about: questionsBook.about,
    hindi: publishedEdition("hi", "Ek_Sawal_Apne_Aap_Se_Hindi.pdf"),
    english: publishedEdition("en", "A_Question_for_Myself_English.pdf"),
    audio: voiceover(
      "https://orion-led-quotations.s3.ap-south-1.amazonaws.com/quotations/Book+content+/%E0%A4%8F%E0%A4%95+%E0%A4%B8%E0%A4%B5%E0%A4%BE%E0%A4%B2+%E0%A4%85%E0%A4%AA%E0%A4%A8%E0%A5%87+%E0%A4%86%E0%A4%AA+%E0%A4%B8%E0%A5%87+hindi+Voiceover+(2).mp3",
      "https://orion-led-quotations.s3.ap-south-1.amazonaws.com/quotations/Book+content+/%E0%A4%8F%E0%A4%95+%E0%A4%B8%E0%A4%B5%E0%A4%BE%E0%A4%B2+%E0%A4%85%E0%A4%AA%E0%A4%A8%E0%A5%87+%E0%A4%86%E0%A4%AA+%E0%A4%B8%E0%A5%87+English+Voiceover.mp3",
      questionsBook.image,
    ),
    film: {
      ...film("free"),
      title: questionsBook.title,
    },
    credits: {
      ...pendingCredits,
      writtenBy: bookOne.author,
      narratedBy: bookOne.author,
    },
    whatYouReceive: [
      { en: "Hindi Edition — FREE", hi: "हिन्दी संस्करण — निःशुल्क" },
      { en: "English Edition — FREE", hi: "अंग्रेज़ी संस्करण — निःशुल्क" },
      { en: "Author's Voice — FREE", hi: "लेखक की आवाज़ — निःशुल्क" },
      { en: "Short Film — FREE", hi: "लघु फिल्म — निःशुल्क" },
    ],
  },
  {
    ...freeWork("work-04", "03", differentStory.image, differentStory.imageAlt),
    slug: differentStory.slug,
    title: differentStory.title,
    subtitle: differentStory.subtitle,
    description: differentStory.subtitle,
    about: differentStory.about,
    hindi: publishedEdition("hi", "Kya_Aapki_Kahani_Alag_Hai_Hindi.pdf"),
    english: publishedEdition("en", "Is_Your_Story_Different_English.pdf"),
    audio: voiceover(
      "https://orion-led-quotations.s3.ap-south-1.amazonaws.com/quotations/Book+content+/Video.Guru_20261114-112815410.mp3",
      "https://orion-led-quotations.s3.ap-south-1.amazonaws.com/quotations/Book+content+/WhatsApp+Audio+2026-11-15+at+14.42.01.mpeg",
      differentStory.image,
    ),
    film: {
      ...film("free"),
      title: differentStory.title,
      duration: { en: "Forthcoming", hi: "आगामी" },
      poster: differentStory.image,
    },
    credits: {
      ...pendingCredits,
      writtenBy: bookOne.author,
      narratedBy: bookOne.author,
    },
    whatYouReceive: [
      { en: "Hindi Edition — FREE", hi: "हिन्दी संस्करण — निःशुल्क" },
      { en: "English Edition — FREE", hi: "अंग्रेज़ी संस्करण — निःशुल्क" },
      { en: "Author's Voice — FREE", hi: "लेखक की आवाज़ — निःशुल्क" },
    ],
    offers: [
      {
        id: "complete-free",
        label: { en: "Complete Digital Access", hi: "पूर्ण डिजिटल पहुँच" },
        includes: [
          { en: "Hindi Edition", hi: "हिन्दी संस्करण" },
          { en: "English Edition", hi: "अंग्रेज़ी संस्करण" },
          { en: "Author's Voice", hi: "लेखक की आवाज़" },
        ],
        price: freeMoney,
        accessType: "ONLINE",
      },
    ],
  },
  {
    ...freeWork("work-03", "04", "/images/stills/heritage-books.jpg", {
      en: "Heritage books and a camera on stone",
      hi: "पत्थर पर विरासत की पुस्तकें और कैमरा",
    }),
    status: "unpublished",
    pricingModel: "paid",
    hindi: {
      ...edition("hi", { en: "Hindi Edition", hi: "हिन्दी संस्करण" }, "paid"),
      status: "forthcoming",
      accessType: "ONLINE" as AccessType,
    },
    english: {
      ...edition(
        "en",
        { en: "English Edition", hi: "अंग्रेज़ी संस्करण" },
        "paid",
      ),
      status: "forthcoming",
      accessType: "ONLINE" as AccessType,
    },
    audio: {
      available: true,
      title: { en: "Author's Voice", hi: "लेखक की आवाज़" },
      accessType: "ONLINE",
      src: null,
      poster: "/images/stills/heritage-books.jpg",
      duration: { en: "[DURATION]", hi: "[अवधि]" },
      price: pendingMoney,
    },
    film: {
      ...film("paid"),
      duration: { en: "20–25 minutes", hi: "20–25 मिनट" },
      poster: "/images/stills/archive-01.jpg",
    },
    whatYouReceive: [
      { en: "Hindi Edition — [PRICE]", hi: "हिन्दी संस्करण — [मूल्य]" },
      { en: "English Edition — [PRICE]", hi: "अंग्रेज़ी संस्करण — [मूल्य]" },
      {
        en: "Complete Digital Access — [PRICE]",
        hi: "पूर्ण डिजिटल पहुँच — [मूल्य]",
      },
    ],
    offers: [
      {
        id: "hindi",
        label: { en: "Hindi Edition", hi: "हिन्दी संस्करण" },
        includes: [{ en: "Hindi Edition", hi: "हिन्दी संस्करण" }],
        price: pendingMoney,
        accessType: "ONLINE",
      },
      {
        id: "english",
        label: { en: "English Edition", hi: "अंग्रेज़ी संस्करण" },
        includes: [{ en: "English Edition", hi: "अंग्रेज़ी संस्करण" }],
        price: pendingMoney,
        accessType: "ONLINE",
      },
      {
        id: "complete",
        label: { en: "Complete Digital Access", hi: "पूर्ण डिजिटल पहुँच" },
        includes: [
          { en: "Hindi Edition", hi: "हिन्दी संस्करण" },
          { en: "English Edition", hi: "अंग्रेज़ी संस्करण" },
          { en: "Audio", hi: "श्रव्य" },
          { en: "Film", hi: "फिल्म" },
          { en: "Online Access", hi: "ऑनलाइन पहुँच" },
        ],
        price: pendingMoney,
        accessType: "ONLINE",
      },
    ],
  },
];
