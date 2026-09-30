import { NextResponse } from "next/server";
import { readAudienceStore, writeAudienceStore } from "@/lib/audience-store";

export async function GET() {
  const store = readAudienceStore();
  return NextResponse.json({
    memories: store.memories.slice(0, 40),
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    en?: string;
    hi?: string;
  } | null;

  const en = body?.en?.trim() ?? "";
  const hi = body?.hi?.trim() || en;
  if (en.length < 8 || en.length > 280) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const store = readAudienceStore();
  const memory = {
    id: `mem-${Date.now().toString(36)}`,
    text: { en, hi },
    createdAt: new Date().toISOString(),
  };
  store.memories.unshift(memory);
  store.memories = store.memories.slice(0, 120);
  writeAudienceStore(store);
  return NextResponse.json({ ok: true, memory });
}
