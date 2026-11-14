import type { AccessPermission, AccessType, Purchase } from "@/data/types";
import { database } from "@/lib/mongodb";

export function permissionFromAccess(accessType: AccessType) {
  return {
    online: accessType === "ONLINE" || accessType === "ONLINE_AND_DOWNLOAD",
    download: accessType === "DOWNLOAD" || accessType === "ONLINE_AND_DOWNLOAD",
  };
}

export async function hasLibraryAccess(userId: string | null, workId: string) {
  if (!userId) return false;
  const db = await database();
  const permission = await db.collection<AccessPermission>("access_permissions").findOne({
    userId,
    workId,
  });
  return Boolean(permission);
}

export async function purchasedWorksFor(userId: string | null) {
  if (!userId) return [];
  const db = await database();
  return db.collection<Purchase>("purchases").find({ userId }, { projection: { _id: 0 } }).toArray();
}
