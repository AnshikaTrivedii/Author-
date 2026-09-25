import { pageMetadata } from "@/lib/seo";
import { AudioVideoPage } from "@/components/platform/AudioVideoPage";

export const metadata = pageMetadata(
  "Listen",
  "Author voice, audio presentations, video presentations and films.",
  "/audio-video",
);

export default function Page() {
  return <AudioVideoPage />;
}
