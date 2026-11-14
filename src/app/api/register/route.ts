import { NextResponse } from "next/server";
import {
  registerLaunchInterest,
  type RegistrationGender,
} from "@/lib/launch-store";
import { clientAddress, rateLimit } from "@/lib/rate-limit";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const genders = new Set<RegistrationGender>([
  "male",
  "female",
  "non-binary",
  "prefer-not-to-say",
]);

export async function POST(request: Request) {
  if (!rateLimit(`register:${clientAddress(request)}`, 8, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as {
    name?: string;
    age?: number;
    gender?: RegistrationGender;
    countryCode?: string;
    mobileNumber?: string;
    email?: string;
    postalCode?: string;
  } | null;

  const name = body?.name?.trim().replace(/\s+/g, " ") ?? "";
  const age = Number(body?.age);
  const gender = body?.gender;
  const countryCode = `+${body?.countryCode?.replace(/\D/g, "") ?? ""}`;
  const mobileNumber = body?.mobileNumber?.replace(/\D/g, "") ?? "";
  const email = body?.email?.trim().toLowerCase() ?? "";
  const postalCode = body?.postalCode?.trim().toUpperCase().replace(/\s+/g, " ") ?? "";

  if (
    name.length < 2 ||
    name.length > 80 ||
    !Number.isInteger(age) ||
    age < 1 ||
    age > 120 ||
    !gender ||
    !genders.has(gender) ||
    !/^\+[1-9]\d{0,2}$/.test(countryCode) ||
    mobileNumber.length < 6 ||
    mobileNumber.length > 14 ||
    `${countryCode.slice(1)}${mobileNumber}`.length > 15 ||
    !emailPattern.test(email) ||
    email.length > 120 ||
    !/^[A-Z0-9][A-Z0-9 -]{1,10}[A-Z0-9]$/.test(postalCode)
  ) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const result = await registerLaunchInterest({
    name,
    age,
    gender,
    countryCode,
    mobileNumber,
    email,
    postalCode,
  });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}
