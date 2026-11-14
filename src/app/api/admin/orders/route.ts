import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { adminStats, managedWorks, readAdminStore } from "@/lib/admin-data";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [store, works, stats] = await Promise.all([
    readAdminStore(),
    managedWorks(),
    adminStats(),
  ]);
  const workById = new Map(works.map((work) => [work.id, work]));
  const orders = store.orders.map((order) => ({
    ...order,
    workTitle: workById.get(order.workId)?.title ?? order.product,
  }));

  const buyers = new Map<
    string,
    { userId: string; paidOrders: number; works: string[] }
  >();

  for (const order of store.orders.filter((entry) => entry.status === "paid")) {
    const current = buyers.get(order.userId) ?? {
      userId: order.userId,
      paidOrders: 0,
      works: [],
    };
    current.paidOrders += 1;
    const title = workById.get(order.workId)?.title.en ?? order.product.en;
    if (!current.works.includes(title)) current.works.push(title);
    buyers.set(order.userId, current);
  }

  return NextResponse.json({
    orders,
    buyers: Array.from(buyers.values()),
    stats,
  });
}
