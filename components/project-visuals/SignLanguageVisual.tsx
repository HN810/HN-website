'use client'

const LETTERS = ['A', 'B', 'C', 'D']
const DUR = '4s'
const HAND = 'rgba(236,234,228,0.55)'

/** Each pose is held, then moves to the next just before its label appears. */
const POSE_KEY_TIMES = '0;0.19;0.25;0.44;0.5;0.69;0.75;0.94;1'

function poseValues(perLetter: (string | number)[]) {
  const [a, b, c, d] = perLetter
  return [a, a, b, b, c, c, d, d, a].join(';')
}

/** Vertical scale of each finger for the letters A, B, C, D. */
const FINGERS = [
  { x: 176, h: 46, scales: [0.3, 1, 0.7, 1] },
  { x: 189, h: 54, scales: [0.3, 1, 0.7, 0.3] },
  { x: 202, h: 50, scales: [0.3, 1, 0.7, 0.3] },
  { x: 215, h: 40, scales: [0.3, 1, 0.7, 0.3] },
]
const THUMB_ANGLES = [0, -25, -10, -25]

export function SignLanguageVisual() {
  return (
    <svg viewBox="0 0 400 280" className="h-full w-full" aria-hidden>
      <rect x="8" y="8" width="384" height="264" rx="12" fill="rgba(18,20,26,0.6)" stroke="rgba(236,234,228,0.1)" />
      <text x="24" y="36" fill="#8A8D98" fontSize="10" fontFamily="monospace">
        yolov8 · real-time gesture detection
      </text>

      {FINGERS.map((f) => (
        <g key={f.x} transform={`translate(${f.x} 152)`}>
          <rect x="0" y={-f.h} width="11" height={f.h} rx="5.5" fill="none" stroke={HAND} strokeWidth="1.5">
            <animateTransform
              attributeName="transform"
              type="scale"
              values={poseValues(f.scales.map((s) => `1 ${s}`))}
              keyTimes={POSE_KEY_TIMES}
              dur={DUR}
              repeatCount="indefinite"
            />
          </rect>
        </g>
      ))}
      <g transform="translate(172 176) rotate(-50)">
        <rect x="-34" y="-6" width="34" height="12" rx="6" fill="none" stroke={HAND} strokeWidth="1.5">
          <animateTransform attributeName="transform" type="rotate" values={poseValues(THUMB_ANGLES)} keyTimes={POSE_KEY_TIMES} dur={DUR} repeatCount="indefinite" />
        </rect>
      </g>
      <rect x="172" y="148" width="58" height="62" rx="16" fill="rgba(18,20,26,0.95)" stroke={HAND} strokeWidth="1.5" />
      <rect x="186" y="208" width="30" height="24" fill="rgba(18,20,26,0.95)" stroke={HAND} strokeWidth="1.5" />

      <rect x="148" y="84" width="104" height="160" rx="4" fill="none" stroke="#7CF5C4" strokeWidth="1.5" />
      <rect x="148" y="70" width="64" height="15" rx="2" fill="#7CF5C4" />
      <text x="154" y="81" fill="#0B0C10" fontSize="9" fontFamily="monospace">
        sign:
      </text>
      {LETTERS.map((letter, i) => (
        <text key={letter} x="186" y="81" fill="#0B0C10" fontSize="9" fontFamily="monospace" fontWeight="bold" opacity={i === 0 ? 1 : 0}>
          {letter}
          <animate
            attributeName="opacity"
            values={LETTERS.map((_, j) => (j === i ? 1 : 0)).join(';')}
            keyTimes="0;0.25;0.5;0.75"
            calcMode="discrete"
            dur={DUR}
            repeatCount="indefinite"
          />
        </text>
      ))}

      <line x1="150" x2="250" y1="86" y2="86" stroke="#7CF5C4" strokeWidth="1" opacity="0.35">
        <animate attributeName="y1" values="86;242;86" dur="2s" repeatCount="indefinite" />
        <animate attributeName="y2" values="86;242;86" dur="2s" repeatCount="indefinite" />
      </line>

      <text x="376" y="256" textAnchor="end" fill="#8A8D98" fontSize="9" fontFamily="monospace">
        A–Z · 26 gestures
      </text>
    </svg>
  )
}
