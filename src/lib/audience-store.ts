import { randomUUID } from "crypto";
import type { Copy } from "@/lib/locale";
import { seedMemories } from "@/data/audience";
import { database } from "@/lib/mongodb";

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

export async function recentMemories() {
  const db = await database();
  const submitted = await db
    .collection<MemoryEcho>("memories")
    .find({}, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .limit(40)
    .toArray();
  return [...submitted, ...seedMemories].slice(0, 40);
}

export async function addMemory(text: Copy) {
  const memory: MemoryEcho = {
    id: `mem-${randomUUID()}`,
    text,
    createdAt: new Date().toISOString(),
  };
  const db = await database();
  await db.collection<MemoryEcho>("memories").insertOne(memory);
  return memory;
}

export async function addLetter(input: Pick<AuthorLetter, "name" | "email" | "message">) {
  const letter: AuthorLetter = {
    id: `let-${randomUUID()}`,
    ...input,
    createdAt: new Date().toISOString(),
    status: "received",
  };
  const db = await database();
  await db.collection<AuthorLetter>("letters").insertOne(letter);
  return letter;
}
