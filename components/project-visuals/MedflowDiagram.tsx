'use client'

export function MedflowDiagram() {
  return (
    <svg viewBox="0 0 400 280" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="mf-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(124,245,196,0.35)" />
          <stop offset="100%" stopColor="rgba(139,140,255,0.25)" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="384" height="264" rx="12" fill="none" stroke="rgba(236,234,228,0.12)" />
      {[
        { x: 40, label: 'Intake' },
        { x: 140, label: 'Extract' },
        { x: 240, label: 'Review' },
        { x: 320, label: 'EMR sync' },
      ].map((node, i) => (
        <g key={node.label}>
          <rect x={node.x} y={100} width="72" height="48" rx="6" fill="rgba(18,20,26,0.9)" stroke="url(#mf-g)" />
          <text x={node.x + 36} y={128} textAnchor="middle" fill="#8A8D98" fontSize="10" fontFamily="monospace">
            {node.label}
          </text>
          {i < 3 && (
            <path
              d={`M ${node.x + 72} 124 H ${node.x + 96}`}
              stroke="rgba(124,245,196,0.5)"
              strokeWidth="1"
              markerEnd="url(#arrow)"
            />
          )}
        </g>
      ))}
      <path
        d="M 60 200 Q 200 240 340 200"
        fill="none"
        stroke="rgba(139,140,255,0.4)"
        strokeWidth="1"
        strokeDasharray="4 6"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="4s" repeatCount="indefinite" />
      </path>
    </svg>
  )
}
