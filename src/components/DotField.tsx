import type { CSSProperties } from "react";
import { mulberry32 } from "@/lib/rng";

type DotFieldProps = {
  /** How many dots to render. The grid reflows; overflow is masked away. */
  count?: number;
  seed?: number;
  className?: string;
};

type DotStyle = CSSProperties & {
  "--tx": string;
  "--ty": string;
  "--o": string;
  "--d": string;
};

/**
 * "Data in motion": dots arrive scattered and settle into an ordered grid,
 * a few still lit in the signal colour. Messy in, ordered out.
 *
 * Server-rendered, zero client JavaScript, and completely still under
 * prefers-reduced-motion (the resolved grid is the default state).
 */
export function DotField({
  count = 260,
  seed = 0x6e61666e,
  className = "",
}: DotFieldProps) {
  const random = mulberry32(seed);

  const dots = Array.from({ length: count }, () => {
    const tx = (random() * 2 - 1) * 260;
    const ty = (random() * 2 - 1) * 120;
    const opacity = 0.16 + random() * 0.46;
    const delay = random() * 0.55;
    const lit = random() > 0.94;
    return { tx, ty, opacity, delay, lit };
  });

  return (
    <div
      className={`dot-field-wrap ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="dot-field">
        {dots.map((dot, i) => (
          <span
            key={i}
            className="dot"
            data-lit={dot.lit ? "true" : undefined}
            style={
              {
                "--tx": `${dot.tx.toFixed(1)}px`,
                "--ty": `${dot.ty.toFixed(1)}px`,
                "--o": dot.opacity.toFixed(2),
                "--d": `${dot.delay.toFixed(2)}s`,
              } satisfies DotStyle as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
