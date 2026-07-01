import brand from '../../brand.config'
import { FullLogoSvg } from '../../components/ui/LogoSvg'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'
import DownloadLogosButton from '../../components/ui/DownloadLogosButton'
import { resolveColorPairings } from '../../utils'

const base = import.meta.env.BASE_URL
const GRADIENT_FULL = `${base}images/logos/moxie-logo-full-dark-gradient.svg`

// Approved pairings, sourced from brand.colorPairings (matches Figma exactly).
const combos = resolveColorPairings()

export default function FullLogo() {
  return (
    <div>
      {/* Hero header — gradient logo on Mist */}
      <div className="logo-hero" style={{ background: '#C6E5DD' }}>
        <img src={GRADIENT_FULL} alt={`${brand.meta.client} logo`} style={{ maxHeight: 56, width: 'auto', display: 'block' }} />
      </div>

      <div className="page">
        <div className="section-label">Logo &amp; mark</div>
        <h2 className="section-title">Full logo</h2>
        <p className="section-intro">
          The full logo is the primary expression of the {brand.meta.client} identity: the mark and
          wordmark locked together. Use it as the default in most applications where the horizontal
          lockup has room to breathe.
        </p>
        <DownloadLogosButton />

        {/* Clearspace */}
        <div className="content-block">
          <h3 style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 12px', color: '#005668' }}>Clearspace</h3>
          <p style={{ fontFamily: "'Gellix', sans-serif", fontSize: 14, color: '#005668', lineHeight: 1.4, marginBottom: 24, maxWidth: 520 }}>
            Maintain a minimum clearspace of <strong>x</strong> on all sides, where x equals half the height of the {brand.meta.client} mark.
          </p>
          <ClearspaceDiagram
            logoSrc={GRADIENT_FULL}
            logoAlt={`${brand.meta.client} clearspace`}
            background="#E2FEF7"
            csX={34} logoMaxHeight={68}
            defLabel={`½ the height of the ${brand.meta.client} mark`}
          />
        </div>

        {/* Approved color combinations */}
        <div style={{ marginTop: 48, paddingTop: 0 }}>
          <h3 style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 16px', color: '#005668' }}>Approved color combinations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 0 }}>
          {combos.map(c => (
            <div key={c.bg} style={{ background: c.bgHex, padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, aspectRatio: '4/3', justifyContent: 'center' }}>
              {c.gradient
                ? <img src={GRADIENT_FULL} alt={`${brand.meta.client} logo`} style={{ maxHeight: 40, width: 'auto', display: 'block' }} />
                : <FullLogoSvg markFill={c.textHex} style={{ maxHeight: 40, width: 'auto' }} />}
              <span style={{ fontFamily: "'Gellix', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.textHex, textTransform: 'uppercase', opacity: 0.7 }}>{c.bg}</span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}
