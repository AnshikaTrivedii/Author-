import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import {
  adminStats,
  createWorkDraft,
  managedWorks,
  readAdminStore,
  writeAdminStore,
} from "@/lib/admin-data";
import type { PricingModel, WorkStatus } from "@/data/types";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = readAdminStore();
  return NextResponse.json({
    works: managedWorks(),
    orders: store.orders,
    uploads: store.uploads,
    stats: adminStats(),
  });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    titleEn?: string;
    titleHi?: string;
    descriptionEn?: string;
    descriptionHi?: string;
    pricingModel?: PricingModel;
    priceAmount?: number | null;
    status?: WorkStatus;
  } | null;

  if (!body?.titleEn?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const pricingModel = body.pricingModel === "paid" ? "paid" : "free";
  const priceAmount =
    pricingModel === "paid"
      ? typeof body.priceAmount === "number"
        ? body.priceAmount
        : null
      : 0;

  const work = createWorkDraft({
    titleEn: body.titleEn,
    titleHi: body.titleHi,
    descriptionEn: body.descriptionEn,
    descriptionHi: body.descriptionHi,
    pricingModel,
    priceAmount,
    status: body.status === "published" ? "published" : "forthcoming",
  });

  const store = readAdminStore();
  store.customWorks.push(work);
  writeAdminStore(store);

  return NextResponse.json({ ok: true, work });
}
