import brand from '../../brand.config'
import FontOverview from './FontOverview'

const df = brand.typography.displayFont

export default function TypeOverview() {
  return (
    <FontOverview family={df} displayWeight={700} alphaWeight={500} description={
      <>
        <p style={{ margin: '0 0 14px' }}>
          {df} is a low-contrast geometric sans-serif built for on-screen readability. Its clean,
          neutral structure gives {brand.meta.client} headlines presence without shouting: modern,
          technical, and approachable.
        </p>
        <p style={{ margin: 0 }}>
          {df} is the primary typeface and carries display, headline, label, and body across every
          {' '}{brand.meta.client} surface. Pair it with Queens Condensed for editorial accents.
        </p>
      </>
    } />
  )
}
