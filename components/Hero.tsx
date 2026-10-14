'use client'

import { content } from '@/data/content'
import { Counter } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'
import { SplitText } from '@/components/ui/SplitText'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

function TerminalCard() {
  const terminalLines = content.site.terminalLines
  const reduced = useReducedMotion()
  const [lineIndex, setLineIndex] = useState(0)
  const [text, setText] = useState('')
  const [showCaret, setShowCaret] = useState(true)

  useEffect(() => {
    if (reduced) {
      setText(terminalLines.join('\n'))
      return
    }

    const full = terminalLines[lineIndex]
    let i = 0
    const type = setInterval(() => {
      i++
      setText((prev) => {
        const lines = prev.split('\n').filter(Boolean)
        const base = lines.slice(0, lineIndex).join('\n')
        const current = full.slice(0, i)
        return base ? `${base}\n${current}` : current
      })
      if (i >= full.length) {
        clearInterval(type)
        if (lineIndex < terminalLines.length - 1) {
          setTimeout(() => setLineIndex((n) => n + 1), 400)
        }
      }
    }, 28)

    return () => clearInterval(type)
  }, [lineIndex, reduced])

  useEffect(() => {
    if (reduced) return
    const blink = setInterval(() => setShowCaret((c) => !c), 500)
    return () => clearInterval(blink)
  }, [reduced])

  return (
    <div className="rounded-lg border border-line bg-bg-elevated/80 p-5 font-mono text-xs leading-relaxed text-text-muted backdrop-blur-sm sm:text-sm">
      <pre className="whitespace-pre-wrap">
        {reduced ? terminalLines.join('\n') : text}
        {!reduced && showCaret && <span className="text-accent">▌</span>}
      </pre>
    </div>
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const { scrollY, scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, reduced ? 0 : 80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, reduced ? 1 : 0.2])
  const scrollHintOpacity = useTransform(scrollY, [0, 200], [1, 0])

  return (
    <section id="about" className="relative">
      <div className="relative flex min-h-[100dvh] flex-col justify-end px-4 pb-16 pt-[calc(var(--nav-height)+2rem)] sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[1280px] gap-12 lg:grid-cols-12 lg:items-end">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="lg:col-span-8">
            <h1 className="font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.92] tracking-[-0.03em] text-text">
              <SplitText lines={['Hussain', 'Nasir']} italicLastWord />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-text-muted sm:text-sm"
            >
              {content.site.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-xl text-[1.05rem] leading-[1.7] text-text-muted"
            >
              {content.site.tagline}
            </motion.p>
          </motion.div>

          <div className="lg:col-span-4 lg:justify-self-end lg:pb-8">
            <TerminalCard />
          </div>
        </div>

        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="mx-auto mt-16 flex w-full max-w-[1280px] flex-col items-center gap-2 text-text-muted"
          aria-hidden
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">Scroll</span>
          <motion.span
            className="block h-12 w-px bg-line"
            animate={reduced ? undefined : { scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 pb-[var(--section-py)] sm:px-6 lg:px-8">
        <div className="mb-12 h-px w-full origin-left scale-x-0 bg-line animate-[drawLine_1.2s_ease_forwards]" />
        <Reveal>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-text">
            {content.about.heading}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            {content.about.body.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-[1.05rem] leading-[1.7] text-text-muted">{para}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="lg:col-span-5" delay={0.12}>
            <div className="rounded-lg border border-line bg-bg-elevated/50 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">Education</p>
              <p className="mt-3 font-display text-2xl text-text">{content.about.education.school}</p>
              <p className="mt-2 text-sm text-text-muted">{content.about.education.degree}</p>
              <p className="mt-1 font-mono text-xs text-text-muted">
                Graduation {content.about.education.graduation}
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
                Coursework
              </p>
              <p className="mt-2 text-sm text-text-muted">
                {content.about.education.coursework.join(' · ')}
              </p>
              <p className="mt-4 font-mono text-xs text-text-muted">{content.site.status}</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {content.about.quick_stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <p className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none text-text">
                <Counter value={stat.value} />
              </p>
              <p className="mt-3 max-w-xs font-mono text-xs uppercase tracking-[0.1em] text-text-muted">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
