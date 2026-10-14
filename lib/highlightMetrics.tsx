const METRIC_RE =
  /(\d{1,3}\+%|\d+\+\s*FPS|~\s*\d+%|\dK\+|\d,\d{3}\+|\d+\+\s*FPS|\d+%|\d+\+)/gi

export function highlightMetrics(text: string) {
  const segments: React.ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  const re = new RegExp(METRIC_RE.source, 'gi')

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) segments.push(text.slice(last, match.index))
    segments.push(
      <span key={`${match.index}-${match[0]}`} className="text-accent">
        {match[0]}
      </span>,
    )
    last = match.index + match[0].length
  }

  if (last < text.length) segments.push(text.slice(last))
  return segments
}
