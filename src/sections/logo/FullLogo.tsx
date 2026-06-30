import brand from '../../brand.config'
import { FullLogoSvg } from '../../components/ui/LogoSvg'
import ClearspaceDiagram from '../../components/ui/ClearspaceDiagram'

const t = brand.tokens
const base = import.meta.env.BASE_URL
const GRADIENT_FULL = `${base}images/logos/moxie-logo-full-dark-gradient.svg`

const DARK = t['dark-blue']   // deep teal logo for light backgrounds
const LIGHT = '#E2FEF7'        // Veil logo for dark / bright backgrounds

// Lead with the gradient logo on neutral / light backgrounds; solid elsewhere.
const combos: { bg: string; label: string; lbl: string; mark?: string; gradient?: boolean }[] = [
  { bg: '#FFFFFF',         label: 'White',      gradient: true, lbl: '#111' },
  { bg: '#E2FEF7',         label: 'Veil',       gradient: true, lbl: '#111' },
  { bg: '#C6E5DD',         label: 'Mist',       gradient: true, lbl: '#111' },
  { bg: t['green'],        label: 'Lime',       mark: DARK,  lbl: '#111' },
  { bg: t['fuscia'],       label: 'Aurora',     mark: DARK,  lbl: '#111' },
  { bg: t['primary-blue'], label: 'Dark teal',  mark: LIGHT, lbl: '#fff' },
  { bg: '#0090A4',         label: 'Light teal', mark: LIGHT, lbl: '#fff' },
  { bg: t['orange'],       label: 'Flare',      mark: DARK,  lbl: '#fff' },
  { bg: t['purple'],       label: 'Azure',      mark: DARK,  lbl: '#fff' },
  { bg: t['charcoal'],     label: 'Dusk',       mark: LIGHT, lbl: '#fff' },
]

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
        <a href="/downloads/brand-logos.zip" download className="dl-btn" style={{ marginTop: 0, marginBottom: 48 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download logos
        </a>

        {/* Clearspace */}
        <div className="content-block">
          <h3 style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 12px', color: '#111' }}>Clearspace</h3>
          <p style={{ fontFamily: "'Gellix', sans-serif", fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 24, maxWidth: 520 }}>
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
          <h3 style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 500, fontSize: 17, margin: '0 0 16px', color: '#111' }}>Approved color combinations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 0 }}>
          {combos.map(c => (
            <div key={c.label} style={{ background: c.bg, padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, aspectRatio: '4/3', justifyContent: 'center' }}>
              {c.gradient
                ? <img src={GRADIENT_FULL} alt={`${brand.meta.client} logo`} style={{ maxHeight: 40, width: 'auto', display: 'block' }} />
                : <FullLogoSvg markFill={c.mark} style={{ maxHeight: 40, width: 'auto' }} />}
              <span style={{ fontFamily: "'Gellix', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', color: c.lbl, textTransform: 'uppercase', opacity: 0.7 }}>{c.label}</span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}
