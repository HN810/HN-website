'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { duration, easePrimary, revealLine, stagger } from '@/lib/motion'

interface SplitTextProps {
  lines: string[]
  className?: string
  italicLastWord?: boolean
}

export function SplitText({ lines, className = '', italicLastWord = false }: SplitTextProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </div>
    )
  }

  let delayOffset = 0

  return (
    <div className={className} aria-label={lines.join(' ')}>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ')
        const isLastLine = lineIndex === lines.length - 1

        return (
          <div key={lineIndex} className="overflow-hidden">
            <motion.div
              className="flex flex-wrap gap-x-[0.28em]"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: stagger, delayChildren: delayOffset }}
            >
              {words.map((word, wordIndex) => {
                const isLastWord = isLastLine && wordIndex === words.length - 1
                return (
                  <span key={wordIndex} className="inline-block overflow-hidden pb-[0.08em]">
                    <motion.span
                      className={`inline-block ${isLastWord && italicLastWord ? 'font-display italic' : ''}`}
                      variants={revealLine}
                      transition={{ duration: duration.reveal, ease: easePrimary }}
                    >
                      {word}
                    </motion.span>
                  </span>
                )
              })}
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
