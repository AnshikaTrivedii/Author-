import { IntroductionFilm } from "@/components/audience/IntroductionFilm";
import { LaunchJoin } from "@/components/audience/LaunchJoin";
import { VisionMission } from "@/components/audience/VisionMission";

export default function HomePage() {
  return (
    <main id="main">
      <IntroductionFilm />
      <LaunchJoin />
      <VisionMission />
    </main>
  );
}
