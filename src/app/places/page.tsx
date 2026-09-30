import { pageMetadata } from "@/lib/seo";
import { PlacesMapPage } from "@/components/audience/PlacesMapPage";

export const metadata = pageMetadata(
  "Map of places",
  "A poetic map of rooms, roads and stations that live inside the book.",
  "/places",
);

export default function Page() {
  return <PlacesMapPage />;
}
