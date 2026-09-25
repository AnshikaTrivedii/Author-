import type { InternalAssetRecord, InternalProduction } from "./types";
import { copyToBeProvided } from "./site";

const hidden = copyToBeProvided;

export const internalProduction: InternalProduction[] = [
  "work-01",
  "work-02",
  "work-03",
].map((workId) => ({
  workId,
  originalManuscript: hidden,
  englishTranslation: hidden,
  hindiPdf: hidden,
  englishPdf: hidden,
  voiceMaster: hidden,
  videoMaster: hidden,
  filmMaster: hidden,
  script: hidden,
  storyboard: hidden,
  aiPrompts: hidden,
  aiAssets: hidden,
  musicLicence: hidden,
  stockLicence: hidden,
  agreements: hidden,
  finalExport: hidden,
  publicationDate: hidden,
  copyrightDocuments: hidden,
}));

export const internalFilmAssets: InternalAssetRecord[] = [
  { workId: "work-01", asset: "Script", source: hidden, licence: hidden, record: hidden },
  { workId: "work-01", asset: "Voice", source: hidden, licence: hidden, record: hidden },
  { workId: "work-01", asset: "AI visuals", source: hidden, licence: hidden, record: hidden },
  { workId: "work-01", asset: "Music", source: hidden, licence: hidden, record: hidden },
  { workId: "work-01", asset: "Stock image", source: hidden, licence: hidden, record: hidden },
  { workId: "work-01", asset: "Font", source: hidden, licence: hidden, record: hidden },
];
