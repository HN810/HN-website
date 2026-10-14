'use client'

const LINE = 'rgba(236,234,228,0.12)'
const SHAPE = 'rgba(236,234,228,0.18)'
const DUR = '6s'

const TILES = [0, 1, 2, 3, 4, 5].map((i) => ({
  x: 24 + (i % 3) * 122,
  y: 100 + Math.floor(i / 3) * 86,
}))

/** Tile index -> rank among the search results: two beach-with-dog scenes, then an empty beach. */
const MATCHES: [number, number][] = [
  [3, 1],
  [0, 2],
  [5, 3],
]

function Waves({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x + 6} ${y + 56} q 12 -6 24 0 t 24 0 t 24 0 t 24 0`}
      fill="none"
      stroke={SHAPE}
    />
  )
}

function TileArt({ i, x, y }: { i: number; x: number; y: number }) {
  switch (i) {
    case 0:
      return (
        <g>
          <line x1={x + 6} y1={y + 46} x2={x + 102} y2={y + 46} stroke={SHAPE} />
          <Waves x={x} y={y} />
          <circle cx={x + 82} cy={y + 22} r="8" fill="none" stroke={SHAPE} />
          <ellipse cx={x + 30} cy={y + 40} rx="12" ry="5" fill={SHAPE} />
          <circle cx={x + 42} cy={y + 34} r="4" fill={SHAPE} />
        </g>
      )
    case 1:
      return (
        <path d={`M ${x + 6} ${y + 62} L ${x + 40} ${y + 22} L ${x + 62} ${y + 46} L ${x + 76} ${y + 32} L ${x + 102} ${y + 62} Z`} fill="none" stroke={SHAPE} />
      )
    case 2:
      return (
        <g>
          <rect x={x + 22} y={y + 18} width="26" height="40" fill="none" stroke={SHAPE} />
          <rect x={x + 58} y={y + 30} width="26" height="28" fill="none" stroke={SHAPE} />
        </g>
      )
    case 3:
      return (
        <g>
          <line x1={x + 6} y1={y + 46} x2={x + 102} y2={y + 46} stroke={SHAPE} />
          <Waves x={x} y={y} />
          <circle cx={x + 26} cy={y + 20} r="10" fill="none" stroke={SHAPE} />
          <ellipse cx={x + 70} cy={y + 39} rx="15" ry="6" fill={SHAPE} />
          <circle cx={x + 86} cy={y + 32} r="5" fill={SHAPE} />
          <line x1={x + 62} y1={y + 44} x2={x + 62} y2={y + 50} stroke={SHAPE} strokeWidth="2" />
          <line x1={x + 78} y1={y + 44} x2={x + 78} y2={y + 50} stroke={SHAPE} strokeWidth="2" />
        </g>
      )
    case 4:
      return (
        <g>
          <line x1={x + 54} y1={y + 62} x2={x + 54} y2={y + 38} stroke={SHAPE} strokeWidth="2" />
          <circle cx={x + 54} cy={y + 28} r="16" fill="none" stroke={SHAPE} />
          <line x1={x + 6} y1={y + 62} x2={x + 102} y2={y + 62} stroke={SHAPE} />
        </g>
      )
    default:
      return (
        <g>
          <line x1={x + 6} y1={y + 46} x2={x + 102} y2={y + 46} stroke={SHAPE} />
          <Waves x={x} y={y} />
          <circle cx={x + 54} cy={y + 24} r="9" fill="none" stroke={SHAPE} />
        </g>
      )
  }
}

export function ImageSearchVisual() {
  return (
    <svg viewBox="0 0 400 280" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id="sis-query-clip">
          <rect x="52" y="56" height="24" width="0">
            <animate attributeName="width" values="0;180;180;0" keyTimes="0;0.35;0.92;1" dur={DUR} repeatCount="indefinite" />
          </rect>
        </clipPath>
      </defs>

      <rect x="8" y="8" width="384" height="264" rx="12" fill="rgba(18,20,26,0.6)" stroke="rgba(236,234,228,0.1)" />
      <text x="24" y="36" fill="#8A8D98" fontSize="10" fontFamily="monospace">
        openclip + faiss · text → image
      </text>

      <rect x="24" y="52" width="352" height="30" rx="6" fill="rgba(18,20,26,0.95)" stroke="rgba(124,245,196,0.35)" />
      <circle cx="39" cy="66" r="5" fill="none" stroke="#8A8D98" strokeWidth="1.2" />
      <line x1="43" y1="70" x2="47" y2="74" stroke="#8A8D98" strokeWidth="1.2" />
      <text x="54" y="71" fill="#ECEAE4" fontSize="11" fontFamily="monospace" clipPath="url(#sis-query-clip)">
        a dog running on the beach
      </text>

      {TILES.map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={t.y} width="108" height="72" rx="4" fill="rgba(18,20,26,0.9)" stroke={LINE} />
          <TileArt i={i} x={t.x} y={t.y} />
        </g>
      ))}

      {MATCHES.map(([tile, rank], n) => {
        const t = TILES[tile]
        const on = 0.4 + n * 0.08
        const keyTimes = `0;${on};${on + 0.04};0.92;1`
        return (
          <g key={tile} opacity="0">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={keyTimes} dur={DUR} repeatCount="indefinite" />
            <rect x={t.x} y={t.y} width="108" height="72" rx="4" fill="rgba(124,245,196,0.05)" stroke="#7CF5C4" strokeWidth="1.5" />
            <circle cx={t.x + 96} cy={t.y + 12} r="7" fill="#7CF5C4" />
            <text x={t.x + 96} y={t.y + 15} textAnchor="middle" fill="#0B0C10" fontSize="9" fontFamily="monospace" fontWeight="bold">
              {rank}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
