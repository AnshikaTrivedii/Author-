import { NextResponse } from "next/server";
import { findManagedWork } from "@/lib/admin-data";
import { startCheckout } from "@/lib/commerce";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    workSlug?: string;
    offerId?: string;
  };

  if (!body.workSlug || !body.offerId) {
    return NextResponse.json({ status: "unconfigured" }, { status: 400 });
  }

  const work = await findManagedWork(body.workSlug);
  if (!work) {
    return NextResponse.json({ status: "unconfigured" }, { status: 404 });
  }

  const result = await startCheckout({
    workSlug: body.workSlug,
    offerId: body.offerId,
  });

  return NextResponse.json(result);
}
