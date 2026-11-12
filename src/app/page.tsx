import { IntroductionFilm } from "@/components/audience/IntroductionFilm";
import { LaunchJoin } from "@/components/audience/LaunchJoin";
import { LookingBack } from "@/components/book/LookingBack";
import { PauseMoment } from "@/components/book/PauseMoment";
import { CentralQuestion } from "@/components/book/CentralQuestion";
import { BookThemes } from "@/components/book/BookThemes";
import { ChapterJourney } from "@/components/book/ChapterJourney";
import { MemoryBox } from "@/components/book/MemoryBox";
import { ReflectQuestions } from "@/components/book/ReflectQuestions";
import { AboutTheBook } from "@/components/book/AboutTheBook";
import { AuthorVoice } from "@/components/book/AuthorVoice";
import { BookFilm } from "@/components/book/BookFilm";
import { FinalStoryCta } from "@/components/book/FinalStoryCta";
import { HomeFreeWorks } from "@/components/platform/HomeFreeWorks";
import { VisitorPath } from "@/components/audience/VisitorPath";
import { TonightPause } from "@/components/audience/TonightPause";
import { TrailerRitual } from "@/components/audience/TrailerRitual";
import { BilingualLines } from "@/components/audience/BilingualLines";
import { MemoryWall } from "@/components/audience/MemoryWall";
import { FiveMoments } from "@/components/audience/FiveMoments";
import { ChapterEchoShare } from "@/components/audience/ChapterEchoShare";
import { ChapterAudioStrip } from "@/components/audience/ChapterAudioStrip";
import { HomeExploreMore } from "@/components/audience/HomeExploreMore";
import { HomeSectionNav } from "@/components/layout/HomeSectionNav";
import { pauses } from "@/data/anugoonj";

export default function HomePage() {
  return (
    <main id="main">
      <IntroductionFilm />
      <LaunchJoin />
      <VisitorPath />
      <TonightPause />
      <TrailerRitual />
      <HomeSectionNav />
      <LookingBack />
      <PauseMoment text={pauses[0].text} href="#question" />
      <CentralQuestion />
      <BilingualLines />
      <BookThemes />
      <ChapterJourney />
      <ChapterAudioStrip />
      <ChapterEchoShare />
      <PauseMoment text={pauses[1].text} href="#listen" />
      <MemoryBox />
      <ReflectQuestions />
      <AboutTheBook />
      <AuthorVoice />
      <BookFilm />
      <HomeFreeWorks />
      <HomeExploreMore>
        <FiveMoments />
        <MemoryWall />
      </HomeExploreMore>
      <FinalStoryCta />
    </main>
  );
}
