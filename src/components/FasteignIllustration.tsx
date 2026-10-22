/**
 * A schematic, not a screenshot: Fasteign is not publicly launched, so its
 * plate is an illustration of the two ideas the app is built around. On the
 * left, a choropleth of shaded areas. On the right, a valuation drawn as one
 * address linked to comparable sales, with line weight standing for how much
 * each comparable counts. No shapes, values or weights are real data.
 */
const tiles = [
  [0, 1, 1], [0, 2, 2], [1, 0, 1], [1, 1, 3], [1, 2, 3], [1, 3, 2],
  [2, 0, 2], [2, 1, 3], [2, 2, 2], [2, 3, 1], [3, 1, 1], [3, 2, 2],
  [3, 3, 1], [4, 2, 0], [4, 3, 1],
] as const;

const shades = ["#e4e1d8", "#c9c6bc", "#85827a", "#16181b"];

const comparables = [
  [508, 112, 3], [596, 138, 2], [626, 236, 1.2], [560, 318, 2.6], [452, 300, 1], [430, 170, 1.8],
] as const;

export function FasteignIllustration() {
  return (
    <svg viewBox="0 0 700 438" role="img" aria-label="Illustration: shaded areas like a price map beside one address connected to six comparable sales by lines of different weights." style={{ display: "block", width: "100%", height: "auto", background: "#faf9f5" }}>
      <g>
        {tiles.map(([row, col, shade], i) => (
          <path
            key={i}
            d={`M${60 + col * 54 + row * 4} ${96 + row * 48 - col * 5}l54 -5 4 48 -54 5z`}
            fill={shades[shade]}
            stroke="#faf9f5"
            strokeWidth="2"
          />
        ))}
      </g>
      <g stroke="#16181b" fill="none">
        {comparables.map(([x, y, weight], i) => (
          <path key={i} d={`M528 224L${x} ${y}`} strokeWidth={weight} strokeOpacity={0.25 + weight * 0.2} />
        ))}
      </g>
      {comparables.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill="#faf9f5" stroke="#16181b" strokeWidth="1.5" />
      ))}
      <circle cx="528" cy="224" r="12" fill="#b8321a" />
      <path d="M48 392H652" stroke="#c9c6bc" />
      <path d="M48 372C150 368 214 360 300 354S470 338 652 320" stroke="#16181b" strokeWidth="1.5" fill="none" />
      <path d="M48 380C150 378 214 374 300 370S470 362 652 352" stroke="#85827a" strokeDasharray="3 6" fill="none" />
    </svg>
  );
}
