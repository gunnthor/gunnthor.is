import { icelandOutline } from "@/content/geo/iceland";

/**
 * Rasterises the Iceland outline into a grid of dots for the hero map.
 *
 * The projection is equirectangular, scaled by cos(65°) so the island keeps
 * its proportions at its own latitude. One grid step is 0.13° of latitude,
 * about 14.5 km, so each dot stands for roughly 210 km² of land.
 *
 * Every row also has a "count" position: the same dots packed to the left,
 * which turns the rows into a histogram of land by latitude. The hero
 * animates from that histogram to the map.
 */

const STEP_LAT = 0.13;
const SCALE_LON = Math.cos((65 * Math.PI) / 180);
const STEP_LON = STEP_LAT / SCALE_LON;
const LAT_TOP = 66.6;
const LAT_BOTTOM = 63.3;
const LON_LEFT = -24.6;
const LON_RIGHT = -13.4;

/** SVG units per grid step. */
export const PITCH = 10;
/** Space reserved around the grid for graticule labels. */
const MARGIN = { top: 14, right: 12, bottom: 22, left: 14 };

const COLUMNS = Math.ceil((LON_RIGHT - LON_LEFT) / STEP_LON);
const ROWS = Math.ceil((LAT_TOP - LAT_BOTTOM) / STEP_LAT);

export const MAP_WIDTH = MARGIN.left + COLUMNS * PITCH + MARGIN.right;
export const MAP_HEIGHT = MARGIN.top + ROWS * PITCH + MARGIN.bottom;

export const KM2_PER_DOT = Math.round((STEP_LAT * 111.2) ** 2);

const projectX = (lon: number) => MARGIN.left + ((lon - LON_LEFT) / STEP_LON) * PITCH;
const projectY = (lat: number) => MARGIN.top + ((LAT_TOP - lat) / STEP_LAT) * PITCH;

function inside(lon: number, lat: number): boolean {
  let hit = false;
  for (let i = 0, j = icelandOutline.length - 1; i < icelandOutline.length; j = i++) {
    const [xi, yi] = icelandOutline[i]!;
    const [xj, yj] = icelandOutline[j]!;
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

export type DotRow = {
  y: number;
  /** x of each dot on the map, west to east. */
  xs: number[];
};

export function dotRows(): DotRow[] {
  const rows: DotRow[] = [];
  for (let r = 0; r < ROWS; r++) {
    const lat = LAT_TOP - (r + 0.5) * STEP_LAT;
    const xs: number[] = [];
    for (let c = 0; c < COLUMNS; c++) {
      const lon = LON_LEFT + (c + 0.5) * STEP_LON;
      if (inside(lon, lat)) xs.push(Math.round(projectX(lon)));
    }
    if (xs.length) rows.push({ y: Math.round(projectY(lat)), xs });
  }
  return rows;
}

/** x position of the k-th dot in a row when the row is shown as a count. */
export const countX = (k: number) => MARGIN.left + PITCH / 2 + k * PITCH;

export function outlinePath(): string {
  return (
    icelandOutline
      .map(([lon, lat], i) => `${i ? "L" : "M"}${projectX(lon).toFixed(1)} ${projectY(lat).toFixed(1)}`)
      .join("") + "Z"
  );
}

export function graticule() {
  return {
    lats: [64, 65, 66].map((lat) => ({ lat, y: projectY(lat) })),
    lons: [-24, -22, -20, -18, -16, -14].map((lon) => ({ lon, x: projectX(lon) })),
    left: MARGIN.left,
    right: MAP_WIDTH - MARGIN.right,
    top: MARGIN.top,
    bottom: MAP_HEIGHT - MARGIN.bottom,
  };
}
