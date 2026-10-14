'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Preloader() {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(reduced)

  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => setDone(true), 900)
    return () => clearTimeout(t)
  }, [reduced])

  if (done) return null

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, y: '-100%' }}
      transition={{ delay: 0.65, duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => setDone(true)}
    >
      <motion.span
        className="font-mono text-3xl tracking-[0.3em] text-accent sm:text-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        HN
      </motion.span>
    </motion.div>
  )
}
