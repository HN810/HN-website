'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

const RING_FOLLOW = 0.35

export function Cursor() {
  const reduced = useReducedMotion()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')
  const [flash, setFlash] = useState('')

  useEffect(() => {
    if (reduced) return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const isNarrow = window.innerWidth < 768
    if (isTouch || isNarrow) return

    document.documentElement.classList.add('custom-cursor')

    const target = { x: 0, y: 0 }
    const ring = { x: 0, y: 0 }
    let started = false
    let raf = 0

    const tick = () => {
      ring.x += (target.x - ring.x) * RING_FOLLOW
      ring.y += (target.y - ring.y) * RING_FOLLOW
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!started) {
        ring.x = target.x
        ring.y = target.y
        started = true
        setVisible(true)
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      }
    }

    const onOver = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a, button, [data-cursor]')
      setHover(Boolean(link))
      setLabel(link?.getAttribute('data-cursor-label') || '')
    }

    let flashTimer: ReturnType<typeof setTimeout> | undefined
    const onFlash = (e: Event) => {
      setFlash((e as CustomEvent<string>).detail)
      clearTimeout(flashTimer)
      flashTimer = setTimeout(() => setFlash(''), 1500)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => {
      if (started) setVisible(true)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    window.addEventListener('cursor:flash', onFlash)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('cursor:flash', onFlash)
      clearTimeout(flashTimer)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [reduced])

  if (reduced) return null

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[200] hidden transition-opacity duration-200 md:block ${
          visible && !flash ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden
      >
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </div>
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[199] hidden transition-opacity duration-200 md:block ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden
      >
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            flash
              ? 'h-16 w-16 border-accent bg-accent'
              : hover
                ? 'h-14 w-14 border-accent/40 bg-accent/5'
                : 'h-8 w-8 border-line'
          }`}
        >
          {flash ? (
            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-bg">{flash}</span>
          ) : (
            hover &&
            label && <span className="font-mono text-[0.65rem] uppercase tracking-wider text-accent">{label}</span>
          )}
        </div>
      </div>
    </>
  )
}
