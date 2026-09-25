import "./project-visuals.css";

/* Editorial illustrations, not screenshots or representations of live data. */
const terrainContours = Array.from({ length: 19 }, (_, index) => {
  const shift = index * 17;
  return `M ${-190 + shift * 0.3} ${420 + shift} C ${-70 + shift * 0.2} ${245 + shift}, ${118 + shift * 0.55} ${424 - shift * 0.25}, ${148 + shift * 0.75} ${230 - shift * 0.42} S ${347 + shift * 0.46} ${35 + shift * 0.2}, ${406 + shift * 0.4} ${138 + shift * 0.15} S ${576 + shift * 0.3} ${322 + shift * 0.2}, ${791 + shift * 0.1} ${83 + shift * 0.9}`;
});

function RegistrationMarks() {
  return (
    <g className="pv-registration" fill="none" stroke="currentColor">
      <path d="M24 36V24H36M664 24H676V36M24 464V476H36M664 476H676V464" />
    </g>
  );
}

function SagasVisual() {
  return (
    <svg viewBox="0 0 700 500" fill="none" focusable="false">
      <defs>
        <pattern id="pv-sagas-grid" width="70" height="70" patternUnits="userSpaceOnUse">
          <path d="M70 0H0V70" stroke="currentColor" strokeOpacity=".08" />
        </pattern>
        <radialGradient id="pv-sagas-glow" cx=".55" cy=".44" r=".65">
          <stop stopColor="#3d4236" stopOpacity=".54" />
          <stop offset="1" stopColor="#101211" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="700" height="500" fill="url(#pv-sagas-glow)" />
      <rect width="700" height="500" fill="url(#pv-sagas-grid)" />
      <g stroke="currentColor" className="pv-terrain">
        {terrainContours.map((path, index) => (
          <path key={index} d={path} opacity={index % 4 === 0 ? ".32" : ".13"} strokeWidth={index % 4 === 0 ? "1.2" : ".75"} />
        ))}
      </g>
      <path d="M186 328C241 302 199 236 264 219S319 204 349 161S399 151 453 204" stroke="#e8a75d" strokeOpacity=".65" strokeDasharray="2 6" />
      <g stroke="#e8a75d">
        <circle cx="186" cy="328" r="12" opacity=".3" />
        <circle cx="186" cy="328" r="4" fill="#e8a75d" />
        <circle cx="349" cy="161" r="19" opacity=".25" />
        <circle cx="349" cy="161" r="9" opacity=".65" />
        <circle cx="349" cy="161" r="3" fill="#e8a75d" />
        <path d="m448 199 10 10m0-10-10 10" strokeWidth="1.5" />
      </g>
      <g className="pv-mono" fill="currentColor">
        <text x="44" y="63" fontSize="11" letterSpacing="3">SAGAS OF</text>
        <text x="44" y="431" className="pv-display" fontSize="53" letterSpacing="-2">Blood &amp; Fire</text>
        <path d="M608 63H632M620 51V75" stroke="currentColor" strokeOpacity=".6" />
        <text x="612" y="41" fontSize="9" opacity=".6">N</text>
      </g>
      <RegistrationMarks />
    </svg>
  );
}

function LandlifVisual() {
  return (
    <svg viewBox="0 0 700 500" fill="none" focusable="false">
      <circle cx="537" cy="249" r="45" fill="#c19b69" opacity=".55" />
      <g stroke="currentColor" strokeWidth=".8">
        <path d="M-20 318 96 268 158 301 235 226 298 258 362 213 421 262 494 246 582 292 720 270" opacity=".5" />
        <path d="m158 301 77-75-20 58 28-18 18 34m37-42 64-45-14 35 36 6 17 40" opacity=".25" />
        {Array.from({ length: 15 }, (_, index) => (
          <path
            key={index}
            d={`M-20 ${321 + index * 15} C120 ${274 + index * 19} 232 ${360 + index * 7} 354 ${306 + index * 16} S558 ${338 + index * 8} 725 ${302 + index * 19}`}
            opacity={index % 3 === 0 ? ".42" : ".19"}
          />
        ))}
        <path d="M309 500C313 433 367 413 423 396S528 368 575 354" opacity=".5" />
        <path d="M355 500C349 451 391 429 447 411S540 376 575 354" opacity=".5" />
      </g>
      <text x="350" y="124" textAnchor="middle" className="pv-serif" fontSize="57" letterSpacing="-2">Landsbyggðin</text>
      <text x="350" y="179" textAnchor="middle" className="pv-serif" fontSize="57" fontStyle="italic">lifi.</text>
      <path d="M326 210H374" stroke="currentColor" strokeOpacity=".4" />
      <g fill="currentColor" opacity=".75">
        <path d="m119 331 10-8 10 8v13h-20z" />
        <path d="m141 338 7-6 7 6v9h-14z" />
      </g>
      <path d="M128 344v-8h4v8m14 3v-6h3v6" stroke="#dfded5" />
      <text x="44" y="454" className="pv-mono" fontSize="10" letterSpacing="3" opacity=".65">LANDLÍF</text>
      <RegistrationMarks />
    </svg>
  );
}

