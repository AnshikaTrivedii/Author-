import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import {
  findManagedWork,
  readAdminStore,
  uploadDir,
  writeAdminStore,
} from "@/lib/admin-data";

type Params = { id: string };

const kinds = new Set(["hindi", "english", "audio", "film", "cover"]);

export async function POST(
  request: Request,
  context: { params: Promise<Params> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const work = findManagedWork(id);
  if (!work) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const form = await request.formData();
  const kindValue = String(form.get("kind") ?? "");
  const file = form.get("file");

  if (!kinds.has(kindValue) || !(file instanceof File)) {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storedAs = `${work.id}-${kindValue}-${Date.now()}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, storedAs), buffer);

  const store = readAdminStore();
  store.uploads.unshift({
    workId: work.id,
    kind: kindValue as "hindi" | "english" | "audio" | "film" | "cover",
    fileName: file.name,
    storedAs: `/uploads/${storedAs}`,
    uploadedAt: new Date().toISOString(),
  });
  writeAdminStore(store);

  return NextResponse.json({
    ok: true,
    upload: store.uploads[0],
  });
}
