'use client'

const FEATURES = ['Age', 'BUN', 'Diabetes', 'Creatinine', 'Hypertension', 'GFR']
const LINE = 'rgba(236,234,228,0.14)'
const ACCENT = '#7CF5C4'

function Tree({ cx, cy, goLeft, leaf, delay }: { cx: number; cy: number; goLeft: boolean; leaf: number; delay: number }) {
  const child = { x: cx + (goLeft ? -22 : 22), y: cy + 20 }
  const leaves = [-33, -11, 11, 33].map((dx) => ({ x: cx + dx, y: cy + 40 }))
  const chosen = leaves[leaf]
  const pulse = (
    <animate
      attributeName="opacity"
      values="0.15;1;1;0.15"
      keyTimes="0;0.15;0.6;1"
      dur="3s"
      begin={`${delay}s`}
      repeatCount="indefinite"
    />
  )

  return (
    <g>
      <line x1={cx} y1={cy} x2={cx - 22} y2={cy + 20} stroke={LINE} />
      <line x1={cx} y1={cy} x2={cx + 22} y2={cy + 20} stroke={LINE} />
      {leaves.map((l, i) => (
        <line key={i} x1={cx + (i < 2 ? -22 : 22)} y1={cy + 20} x2={l.x} y2={l.y} stroke={LINE} />
      ))}
      {leaves.map((l, i) => (
        <circle key={i} cx={l.x} cy={l.y} r="3" fill="rgba(236,234,228,0.25)" />
      ))}
      <circle cx={cx - 22} cy={cy + 20} r="3.5" fill="rgba(236,234,228,0.3)" />
      <circle cx={cx + 22} cy={cy + 20} r="3.5" fill="rgba(236,234,228,0.3)" />
      <circle cx={cx} cy={cy} r="4" fill="rgba(236,234,228,0.45)" />

      <g opacity="0.15">
        {pulse}
        <line x1={cx} y1={cy} x2={child.x} y2={child.y} stroke={ACCENT} strokeWidth="1.5" />
        <line x1={child.x} y1={child.y} x2={chosen.x} y2={chosen.y} stroke={ACCENT} strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="4" fill={ACCENT} />
        <circle cx={child.x} cy={child.y} r="3.5" fill={ACCENT} />
        <circle cx={chosen.x} cy={chosen.y} r="3" fill={ACCENT} />
        <line x1={chosen.x} y1={chosen.y} x2="318" y2="150" stroke={ACCENT} strokeWidth="1" strokeDasharray="3 4" />
      </g>
    </g>
  )
}

export function CkdForestVisual() {
  return (
    <svg viewBox="0 0 400 280" className="h-full w-full" aria-hidden>
      <rect x="8" y="8" width="384" height="264" rx="12" fill="rgba(18,20,26,0.6)" stroke="rgba(236,234,228,0.1)" />
      <text x="24" y="36" fill="#8A8D98" fontSize="10" fontFamily="monospace">
        random forest · 6 clinical features
      </text>

      {FEATURES.map((f, i) => {
        const y = 66 + i * 32
        return (
          <g key={f}>
            <rect x="24" y={y - 11} width="84" height="18" rx="9" fill="none" stroke={LINE} />
            <text x="66" y={y + 1.5} textAnchor="middle" fill="#8A8D98" fontSize="9" fontFamily="monospace">
              {f}
            </text>
            <line x1="108" y1={y - 2} x2="150" y2="150" stroke="rgba(236,234,228,0.06)" />
          </g>
        )
      })}

      <path d="M 150 150 L 190 80 M 150 150 L 190 142 M 150 150 L 190 204" stroke="rgba(139,140,255,0.35)" fill="none" strokeDasharray="3 5">
        <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="2s" repeatCount="indefinite" />
      </path>

      <Tree cx={222} cy={60} goLeft leaf={1} delay={0} />
      <Tree cx={222} cy={122} goLeft={false} leaf={3} delay={0.4} />
      <Tree cx={222} cy={184} goLeft leaf={0} delay={0.8} />

      <rect x="318" y="128" width="62" height="44" rx="6" fill="rgba(18,20,26,0.95)" stroke="rgba(124,245,196,0.4)" />
      <text x="349" y="144" textAnchor="middle" fill="#8A8D98" fontSize="8" fontFamily="monospace">
        vote
      </text>
      <text x="349" y="162" textAnchor="middle" fill={ACCENT} fontSize="11" fontFamily="monospace">
        CKD
        <animate attributeName="opacity" values="1;0" keyTimes="0;0.5" calcMode="discrete" dur="6s" repeatCount="indefinite" />
      </text>
      <text x="349" y="162" textAnchor="middle" fill="#ECEAE4" fontSize="11" fontFamily="monospace" opacity="0">
        no CKD
        <animate attributeName="opacity" values="0;1" keyTimes="0;0.5" calcMode="discrete" dur="6s" repeatCount="indefinite" />
      </text>
    </svg>
  )
}
