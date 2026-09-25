import type { AccessPermission, AccessType, DigitalAsset, Order, Purchase, UserAccount } from "@/data/types";

export const accounts: UserAccount[] = [];
export const orders: Order[] = [];
export const purchases: Purchase[] = [];
export const permissions: AccessPermission[] = [];
export const digitalAssets: DigitalAsset[] = [];

export function permissionFromAccess(accessType: AccessType) {
  return {
    online: accessType === "ONLINE" || accessType === "ONLINE_AND_DOWNLOAD",
    download: accessType === "DOWNLOAD" || accessType === "ONLINE_AND_DOWNLOAD",
  };
}

export function hasLibraryAccess(userId: string | null, workId: string) {
  if (!userId) return false;
  return permissions.some(
    (entry) => entry.userId === userId && entry.workId === workId,
  );
}

export function purchasedWorksFor(userId: string | null) {
  if (!userId) return [];
  return purchases.filter((entry) => entry.userId === userId);
}
