import type { Copy, CopyLines } from "@/lib/locale";

export type NavItem = {
  label: Copy;
  href: string;
  emphasis?: boolean;
};

export type AccessType = "ONLINE" | "DOWNLOAD" | "ONLINE_AND_DOWNLOAD";
export type PricingModel = "free" | "paid";
export type WorkStatus = "published" | "forthcoming" | "unpublished";
export type WorkKind = "story" | "film" | "audio";
export type EditionLanguage = "hi" | "en";

export type Money = {
  amount: number | null;
  currency: "INR";
  display: Copy;
};

export type Edition = {
  language: EditionLanguage;
  label: Copy;
  version: string;
  publishedAt: Copy;
  status: WorkStatus;
  accessType: AccessType;
  fileKey: string | null;
  price: Money;
};

export type AudioPresentation = {
  available: boolean;
  title: Copy;
  accessType: AccessType;
  src: string | null;
  poster: string | null;
  duration: Copy;
  price: Money;
};

export type FilmPresentation = {
  available: boolean;
  title: Copy;
  synopsis: Copy;
  duration: Copy;
  accessType: AccessType;
  src: string | null;
  poster: string | null;
  language: Copy;
  subtitles: Copy;
  aiAssisted: boolean;
  aiTools: Copy;
  price: Money;
};

export type WorkCredits = {
  writtenBy: Copy;
  narratedBy: Copy;
  filmConcept: Copy;
  direction: Copy;
  editing: Copy;
  aiProduction: Copy;
  music: Copy;
  other: Copy;
};

export type Offer = {
  id: string;
  label: Copy;
  includes: Copy[];
  price: Money;
  accessType: AccessType;
};

export type TaxConfig = {
  rate: number | null;
  inclusive: boolean;
  display: Copy;
};

export type Work = {
  id: string;
  slug: string;
  number: string;
  title: Copy;
  subtitle: Copy;
  description: Copy;
  about: Copy;
  kind: WorkKind;
  status: WorkStatus;
  pricingModel: PricingModel;
  publishedAt: Copy;
  version: string;
  image: string;
  imageAlt: Copy;
  hindi: Edition;
  english: Edition;
  audio: AudioPresentation;
  film: FilmPresentation;
  credits: WorkCredits;
  whatYouReceive: Copy[];
  offers: Offer[];
  aiAssisted: boolean;
  tax: TaxConfig;
  copyrightOwner: Copy;
};

export type UserAccount = {
  id: string;
  email: string;
};

export type Order = {
  id: string;
  userId: string;
  workId: string;
  offerId: string;
  product: Copy;
  format: Copy;
  amount: Money;
  tax: Money;
  total: Money;
  status: "pending" | "paid" | "failed";
  createdAt: string;
};

export type Purchase = {
  id: string;
  orderId: string;
  userId: string;
  workId: string;
  offerId: string;
};

export type AccessPermission = {
  userId: string;
  workId: string;
  offerId: string;
  accessType: AccessType;
  online: boolean;
  download: boolean;
};

export type DigitalAsset = {
  workId: string;
  kind: "hindi" | "english" | "audio" | "film" | "video";
  fileKey: string | null;
  public: boolean;
};

export type InternalAssetRecord = {
  workId: string;
  asset: string;
  source: Copy;
  licence: Copy;
  record: Copy;
};

export type InternalProduction = {
  workId: string;
  originalManuscript: Copy;
  englishTranslation: Copy;
  hindiPdf: Copy;
  englishPdf: Copy;
  voiceMaster: Copy;
  videoMaster: Copy;
  filmMaster: Copy;
  script: Copy;
  storyboard: Copy;
  aiPrompts: Copy;
  aiAssets: Copy;
  musicLicence: Copy;
  stockLicence: Copy;
  agreements: Copy;
  finalExport: Copy;
  publicationDate: Copy;
  copyrightDocuments: Copy;
};

export type LegalDoc = {
  slug: string;
  title: Copy;
  draft: true;
  sections: Array<{ heading: Copy; body: Copy }>;
};

export type Platform = {
  title: string;
  titleLines: CopyLines;
  tagline: CopyLines;
  statement: Copy;
  siteUrl: string;
  ogImage: string;
  heroImage: string;
  heroVideo: string;
  creatorName: string;
  creatorNameHi: string;
  contactEmail: string;
  domainPlaceholder: string;
};
