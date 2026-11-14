import { randomUUID } from "crypto";
import { mkdir } from "fs/promises";
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
import { database } from "@/lib/mongodb";

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

type WorkDocument = { _id: string; work: Work };
type OverrideDocument = { _id: string; override: WorkOverride };
type UploadDocument = AdminUpload & { _id: string };
type OrderDocument = Order & { _id: string };

export async function readAdminStore(): Promise<AdminStore> {
  const db = await database();
  const [custom, overrides, uploads, orders] = await Promise.all([
    db.collection<WorkDocument>("custom_works").find().toArray(),
    db.collection<OverrideDocument>("work_overrides").find().toArray(),
    db.collection<UploadDocument>("work_uploads").find().sort({ uploadedAt: -1 }).toArray(),
    db.collection<OrderDocument>("orders").find().sort({ createdAt: -1 }).toArray(),
  ]);
  return {
    customWorks: custom.map((entry) => entry.work),
    overrides: Object.fromEntries(overrides.map((entry) => [entry._id, entry.override])),
    uploads: uploads.map(({ _id, ...entry }) => {
      void _id;
      return entry;
    }),
    orders: orders.map(({ _id, ...entry }) => {
      void _id;
      return entry;
    }),
  };
}

export async function addCustomWork(work: Work) {
  const db = await database();
  await db.collection<WorkDocument>("custom_works").insertOne({ _id: work.id, work });
}

export async function saveWorkOverride(workId: string, override: WorkOverride) {
  const db = await database();
  await db.collection<OverrideDocument>("work_overrides").updateOne(
    { _id: workId },
    { $set: { override } },
    { upsert: true },
  );
}

export async function addWorkUpload(upload: AdminUpload) {
  const db = await database();
  await db.collection<UploadDocument>("work_uploads").insertOne({
    _id: randomUUID(),
    ...upload,
  });
}

export async function ensureUploadDir() {
  await mkdir(uploadDir, { recursive: true });
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
  const amount =
    override.priceAmount !== undefined
      ? override.priceAmount
      : work.offers[0]?.price.amount;
  const price = moneyFor(pricingModel, amount);
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

export async function managedWorks(): Promise<Work[]> {
  const store = await readAdminStore();
  const base = catalogWorks.map((work) =>
    applyOverride(work, store.overrides[work.id]),
  );
  const custom = store.customWorks.map((work) =>
    applyOverride(work, store.overrides[work.id]),
  );
  return [...base, ...custom];
}

export async function findManagedWork(idOrSlug: string) {
  return (await managedWorks()).find(
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

export async function createWorkDraft(input: {
  titleEn: string;
  titleHi?: string;
  descriptionEn?: string;
  descriptionHi?: string;
  pricingModel: PricingModel;
  priceAmount?: number | null;
  status?: WorkStatus;
}): Promise<Work> {
  const store = await readAdminStore();
  const number = String(catalogWorks.length + store.customWorks.length + 1).padStart(
    2,
    "0",
  );
  const id = `work-${randomUUID()}`;
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

export async function adminStats() {
  const [works, store] = await Promise.all([managedWorks(), readAdminStore()]);
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
