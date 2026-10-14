'use client'

import { content } from '@/data/content'
import { Marquee } from '@/components/ui/Marquee'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/ui/Reveal'

const allSkills = content.skills.groups.flatMap((g) => g.items)

export function Skills() {
  return (
    <section id="skills" className="px-4 sm:px-6 lg:px-8" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16 h-px w-full bg-line" />
        <SectionLabel index="05">Skills</SectionLabel>
        <h2 className="mt-4 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-text">
          Toolbox
        </h2>
      </div>

      <div className="mt-12 space-y-4">
        <Marquee items={allSkills} />
        <Marquee items={[...allSkills].reverse()} reverse />
      </div>

      <div className="mx-auto mt-16 max-w-[1280px] space-y-8 px-4 sm:px-6 lg:px-8">
        {content.skills.groups.map((group, i) => (
          <Reveal key={group.name} delay={i * 0.05}>
            <div className="border-b border-line pb-6">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">{group.name}</p>
              <p className="mt-3 text-[1.05rem] leading-[1.9] text-text">
                {group.items.map((item, j) => (
                  <span key={item}>
                    <span className="transition-colors hover:text-accent">{item}</span>
                    {j < group.items.length - 1 && (
                      <span className="text-text-muted"> / </span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.2}>
          <p className="inline-flex rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-text-muted">
            {content.skills.certifications[0]}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
