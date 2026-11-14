import { NextResponse } from "next/server";
import { findManagedWork } from "@/lib/admin-data";
import { canAccessPublicly } from "@/lib/access";
import { hasLibraryAccess } from "@/lib/library";
import { findAccount } from "@/lib/launch-store";
import { readSession } from "@/lib/session";

type Params = { workId: string; kind: string };

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> },
) {
  const { workId, kind } = await params;
  const work = await findManagedWork(workId);
  if (!work) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const allowedKinds = ["hindi", "english", "audio", "film", "video"] as const;
  if (!allowedKinds.includes(kind as (typeof allowedKinds)[number])) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const publicKind =
    kind === "hindi" || kind === "english"
      ? "read"
      : kind === "audio"
        ? "audio"
        : "film";

  const session = await readSession();
  const account = session?.role === "reader" ? await findAccount(session.email) : null;
  const allowed =
    canAccessPublicly(work, publicKind) || await hasLibraryAccess(account?.id ?? null, work.id);

  if (!allowed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const src =
    kind === "audio"
      ? work.audio.src
      : kind === "film" || kind === "video"
        ? work.film.src
        : kind === "hindi"
          ? work.hindi.fileKey
          : kind === "english"
            ? work.english.fileKey
            : null;

  if (!src) {
    return NextResponse.json({ error: "Asset not available" }, { status: 404 });
  }

  if (src.startsWith("http") || src.startsWith("/")) {
    return NextResponse.redirect(new URL(src, request.url));
  }

  return NextResponse.json({ error: "Protected asset" }, { status: 401 });
}
