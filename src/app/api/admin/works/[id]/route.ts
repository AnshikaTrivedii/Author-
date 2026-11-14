import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import {
  findManagedWork,
  readAdminStore,
  saveWorkOverride,
  type WorkOverride,
} from "@/lib/admin-data";
import type { PricingModel, WorkStatus } from "@/data/types";

type Params = { id: string };

export async function PATCH(
  request: Request,
  context: { params: Promise<Params> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const work = await findManagedWork(id);
  if (!work) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await request.json().catch(() => null)) as {
    titleEn?: string;
    titleHi?: string;
    descriptionEn?: string;
    descriptionHi?: string;
    pricingModel?: PricingModel;
    status?: WorkStatus;
    priceAmount?: number | null;
  } | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const store = await readAdminStore();
  const current = store.overrides[work.id] ?? {};
  const next: WorkOverride = { ...current };

  if (typeof body.titleEn === "string") next.titleEn = body.titleEn.trim();
  if (typeof body.titleHi === "string") next.titleHi = body.titleHi.trim();
  if (typeof body.descriptionEn === "string") {
    next.descriptionEn = body.descriptionEn.trim();
  }
  if (typeof body.descriptionHi === "string") {
    next.descriptionHi = body.descriptionHi.trim();
  }
  if (body.pricingModel === "free" || body.pricingModel === "paid") {
    next.pricingModel = body.pricingModel;
    if (body.pricingModel === "free") next.priceAmount = 0;
  }
  if (
    body.status === "published" ||
    body.status === "forthcoming" ||
    body.status === "unpublished"
  ) {
    next.status = body.status;
  }
  if (body.priceAmount === null || typeof body.priceAmount === "number") {
    next.priceAmount = body.priceAmount;
  }

  await saveWorkOverride(work.id, next);
  return NextResponse.json({ ok: true, work: await findManagedWork(work.id) });
}
