import { pageMetadata } from "@/lib/seo";
import { AudioVideoPage } from "@/components/platform/AudioVideoPage";

export const metadata = pageMetadata(
  "Listen",
  "Listen to each book in Hindi or English.",
  "/audio-video",
);

export default function Page() {
  return <AudioVideoPage />;
}