function NafnavalVisual() {
  return (
    <svg viewBox="0 0 700 500" fill="none" focusable="false">
      <defs>
        <pattern id="pv-nafnaval-lines" width="700" height="46" patternUnits="userSpaceOnUse">
          <path d="M0 45.5H700" stroke="currentColor" strokeOpacity=".045" />
        </pattern>
      </defs>
      <rect width="700" height="500" fill="url(#pv-nafnaval-lines)" />
      <text x="44" y="62" className="pv-mono" fontSize="11" letterSpacing="3">NAFNAVAL</text>
      <g className="pv-serif" fill="currentColor">
        <text x="174" y="212" fontSize="103" textAnchor="middle" letterSpacing="-5">Þór</text>
        <text x="502" y="212" fontSize="103" textAnchor="middle" letterSpacing="-5">björg</text>
      </g>
      <g stroke="currentColor" opacity=".48">
        <path d="M324 178h26m-13-13v26" />
        <path d="M174 249v27q0 14 14 14h135q14 0 14 14v22M502 249v27q0 14-14 14H351q-14 0-14 14" strokeOpacity=".6" />
        <path d="M44 224H656" strokeDasharray="1 7" strokeOpacity=".6" />
        <circle cx="174" cy="246" r="3" />
        <circle cx="502" cy="246" r="3" />
      </g>
      <text x="337" y="404" textAnchor="middle" className="pv-serif pv-accent" fontSize="90" letterSpacing="-3">Þórbjörg</text>
      <path d="M44 446H656" stroke="currentColor" strokeOpacity=".15" />
      <RegistrationMarks />
    </svg>
  );
}

function polarPoint(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  return `${(350 + radius * Math.cos(radians)).toFixed(2)} ${(264 + radius * Math.sin(radians)).toFixed(2)}`;
}

function SpinPageVisual() {
  return (
    <svg viewBox="0 0 700 500" fill="none" focusable="false">
      <text x="44" y="62" className="pv-mono" fontSize="11" letterSpacing="3">SPINPAGE</text>
      <circle cx="350" cy="264" r="228" stroke="currentColor" strokeOpacity=".08" />
      <circle cx="350" cy="264" r="209" stroke="currentColor" strokeOpacity=".21" />
      <g>
        {Array.from({ length: 12 }, (_, index) => {
          const start = -105 + index * 30;
          const amber = index === 0 || index === 4 || index === 8;
          return (
            <path
              key={index}
              d={`M350 264L${polarPoint(start, 194)}A194 194 0 0 1 ${polarPoint(start + 30, 194)}Z`}
              fill={amber ? "#e8a75d" : "#dfded5"}
              fillOpacity={amber ? (index === 0 ? ".84" : ".26") : index % 2 === 0 ? ".035" : ".085"}
              stroke="#101211"
              strokeWidth="2"
            />
          );
        })}
      </g>
      <g stroke="currentColor" strokeOpacity=".42">
        {Array.from({ length: 72 }, (_, index) => (
          <path key={index} d={`M${polarPoint(index * 5, index % 6 === 0 ? 198 : 202)}L${polarPoint(index * 5, 207)}`} />
        ))}
      </g>
      <circle cx="350" cy="264" r="160" stroke="currentColor" strokeOpacity=".12" />
      <circle cx="350" cy="264" r="69" fill="#101211" stroke="currentColor" strokeOpacity=".24" />
      <circle cx="350" cy="264" r="58" stroke="currentColor" strokeOpacity=".1" />
      <text x="350" y="272" textAnchor="middle" className="pv-display" fontSize="21" letterSpacing="4" fill="currentColor">SPIN</text>
      <path d="m341 48 9 17 9-17" fill="#e8a75d" />
      <path d="M67 247v34m-17-17h34M616 264h34" stroke="currentColor" strokeOpacity=".3" />
      <RegistrationMarks />
    </svg>
  );
}

