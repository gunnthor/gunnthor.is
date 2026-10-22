import type { ComponentType } from "react";
import type { StaticImageData } from "next/image";
import { FasteignIllustration } from "@/components/FasteignIllustration";
import icelandLive from "./shots/iceland-live.webp";
import icelandLiveDetail from "./shots/iceland-live-detail.webp";
import nafnaval from "./shots/nafnaval.webp";
import nafnavalDetail from "./shots/nafnaval-detail.webp";
import sagas from "./shots/sagas.webp";
import sagasDetail from "./shots/sagas-detail.webp";
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
    alt: "Sagas of Blood & Fire on its parchment base map: Iceland covered in coloured markers for battles, raids and executions, with era and confidence filters above and a timeline of events from 875 to 1976 below.",
    captured: "2026-10-22",
    credit: "Map tiles ©\u00a0Esri. Source: Esri, USGS, NOAA",
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
};

/** Labelled illustrations for projects whose screenshots cannot be published. */
export const illustrations: Partial<Record<string, { Component: ComponentType; caption: string[] }>> = {
  fasteign: {
    Component: FasteignIllustration,
    caption: ["Illustration, not a screenshot", "Fasteign is not publicly launched yet"],
  },
};
