'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

export function Background() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const blobAY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const blobBY = useTransform(scrollYProgress, [0, 1], ['10%', '-20%'])
  const blobAHue = useTransform(scrollYProgress, [0, 1], [0, 40])

  if (reduced) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[50vh] w-[50vw] rounded-full bg-[rgba(124,245,196,0.12)] blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[45vh] w-[45vw] rounded-full bg-[rgba(139,140,255,0.1)] blur-[120px]" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: blobAY, rotate: blobAHue }}
        className="absolute -left-[20%] top-[-10%] h-[55vh] w-[55vw] rounded-full bg-[rgba(124,245,196,0.18)] blur-[140px]"
      />
      <motion.div
        style={{ y: blobBY }}
        className="absolute -right-[15%] bottom-[-5%] h-[50vh] w-[50vw] rounded-full bg-[rgba(139,140,255,0.16)] blur-[140px]"
      />
    </div>
  )
}
