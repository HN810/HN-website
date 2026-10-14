'use client'

import { content } from '@/data/content'
import { Magnetic } from '@/components/ui/Magnetic'
import { ArrowUpRight } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line px-4 sm:px-6 lg:px-8" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="mx-auto max-w-[1280px]">
        <h2 className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] text-text">
          Let&apos;s build something.
        </h2>

        <Magnetic className="mt-10 inline-block">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(content.site.links.email)
              window.dispatchEvent(new CustomEvent('cursor:flash', { detail: 'Copied!' }))
            }}
            data-cursor
            data-cursor-label="Copy"
            className="group relative inline-block font-display text-[clamp(1.75rem,5vw,3.5rem)] text-text link-wipe"
          >
            {content.site.links.email}
          </button>
        </Magnetic>

        <div className="mt-10 flex flex-wrap gap-8 font-mono text-xs uppercase tracking-[0.12em]">
          <a
            href={content.site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            data-cursor-label="Open"
            className="inline-flex items-center gap-1 text-text-muted transition-colors hover:text-accent"
          >
            LinkedIn <ArrowUpRight size={14} />
          </a>
          <a
            href={content.site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            data-cursor-label="Open"
            className="inline-flex items-center gap-1 text-text-muted transition-colors hover:text-accent"
          >
            GitHub <ArrowUpRight size={14} />
          </a>
          <a
            href={content.site.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            data-cursor-label="Open"
            className="inline-flex items-center gap-1 text-text-muted transition-colors hover:text-accent"
          >
            Resume <ArrowUpRight size={14} />
          </a>
          <a
            href={content.site.links.calender}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            data-cursor-label="Open"
            className="inline-flex items-center gap-1 text-text-muted transition-colors hover:text-accent"
          >
            Calender <ArrowUpRight size={14} />
          </a>
        </div>

        <p className="mt-16 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-text-muted">
          © {year} {content.site.name}
        </p>
      </div>
    </footer>
  )
}
