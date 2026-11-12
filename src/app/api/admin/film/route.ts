import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { uploadDir } from "@/lib/admin-data";
import { getFilmAssets, saveFilmAsset, type FilmAssets } from "@/lib/launch-store";
import { requireAdmin } from "@/lib/session";

const kinds = {
  poster: { field: "poster", extensions: ["jpg", "jpeg", "png", "webp"], max: 8_000_000 },
  video: { field: "video", extensions: ["mp4"], max: 120_000_000 },
  subtitles: { field: "subtitlesEn", extensions: ["vtt"], max: 1_000_000 },
} as const;

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getFilmAssets());
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const kindValue = String(form.get("kind") ?? "");
  const file = form.get("file");
  const kind = kinds[kindValue as keyof typeof kinds];

  if (!kind || !(file instanceof File)) {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!kind.extensions.includes(extension as never) || file.size <= 0 || file.size > kind.max) {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storedAs = `introduction-${kindValue}-${Date.now()}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, storedAs), buffer);

  const film = await saveFilmAsset(kind.field as keyof FilmAssets, `/uploads/${storedAs}`);
  return NextResponse.json({ ok: true, film });
}
