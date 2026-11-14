import { NextResponse } from "next/server";
import { getFilmAssets } from "@/lib/launch-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const film = await getFilmAssets();
  return NextResponse.json({
    poster: film.poster,
    video: film.video,
    subtitlesEn: film.subtitlesEn,
    narration: film.video ? "video-audio" : null,
  });
}
