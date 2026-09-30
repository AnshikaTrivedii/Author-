import { pageMetadata } from "@/lib/seo";
import { MakingOfPage } from "@/components/audience/MakingOfPage";

export const metadata = pageMetadata(
  "Making of",
  "Stills from the journey of turning memory into page, voice and film.",
  "/making-of",
);

export default function Page() {
  return <MakingOfPage />;
}
