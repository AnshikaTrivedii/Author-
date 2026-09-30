import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { adminStats, findManagedWork, readAdminStore } from "@/lib/admin-data";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = readAdminStore();
  const orders = store.orders.map((order) => ({
    ...order,
    workTitle: findManagedWork(order.workId)?.title ?? order.product,
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
    const title = findManagedWork(order.workId)?.title.en ?? order.product.en;
    if (!current.works.includes(title)) current.works.push(title);
    buyers.set(order.userId, current);
  }

  return NextResponse.json({
    orders,
    buyers: Array.from(buyers.values()),
    stats: adminStats(),
  });
}
