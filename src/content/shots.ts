import type { ComponentType } from "react";
import type { StaticImageData } from "next/image";
import { FasteignIllustration } from "@/components/FasteignIllustration";
import icelandLive from "./shots/iceland-live.webp";
import icelandLiveDetail from "./shots/iceland-live-detail.webp";
import nafnaval from "./shots/nafnaval.webp";
import nafnavalDetail from "./shots/nafnaval-detail.webp";
import sagas from "./shots/sagas.webp";
import sagasDetail from "./shots/sagas-detail.webp";
import spinpage from "./shots/spinpage.webp";
import spinpageDetail from "./shots/spinpage-detail.webp";
import vindur from "./shots/vindur.webp";
import vindurDetail from "./shots/vindur-detail.webp";

/**
 * Real screenshots of the live projects, captured with a headless browser at
 * 1440 × 900 and 2× density. `detail` is a square crop of the same capture,
 * art-directed for narrow screens.
 *
 * Projects without a screenshot get an illustration instead: Fasteign is not
 * publicly launched, MemeGuessr's game screen shows third-party meme images,
 * and Landlíf's pages carry the organisation's photography.
 */
export type Shot = {
  wide: StaticImageData;
  detail: StaticImageData;
  alt: string;
  /** ISO date of capture. */
  captured: string;
  /** Third-party credit that was visible in the app at capture time. */
  credit?: string;
  note?: string;
};

export const shots: Partial<Record<string, Shot>> = {
  "sagas-of-blood-and-fire": {
    wide: sagas,
    detail: sagasDetail,
    alt: "Sagas of Blood & Fire after its October 2026 redesign: satellite imagery of Iceland scattered with round markers for battles, killings, burnings and raids, the story of Snorri Sturluson's assassination in 1241 open on a paper panel at the right, and a time dock of events from 875 to 1976 along the bottom.",
    captured: "2026-10-31",
    credit: "Imagery © Esri, Maxar, Earthstar Geographics · Glaciers © OpenStreetMap contributors",
  },
  "iceland-live": {
    wide: icelandLive,
    detail: icelandLiveDetail,
    alt: "Iceland Live: a dark map of Iceland with the last 24 hours of earthquakes as small orange and grey dots, headline figures across the top, regions ranked by unusual activity on the left, and an activity histogram below.",
    captured: "2026-10-22",
    note: "Earthquake data from Veðurstofa Íslands at the time of capture",
    credit: "Basemap ©\u00a0CARTO, ©\u00a0OpenStreetMap contributors",
  },
  vindur: {
    wide: vindur,
    detail: vindurDetail,
    alt: "Vindur: wind over the Reykjavík capital region drawn as streaks of blue particles, with station arrows on the map, a time scrubber along the bottom and a panel of current readings on the right.",
    captured: "2026-10-22",
    credit: "©\u00a0OSM · Esri, HERE, Garmin · Open-Meteo · Veðurstofan",
    note: "Icelandic interface",
  },
  nafnaval: {
    wide: nafnaval,
    detail: nafnavalDetail,
    alt: "Nafnaval's page for the name Guðrún: its meaning, the two elements guð and rún it is built from with their dictionary source, its declension, and how many people in Iceland carry it.",
    captured: "2026-10-22",
    note: "Icelandic interface. Counts from Þjóðskrá",
  },
  spinpage: {
    wide: spinpage,
    detail: spinpageDetail,
    alt: "SpinPage 2.0 in the middle of a draft: a brass wheel of coloured name slices under a scoreboard, with the nameplate ‘2nd pick, winner: Kári’ risen over it, the players list on the left and the draft board filling seat by seat on the right.",
    captured: "2026-10-31",
    note: "Sample names",
  },
};

/** Labelled illustrations for projects whose screenshots cannot be published. */
export const illustrations: Partial<Record<string, { Component: ComponentType; caption: string[] }>> = {
  fasteign: {
    Component: FasteignIllustration,
    caption: ["Illustration, not a screenshot", "Fasteign is not publicly launched yet"],
  },
};
