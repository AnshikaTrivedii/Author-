import { NextResponse } from "next/server";
import { readAudienceStore, writeAudienceStore } from "@/lib/audience-store";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    email?: string;
    message?: string;
  } | null;

  const name = body?.name?.trim() ?? "";
  const email = body?.email?.trim().toLowerCase() ?? "";
  const message = body?.message?.trim() ?? "";
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (name.length < 2 || !emailOk || message.length < 20 || message.length > 2000) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const store = readAudienceStore();
  store.letters.unshift({
    id: `let-${Date.now().toString(36)}`,
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
    status: "received",
  });
  writeAudienceStore(store);
  return NextResponse.json({ ok: true });
}
