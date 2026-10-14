'use client'

export function UavLandingVisual() {
  return (
    <svg viewBox="0 0 400 280" className="h-full w-full" aria-hidden>
      <rect x="8" y="8" width="384" height="264" rx="12" fill="rgba(18,20,26,0.6)" stroke="rgba(236,234,228,0.1)" />
      <rect x="80" y="40" width="240" height="200" fill="none" stroke="rgba(236,234,228,0.08)" strokeWidth="1" />
      <rect x="150" y="110" width="100" height="60" fill="none" stroke="#7CF5C4" strokeWidth="2" rx="4">
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
      </rect>
      <g transform="translate(200 70)">
        <path d="M0 0 L-24 16 L0 8 L24 16 Z" fill="#ECEAE4" opacity="0.9">
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 35; 0 0" dur="4s" repeatCount="indefinite" />
        </path>
      </g>
      <circle cx="200" cy="140" r="3" fill="#8B8CFF" />
      <text x="24" y="36" fill="#8A8D98" fontSize="10" fontFamily="monospace">
        landing zone · top-down
      </text>
    </svg>
  )
}
