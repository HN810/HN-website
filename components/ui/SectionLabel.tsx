interface SectionLabelProps {
  index: string
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ index, children, className = '' }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-[0.75rem] uppercase tracking-[0.12em] text-text-muted ${className}`}
    >
      <span className="text-accent">({index})</span> {children}
    </p>
  )
}
