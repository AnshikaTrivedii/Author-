import { NextResponse } from "next/server";
import { verifyAccountPassword } from "@/lib/launch-store";
import {
  adminCredentials,
  createToken,
  sameSecret,
  sessionCookie,
  sessionCookieOptions,
  type SessionRole,
} from "@/lib/session";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    role?: SessionRole;
    email?: string;
    password?: string;
  } | null;

  const role = body?.role === "admin" ? "admin" : body?.role === "reader" ? "reader" : null;
  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";

  if (!role || !emailPattern.test(email) || password.length < 8) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (role === "admin") {
    const admin = adminCredentials();
    const accepted =
      admin.email.length > 0 &&
      admin.password.length > 0 &&
      sameSecret(email, admin.email.toLowerCase()) &&
      sameSecret(password, admin.password);
    if (!accepted) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  } else {
    const account = await verifyAccountPassword(email, password);
    if (account.status !== "ok") {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }

  const token = createToken({ role, email });
  if (!token) {
    return NextResponse.json({ ok: false, error: "unconfigured" }, { status: 500 });
  }

  const response = NextResponse.json({
    ok: true,
    redirect: role === "admin" ? "/admin" : "/library",
  });
  response.cookies.set(sessionCookie, token, sessionCookieOptions());
  return response;
}
