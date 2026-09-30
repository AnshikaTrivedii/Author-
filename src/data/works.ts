import type { Work } from "./types";
import { catalogWorks } from "./catalog";

export const works: Work[] = catalogWorks;

export function getWork(slug: string) {
  return catalogWorks.find((work) => work.slug === slug);
}

export function freeWorks() {
  return catalogWorks.filter(
    (work) => work.pricingModel === "free" && work.status === "published",
  );
}

export function publishedWorks() {
  return catalogWorks.filter((work) => work.status !== "unpublished");
}

export function worksWithFilm() {
  return publishedWorks().filter((work) => work.film.available);
}

export function worksWithAudio() {
  return publishedWorks().filter((work) => work.audio.available);
}
