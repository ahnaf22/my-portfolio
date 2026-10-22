"use client";

import type { ArtId } from "@/lib/data";

const C = {
  paper: "#efebe2",
  ink: "#15140f",
  ember: "#ff4a1c",
  sand: "#ddd6c6",
  lime: "#c9f25b",
  cobalt: "#2e45ff",
};

// deterministic pseudo-random so SSR and client agree
const rnd = (n: number) => {
  const s = Math.sin(n * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};

export const coverBg: Record<ArtId, string> = {
  storola: C.ember,
  custom: C.ink,
  smartexam: C.lime,
  parcel: C.cobalt,
  deshtax: C.sand,
  bricm: C.ink,
  displaylab: C.ember,
  flatshop: C.cobalt,
  nutriora: C.lime,
};

function Storola() {
  const cells = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 4; c++) {
      const i = r * 4 + c;
      const x = 38 + c * 86;
      const y = 40 + r * 62;
      cells.push(
        <g key={i}>
          <rect x={x} y={y} width="74" height="50" rx="9" fill={C.paper}>
            <animate attributeName="opacity" values="0.2;1;1;0.2" keyTimes="0;0.2;0.8;1" dur="4s" begin={`${i * 0.28}s`} repeatCount="indefinite" />
          </rect>
          <rect x={x + 8} y={y + 8} width="30" height="5" rx="2.5" fill={C.ink} opacity="0.85" />
          <rect x={x + 8} y={y + 20} width="58" height="4" rx="2" fill={C.ink} opacity="0.25" />
          <rect x={x + 8} y={y + 29} width="40" height="4" rx="2" fill={C.ink} opacity="0.25" />
          <circle cx={x + 62} cy={y + 10} r="3.5" fill={C.ember}>
            <animate attributeName="r" values="3;5;3" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </circle>
        </g>
      );
    }
  return (
    <svg viewBox="0 0 400 300" className="size-full">
      {cells}
      <text x="38" y="268" fontFamily="monospace" fontSize="13" fill={C.ink}>
        tenant_0142 · provisioned ✓
      </text>
    </svg>
  );
}

function CustomBuild() {
  const slabs = [
    { y: 205, fill: C.paper },
    { y: 160, fill: C.ember },
    { y: 115, fill: C.lime },
  ];
  return (
    <svg viewBox="0 0 400 300" className="size-full">
      <path id="oc-path" d="M200 40 V 250" stroke={C.paper} strokeOpacity="0.25" strokeDasharray="3 6" fill="none" />
      {slabs.map((s, i) => (
        <g key={i}>
          <polygon points={`200,${s.y - 36} 300,${s.y} 200,${s.y + 36} 100,${s.y}`} fill={s.fill} stroke={C.ink} strokeWidth="2">
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </polygon>
          <polygon points={`100,${s.y} 200,${s.y + 36} 200,${s.y + 48} 100,${s.y + 12}`} fill={C.ink} opacity="0.35" />
          <polygon points={`300,${s.y} 200,${s.y + 36} 200,${s.y + 48} 300,${s.y + 12}`} fill={C.ink} opacity="0.55" />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <circle key={i} r="4.5" fill={C.paper}>
          <animateMotion dur="3.2s" begin={`${i * 1.05}s`} repeatCount="indefinite" path="M200 40 V 250" />
        </circle>
      ))}
      <text x="24" y="40" fontFamily="monospace" fontSize="12" fill={C.paper} opacity="0.7">
        event: order.paid → ship
      </text>
    </svg>
  );
}

function SmartExam() {
  return (
    <svg viewBox="0 0 400 300" className="size-full">
      <g transform="rotate(-4 200 150)">
        <rect x="90" y="30" width="220" height="250" rx="6" fill={C.paper} stroke={C.ink} strokeWidth="2" />
        {[70, 95, 120, 145, 170, 195].map((y) => (
          <line key={y} x1="112" x2="288" y1={y} y2={y} stroke={C.ink} strokeOpacity="0.18" />
        ))}
        {[66, 91, 116, 141].map((y, i) => (
          <rect key={y} x="114" y={y} width={120 - i * 14} height="4" rx="2" fill={C.ink} opacity="0.55" />
        ))}
        <path d="M110 215 C 150 190, 160 240, 205 215 S 260 200, 290 225" fill="none" stroke={C.ember} strokeWidth="4" strokeLinecap="round" strokeDasharray="260" strokeDashoffset="260">
          <animate attributeName="stroke-dashoffset" values="260;0;0;260" keyTimes="0;0.4;0.85;1" dur="4s" repeatCount="indefinite" />
        </path>
        <circle cx="262" cy="86" r="26" fill="none" stroke={C.ember} strokeWidth="4" strokeDasharray="170" strokeDashoffset="170">
          <animate attributeName="stroke-dashoffset" values="170;0;0;170" keyTimes="0;0.35;0.85;1" dur="4s" begin="0.8s" repeatCount="indefinite" />
        </circle>
        <text x="262" y="95" textAnchor="middle" fontFamily="sans-serif" fontWeight="800" fontSize="24" fill={C.ink}>
          92
        </text>
      </g>
    </svg>
  );
}

