import brand from '../../brand.config'
import { LogoMarkSvg } from '../../components/ui/LogoSvg'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'
import { resolveColorPairings } from '../../utils'

const base = import.meta.env.BASE_URL
const GRADIENT_MARK = `${base}images/logos/moxie-logo-mark-gradient.svg`

// Approved pairings, sourced from brand.colorPairings (matches Figma exactly).
// The gradient mark leads on neutral / light backgrounds; solid marks elsewhere.
const combos = resolveColorPairings()

export default function LogoMark() {
  return (
    <div>
      {/* Hero header — gradient mark on Mist */}
      <div className="logo-hero" style={{ background: '#C6E5DD', minHeight: 280 }}>
        <img src={GRADIENT_MARK} alt={`${brand.meta.client} mark`} style={{ maxHeight: 120, width: 'auto', display: 'block' }} />
      </div>

      <div className="page">
        <div className="section-label">Logo &amp; mark</div>
        <h2 className="section-title">Logo mark</h2>
        <p className="section-intro">
          The mark is the {brand.meta.client} symbol on its own. Use it where the brand is already
          established or space is too tight for the full logo: favicons, app icons, social avatars,
          loading states, and graphic accents on covers and dividers.
        </p>
        <a href="/downloads/brand-logos.zip" download className="dl-btn" style={{ marginTop: 0, marginBottom: 48 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download logos
        </a>

        {/* Clearspace */}
        <div className="content-block">
          <h3 style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 12px', color: '#005668' }}>Clearspace</h3>
          <p style={{ fontFamily: "'Gellix', sans-serif", fontSize: 14, color: '#005668', lineHeight: 1.4, marginBottom: 24, maxWidth: 520 }}>
            x equals ½ the height of the {brand.meta.client} mark. Maintain this distance on all four sides.
          </p>
          <ClearspaceDiagram
            logoSrc={GRADIENT_MARK}
            logoAlt="Logo mark clearspace"
            background="#E2FEF7"
            csX={75} logoMaxHeight={150}
            defLabel={`½ the height of the ${brand.meta.client} mark`}
          />
        </div>

        {/* Approved color combinations */}
        <div style={{ marginTop: 48, paddingTop: 0 }}>
          <h3 style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 16px', color: '#005668' }}>Approved color combinations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 0 }}>
            {combos.map(c => (
              <div key={c.bg} style={{ background: c.bgHex, padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, justifyContent: 'center', aspectRatio: '1' }}>
                {c.gradient
                  ? <img src={GRADIENT_MARK} alt={`${brand.meta.client} mark`} style={{ maxHeight: 80, width: 'auto', display: 'block' }} />
                  : <LogoMarkSvg markFill={c.textHex} style={{ maxHeight: 80, width: 'auto' }} />}
                <span style={{ fontFamily: "'Gellix', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.textHex, textTransform: 'uppercase', opacity: 0.7 }}>{c.bg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
