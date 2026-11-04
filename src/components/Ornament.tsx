/**
 * Original linework: concentric rings, a 12-fold division and an eight-petal lotus (aṣṭadala).
 * Purely decorative. Paths carry class "draw" so [data-draw] can trace them on scroll.
 */
export function Ornament({ className, stroke = "currentColor", draw = true }: { className?: string; stroke?: string; draw?: boolean }) {
  const C = 200;
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  const spokes = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false" className={className} data-draw={draw || undefined} fill="none" stroke={stroke} strokeWidth={0.9}>
      <circle className="draw" cx={C} cy={C} r={190} />
      <circle className="draw" cx={C} cy={C} r={176} strokeDasharray="2 5" />
      <circle className="draw" cx={C} cy={C} r={128} />
      <circle className="draw" cx={C} cy={C} r={60} />
      {spokes.map((d) => (
        <line key={d} className="draw" x1={C} y1={C - 128} x2={C} y2={C - 176} transform={`rotate(${d} ${C} ${C})`} />
      ))}
      {petals.map((d) => (
        <path key={d} className="draw" d={`M${C} ${C - 60} C ${C - 26} ${C - 82}, ${C - 18} ${C - 118}, ${C} ${C - 128} C ${C + 18} ${C - 118}, ${C + 26} ${C - 82}, ${C} ${C - 60} Z`} transform={`rotate(${d} ${C} ${C})`} />
      ))}
      <circle cx={C} cy={C} r={4} fill={stroke} stroke="none" />
    </svg>
  );
}
