import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { mulberry32 } from "@/lib/rng";

export const alt =
  "Gunnþór Karl Rafnsson — I work with data, explore AI, and turn curious ideas into working products.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLS = 34;
const ROWS = 4;

/**
 * Social preview, rendered to PNG at build time. Uses the same dot field and
 * palette as the site so a shared link looks like the page it opens.
 *
 * Satori supports flexbox only — the dot grid is built from nested rows, not
 * CSS grid. The bundled TTF is required for þ / ó / ð to render at all.
 */
export default async function OpengraphImage() {
  const fontData = await readFile(
    join(process.cwd(), "src/app/_assets/SpaceGrotesk-Bold.ttf"),
  );

  const random = mulberry32(0x6e61666e);
  const rows = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      opacity: 0.14 + random() * 0.5,
      lit: random() > 0.94,
    })),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08090a",
          padding: "68px 72px",
          fontFamily: "Space Grotesk",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {rows.map((row, r) => (
            <div key={r} style={{ display: "flex", marginBottom: 10 }}>
              {row.map((dot, c) => (
                <div
                  key={c}
                  style={{
                    width: 12,
                    height: 12,
                    marginRight: 10,
                    borderRadius: 2,
                    backgroundColor: dot.lit ? "#ff9e3d" : "#333a41",
                    opacity: dot.lit ? 0.95 : dot.opacity,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#ff9e3d",
              marginBottom: 26,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              lineHeight: 1.08,
              letterSpacing: -1.6,
              color: "#e9ebee",
              maxWidth: 940,
            }}
          >
            I work with data, explore AI, and turn curious ideas into working
            products.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1e2226",
            paddingTop: 26,
            fontSize: 21,
            letterSpacing: 1.5,
            color: "#949ca5",
          }}
        >
          <div style={{ display: "flex" }}>www.gunnthor.is</div>
          <div style={{ display: "flex" }}>
            Nafnaval · Sagas of Blood &amp; Fire · MemeGuessr · SpinPage
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