function Parcel() {
  const route = "M60 220 C 110 90, 170 90, 200 150 S 290 220, 340 80";
  return (
    <svg viewBox="0 0 400 300" className="size-full">
      <path d={route} fill="none" stroke={C.paper} strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" opacity="0.7" />
      {[
        { x: 60, y: 220, t: "PICKUP" },
        { x: 200, y: 150, t: "HUB" },
        { x: 340, y: 80, t: "DELIVERED" },
      ].map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy={p.y} r="12" fill={C.paper} />
          <circle cx={p.x} cy={p.y} r="5" fill={C.cobalt} />
          <text x={p.x} y={p.y + 32} textAnchor="middle" fontFamily="monospace" fontSize="11" fill={C.paper}>
            {p.t}
          </text>
        </g>
      ))}
      <g>
        <rect x="-14" y="-14" width="28" height="28" rx="5" fill={C.ember} stroke={C.ink} strokeWidth="2" />
        <path d="M-14 -3 H14" stroke={C.ink} strokeWidth="2" />
        <animateMotion dur="5s" repeatCount="indefinite" path={route} rotate="0" />
      </g>
    </svg>
  );
}

function DeshTax() {
  const bars = [46, 72, 58, 96];
  return (
    <svg viewBox="0 0 400 300" className="size-full">
      <polygon
        points="110,28 290,28 290,262 272,252 254,262 236,252 218,262 200,252 182,262 164,252 146,262 128,252 110,262"
        fill={C.paper}
        stroke={C.ink}
        strokeWidth="2"
      />
      <rect x="130" y="48" width="70" height="8" rx="4" fill={C.ink} />
      {[78, 98, 118].map((y, i) => (
        <g key={y}>
          <rect x="130" y={y} width={90 - i * 12} height="5" rx="2.5" fill={C.ink} opacity="0.3" />
          <rect x="246" y={y} width="24" height="5" rx="2.5" fill={C.ink} opacity="0.55" />
        </g>
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={134 + i * 34} y={226 - h} width="22" height={h} fill={i === 3 ? C.ember : C.ink} rx="3">
          <animate attributeName="height" values={`0;${h};${h};0`} keyTimes="0;0.4;0.85;1" dur="4s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
          <animate attributeName="y" values={`226;${226 - h};${226 - h};226`} keyTimes="0;0.4;0.85;1" dur="4s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
        </rect>
      ))}
      <g transform="rotate(-14 300 70)">
        <rect x="256" y="50" width="86" height="38" rx="5" fill="none" stroke={C.ember} strokeWidth="3" />
        <text x="299" y="76" textAnchor="middle" fontFamily="sans-serif" fontWeight="800" fontSize="20" fill={C.ember} letterSpacing="2">
          FILED
        </text>
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.85;1" dur="4s" repeatCount="indefinite" />
      </g>
    </svg>
  );
}

function Bricm() {
  const dots = [];
  const cols = 22;
  const rows = 12;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const hot = rnd(i + 3) > 0.82;
      dots.push(
        <circle key={i} cx={22 + c * 17} cy={26 + r * 17} r="2.2" fill={hot ? C.ember : C.paper} opacity={hot ? 1 : 0.55}>
          <animate attributeName="r" values="1.6;5;1.6" dur={`${2 + rnd(i) * 2}s`} begin={`${rnd(i + 9) * 2}s`} repeatCount="indefinite" />
        </circle>
      );
    }
  return (
    <svg viewBox="0 0 400 300" className="size-full">
      {dots}
      <rect x="20" y="232" width="190" height="52" rx="6" fill={C.ink} />
      <text x="30" y="270" fontFamily="sans-serif" fontWeight="800" fontSize="38" fill={C.paper} letterSpacing="-1">
        10,000+
      </text>
    </svg>
  );
}

