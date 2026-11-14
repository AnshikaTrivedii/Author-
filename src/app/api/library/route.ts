import { NextResponse } from "next/server";
import { findManagedWork } from "@/lib/admin-data";
import { findAccount } from "@/lib/launch-store";
import { purchasedWorksFor } from "@/lib/library";
import { readSession } from "@/lib/session";

export async function GET() {
  const session = await readSession();
  if (session?.role !== "reader") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await findAccount(session.email);
  if (!account) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const purchases = await purchasedWorksFor(account.id);
  const resolved = await Promise.all(purchases.map((purchase) => findManagedWork(purchase.workId)));
  const works = resolved.flatMap((work) => {
    return work ? [{ slug: work.slug, title: work.title }] : [];
  });
  return NextResponse.json({ email: account.email, works });
}
