/**
 * FIG. 01 / CELESTIAL STUDY — an original, abstract engraved plate.
 * Decorative only: it is not a computed horoscope or a Vedic chart.
 */
type Props = {
  tone?: "ink" | "paper";
  animate?: boolean;
  /** Optional crop of the 640×640 plate, e.g. "320 0 320 320". */
  viewBox?: string;
  className?: string;
};

const C = 320;
const TICKS = 48;

function polar(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: +(C + r * Math.cos(rad)).toFixed(2), y: +(C + r * Math.sin(rad)).toFixed(2) };
}

const ticks = Array.from({ length: TICKS }, (_, i) => {
  const deg = (360 / TICKS) * i;
  const major = i % 4 === 0;
  const a = polar(major ? 258 : 266, deg);
  const b = polar(280, deg);
  return { key: i, ...{ x1: a.x, y1: a.y, x2: b.x, y2: b.y }, major };
});

// Orbit: ellipse rotated −22° about the centre. The off-axis dot sits on it.
const ORBIT_RX = 236;
const ORBIT_RY = 92;
const ORBIT_ROT = -22;
const dotT = (205 * Math.PI) / 180;
const rot = (ORBIT_ROT * Math.PI) / 180;
const dx = ORBIT_RX * Math.cos(dotT);
const dy = ORBIT_RY * Math.sin(dotT);
const dot = {
  x: +(C + dx * Math.cos(rot) - dy * Math.sin(rot)).toFixed(2),
  y: +(C + dx * Math.sin(rot) + dy * Math.cos(rot)).toFixed(2),
};

export function CelestialPlate({ tone = "ink", animate = false, viewBox = "0 0 640 640", className }: Props) {
  const line = tone === "ink" ? "#C3A46C" : "#765527";
  const faint = tone === "ink" ? "#51483A" : "#D5CDBD";
  const fine = tone === "ink" ? "#8A7650" : "#A8957A";

  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={[animate ? "plate-animate" : "", className ?? ""].join(" ").trim()}
      fill="none"
      strokeLinecap="round"
    >
      {/* concentric rings */}
      <circle cx={C} cy={C} r={296} stroke={faint} strokeWidth={1} />
      <circle cx={C} cy={C} r={280} stroke={line} strokeWidth={1.25} />
      <circle cx={C} cy={C} r={250} stroke={fine} strokeWidth={0.75} />
      <circle cx={C} cy={C} r={196} stroke={faint} strokeWidth={1} strokeDasharray="2 6" />
      <circle cx={C} cy={C} r={148} stroke={line} strokeWidth={1} />
      <circle cx={C} cy={C} r={86} stroke={fine} strokeWidth={0.75} />
      <circle cx={C} cy={C} r={18} stroke={line} strokeWidth={1} />

      {/* 48 engraved ticks */}
      <g stroke={line}>
        {ticks.map((t) => (
          <line key={t.key} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth={t.major ? 1.25 : 0.75} />
        ))}
      </g>

      {/* radial crosshair */}
      <g stroke={fine} strokeWidth={0.75}>
        <line x1={C} y1={24} x2={C} y2={616} />
        <line x1={24} y1={C} x2={616} y2={C} />
      </g>
      <g stroke={faint} strokeWidth={0.75}>
        <line x1={C - 198} y1={C - 198} x2={C - 61} y2={C - 61} />
        <line x1={C + 61} y1={C + 61} x2={C + 198} y2={C + 198} />
        <line x1={C + 198} y1={C - 198} x2={C + 61} y2={C - 61} />
        <line x1={C - 61} y1={C + 61} x2={C - 198} y2={C + 198} />
      </g>

      {/* elliptical orbit — the one animated accent */}
      <ellipse
        className="plate-orbit"
        pathLength={1}
        cx={C}
        cy={C}
        rx={ORBIT_RX}
        ry={ORBIT_RY}
        transform={`rotate(${ORBIT_ROT} ${C} ${C})`}
        stroke={line}
        strokeWidth={1.25}
      />

      {/* off-axis dot */}
      <g className="plate-dot">
        <circle cx={dot.x} cy={dot.y} r={13} stroke={line} strokeWidth={0.75} />
        <circle cx={dot.x} cy={dot.y} r={5.5} fill={line} />
      </g>
    </svg>
  );
}
