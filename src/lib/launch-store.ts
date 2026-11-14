import { existsSync } from "fs";
import path from "path";
import { MongoServerError, type Filter } from "mongodb";
import { verifyPassword } from "@/lib/passwords";
import { database } from "@/lib/mongodb";

export type ReaderAccount = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  notifyLaunch: boolean;
  notifyConsentAt: string | null;
};

export type RegistrationGender = "male" | "female" | "non-binary" | "prefer-not-to-say";

export type RegistrationRecord = {
  name: string;
  age: number;
  gender: RegistrationGender;
  countryCode: string;
  mobileNumber: string;
  email: string;
  postalCode: string;
  createdAt: string;
  notifyLaunch: true;
  notifyConsentAt: string;
};

export type FilmAssets = {
  poster: string | null;
  video: string | null;
  subtitlesEn: string | null;
};

type AccountDocument = ReaderAccount & { _id: string };
type RegistrationDocument = RegistrationRecord & { _id: string };
type LikeDocument = { _id: string; subject: "introduction"; createdAt: string };
type FilmDocument = FilmAssets & { _id: "introduction" };

const defaultVideo =
  "https://orion-led-quotations.s3.ap-south-1.amazonaws.com/quotations/Book+content+/WhatsApp+Video+2026-11-14+at+12.17.10.mp4";
const defaultPoster = "/images/stills/grandmother.jpg";

function initialFilm(): FilmAssets {
  return {
    poster: existsSync(path.join(process.cwd(), "public", defaultPoster)) ? defaultPoster : null,
    video: defaultVideo,
    subtitlesEn: null,
  };
}

export function publicAssetPath(value: string | null | undefined) {
  if (!value || value.includes("..")) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  if (value.startsWith("https://")) {
    try {
      const url = new URL(value);
      return url.protocol === "https:" ? url.toString() : null;
    } catch {
      return null;
    }
  }
  return null;
}

export async function getFilmAssets(): Promise<FilmAssets> {
  const db = await database();
  const film = await db.collection<FilmDocument>("film_settings").findOne({ _id: "introduction" });
  const fallback = initialFilm();
  return {
    poster: publicAssetPath(film?.poster) ?? fallback.poster,
    video: publicAssetPath(film?.video) ?? fallback.video,
    subtitlesEn: publicAssetPath(film?.subtitlesEn),
  };
}

export async function saveFilmAsset(kind: keyof FilmAssets, assetPath: string) {
  const safe = publicAssetPath(assetPath);
  if (!safe) throw new Error("Invalid asset path");
  const db = await database();
  await db.collection<FilmDocument>("film_settings").updateOne(
    { _id: "introduction" },
    { $set: { [kind]: safe } },
    { upsert: true },
  );
  return getFilmAssets();
}

export async function findAccount(email: string) {
  const db = await database();
  const account = await db.collection<AccountDocument>("reader_accounts").findOne({
    _id: email.trim().toLowerCase(),
  });
  if (!account) return null;
  const { _id: _key, ...reader } = account;
  void _key;
  return reader;
}

export async function verifyAccountPassword(email: string, password: string) {
  const account = await findAccount(email);
  if (!account) return { status: "missing" as const };
  if (!verifyPassword(password, account.passwordHash)) return { status: "invalid" as const };
  return { status: "ok" as const, account };
}

export async function registerLaunchInterest(input: {
  name: string;
  age: number;
  gender: RegistrationGender;
  countryCode: string;
  mobileNumber: string;
  email: string;
  postalCode: string;
}) {
  const email = input.email.trim().toLowerCase();
  const createdAt = new Date().toISOString();
  const db = await database();
  try {
    await db.collection<RegistrationDocument>("launch_registrations").insertOne({
      _id: email,
      name: input.name.trim().replace(/\s+/g, " "),
      age: input.age,
      gender: input.gender,
      countryCode: input.countryCode,
      mobileNumber: input.mobileNumber,
      email,
      postalCode: input.postalCode,
      createdAt,
      notifyLaunch: true,
      notifyConsentAt: createdAt,
    });
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return { ok: false as const, error: "duplicate" as const };
    }
    throw error;
  }
  return { ok: true as const };
}

export async function likeState(identity: string) {
  const db = await database();
  const collection = db.collection<LikeDocument>("introduction_likes");
  const [count, liked] = await Promise.all([
    collection.countDocuments({ subject: "introduction" }),
    collection.findOne({ _id: identity }),
  ]);
  return { count, liked: Boolean(liked) };
}

export async function toggleLike(identity: string) {
  const db = await database();
  const collection = db.collection<LikeDocument>("introduction_likes");
  const removed = await collection.findOneAndDelete({ _id: identity });
  if (!removed) {
    try {
      await collection.insertOne({
        _id: identity,
        subject: "introduction",
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      if (!(error instanceof MongoServerError && error.code === 11000)) throw error;
    }
  }
  return likeState(identity);
}

export async function registrationSummary(filter: "all" | "subscribed" | "unsubscribed") {
  const db = await database();
  const collection = db.collection<RegistrationDocument>("launch_registrations");
  const query: Filter<RegistrationDocument> =
    filter === "all"
      ? {}
      : filter === "subscribed"
        ? { notifyLaunch: true }
        : { notifyLaunch: { $ne: true } };
  const [total, subscribed, accounts] = await Promise.all([
    collection.countDocuments(),
    collection.countDocuments({ notifyLaunch: true }),
    collection.find(query, {
      projection: {
        _id: 0,
        name: 1,
        age: 1,
        gender: 1,
        countryCode: 1,
        mobileNumber: 1,
        email: 1,
        postalCode: 1,
        createdAt: 1,
        notifyLaunch: 1,
        notifyConsentAt: 1,
      },
    })
      .sort({ createdAt: -1 })
      .toArray(),
  ]);
  return { total, subscribed, registrations: accounts as RegistrationRecord[] };
}
