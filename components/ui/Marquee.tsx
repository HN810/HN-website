'use client'

import { useReducedMotion } from '@/lib/useReducedMotion'

interface MarqueeProps {
  items: string[]
  reverse?: boolean
  className?: string
}

export function Marquee({ items, reverse = false, className = '' }: MarqueeProps) {
  const reduced = useReducedMotion()
  const row = [...items, ...items]

  return (
    <div
      className={`group overflow-hidden border-y border-line py-6 ${className}`}
      aria-hidden={reduced ? undefined : true}
    >
      <div
        className={`marquee-track flex w-max gap-12 ${reduced ? '' : reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover:[animation-play-state:paused]`}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-[clamp(2rem,6vw,4.5rem)] text-transparent [-webkit-text-stroke:1px_rgba(236,234,228,0.22)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
