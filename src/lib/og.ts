import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

export async function ogFonts() {
  const [serif, mono] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_assets/Newsreader-Display-Regular.ttf")),
    readFile(join(process.cwd(), "src/app/_assets/GeistMono-Regular.ttf")),
  ]);
  return [
    { name: "Newsreader", data: serif, weight: 400 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}
