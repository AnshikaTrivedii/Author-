import type { Copy } from "@/lib/locale";

export const visitorPath = [
  {
    step: "01",
    title: { en: "Start free", hi: "निःशुल्क शुरू करें" },
    body: {
      en: "Open the first stories without a purchase.",
      hi: "बिना खरीद के पहली कथाएँ खोलें।",
    },
    href: "/free-works",
  },
  {
    step: "02",
    title: { en: "Ask yourself one question", hi: "अपने से एक प्रश्न पूछें" },
    body: {
      en: "Tonight’s pause returns every day with a new question.",
      hi: "रात का ठहराव प्रतिदिन एक नया प्रश्न लेकर आता है।",
    },
    href: "#tonight",
  },
  {
    step: "03",
    title: { en: "Meet the author", hi: "लेखक से मिलें" },
    body: {
      en: "Read how a life became literature, voice and film.",
      hi: "पढ़ें कि जीवन कैसे साहित्य, आवाज़ और फिल्म बना।",
    },
    href: "/about",
  },
] as const;

export const tonightPauses: Copy[] = [
  {
    en: "If someone asked you today, “Who are you?”, what would you answer?",
    hi: "अगर कोई आज आपसे पूछे, “आप कौन हैं?”, तो आपका उत्तर क्या होगा?",
  },
  {
    en: "Which memory from childhood still makes you smile?",
    hi: "आपके बचपन की ऐसी कौन-सी याद है जो आज भी आपको मुस्कुराती है?",
  },
  {
    en: "Have you ever asked your parents, “What was your own dream?”",
    hi: "क्या आपने कभी अपने माता-पिता से पूछा, “आपका अपना सपना क्या था?”",
  },
  {
    en: "Among all these stories… where is your own?",
    hi: "इन सब कहानियों के बीच… आपकी अपनी कहानी कहाँ है?",
  },
  {
    en: "What in your life are you truly proud of?",
    hi: "आपके जीवन की ऐसी कौन-सी बात है जिस पर आपको सचमुच गर्व है?",
  },
  {
    en: "Whose absence do you still feel?",
    hi: "किसकी अनुपस्थिति आज भी आपको महसूस होती है?",
  },
  {
    en: "If your life were a book, who would be its hero?",
    hi: "अगर आपका जीवन एक पुस्तक होता, तो उसका नायक कौन होता?",
  },
];

export const fiveMomentPrompts: Copy[] = [
  { en: "A face you suddenly remembered", hi: "एक चेहरा जो अचानक याद आया" },
  { en: "An old house", hi: "एक पुराना घर" },
  { en: "A staircase at school", hi: "विद्यालय की कोई सीढ़ी" },
  { en: "A platform at a station", hi: "स्टेशन का कोई प्लेटफ़ॉर्म" },
  { en: "A friend’s laugh", hi: "किसी मित्र की हँसी" },
  { en: "A scolding from someone close", hi: "किसी अपने की डाँट" },
  { en: "A hand on your shoulder, without a word", hi: "बिना कुछ कहे कंधे पर रखा हाथ" },
  { en: "A letter arriving", hi: "किसी पत्र का आना" },
  { en: "Leaving home", hi: "घर से निकलना" },
  { en: "A road that already felt long", hi: "एक रास्ता जो पहले से लंबा लग रहा था" },
];

export const chapterEchoes = [
  {
    chapter: "01",
    line: {
      en: "If someone asked you today, “Who are you?”, what would you answer?",
      hi: "अगर कोई आज आपसे पूछे, “आप कौन हैं?”, तो आपका उत्तर क्या होगा?",
    },
    image: "/images/stills/album-hands.jpg",
  },
  {
    chapter: "05",
    line: {
      en: "Which memory from childhood still makes you smile?",
      hi: "आपके बचपन की ऐसी कौन-सी याद है जो आज भी आपको मुस्कुराती है?",
    },
    image: "/images/stills/grandmother.jpg",
  },
  {
    chapter: "12",
    line: {
      en: "Have you ever asked your parents, “What was your own dream?”",
      hi: "क्या आपने कभी अपने माता-पिता से पूछा, “आपका अपना सपना क्या था?”",
    },
    image: "/images/stills/parents-desk.jpg",
  },
  {
    chapter: "19",
    line: {
      en: "If your life were a book, who would be its hero?",
      hi: "अगर आपका जीवन एक पुस्तक होता, तो उसका नायक कौन होता?",
    },
    image: "/images/stills/letter-notebook.jpg",
  },
] as const;

export const chapterAudio = [
  { chapter: "01", label: { en: "Who am I?", hi: "मैं कौन हूँ?" }, duration: "2:10" },
  { chapter: "05", label: { en: "Childhood", hi: "बचपन" }, duration: "1:48" },
  { chapter: "08", label: { en: "Unfinished stories", hi: "अधूरी कहानियाँ" }, duration: "2:32" },
  { chapter: "12", label: { en: "My parents", hi: "मेरे माता-पिता" }, duration: "2:05" },
  { chapter: "19", label: { en: "Now it is my turn", hi: "अब मेरी बारी" }, duration: "1:56" },
] as const;

export const bilingualLines = [
  {
    en: "Where memories still breathe",
    hi: "जहाँ स्मृतियाँ आज भी साँस लेती हैं",
  },
  {
    en: "This is not the story of a finished person. It is the story of becoming.",
    hi: "यह किसी पूर्ण व्यक्ति की कहानी नहीं। यह बनने की कहानी है।",
  },
  {
    en: "Among all these stories, where is your own?",
    hi: "इन सब कहानियों के बीच, आपकी अपनी कहानी कहाँ है?",
  },
] as const;