function VindurVisual() {
  return (
    <svg viewBox="0 0 700 500" fill="none" focusable="false">
      <defs>
        <linearGradient id="pv-vindur-flow" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#dfded5" stopOpacity=".06" />
          <stop offset=".46" stopColor="#dfded5" stopOpacity=".48" />
          <stop offset="1" stopColor="#e8a75d" stopOpacity=".38" />
        </linearGradient>
        <radialGradient id="pv-vindur-glow">
          <stop stopColor="#35443e" stopOpacity=".55" />
          <stop offset="1" stopColor="#101211" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="700" height="500" fill="url(#pv-vindur-glow)" />
      <g stroke="url(#pv-vindur-flow)" strokeWidth="1">
        {Array.from({ length: 33 }, (_, index) => {
          const y = 90 + index * 11;
          const amplitude = Math.sin(index * 0.11) * 102;
          return <path key={index} d={`M-60 ${y}C102 ${y + 100} 182 ${y - amplitude} 292 ${y - amplitude}S436 ${y + amplitude * 0.85} 520 ${y + amplitude * 0.35}S650 ${y - 68} 760 ${y - 34}`} />;
        })}
      </g>
      <g stroke="#e8a75d" strokeWidth="1.5" strokeLinecap="round">
        <path d="M147 183q22-6 43-18m-5-1 5 1-2 5" opacity=".8" />
        <path d="M337 229q19 9 35 22m-1-6 1 6-6-1" opacity=".8" />
        <path d="M515 351q23-4 43-14m-6-1 6 1-3 5" opacity=".8" />
        <path d="M583 165q20-12 42-20m-6-2 6 2-4 5" opacity=".55" />
      </g>
      <text x="44" y="100" className="pv-display" fontSize="64" letterSpacing="-3" fill="currentColor">Vindur</text>
      <text x="44" y="452" className="pv-mono" fontSize="10" letterSpacing="2.5" fill="currentColor" opacity=".55">WIND OVER REYKJAVÍK</text>
      <g transform="translate(621 429)" stroke="currentColor" strokeOpacity=".42">
        <circle r="21" />
        <path d="M0-26v9M0 17v9M-26 0h9M17 0h9m-9 8L8-8m-10 0H8V2" />
      </g>
      <RegistrationMarks />
    </svg>
  );
}

const quakes = [
  [214, 298, 5, 0.9], [236, 311, 3, 0.8], [251, 289, 4, 0.75], [229, 276, 2.5, 0.6],
  [262, 322, 3.5, 0.55], [198, 318, 2, 0.5], [276, 301, 2.5, 0.45], [244, 336, 2, 0.4],
  [418, 181, 9, 0.9], [436, 196, 4, 0.7], [402, 170, 3, 0.55], [447, 172, 2.5, 0.4],
  [521, 262, 3, 0.35], [538, 248, 2, 0.3], [352, 262, 2.5, 0.28], [155, 214, 2, 0.24],
  [590, 331, 3.5, 0.3], [488, 318, 2, 0.22],
] as const;

function IcelandLiveVisual() {
  return (
    <svg viewBox="0 0 700 500" fill="none" focusable="false">
      <text x="44" y="62" className="pv-mono" fontSize="11" letterSpacing="3" fill="currentColor">ICELAND LIVE</text>
      <g stroke="currentColor" strokeOpacity=".16" strokeDasharray="3 5">
        <ellipse cx="424" cy="186" rx="58" ry="41" transform="rotate(-18 424 186)" />
        <path d="M150 360 238 300 330 244 424 186 520 128 610 84" />
      </g>
      <g>
        {quakes.map(([x, y, r, recency], index) => (
          <g key={index}>
            <circle cx={x} cy={y} r={r * 3.2} stroke="#e8a75d" strokeOpacity={recency * 0.45} />
            <circle cx={x} cy={y} r={r} fill={recency > 0.6 ? "#e8a75d" : "#dfded5"} fillOpacity={recency} />
          </g>
        ))}
      </g>
      <path d="M44 404H656" stroke="currentColor" strokeOpacity=".2" />
      <g fill="currentColor">
        {Array.from({ length: 30 }, (_, index) => {
          const height = 4 + Math.abs(Math.sin(index * 1.7)) * 14 + (index > 22 ? (index - 22) * 5 : 0);
          return <rect key={index} x={44 + index * 20.4} y={404 - height} width="12" height={height} opacity={index > 22 ? ".75" : ".22"} fill={index > 22 ? "#e8a75d" : "currentColor"} />;
        })}
      </g>
      <g className="pv-mono" fontSize="10" letterSpacing="2" fill="currentColor" opacity=".55">
        <text x="44" y="440">−24 H</text>
        <text x="656" y="440" textAnchor="end">NOW</text>
      </g>
      <RegistrationMarks />
    </svg>
  );
}

