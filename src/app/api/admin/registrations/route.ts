import { NextResponse } from "next/server";
import { registrationSummary } from "@/lib/launch-store";
import { requireAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const filterValue = new URL(request.url).searchParams.get("filter");
  const filter =
    filterValue === "subscribed" || filterValue === "unsubscribed" ? filterValue : "all";

  return NextResponse.json(registrationSummary(filter));
}
