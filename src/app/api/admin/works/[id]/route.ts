import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import {
  findManagedWork,
  readAdminStore,
  writeAdminStore,
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
  const work = findManagedWork(id);
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

  const store = readAdminStore();
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

  store.overrides[work.id] = next;

  const customIndex = store.customWorks.findIndex((entry) => entry.id === work.id);
  if (customIndex >= 0) {
    const pricingModel = next.pricingModel ?? store.customWorks[customIndex].pricingModel;
    const amount =
      pricingModel === "free"
        ? 0
        : (next.priceAmount ?? store.customWorks[customIndex].offers[0]?.price.amount);
    const display =
      pricingModel === "free"
        ? { en: "FREE", hi: "निःशुल्क" }
        : amount == null
          ? { en: "[PRICE]", hi: "[मूल्य]" }
          : { en: `₹${amount}`, hi: `₹${amount}` };
    const price = { amount: amount ?? null, currency: "INR" as const, display };
    const updated = {
      ...store.customWorks[customIndex],
      title: {
        en: next.titleEn ?? store.customWorks[customIndex].title.en,
        hi: next.titleHi ?? store.customWorks[customIndex].title.hi,
      },
      description: {
        en: next.descriptionEn ?? store.customWorks[customIndex].description.en,
        hi: next.descriptionHi ?? store.customWorks[customIndex].description.hi,
      },
      pricingModel,
      status: next.status ?? store.customWorks[customIndex].status,
      hindi: { ...store.customWorks[customIndex].hindi, price },
      english: { ...store.customWorks[customIndex].english, price },
      audio: { ...store.customWorks[customIndex].audio, price },
      film: { ...store.customWorks[customIndex].film, price },
      offers: store.customWorks[customIndex].offers.map((offer) => ({
        ...offer,
        price,
      })),
    };
    store.customWorks[customIndex] = updated;
  }

  writeAdminStore(store);
  return NextResponse.json({ ok: true, work: findManagedWork(work.id) });
}
