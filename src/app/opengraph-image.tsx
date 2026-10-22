import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { MAP_WIDTH, dotRows } from "@/lib/dot-map";
import { ogFonts, ogSize } from "@/lib/og";

export const alt = `${site.name}. ${site.headline} ${site.headlineTail}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function OpengraphImage() {
  const scale = 470 / MAP_WIDTH;
  const dots = dotRows().flatMap((row) => row.xs.map((x) => ({ x: 680 + x * scale, y: 150 + row.y * scale })));

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#f2f0e9", padding: "60px 64px", fontFamily: "Newsreader", color: "#16181b" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Geist Mono", fontSize: 18, letterSpacing: 1, color: "#5a5e63" }}>
        <span>{site.name.toUpperCase()}</span>
        <span>GUNNTHOR.IS</span>
      </div>
      {dots.map((dot, i) => (
        <div key={i} style={{ position: "absolute", left: dot.x - 3, top: dot.y - 3, width: 6, height: 6, borderRadius: 3, backgroundColor: "#16181b", display: "flex" }} />
      ))}
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
        <div style={{ display: "flex", fontSize: 66, lineHeight: 1.02, letterSpacing: -1.5 }}>{site.headline}</div>
        <div style={{ display: "flex", fontSize: 66, lineHeight: 1.1, letterSpacing: -1.5, color: "#5a5e63" }}>{site.headlineTail}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #16181b", paddingTop: 20, fontFamily: "Geist Mono", fontSize: 17, letterSpacing: 1, color: "#5a5e63" }}>
        <span>DATA MIGRATION · AI EXPERIMENTS · SOFTWARE</span>
        <span style={{ color: "#b8321a" }}>ICELAND</span>
      </div>
    </div>,
    { ...ogSize, fonts: await ogFonts() },
  );
}
