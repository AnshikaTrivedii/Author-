import { pageMetadata } from "@/lib/seo";
import { LettersPage } from "@/components/audience/LettersPage";

export const metadata = pageMetadata(
  "Letters to the author",
  "Write privately to Sanjay Kumar Rai. Letters are received with care.",
  "/letters",
);

export default function Page() {
  return <LettersPage />;
}
