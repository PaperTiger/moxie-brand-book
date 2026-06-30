import brand from '../../brand.config'
import { LogoMarkSvg } from '../../components/ui/LogoSvg'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'

const t = brand.tokens
const base = import.meta.env.BASE_URL
const GRADIENT_MARK = `${base}images/logos/moxie-logo-mark-gradient.svg`

const DARK = t['dark-blue']
const LIGHT = '#E2FEF7'

// The gradient mark is the lead version on neutral / light backgrounds.
// Solid marks are used where the gradient would lose contrast (bright or dark backgrounds).
const combos: { bg: string; label: string; lbl: string; mark?: string; gradient?: boolean }[] = [
  { bg: '#FFFFFF',         gradient: true, label: 'White',      lbl: '#111' },
  { bg: '#E2FEF7',         gradient: true, label: 'Veil',       lbl: '#111' },
  { bg: '#C6E5DD',         gradient: true, label: 'Mist',       lbl: '#111' },
  { bg: t['green'],        mark: DARK,     label: 'Lime',       lbl: '#111' },
  { bg: t['fuscia'],       mark: DARK,     label: 'Aurora',     lbl: '#111' },
  { bg: t['primary-blue'], mark: LIGHT,    label: 'Dark teal',  lbl: '#fff' },
  { bg: '#0090A4',         mark: LIGHT,    label: 'Light teal', lbl: '#fff' },
  { bg: t['orange'],       mark: LIGHT,    label: 'Flare',      lbl: '#fff' },
  { bg: t['purple'],       mark: LIGHT,    label: 'Azure',      lbl: '#fff' },
  { bg: t['charcoal'],     mark: LIGHT,    label: 'Dusk',       lbl: '#fff' },
]

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
          <h3 style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 12px', color: '#111' }}>Clearspace</h3>
          <p style={{ fontFamily: "'Gellix', sans-serif", fontSize: 14, color: '#111', lineHeight: 1.6, marginBottom: 24, maxWidth: 520 }}>
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
          <h3 style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 16px', color: '#111' }}>Approved color combinations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${combos.length}, 1fr)`, gap: 0 }}>
            {combos.map(c => (
              <div key={c.label} style={{ background: c.bg, padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, justifyContent: 'center', aspectRatio: '1' }}>
                {c.gradient
                  ? <img src={GRADIENT_MARK} alt={`${brand.meta.client} mark`} style={{ maxHeight: 80, width: 'auto', display: 'block' }} />
                  : <LogoMarkSvg markFill={c.mark} style={{ maxHeight: 80, width: 'auto' }} />}
                <span style={{ fontFamily: "'Gellix', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.lbl, textTransform: 'uppercase', opacity: 0.7 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
