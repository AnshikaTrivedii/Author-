import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import type { Copy } from "@/lib/locale";
import { seedMemories } from "@/data/audience";

export type MemoryEcho = {
  id: string;
  text: Copy;
  createdAt: string;
};

export type AuthorLetter = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: "received";
};

type AudienceStore = {
  memories: MemoryEcho[];
  letters: AuthorLetter[];
};

const storeDir = path.join(process.cwd(), "data");
const storePath = path.join(storeDir, "audience-store.json");

function emptyStore(): AudienceStore {
  return { memories: [...seedMemories], letters: [] };
}

function ensure() {
  if (!existsSync(storeDir)) mkdirSync(storeDir, { recursive: true });
  if (!existsSync(storePath)) {
    writeFileSync(storePath, JSON.stringify(emptyStore(), null, 2), "utf8");
  }
}

export function readAudienceStore(): AudienceStore {
  ensure();
  try {
    const parsed = JSON.parse(readFileSync(storePath, "utf8")) as AudienceStore;
    return {
      memories: parsed.memories?.length ? parsed.memories : [...seedMemories],
      letters: parsed.letters ?? [],
    };
  } catch {
    const seeded = emptyStore();
    writeAudienceStore(seeded);
    return seeded;
  }
}

export function writeAudienceStore(store: AudienceStore) {
  ensure();
  writeFileSync(storePath, JSON.stringify(store, null, 2), "utf8");
}
