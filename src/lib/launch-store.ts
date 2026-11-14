import { randomBytes } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { hashPassword, verifyPassword } from "@/lib/passwords";

export type ReaderAccount = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  notifyLaunch: boolean;
  notifyConsentAt: string | null;
};

export type RegistrationRecord = {
  name: string;
  email: string;
  createdAt: string;
  notifyLaunch: boolean;
  notifyConsentAt: string | null;
};

export type FilmAssets = {
  poster: string | null;
  video: string | null;
  subtitlesEn: string | null;
};

type LikeRecord = {
  subject: "introduction";
  identity: string;
  createdAt: string;
};

type LaunchStore = {
  accounts: Record<string, ReaderAccount>;
  likes: Record<string, LikeRecord>;
  film: FilmAssets;
};

const storeDir = path.join(process.cwd(), "data");
const storePath = path.join(storeDir, "launch-store.json");
const introduction = "introduction" as const;

const defaultVideo =
  "https://orion-led-quotations.s3.ap-south-1.amazonaws.com/quotations/Book+content+/WhatsApp+Video+2026-11-14+at+12.17.10.mp4";
const defaultPoster = "/images/stills/grandmother.jpg";

function fileExists(publicPath: string) {
  return existsSync(path.join(process.cwd(), "public", publicPath));
}

function initialFilm(): FilmAssets {
  return {
    poster: fileExists(defaultPoster) ? defaultPoster : null,
    video: defaultVideo,
    subtitlesEn: null,
  };
}

function emptyStore(): LaunchStore {
  return { accounts: {}, likes: {}, film: initialFilm() };
}

function ensure() {
  if (!existsSync(storeDir)) mkdirSync(storeDir, { recursive: true });
  if (!existsSync(storePath)) {
    writeFileSync(storePath, JSON.stringify(emptyStore(), null, 2), "utf8");
  }
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

function readLaunchStore(): LaunchStore {
  ensure();
  try {
    const parsed = JSON.parse(readFileSync(storePath, "utf8")) as Partial<LaunchStore>;
    return {
      accounts: parsed.accounts ?? {},
      likes: parsed.likes ?? {},
      film: {
        poster: publicAssetPath(parsed.film?.poster) ?? initialFilm().poster,
        video: publicAssetPath(parsed.film?.video) ?? initialFilm().video,
        subtitlesEn: publicAssetPath(parsed.film?.subtitlesEn),
      },
    };
  } catch {
    const seeded = emptyStore();
    writeLaunchStore(seeded);
    return seeded;
  }
}

function writeLaunchStore(store: LaunchStore) {
  ensure();
  writeFileSync(storePath, JSON.stringify(store, null, 2), "utf8");
}

let pending = Promise.resolve();

function updateStore<T>(mutate: (store: LaunchStore) => T) {
  const run = pending.then(() => {
    const store = readLaunchStore();
    const result = mutate(store);
    writeLaunchStore(store);
    return result;
  });
  pending = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export function getFilmAssets(): FilmAssets {
  const film = readLaunchStore().film;
  return {
    poster: publicAssetPath(film.poster),
    video: publicAssetPath(film.video),
    subtitlesEn: publicAssetPath(film.subtitlesEn),
  };
}

export function saveFilmAsset(kind: keyof FilmAssets, assetPath: string) {
  const safe = publicAssetPath(assetPath);
  if (!safe) return getFilmAssets();
  return updateStore((store) => {
    store.film[kind] = safe;
    return { ...store.film };
  });
}

export function findAccount(email: string) {
  return readLaunchStore().accounts[email.trim().toLowerCase()] ?? null;
}

export function verifyAccountPassword(email: string, password: string) {
  const account = findAccount(email);
  if (!account) return { status: "missing" as const };
  if (!verifyPassword(password, account.passwordHash)) return { status: "invalid" as const };
  return { status: "ok" as const, account };
}

export function registerAccount(input: {
  name: string;
  email: string;
  password: string;
  notifyLaunch: boolean;
}) {
  const email = input.email.trim().toLowerCase();
  return updateStore((store) => {
    if (store.accounts[email]) return { ok: false as const, error: "duplicate" as const };
    const createdAt = new Date().toISOString();
    store.accounts[email] = {
      id: `rdr_${randomBytes(8).toString("base64url")}`,
      name: input.name.trim().replace(/\s+/g, " "),
      email,
      passwordHash: hashPassword(input.password),
      createdAt,
      notifyLaunch: input.notifyLaunch,
      notifyConsentAt: input.notifyLaunch ? createdAt : null,
    };
    return { ok: true as const, notifyLaunch: input.notifyLaunch };
  });
}

function likeKey(identity: string) {
  return `${introduction}::${identity}`;
}

export function likeState(identity: string) {
  const store = readLaunchStore();
  const likes = Object.values(store.likes).filter((entry) => entry.subject === introduction);
  return {
    count: likes.length,
    liked: Boolean(store.likes[likeKey(identity)]),
  };
}

export function toggleLike(identity: string) {
  return updateStore((store) => {
    const key = likeKey(identity);
    if (store.likes[key]) delete store.likes[key];
    else {
      store.likes[key] = {
        subject: introduction,
        identity,
        createdAt: new Date().toISOString(),
      };
    }
    const likes = Object.values(store.likes).filter((entry) => entry.subject === introduction);
    return { count: likes.length, liked: Boolean(store.likes[key]) };
  });
}

export function registrationSummary(filter: "all" | "subscribed" | "unsubscribed") {
  const accounts = Object.values(readLaunchStore().accounts);
  const subscribed = accounts.filter((account) => account.notifyLaunch).length;
  const visible = accounts.filter((account) => {
    if (filter === "subscribed") return account.notifyLaunch;
    if (filter === "unsubscribed") return !account.notifyLaunch;
    return true;
  });
  const registrations: RegistrationRecord[] = visible
    .map((account) => ({
      name: account.name,
      email: account.email,
      createdAt: account.createdAt,
      notifyLaunch: account.notifyLaunch,
      notifyConsentAt: account.notifyConsentAt,
    }))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return { total: accounts.length, subscribed, registrations };
}
