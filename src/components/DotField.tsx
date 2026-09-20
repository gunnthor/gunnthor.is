import { mulberry32 } from "@/lib/rng";

/** A deterministic, server-rendered study: scattered records resolve into structure. */
export function DotField() {
  const random = mulberry32(0x6e61666e);
  const rows = 16;
  const columns = 23;
  const dots = Array.from({ length: rows * columns }, (_, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const progress = column / (columns - 1);
    const disorder = (1 - progress) ** 2;
    const x = 36 + column * 17 + (random() - 0.5) * 45 * disorder;
    const y = 94 + row * 14 + Math.sin(progress * Math.PI * 1.7 + row * 0.19) * 32 + (random() - 0.5) * 70 * disorder;
    const lit = random() > 0.9;
    return { x, y, lit, opacity: 0.23 + random() * 0.65 };
  });
  return (
    <div className="dot-field-wrap" aria-hidden="true">
      <svg className="dot-field" viewBox="0 0 460 410" fill="none">
        <path d="M28 57H431M28 351H431M28 57V351M431 57V351" className="field-frame" />
        <path d="M20 57H36M28 49V65M423 57H439M431 49V65M20 351H36M28 343V359M423 351H439M431 343V359" className="field-registration" />
        <path d="M129 57V351M230 57V351M331 57V351" className="field-guide" />
        <g className="field-points">
          {dots.map((dot, index) => <circle key={index} cx={dot.x.toFixed(2)} cy={dot.y.toFixed(2)} r={dot.lit ? 2 : 1.5} opacity={dot.opacity.toFixed(2)} className={dot.lit ? "field-dot field-dot--lit" : "field-dot"} />)}
        </g>
        <path d="M360 125V291M352 291H368" className="field-measure" />
        <path d="M28 382H92M102 382H106M116 382H120" className="field-registration" />
        <text x="431" y="386" textAnchor="end" className="field-label">ORDER / EMERGING</text>
      </svg>
    </div>
  );
}
