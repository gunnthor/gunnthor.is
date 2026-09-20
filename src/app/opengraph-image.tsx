import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { mulberry32 } from "@/lib/rng";

export const alt = "Gunnþór Karl Rafnsson. Curious ideas. Working products. Data, AI and software.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fontData = await readFile(join(process.cwd(), "src/app/_assets/SpaceGrotesk-Bold.ttf"));
  const random = mulberry32(0x6e61666e);
  const dots = Array.from({ length: 132 }, (_, i) => ({ x: 845 + (i % 11) * 22, y: 170 + Math.floor(i / 11) * 22, lit: random() > 0.88, opacity: 0.2 + random() * 0.5 }));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#0e1010", padding: "56px 64px", fontFamily: "Space Grotesk" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19, color: "#a6aaa2" }}><span>{site.name}</span><span style={{ color: "#e8aa65" }}>DATA · AI · SOFTWARE</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 76, letterSpacing: -4, lineHeight: 1.05, color: "#efeee7" }}>Curious ideas.</div>
        <div style={{ display: "flex", fontSize: 76, letterSpacing: -4, lineHeight: 1.1, color: "#e8aa65" }}>Working products.</div>
        <div style={{ display: "flex", maxWidth: 690, marginTop: 25, fontSize: 23, lineHeight: 1.5, color: "#a6aaa2" }}>{site.statement}</div>
      </div>
      {dots.map((dot, i) => <div key={i} style={{ position: "absolute", left: dot.x, top: dot.y, display: "flex", width: 4, height: 4, borderRadius: 2, backgroundColor: dot.lit ? "#e8aa65" : "#a6aaa2", opacity: dot.opacity }} />)}
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #2b302e", paddingTop: 23, fontSize: 18, color: "#a6aaa2" }}><span>gunnthor.is</span><span>Selected work / Built in Iceland</span></div>
    </div>,
    { ...size, fonts: [{ name: "Space Grotesk", data: fontData, weight: 700, style: "normal" }] },
  );
}
