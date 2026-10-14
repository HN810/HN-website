'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const DURATION_MS = 2000

interface CounterProps {
  value: string
  className?: string
}

/** Splits "97%+" into 97 and "%+", "30+ FPS" into 30 and "+ FPS". */
function parseNumeric(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return null
  return { num: parseFloat(match[1]), suffix: match[2] }
}

export function Counter({ value, className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const parsed = parseNumeric(value)
    if (!inView || reduced || !parsed) {
      setDisplay(value)
      return
    }

    const { num: target, suffix } = parsed
    const decimals = target % 1 !== 0 ? 1 : 0
    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS)
      const eased = 1 - Math.pow(1 - t, 4)
      setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`)
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    setDisplay(`${(0).toFixed(decimals)}${suffix}`)
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, value])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display}
    </span>
  )
}