function DisplayLab() {
  return (
    <svg viewBox="0 0 400 300" className="size-full">
      <defs>
        <clipPath id="tv-clip">
          <rect x="60" y="56" width="280" height="160" rx="6" />
        </clipPath>
      </defs>
      <rect x="52" y="48" width="296" height="176" rx="12" fill={C.ink} />
      <g clipPath="url(#tv-clip)">
        <g>
          {[C.paper, C.lime, C.cobalt, C.paper].map((f, i) => (
            <g key={i} transform={`translate(${i * 280} 0)`}>
              <rect x="60" y="56" width="280" height="160" fill={f} />
              <circle cx="200" cy="136" r={28 + (i % 2) * 8} fill={i % 2 ? C.ink : C.ember} />
            </g>
          ))}
          <animateTransform attributeName="transform" type="translate" values="0 0;0 0;-280 0;-280 0;-560 0;-560 0;-840 0" keyTimes="0;0.2;0.27;0.5;0.57;0.8;1" dur="9s" repeatCount="indefinite" />
        </g>
      </g>
      <rect x="170" y="224" width="60" height="10" fill={C.ink} />
      <rect x="140" y="234" width="120" height="8" rx="4" fill={C.ink} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={186 + i * 14} cy="204" r="3.5" fill={C.paper} opacity="0.9" />
      ))}
      <rect x="62" y="248" width="150" height="34" rx="17" fill={C.paper} />
      <text x="137" y="270" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="15" fill={C.ink} letterSpacing="5">
        482 197
      </text>
      <circle cx="300" cy="266" r="16" fill={C.ink} />
      <path d="M294 266 l5 5 l9 -10" fill="none" stroke={C.lime} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Flatshop() {
  const chips = [
    { t: "M", x: 60, y: 70 },
    { t: "P", x: 60, y: 150 },
    { t: "B", x: 60, y: 230 },
  ];
  return (
    <svg viewBox="0 0 400 300" className="size-full">
      {chips.map((c, i) => (
        <g key={c.t}>
          <path d={`M${c.x + 24} ${c.y} C 170 ${c.y}, 170 150, 232 150`} fill="none" stroke={C.paper} strokeWidth="2" strokeDasharray="4 7">
            <animate attributeName="stroke-dashoffset" values="0;-22" dur="1.2s" repeatCount="indefinite" />
          </path>
          <circle cx={c.x} cy={c.y} r="24" fill={C.paper} />
          <text x={c.x} y={c.y + 8} textAnchor="middle" fontFamily="sans-serif" fontWeight="800" fontSize="22" fill={C.ink}>
            {c.t}
          </text>
          <circle cx={c.x + 24} cy={c.y} r="3" fill={C.ember}>
            <animate attributeName="opacity" values="0;1;0" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <rect x="226" y="34" width="124" height="232" rx="22" fill={C.ink} />
      <rect x="234" y="44" width="108" height="212" rx="16" fill={C.paper} />
      {[0, 1].map((r) =>
        [0, 1].map((c) => (
          <g key={`${r}${c}`}>
            <rect x={244 + c * 49} y={58 + r * 74} width="43" height="62" rx="7" fill={[C.ember, C.lime, C.sand, C.cobalt][r * 2 + c]} />
            <rect x={244 + c * 49} y={126 + r * 74 - 0} width="28" height="4" rx="2" fill={C.ink} opacity="0.7" />
          </g>
        ))
      )}
      <rect x="244" y="206" width="88" height="34" rx="17" fill={C.ink} />
      <text x="288" y="228" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={C.paper}>
        CHECKOUT
      </text>
    </svg>
  );
}

function Nutriora() {
  const ring = (r: number, pct: number, color: string, begin: number) => {
    const circ = 2 * Math.PI * r;
    return (
      <g key={r}>
        <circle cx="200" cy="150" r={r} fill="none" stroke={C.ink} strokeOpacity="0.12" strokeWidth="18" />
        <circle
          cx="200"
          cy="150"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ}
          transform="rotate(-90 200 150)"
        >
          <animate attributeName="stroke-dashoffset" values={`${circ};${circ * (1 - pct)};${circ * (1 - pct)};${circ}`} keyTimes="0;0.4;0.85;1" dur="4.5s" begin={`${begin}s`} repeatCount="indefinite" />
        </circle>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 400 300" className="size-full">
      {ring(104, 0.78, C.ember, 0)}
      {ring(80, 0.6, C.ink, 0.2)}
      {ring(56, 0.42, C.cobalt, 0.4)}
      <text x="200" y="152" textAnchor="middle" fontFamily="sans-serif" fontWeight="800" fontSize="26" fill={C.ink}>
        kcal
      </text>
      <text x="200" y="172" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={C.ink} opacity="0.6">
        P · C · F
      </text>
    </svg>
  );
}

const arts: Record<ArtId, () => React.JSX.Element> = {
  storola: Storola,
  custom: CustomBuild,
  smartexam: SmartExam,
  parcel: Parcel,
  deshtax: DeshTax,
  bricm: Bricm,
  displaylab: DisplayLab,
  flatshop: Flatshop,
  nutriora: Nutriora,
};

export function CoverArt({ id, className = "" }: { id: ArtId; className?: string }) {
  const Art = arts[id];
  return (
    <div
      aria-hidden
      className={`overflow-hidden ${className}`}
      style={{ backgroundColor: coverBg[id] }}
    >
      <Art />
    </div>
  );
}