export const seedMemories: Array<{ id: string; text: Copy; createdAt: string }> = [
  {
    id: "mem-1",
    text: {
      en: "My grandmother’s courtyard after the rain.",
      hi: "बारिश के बाद दादी का आँगन।",
    },
    createdAt: "2026-09-10T08:00:00.000Z",
  },
  {
    id: "mem-2",
    text: {
      en: "The station where my father always waited a little early.",
      hi: "वह स्टेशन जहाँ पिताजी हमेशा थोड़ी जल्दी प्रतीक्षा करते थे।",
    },
    createdAt: "2026-09-14T11:20:00.000Z",
  },
  {
    id: "mem-3",
    text: {
      en: "A letter I never posted, still folded in a book.",
      hi: "एक पत्र जो मैंने कभी नहीं भेजा, अभी भी पुस्तक में मुड़ा पड़ा है।",
    },
    createdAt: "2026-09-20T17:40:00.000Z",
  },
];

export const readingCircleGuides = [
  {
    title: { en: "For families", hi: "परिवारों के लिए" },
    body: {
      en: "Read one chapter aloud. Let the youngest person ask the first question.",
      hi: "एक अध्याय ज़ोर से पढ़ें। सबसे छोटे सदस्य से पहला प्रश्न पूछने को कहें।",
    },
  },
  {
    title: { en: "For friends", hi: "मित्रों के लिए" },
    body: {
      en: "Each person brings one unfinished story from their own life.",
      hi: "हर व्यक्ति अपने जीवन की एक अधूरी कहानी लेकर आए।",
    },
  },
  {
    title: { en: "For a quiet room", hi: "एक शांत कमरे के लिए" },
    body: {
      en: "Sit with one pause. Write for ten minutes. Do not share unless you wish.",
      hi: "एक ठहराव के साथ बैठें। दस मिनट लिखें। चाहें तभी साझा करें।",
    },
  },
] as const;

export const makingOfStills = [
  {
    image: "/images/stills/letter-notebook.jpg",
    caption: {
      en: "A page becomes a voice take.",
      hi: "एक पृष्ठ आवाज़ की रिकॉर्डिंग बनता है।",
    },
  },
  {
    image: "/images/stills/family-photo.jpg",
    caption: {
      en: "A photograph returns as a film frame.",
      hi: "एक चित्र फिल्म के फ्रेम में लौटता है।",
    },
  },
  {
    image: "/images/stills/parents-desk.jpg",
    caption: {
      en: "A desk holds letters that never finished speaking.",
      hi: "मेज़ पर वे पत्र हैं जिन्होंने बोलना पूरा नहीं किया।",
    },
  },
  {
    image: "/images/stills/cinematic-01.jpg",
    caption: {
      en: "Light finds the road between then and now.",
      hi: "प्रकाश तब और अब के बीच की सड़क खोजता है।",
    },
  },
  {
    image: "/images/stills/ghats.jpg",
    caption: {
      en: "Water remembers footsteps.",
      hi: "पानी कदमों को याद रखता है।",
    },
  },
  {
    image: "/images/gallery/villages.jpg",
    caption: {
      en: "A village lane becomes a chapter door.",
      hi: "गाँव की गली अध्याय का द्वार बनती है।",
    },
  },
] as const;

export const placeMap = [
  {
    name: { en: "The old house", hi: "पुराना घर" },
    note: {
      en: "Where evenings gathered before anyone owned a clock that mattered.",
      hi: "जहाँ शामें जुटती थीं, इससे पहले कि कोई घड़ी सच में मायने रखती।",
    },
  },
  {
    name: { en: "School stairs", hi: "विद्यालय की सीढ़ियाँ" },
    note: {
      en: "A first identity learned between bells.",
      hi: "घंटियों के बीच सीखी गई पहली पहचान।",
    },
  },
  {
    name: { en: "The station", hi: "स्टेशन" },
    note: {
      en: "Minutes of waiting that outlived the trains.",
      hi: "प्रतीक्षा के वे मिनट जो ट्रेनों से अधिक जीवित रहे।",
    },
  },
  {
    name: { en: "A long road", hi: "लंबी सड़क" },
    note: {
      en: "The place where distance began to teach belonging.",
      hi: "जहाँ दूरी ने अपनत्व सिखाना शुरू किया।",
    },
  },
  {
    name: { en: "A quiet room", hi: "एक शांत कमरा" },
    note: {
      en: "Where the book began as a conversation with the self.",
      hi: "जहाँ पुस्तक स्वयं से बातचीत के रूप में शुरू हुई।",
    },
  },
] as const;

export const deskUpdates = [
  {
    date: "2026-09-24",
    title: { en: "Chapter 12 voice recorded", hi: "अध्याय 12 की आवाज़ रिकॉर्ड हुई" },
    body: {
      en: "A quieter take. The words asked for more silence than volume.",
      hi: "एक शांत रिकॉर्डिंग। शब्दों ने आवाज़ से अधिक मौन माँगा।",
    },
  },
  {
    date: "2026-09-18",
    title: { en: "English edition advancing", hi: "अंग्रेज़ी संस्करण आगे बढ़ रहा है" },
    body: {
      en: "Translation continues chapter by chapter, keeping the pause intact.",
      hi: "अनुवाद अध्याय दर अध्याय जारी है, ठहराव को बनाए रखते हुए।",
    },
  },
  {
    date: "2026-09-08",
    title: { en: "Short film frames selected", hi: "लघु फिल्म के फ्रेम चुने गए" },
    body: {
      en: "Family photographs and river light will open the trailer.",
      hi: "पारिवारिक चित्र और नदी का प्रकाश ट्रेलर खोलेंगे।",
    },
  },
] as const;

export function tonightPauseFor(date = new Date()) {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start) / 86400000);
  return tonightPauses[day % tonightPauses.length] ?? tonightPauses[0];
}
