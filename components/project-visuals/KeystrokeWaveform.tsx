'use client'

export function KeystrokeWaveform() {
  const points = '20,140 45,80 70,160 95,60 120,150 145,90 170,130 195,70 220,140 245,100 270,155 295,85 320,125 345,95 380,130'

  return (
    <svg viewBox="0 0 400 280" className="h-full w-full" aria-hidden>
      <rect x="8" y="8" width="384" height="264" rx="12" fill="rgba(18,20,26,0.6)" stroke="rgba(236,234,228,0.1)" />
      <polyline
        points={points}
        fill="none"
        stroke="#7CF5C4"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.85"
      >
        <animate attributeName="stroke-dasharray" values="0 800;800 0" dur="3s" repeatCount="indefinite" />
      </polyline>
      {[45, 95, 145, 195, 245, 295].map((x, i) => (
        <line
          key={x}
          x1={x}
          y1={180}
          x2={x}
          y2={200}
          stroke="rgba(139,140,255,0.5)"
          strokeWidth="2"
          opacity={0.4 + i * 0.1}
        />
      ))}
      <text x="24" y="36" fill="#8A8D98" fontSize="10" fontFamily="monospace">
        keystroke latency · ms
      </text>
    </svg>
  )
}
