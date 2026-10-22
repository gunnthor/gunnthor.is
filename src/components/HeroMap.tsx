import { PlayOnce } from "@/components/PlayOnce";
import { KM2_PER_DOT, MAP_HEIGHT, MAP_WIDTH, countX, dotRows, graticule, outlinePath } from "@/lib/dot-map";

/**
 * Iceland as a dot grid. Each row of dots starts packed to the left, a count
 * of the land at that latitude, then slides out to where that land actually
 * is. Server-rendered SVG with a CSS animation; the resting state is the map,
 * so reduced motion, print and no-CSS-animation all show the finished shape.
 */
export function HeroMap() {
  const rows = dotRows();
  const total = rows.reduce((sum, row) => sum + row.xs.length, 0);
  const grid = graticule();

  return (
    <figure className="hero-map">
      <PlayOnce className="hero-map-frame">
        <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} aria-hidden="true" focusable="false">
          <g className="hm-grid">
            <rect x={grid.left} y={grid.top} width={grid.right - grid.left} height={grid.bottom - grid.top} />
            {grid.lats.map(({ lat, y }) => (
              <g key={lat}>
                <path d={`M${grid.left - 4} ${y}h4M${grid.right} ${y}h4`} />
                <text x={grid.left - 6} y={y + 2.5} textAnchor="end">{lat}°</text>
              </g>
            ))}
            {grid.lons.map(({ lon, x }) => (
              <g key={lon}>
                <path d={`M${x} ${grid.bottom}v4`} />
                <text x={x} y={grid.bottom + 13} textAnchor="middle">{Math.abs(lon)}°W</text>
              </g>
            ))}
          </g>
          <path className="hm-coast" d={outlinePath()} />
          <g className="hm-dots">
            {rows.map((row, r) => (
              <g key={row.y} transform={`translate(0 ${row.y})`} style={{ "--r": r } as React.CSSProperties}>
                {row.xs.map((x, k) => (
                  <circle key={x} cx={x} r="2.4" style={{ "--dx": countX(k) - x } as React.CSSProperties} />
                ))}
              </g>
            ))}
          </g>
        </svg>
      </PlayOnce>
      <figcaption>
        <span>Iceland in {total} dots, about {KM2_PER_DOT} km² each.</span>{" "}
        <span>Each row starts as a count of its land, then moves to where that land is.</span>{" "}
        <span className="hm-source">Coastline: Natural Earth, public domain.</span>
      </figcaption>
    </figure>
  );
}
