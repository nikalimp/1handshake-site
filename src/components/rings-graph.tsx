// Граф кольцами (design §2.1): ты в центре, 1-е кольцо — твои рукопожатия 🤝, 2-е — люди через одно рукопожатие.
// Огненный путь you → anna → founder. Чистый SVG, без JS; цвета — токены.
const C = 260;
const R1 = 112;
const R2 = 212;
const pt = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: +(C + r * Math.cos(a)).toFixed(1), y: +(C + r * Math.sin(a)).toFixed(1) };
};

const ring1 = [20, 80, 140, 200, 260, 320].map((d) => pt(R1, d));
const ring2 = [5, 35, 62, 95, 125, 160, 190, 222, 250, 282, 305, 338].map((d) => pt(R2, d));
// какие люди 2-го кольца знакомы с какими из 1-го
const links2: [number, number][] = [[0, 0], [1, 0], [2, 1], [3, 1], [4, 2], [5, 2], [6, 3], [7, 3], [8, 4], [9, 4], [10, 5], [11, 5]];
const ANNA = 1; // ring1[1]
const FOUNDER = 2; // ring2[2]

export function RingsGraph({ className }: { className?: string }) {
  const anna = ring1[ANNA];
  const founder = ring2[FOUNDER];
  return (
    <svg viewBox="0 0 520 520" role="img" aria-label="Your network as rings: you in the center, your handshakes on the first ring, people one handshake away on the second. An intro path goes from you through anna to a founder." className={className}>
      <circle cx={C} cy={C} r={R1} className="fill-none stroke-line-strong" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="2 6" />
      <circle cx={C} cy={C} r={R2} className="fill-none stroke-line-strong" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="2 6" />
      <g className="stroke-node" strokeWidth="1.5">
        {ring1.map((p, i) => i !== ANNA && <line key={`a${i}`} x1={C} y1={C} x2={p.x} y2={p.y} />)}
        {links2.map(([j, i]) => !(j === FOUNDER && i === ANNA) && <line key={`b${j}`} x1={ring1[i].x} y1={ring1[i].y} x2={ring2[j].x} y2={ring2[j].y} />)}
      </g>
      <g className="stroke-primary" strokeWidth="3" strokeLinecap="round">
        <line x1={C} y1={C} x2={anna.x} y2={anna.y} />
        <line x1={anna.x} y1={anna.y} x2={founder.x} y2={founder.y} />
      </g>
      <g className="fill-card stroke-node" strokeWidth="1.5">
        {ring2.map((p, j) => j !== FOUNDER && <circle key={`n2${j}`} cx={p.x} cy={p.y} r="7" />)}
        {ring1.map((p, i) => i !== ANNA && <circle key={`n1${i}`} cx={p.x} cy={p.y} r="10" />)}
      </g>
      <circle cx={founder.x} cy={founder.y} r="11" className="fill-card stroke-primary" strokeWidth="3" />
      <circle cx={anna.x} cy={anna.y} r="13" className="fill-primary" />
      <circle cx={C} cy={C} r="22" className="fill-foreground" />
      <g className="fill-muted-foreground" fontFamily="var(--font-mono)" fontSize="12">
        <text x={C} y={C + 42} textAnchor="middle" className="fill-foreground" fontWeight="500">you</text>
        <text x={anna.x} y={anna.y + 34} textAnchor="middle">@anna · 🤝</text>
        <text x={founder.x - 30} y={founder.y - 22} textAnchor="middle">founder · 2nd · via anna</text>
        <text x={C} y={C - R1 - 10} textAnchor="middle">your handshakes</text>
        <text x={C} y={C - R2 - 10} textAnchor="middle">one handshake away</text>
      </g>
    </svg>
  );
}
