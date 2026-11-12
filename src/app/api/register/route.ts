import { NextResponse } from "next/server";
import { registerAccount } from "@/lib/launch-store";
import { clientAddress, rateLimit } from "@/lib/rate-limit";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!rateLimit(`register:${clientAddress(request)}`, 8, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    notifyLaunch?: boolean;
  } | null;

  const name = body?.name?.trim().replace(/\s+/g, " ") ?? "";
  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";
  const confirmPassword = body?.confirmPassword ?? "";
  const notifyLaunch = body?.notifyLaunch === true;

  if (name.length < 2 || name.length > 80 || !emailPattern.test(email) || email.length > 120) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  if (password.length < 8 || password.length > 200) {
    return NextResponse.json({ ok: false, error: "weak" }, { status: 400 });
  }
  if (password !== confirmPassword) {
    return NextResponse.json({ ok: false, error: "mismatch" }, { status: 400 });
  }

  const result = await registerAccount({ name, email, password, notifyLaunch });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 409 });
  }

  return NextResponse.json({ ok: true, notifyLaunch: result.notifyLaunch });
}
