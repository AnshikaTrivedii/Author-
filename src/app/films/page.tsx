import { pageMetadata } from "@/lib/seo";
import { FilmsIndex } from "@/components/platform/FilmsIndex";

export const metadata = pageMetadata(
  "Films",
  "Short films and forthcoming film presentations from Echoes of Memories.",
  "/films",
);

export default function Page() {
  return <FilmsIndex />;
}
