import { NextResponse } from "next/server";
import { getWork } from "@/data/works";
import { canAccessPublicly } from "@/lib/access";
import { hasLibraryAccess } from "@/lib/library";

type Params = { workId: string; kind: string };

export async function GET(
  request: Request,
  { params }: { params: Promise<Params> },
) {
  const { workId, kind } = await params;
  const work = getWork(workId);
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

  const userId = request.headers.get("x-user-id");
  const allowed =
    canAccessPublicly(work, publicKind) || hasLibraryAccess(userId, work.id);

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
