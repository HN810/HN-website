'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { duration, easePrimary, revealBlock } from '@/lib/motion'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealBlock}
      transition={{ duration: duration.reveal, ease: easePrimary, delay }}
    >
      {children}
    </motion.div>
  )
}
