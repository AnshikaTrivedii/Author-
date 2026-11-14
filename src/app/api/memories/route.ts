import { NextResponse } from "next/server";
import { addMemory, recentMemories } from "@/lib/audience-store";

export async function GET() {
  return NextResponse.json({
    memories: await recentMemories(),
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

  const memory = await addMemory({ en, hi });
  return NextResponse.json({ ok: true, memory });
}
