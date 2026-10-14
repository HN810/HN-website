'use client'

import { MedflowDiagram } from './MedflowDiagram'
import { KeystrokeWaveform } from './KeystrokeWaveform'
import { UavLandingVisual } from './UavLandingVisual'
import { CkdForestVisual } from './CkdForestVisual'
import { SignLanguageVisual } from './SignLanguageVisual'
import { ImageSearchVisual } from './ImageSearchVisual'

const VISUALS: Record<string, () => React.JSX.Element> = {
  medflow: MedflowDiagram,
  cogd: KeystrokeWaveform,
  'uav-landing': UavLandingVisual,
  'ckd-predictor': CkdForestVisual,
  'sign-language': SignLanguageVisual,
  'semantic-image-search': ImageSearchVisual,
}

export function hasProjectVisual(id: string) {
  return id in VISUALS
}

export function ProjectVisual({ id }: { id: string }) {
  const Visual = VISUALS[id]
  return Visual ? <Visual /> : null
}
