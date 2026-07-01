import brand from '../../brand.config'
import { StackedLogoSvg } from '../../components/ui/LogoSvg'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'
import { resolveColorPairings } from '../../utils'

const base = import.meta.env.BASE_URL
const GRADIENT_STACKED = `${base}images/logos/moxie-logo-stacked-dark-gradient.svg`

// Approved pairings, sourced from brand.colorPairings (matches Figma exactly).
const combos = resolveColorPairings()

export default function StackedLogo() {
  return (
    <div>
      {/* Hero header — gradient logo on Mist */}
      <div className="logo-hero" style={{ background: '#C6E5DD', minHeight: 280 }}>
        <img src={GRADIENT_STACKED} alt={`${brand.meta.client} stacked logo`} style={{ maxHeight: 160, width: 'auto', display: 'block' }} />
      </div>

      <div className="page">
        <div className="section-label">Logo &amp; mark</div>
        <h2 className="section-title">Stacked logo</h2>
        <p className="section-intro">
          The stacked logo sets the wordmark beneath the mark for narrow, square, or centred formats:
          vertical layouts, profile images, and compositions where the horizontal lockup would shrink too far.
          Always use the supplied stacked artwork; never recreate the stacking yourself.
        </p>
        <a href="/downloads/brand-logos.zip" download className="dl-btn" style={{ marginTop: 0, marginBottom: 48 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download logos
        </a>

        {/* Clearspace */}
        <div className="content-block">
          <h3 style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 12px', color: '#005668' }}>Clearspace</h3>
          <p style={{ fontFamily: "'Gellix', sans-serif", fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 24, maxWidth: 520 }}>
            x equals ½ the height of the {brand.meta.client} mark. Maintain this distance on all four sides.
          </p>
          <ClearspaceDiagram
            logoSrc={GRADIENT_STACKED}
            logoAlt="Stacked logo clearspace"
            background="#E2FEF7"
            csX={75} logoMaxHeight={150}
            defLabel={`½ the height of the ${brand.meta.client} mark`}
          />
        </div>

        {/* Approved color combinations */}
        <div style={{ marginTop: 48, paddingTop: 0 }}>
          <h3 style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 16px', color: '#005668' }}>Approved color combinations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 0 }}>
            {combos.map(c => (
              <div key={c.bg} style={{ background: c.bgHex, padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
                {c.gradient
                  ? <img src={GRADIENT_STACKED} alt={`${brand.meta.client} stacked logo`} style={{ maxHeight: 80, width: 'auto', display: 'block' }} />
                  : <StackedLogoSvg markFill={c.textHex} style={{ maxHeight: 80, width: 'auto' }} />}
                <span style={{ fontFamily: "'Gellix', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.textHex, textTransform: 'uppercase', opacity: 0.7 }}>{c.bg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
