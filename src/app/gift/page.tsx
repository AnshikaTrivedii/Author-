import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { GiftChapterPage } from "@/components/audience/GiftChapterPage";

export const metadata = pageMetadata(
  "Gift a chapter",
  "Send a free chapter from Echoes of Memories with a personal note.",
  "/gift",
);

export default function Page() {
  return (
    <Suspense>
      <GiftChapterPage />
    </Suspense>
  );
}
