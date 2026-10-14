'use client'

import { content } from '@/data/content'
import { highlightMetrics } from '@/lib/highlightMetrics'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/ui/Reveal'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !pathRef.current || !sectionRef.current) return

    const path = pathRef.current
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: true,
      },
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [reduced])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative px-4 sm:px-6 lg:px-8"
      style={{ paddingBlock: 'var(--section-py)' }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16 h-px w-full bg-line" />
        <SectionLabel index="02">Experience</SectionLabel>
        <h2 className="mt-4 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-text">
          Where I&apos;ve worked
        </h2>

        <div className="relative mt-20">
          <svg
            className="pointer-events-none absolute left-[15px] top-0 h-full w-4 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          >
            <path
              ref={pathRef}
              d="M 2 0 V 2400"
              fill="none"
              stroke="rgba(124,245,196,0.45)"
              strokeWidth="2"
            />
          </svg>

          <div className="space-y-20 md:col-span-3 md:space-y-28">
            {content.experience.map((job, i) => {
              const alignRight = i % 2 === 1
              return (
                <Reveal key={`${job.company}-${job.period}`} delay={i * 0.05}>
                  <article
                    className={`relative pl-10 md:pl-0 md:w-[calc(50%-1.5rem)] ${
                      alignRight ? 'md:col-start-3 md:ml-auto md:text-right' : 'md:col-start-1'
                    }`}
                  >
                    <div className="absolute left-[13px] top-2 h-3 w-3 rounded-full border-2 border-accent bg-bg shadow-[0_0_16px_rgba(124,245,196,0.45)] md:left-1/2 md:-translate-x-1/2" />
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
                      {job.period} · {job.location}
                    </p>
                    <h3 className="mt-2 font-display text-[clamp(1.75rem,4vw,3rem)] leading-tight text-text">
                      {job.company}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-accent">{job.role}</p>
                    <ul className="mt-6 max-w-lg space-y-3 text-sm leading-relaxed text-text-muted">
                      {job.bullets.map((bullet) => (
                        <li key={bullet}>{highlightMetrics(bullet)}</li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
