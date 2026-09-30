import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import type {
  Money,
  Order,
  PricingModel,
  Work,
  WorkStatus,
} from "@/data/types";
import { catalogWorks } from "@/data/catalog";
import { copyToBeProvided, platform, pricePlaceholder } from "@/data/site";

export type AdminUpload = {
  workId: string;
  kind: "hindi" | "english" | "audio" | "film" | "cover";
  fileName: string;
  storedAs: string;
  uploadedAt: string;
};

export type WorkOverride = {
  titleEn?: string;
  titleHi?: string;
  descriptionEn?: string;
  descriptionHi?: string;
  pricingModel?: PricingModel;
  status?: WorkStatus;
  priceAmount?: number | null;
};

export type AdminStore = {
  customWorks: Work[];
  overrides: Record<string, WorkOverride>;
  uploads: AdminUpload[];
  orders: Order[];
};

const storeDir = path.join(process.cwd(), "data");
const storePath = path.join(storeDir, "admin-store.json");
const uploadDir = path.join(process.cwd(), "public", "uploads");

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

function seedOrders(): Order[] {
  const paid = catalogWorks.find((work) => work.pricingModel === "paid");
  const free = catalogWorks.find((work) => work.pricingModel === "free");
  const target = paid ?? free ?? catalogWorks[0];
  if (!target) return [];

  const amount: Money = {
    amount: 499,
    currency: "INR",
    display: { en: "₹499", hi: "₹499" },
  };
  const zero: Money = {
    amount: 0,
    currency: "INR",
    display: { en: "₹0", hi: "₹0" },
  };

  return [
    {
      id: "ord-1001",
      userId: "reader-anjali",
      workId: target.id,
      offerId: target.offers[0]?.id ?? "complete",
      product: target.title,
      format: { en: "Complete Digital Access", hi: "पूर्ण डिजिटल पहुँच" },
      amount,
      tax: zero,
      total: amount,
      status: "paid",
      createdAt: "2026-09-12T10:20:00.000Z",
    },
    {
      id: "ord-1002",
      userId: "reader-rahul",
      workId: target.id,
      offerId: target.offers[0]?.id ?? "complete",
      product: target.title,
      format: { en: "Complete Digital Access", hi: "पूर्ण डिजिटल पहुँच" },
      amount,
      tax: zero,
      total: amount,
      status: "pending",
      createdAt: "2026-09-22T16:05:00.000Z",
    },
    {
      id: "ord-1003",
      userId: "reader-meera",
      workId: free?.id ?? target.id,
      offerId: "complete-free",
      product: free?.title ?? target.title,
      format: { en: "Hindi Edition", hi: "हिन्दी संस्करण" },
      amount: freeMoney,
      tax: zero,
      total: freeMoney,
      status: "paid",
      createdAt: "2026-09-24T08:40:00.000Z",
    },
  ];
}

function emptyStore(): AdminStore {
  return {
    customWorks: [],
    overrides: {},
    uploads: [],
    orders: seedOrders(),
  };
}

function ensureStore() {
  if (!existsSync(storeDir)) mkdirSync(storeDir, { recursive: true });
  if (!existsSync(storePath)) {
    writeFileSync(storePath, JSON.stringify(emptyStore(), null, 2), "utf8");
  }
  if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });
}

export function readAdminStore(): AdminStore {
  ensureStore();
  try {
    const raw = readFileSync(storePath, "utf8");
    const parsed = JSON.parse(raw) as AdminStore;
    return {
      customWorks: parsed.customWorks ?? [],
      overrides: parsed.overrides ?? {},
      uploads: parsed.uploads ?? [],
      orders: parsed.orders?.length ? parsed.orders : seedOrders(),
    };
  } catch {
    const seeded = emptyStore();
    writeAdminStore(seeded);
    return seeded;
  }
}

export function writeAdminStore(store: AdminStore) {
  ensureStore();
  writeFileSync(storePath, JSON.stringify(store, null, 2), "utf8");
}

function moneyFor(pricing: PricingModel, amount: number | null | undefined): Money {
  if (pricing === "free") return freeMoney;
  if (amount == null) return pendingMoney;
  return {
    amount,
    currency: "INR",
    display: { en: `₹${amount}`, hi: `₹${amount}` },
  };
}

function applyOverride(work: Work, override?: WorkOverride): Work {
  if (!override) return work;
  const pricingModel = override.pricingModel ?? work.pricingModel;
  const price = moneyFor(pricingModel, override.priceAmount);
  const title = {
    en: override.titleEn ?? work.title.en,
    hi: override.titleHi ?? work.title.hi,
  };
  const description = {
    en: override.descriptionEn ?? work.description.en,
    hi: override.descriptionHi ?? work.description.hi,
  };

  return {
    ...work,
    title,
    description,
    pricingModel,
    status: override.status ?? work.status,
    hindi: { ...work.hindi, price },
    english: { ...work.english, price },
    audio: { ...work.audio, price },
    film: { ...work.film, price },
    offers: work.offers.map((offer) => ({ ...offer, price })),
  };
}

export function managedWorks(): Work[] {
  const store = readAdminStore();
  const base = catalogWorks.map((work) =>
    applyOverride(work, store.overrides[work.id]),
  );
  const custom = store.customWorks.map((work) =>
    applyOverride(work, store.overrides[work.id]),
  );
  return [...base, ...custom];
}

