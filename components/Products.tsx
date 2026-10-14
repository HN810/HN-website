'use client'

import { content, type Product } from '@/data/content'
import { ProjectVisual } from '@/components/project-visuals/ProjectVisual'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

function ProductBlock({ product, reverse }: { product: Product; reverse: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, reduced ? 1 : 0.96, reduced ? 1 : 0.94])
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, reduced ? 1 : 0.85])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -30])
  const [stickyTop, setStickyTop] = useState<number>()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Cards taller than the viewport pin by their bottom edge so their end is reachable.
    const update = () => {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
      const navOffset = rootFontSize * 4.5 + 16
      setStickyTop(Math.min(navOffset, window.innerHeight - el.offsetHeight))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  const live = product.links.live && product.links.live !== 'TODO' ? product.links.live : null
  const github = product.links.github && product.links.github !== 'TODO' ? product.links.github : null

  return (
    <div
      ref={ref}
      className="sticky top-[calc(var(--nav-height)+1rem)] min-h-[90vh] py-8 md:py-12"
      style={stickyTop === undefined ? undefined : { top: stickyTop }}
    >
      <motion.article
        style={{ scale, opacity }}
        className="relative mx-auto max-w-[1280px] overflow-hidden rounded-xl border border-accent/20 bg-bg-elevated px-4 py-10 shadow-[0_0_80px_-40px_rgba(124,245,196,0.35)] sm:px-8 md:py-14"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          aria-hidden
        />
        <div
          className={`grid items-center gap-10 lg:grid-cols-12 ${reverse ? 'lg:[direction:rtl]' : ''}`}
        >
          <div className={`lg:col-span-6 ${reverse ? 'lg:[direction:ltr]' : ''}`}>
            <div className="flex items-start justify-between gap-4">
              <p className="font-display text-[clamp(4rem,12vw,9rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(124,245,196,0.3)]">
                {product.index}
              </p>
              <span className="mt-3 inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {product.status}
              </span>
            </div>
            <h3 className="group mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight text-text">
              <span className="link-wipe">{product.name}</span>
            </h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
              {product.kind} · {product.period}
            </p>
            <p className="mt-6 max-w-lg text-[1.05rem] leading-[1.7] text-text-muted">{product.summary}</p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-text-muted">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {product.stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-text-muted transition-transform hover:-translate-y-0.5 hover:text-text"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.12em]">
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  data-cursor-label="Open"
                  className="inline-flex items-center gap-1 text-accent link-wipe"
                >
                  Live <ArrowUpRight size={14} />
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  data-cursor-label="Open"
                  className="inline-flex items-center gap-1 text-text-muted link-wipe hover:text-text"
                >
                  GitHub <ArrowUpRight size={14} />
                </a>
              )}
              {!live && !github && <span className="text-text-muted">Links coming soon</span>}
            </div>
          </div>

          <motion.div
            style={{ y: visualY }}
            className={`min-h-[240px] lg:col-span-6 ${reverse ? 'lg:[direction:ltr]' : ''}`}
          >
            <div className="rounded-lg border border-line bg-bg p-4 md:p-6">
              <ProjectVisual id={product.id} />
            </div>
          </motion.div>
        </div>
      </motion.article>
    </div>
  )
}

export function Products() {
  return (
    <section
      id="products"
      className="relative px-4 sm:px-6 lg:px-8"
      style={{ paddingBottom: 'var(--section-py)' }}
    >
      <div className="mx-auto max-w-[1280px] pt-[var(--section-py)]">
        <div className="mb-16 h-px w-full bg-line" />
        <SectionLabel index="03">Products</SectionLabel>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-text">
            Products I&apos;m <span className="italic">building</span>
          </h2>
          <p className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-text-muted">
            Real-world platforms, deployed and in active development.
          </p>
        </div>
      </div>

      <div className="relative">
        {content.products.map((product, i) => (
          <ProductBlock key={product.id} product={product} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
