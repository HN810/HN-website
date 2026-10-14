'use client'

import { content, type Project } from '@/data/content'
import { ProjectVisual, hasProjectVisual } from '@/components/project-visuals/ProjectVisual'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ArrowUpRight } from 'lucide-react'

function RepoPreview({ project }: { project: Project }) {
  const repo = project.links.github && project.links.github !== 'TODO'
    ? project.links.github.replace('https://github.com/', '')
    : null

  return (
    <div className="flex h-full flex-col justify-center gap-2 p-5 font-mono text-xs leading-relaxed text-text-muted">
      <p>
        <span className="text-accent">&gt;</span> project: {project.name}
      </p>
      {repo && (
        <p>
          <span className="text-accent">&gt;</span> repo: {repo}
        </p>
      )}
      <p>
        <span className="text-accent">&gt;</span> stack: {project.stack.join(', ')}
      </p>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const live = project.links.live && project.links.live !== 'TODO' ? project.links.live : null
  const github = project.links.github && project.links.github !== 'TODO' ? project.links.github : null

  return (
    <article className="group flex h-full flex-col rounded-xl border border-line bg-bg-elevated/40 p-6 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text/20 motion-reduce:hover:translate-y-0 sm:p-8">
      <div className="aspect-[16/9] overflow-hidden rounded-lg border border-line bg-bg">
        {hasProjectVisual(project.id) ? (
          <div className="h-full p-3">
            <ProjectVisual id={project.id} />
          </div>
        ) : (
          <RepoPreview project={project} />
        )}
      </div>

      <div className="mt-6 flex items-baseline gap-4">
        <span className="font-display text-4xl leading-none text-transparent [-webkit-text-stroke:1px_rgba(236,234,228,0.2)]">
          {project.index}
        </span>
        <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-tight text-text">
          <span className="link-wipe">{project.name}</span>
        </h3>
      </div>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
        {project.kind}
        {project.period ? ` · ${project.period}` : ''}
      </p>
      <p className="mt-4 text-[0.98rem] leading-[1.7] text-text-muted">{project.summary}</p>

      {project.highlights && (
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-text-muted transition-transform hover:-translate-y-0.5 hover:text-text"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.12em]">
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
    </article>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative px-4 sm:px-6 lg:px-8" style={{ paddingBottom: 'var(--section-py)' }}>
      <div className="mx-auto max-w-[1280px] pt-[var(--section-py)]">
        <div className="mb-16 h-px w-full bg-line" />
        <SectionLabel index="04">Projects</SectionLabel>
        <h2 className="mt-4 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-text">
          Other Projects I&apos;ve built
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {content.projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
