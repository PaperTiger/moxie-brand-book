import brand from '../../brand.config'
import FontOverview from './FontOverview'

export default function TypeOverviewQueens() {
  return (
    <FontOverview family="Queens Condensed" displayWeight={400} alphaWeight={400}
      displayClamp="clamp(40px,17cqi,140px)" displayWrap description={
      <>
        <p style={{ margin: '0 0 14px' }}>
          Queens Condensed is a high-contrast condensed typeface for bold editorial headlines and
          statement moments. Its narrow proportions add energy and personality to {brand.meta.client}
          {' '}layouts.
        </p>
        <p style={{ margin: 0 }}>
          Queens Condensed sets several headline styles (Headline L and Headline M) alongside Gellix.
          Use it for headlines and pull quotes, never for body copy or UI text.
        </p>
      </>
    } />
  )
}