const postcodeTiles = [
  [0, 1, 0.3], [0, 2, 0.45], [1, 0, 0.55], [1, 1, 0.9], [1, 2, 0.7], [1, 3, 0.35],
  [2, 0, 0.4], [2, 1, 0.75], [2, 2, 0.6], [2, 3, 0.5], [2, 4, 0.25], [3, 1, 0.5],
  [3, 2, 0.4], [3, 3, 0.3], [3, 4, 0.2], [4, 2, 0.28], [4, 3, 0.18],
] as const;

function FasteignVisual() {
  return (
    <svg viewBox="0 0 700 500" fill="none" focusable="false">
      <text x="44" y="62" className="pv-mono" fontSize="11" letterSpacing="3" fill="currentColor">FASTEIGN</text>
      <g>
        {postcodeTiles.map(([row, col, value], index) => (
          <rect
            key={index}
            x={320 + col * 58 - row * 12}
            y={80 + row * 48}
            width="52"
            height="44"
            fill={value > 0.65 ? "#e8a75d" : "#dfded5"}
            fillOpacity={value > 0.65 ? value * 0.85 : value * 0.35}
            stroke="#101211"
          />
        ))}
      </g>
      <text x="44" y="190" className="pv-display" fontSize="72" letterSpacing="-3" fill="currentColor">kr/m²</text>
      <g stroke="currentColor" strokeOpacity=".4">
        <path d="M44 220H232" />
        <path d="M44 234h34m8 0h22m8 0h58m8 0h14" strokeOpacity=".25" />
      </g>
      <path d="M44 404H656" stroke="currentColor" strokeOpacity=".2" />
      <path d="M44 394C120 390 170 385 240 378S360 368 420 356 540 340 656 330" stroke="#e8a75d" strokeOpacity=".8" />
      <path d="M44 399C120 397 170 394 240 390S360 384 420 378 540 370 656 366" stroke="currentColor" strokeOpacity=".3" strokeDasharray="2 5" />
      <g className="pv-mono" fontSize="10" letterSpacing="2" fill="currentColor" opacity=".55">
        <text x="44" y="440">ACTUAL SALES</text>
        <text x="656" y="440" textAnchor="end">NOT ASKING PRICES</text>
      </g>
      <RegistrationMarks />
    </svg>
  );
}

function MemeGuessrVisual() {
  return (
    <svg viewBox="0 0 700 500" fill="none" focusable="false">
      <text x="44" y="62" className="pv-mono" fontSize="11" letterSpacing="3">MEMEGUESSR</text>
      <path d="M44 107H656M44 345H656" stroke="currentColor" strokeOpacity=".13" />
      <text x="42" y="305" className="pv-display" fontSize="208" letterSpacing="-17" fontWeight="500" fill="currentColor">20</text>
      <text x="332" y="305" className="pv-display" fontSize="208" letterSpacing="-16" fontWeight="500" stroke="#e8a75d" strokeWidth="1.25">??</text>
      <path d="M44 404H656" stroke="currentColor" strokeOpacity=".4" />
      <g stroke="currentColor" strokeOpacity=".4">
        {Array.from({ length: 31 }, (_, index) => (
          <path key={index} d={`M${44 + index * 20.4} 404v${index % 10 === 0 ? 15 : 6}`} />
        ))}
      </g>
      <g className="pv-mono" fontSize="11" fill="currentColor" opacity=".6">
        <text x="44" y="444">2000</text>
        <text x="248" y="444" textAnchor="middle">2010</text>
        <text x="452" y="444" textAnchor="middle">2020</text>
      </g>
      <path d="M378 381v46" stroke="#e8a75d" />
      <circle cx="378" cy="404" r="5" fill="#e8a75d" />
      <path d="M362 370h32" stroke="#e8a75d" strokeOpacity=".5" />
      <RegistrationMarks />
    </svg>
  );
}

const visuals = {
  "sagas-of-blood-and-fire": SagasVisual,
  "iceland-live": IcelandLiveVisual,
  fasteign: FasteignVisual,
  landlif: LandlifVisual,
  nafnaval: NafnavalVisual,
  spinpage: SpinPageVisual,
  vindur: VindurVisual,
  memeguessr: MemeGuessrVisual,
};

export function ProjectVisual({ slug }: { slug: string }) {
  const Visual = visuals[slug as keyof typeof visuals];
  if (!Visual) return null;

  return (
    <div className={`project-visual project-visual--${slug}`} aria-hidden="true">
      <div className="project-visual__composition">
        <Visual />
      </div>
    </div>
  );
}
