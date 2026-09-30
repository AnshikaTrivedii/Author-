import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const sessionCookie = "loi-session";

export type SessionRole = "reader" | "admin";

export type Session = {
  role: SessionRole;
  email: string;
  exp: number;
};

const week = 60 * 60 * 24 * 7;

function secret() {
  const value = process.env.AUTH_SECRET;
  if (value) return value;
  if (process.env.NODE_ENV === "production") return "";
  return "dev-echoes-session-secret";
}

export function adminCredentials() {
  const email =
    process.env.ADMIN_EMAIL ??
    (process.env.NODE_ENV === "production" ? "" : "admin@echoesofmemories.com");
  const password =
    process.env.ADMIN_PASSWORD ??
    (process.env.NODE_ENV === "production" ? "" : "EchoesAdmin2026");
  return { email, password };
}

export function sameSecret(left: string, right: string) {
  const a = createHash("sha256").update(left).digest();
  const b = createHash("sha256").update(right).digest();
  return timingSafeEqual(a, b);
}

export function createToken(session: Omit<Session, "exp">) {
  const key = secret();
  if (!key) return null;
  const body = Buffer.from(
    JSON.stringify({ ...session, exp: Date.now() + week * 1000 }),
  ).toString("base64url");
  const sig = createHmac("sha256", key).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyToken(token: string | undefined | null): Session | null {
  if (!token) return null;
  const key = secret();
  if (!key) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", key).update(body).digest("base64url");
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as Session;
    if (parsed.exp < Date.now()) return null;
    if (parsed.role !== "reader" && parsed.role !== "admin") return null;
    if (!parsed.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: week,
  };
}

export async function readSession() {
  const jar = await cookies();
  return verifyToken(jar.get(sessionCookie)?.value);
}

export async function requireAdmin() {
  const session = await readSession();
  if (!session || session.role !== "admin") return null;
  return session;
}
