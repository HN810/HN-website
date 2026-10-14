'use client'

import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    ;(window as Window & { __lenis?: Lenis }).__lenis = lenis

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      delete (window as Window & { __lenis?: Lenis }).__lenis
    }
  }, [reduced])

  return <>{children}</>
}

export function scrollToSection(target: string) {
  const el = document.querySelector(target)
  const lenis = (window as Window & { __lenis?: Lenis }).__lenis
  if (lenis && el) {
    lenis.scrollTo(el as HTMLElement, { duration: 1.2 })
  } else {
    el?.scrollIntoView({ behavior: 'smooth' })
  }
}
