import { NextResponse } from "next/server";
import { likeState, toggleLike } from "@/lib/launch-store";
import { clientAddress, rateLimit } from "@/lib/rate-limit";
import { applyVisitorCookie, likeIdentity } from "@/lib/visitor";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const identity = await likeIdentity(request);
  const response = NextResponse.json(await likeState(identity.identity));
  return applyVisitorCookie(response, identity.visitorId);
}

export async function POST(request: Request) {
  if (!rateLimit(`like:${clientAddress(request)}`, 30, 60_000)) {
    return NextResponse.json({ error: "rate" }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as { subject?: string } | null;
  if (body?.subject !== "introduction") {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const identity = await likeIdentity(request);
  const state = await toggleLike(identity.identity);
  const response = NextResponse.json(state);
  return applyVisitorCookie(response, identity.visitorId);
}
