import { ImageResponse } from "next/og";
import { caseProjects, getProject, projectNumber } from "@/content/projects";
import { site } from "@/content/site";
import { ogFonts, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseProjects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)!;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#f2f0e9", padding: "60px 64px", fontFamily: "Newsreader", color: "#16181b" }}>
      <div style={{ display: "flex", gap: 28, fontFamily: "Geist Mono", fontSize: 19, letterSpacing: 1, color: "#5a5e63" }}>
        <span style={{ color: "#b8321a" }}>{projectNumber(project)}</span>
        <span>CASE NOTES</span>
        <span>{project.kind.toUpperCase()}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", fontSize: 96, lineHeight: 1, letterSpacing: -2 }}>{project.title}</div>
        <div style={{ display: "flex", maxWidth: 900, fontSize: 36, lineHeight: 1.3, color: "#34383d" }}>{project.tagline}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #16181b", paddingTop: 20, fontFamily: "Geist Mono", fontSize: 17, letterSpacing: 1, color: "#5a5e63" }}>
        <span>{site.name.toUpperCase()}</span>
        <span>GUNNTHOR.IS/PROJECTS</span>
      </div>
    </div>,
    { ...ogSize, fonts: await ogFonts() },
  );
}
