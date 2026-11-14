import { pageMetadata } from "@/lib/seo";
import { AudioVideoPage } from "@/components/platform/AudioVideoPage";
import { managedWorks } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata(
  "Listen",
  "Listen to each book in Hindi or English.",
  "/audio-video",
);

export default async function Page() {
  const works = (await managedWorks()).filter(
    (work) => work.status !== "unpublished" && work.audio.available &&
      Boolean(work.audio.src || work.audio.hindiSrc || work.audio.englishSrc),
  );
  return <AudioVideoPage works={works} />;
}