export function findManagedWork(idOrSlug: string) {
  return managedWorks().find(
    (work) => work.id === idOrSlug || work.slug === idOrSlug,
  );
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export function createWorkDraft(input: {
  titleEn: string;
  titleHi?: string;
  descriptionEn?: string;
  descriptionHi?: string;
  pricingModel: PricingModel;
  priceAmount?: number | null;
  status?: WorkStatus;
}): Work {
  const store = readAdminStore();
  const number = String(catalogWorks.length + store.customWorks.length + 1).padStart(
    2,
    "0",
  );
  const id = `work-${Date.now().toString(36)}`;
  const titleEn = input.titleEn.trim();
  const titleHi = (input.titleHi ?? titleEn).trim();
  const pricingModel = input.pricingModel;
  const price = moneyFor(pricingModel, input.priceAmount);
  const slugBase = slugify(titleEn) || id;

  return {
    id,
    slug: slugBase,
    number,
    title: { en: titleEn, hi: titleHi },
    subtitle: {
      en: input.descriptionEn?.trim() || "[SUBTITLE]",
      hi: input.descriptionHi?.trim() || "[उपशीर्षक]",
    },
    description: {
      en: input.descriptionEn?.trim() || "[SHORT DESCRIPTION]",
      hi: input.descriptionHi?.trim() || "[संक्षिप्त विवरण]",
    },
    about: {
      en: input.descriptionEn?.trim() || "[100–300 word introduction]",
      hi: input.descriptionHi?.trim() || "[100–300 शब्दों का परिचय]",
    },
    kind: "story",
    status: input.status ?? "forthcoming",
    pricingModel,
    publishedAt: { en: "[PUBLICATION DATE]", hi: "[प्रकाशन तिथि]" },
    version: "1.0",
    image: "/images/stills/letter-notebook.jpg",
    imageAlt: { en: titleEn, hi: titleHi },
    hindi: {
      language: "hi",
      label: { en: "Hindi Edition", hi: "हिन्दी संस्करण" },
      version: "1.0",
      publishedAt: { en: "[PUBLICATION DATE]", hi: "[प्रकाशन तिथि]" },
      status: input.status ?? "forthcoming",
      accessType: "ONLINE",
      fileKey: null,
      price,
    },
    english: {
      language: "en",
      label: { en: "English Edition", hi: "अंग्रेज़ी संस्करण" },
      version: "1.0",
      publishedAt: { en: "[PUBLICATION DATE]", hi: "[प्रकाशन तिथि]" },
      status: "forthcoming",
      accessType: "ONLINE",
      fileKey: null,
      price,
    },
    audio: {
      available: true,
      title: { en: "Author's Voice", hi: "लेखक की आवाज़" },
      accessType: "ONLINE",
      src: null,
      poster: "/images/stills/letter-notebook.jpg",
      duration: { en: "[DURATION]", hi: "[अवधि]" },
      price,
    },
    film: {
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
      price,
    },
    credits: {
      writtenBy: { en: platform.creatorName, hi: platform.creatorNameHi },
      narratedBy: { en: platform.creatorName, hi: platform.creatorNameHi },
      filmConcept: copyToBeProvided,
      direction: copyToBeProvided,
      editing: copyToBeProvided,
      aiProduction: copyToBeProvided,
      music: copyToBeProvided,
      other: copyToBeProvided,
    },
    whatYouReceive:
      pricingModel === "free"
        ? [
            { en: "Hindi Edition — FREE", hi: "हिन्दी संस्करण — निःशुल्क" },
            { en: "English Edition — FREE", hi: "अंग्रेज़ी संस्करण — निःशुल्क" },
          ]
        : [
            { en: "Hindi Edition — [PRICE]", hi: "हिन्दी संस्करण — [मूल्य]" },
            { en: "English Edition — [PRICE]", hi: "अंग्रेज़ी संस्करण — [मूल्य]" },
          ],
    offers: [
      {
        id: pricingModel === "free" ? "complete-free" : "complete",
        label: { en: "Complete Digital Access", hi: "पूर्ण डिजिटल पहुँच" },
        includes: [
          { en: "Hindi Edition", hi: "हिन्दी संस्करण" },
          { en: "English Edition", hi: "अंग्रेज़ी संस्करण" },
        ],
        price,
        accessType: "ONLINE",
      },
    ],
    aiAssisted: true,
    tax: {
      rate: null,
      inclusive: true,
      display: { en: "[TAX]", hi: "[कर]" },
    },
    copyrightOwner: {
      en: platform.creatorName,
      hi: platform.creatorNameHi,
    },
  };
}

export function adminStats() {
  const works = managedWorks();
  const store = readAdminStore();
  const paidOrders = store.orders.filter((order) => order.status === "paid");
  const pendingOrders = store.orders.filter((order) => order.status === "pending");
  const buyers = new Map<string, { userId: string; orders: number }>();
  for (const order of paidOrders) {
    const current = buyers.get(order.userId) ?? { userId: order.userId, orders: 0 };
    current.orders += 1;
    buyers.set(order.userId, current);
  }

  return {
    worksTotal: works.length,
    worksPublished: works.filter((work) => work.status === "published").length,
    worksFree: works.filter((work) => work.pricingModel === "free").length,
    worksPaid: works.filter((work) => work.pricingModel === "paid").length,
    ordersPending: pendingOrders.length,
    ordersPaid: paidOrders.length,
    buyers: Array.from(buyers.values()),
    uploads: store.uploads.length,
  };
}

export { uploadDir };
