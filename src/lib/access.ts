import type { Work } from "@/data/types";

export function canAccessPublicly(work: Work, kind: "read" | "audio" | "film") {
  if (work.status !== "published") return false;
  if (work.pricingModel === "free") return true;
  void kind;
  return false;
}

export function protectedAssetPath(workId: string, kind: string) {
  return `/api/media/${workId}/${kind}`;
}
