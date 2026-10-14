'use client'

import { content } from '@/data/content'
import { scrollToSection } from '@/components/SmoothScroll'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const sectionIds = content.nav.map((n) => n.target.replace('#', ''))

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(sectionIds[0])
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      const line = window.innerHeight * 0.4
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (target: string) => {
    setOpen(false)
    scrollToSection(target)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${
        scrolled ? 'border-b border-line bg-bg/75 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
        aria-hidden
      />
      <nav
        className="mx-auto flex h-[var(--nav-height)] max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <button
          type="button"
          onClick={() => scrollToSection('#about')}
          className="font-mono text-sm tracking-[0.2em] text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          HN
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {content.nav.map((item) => {
            const id = item.target.replace('#', '')
            const isActive = active === id
            return (
              <button
                key={item.target}
                type="button"
                onClick={() => go(item.target)}
                aria-current={isActive ? 'true' : undefined}
                className="relative font-mono text-xs uppercase tracking-[0.12em] text-text-muted transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-px w-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
          <a
            href={content.site.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            data-cursor-label="Open"
            className="rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          className="font-mono text-xs uppercase tracking-wider text-text md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 bg-bg/95 backdrop-blur-lg md:hidden"
          >
            {content.nav.map((item, i) => (
              <motion.button
                key={item.target}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => go(item.target)}
                className="font-display text-4xl text-text"
              >
                {item.label}
              </motion.button>
            ))}
            <a
              href={content.site.links.resume}
              className="font-mono text-sm uppercase tracking-[0.15em] text-accent"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
