import { BookHero } from "@/components/book/BookHero";
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
import { pauses } from "@/data/anugoonj";

export default function HomePage() {
  return (
    <main id="main">
      <BookHero />
      <LookingBack />
      <PauseMoment text={pauses[0].text} href="#question" />
      <CentralQuestion />
      <BookThemes />
      <ChapterJourney />
      <PauseMoment text={pauses[1].text} href="#listen" />
      <MemoryBox />
      <ReflectQuestions />
      <AboutTheBook />
      <AuthorVoice />
      <BookFilm />
      <HomeFreeWorks />
      <FinalStoryCta />
    </main>
  );
}
