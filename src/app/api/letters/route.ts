import { NextResponse } from "next/server";
import { addLetter } from "@/lib/audience-store";

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

  await addLetter({ name, email, message });
  return NextResponse.json({ ok: true });
}
