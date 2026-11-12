import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { readSession } from "@/lib/session";

export const visitorCookie = "loi-visitor";

export async function likeIdentity(request: Request) {
  const session = await readSession();
  if (session?.email) {
    return { identity: `user:${session.email.toLowerCase()}`, visitorId: null as string | null };
  }

  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/(?:^|;\s*)loi-visitor=([^;]+)/);
  const existing = match?.[1] ? decodeURIComponent(match[1]) : "";
  if (/^[A-Za-z0-9_-]{16,128}$/.test(existing)) {
    return { identity: `anon:${existing}`, visitorId: null };
  }

  const visitorId = randomBytes(16).toString("base64url");
  return { identity: `anon:${visitorId}`, visitorId };
}

export function applyVisitorCookie(response: NextResponse, visitorId: string | null) {
  if (!visitorId) return response;
  response.cookies.set(visitorCookie, visitorId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 400,
  });
  return response;
}
