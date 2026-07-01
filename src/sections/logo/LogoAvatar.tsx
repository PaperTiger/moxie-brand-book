import brand from '../../brand.config'
import { FullLogoSvg, LogoMarkSvg } from '../../components/ui/LogoSvg'

const t = brand.tokens
const VEIL = '#E2FEF7'
const DARK_TEAL = t['primary-blue']

const avatarBgs = [
  { bg: '#FFFFFF',         mark: DARK_TEAL, label: 'White',      outline: true },
  { bg: DARK_TEAL,         mark: VEIL,      label: 'Dark teal' },
  { bg: '#0090A4',         mark: VEIL,      label: 'Light teal' },
  { bg: t['dark-blue'],    mark: VEIL,      label: 'Logo dark' },
  { bg: '#36363B',         mark: VEIL,      label: 'Dusk' },
  { bg: t['orange'],       mark: VEIL,      label: 'Flare' },
  { bg: t['green'],        mark: DARK_TEAL, label: 'Lime' },
  { bg: t['fuscia'],       mark: DARK_TEAL, label: 'Aurora' },
  { bg: t['purple'],       mark: VEIL,      label: 'Azure' },
]

const faviconSizes = [64, 48, 32, 16]

export default function LogoAvatar() {
  return (
    <div className="page">
      <div className="section-label">Logo &amp; mark</div>
      <h2 className="section-title">Avatar &amp; favicon</h2>
      <p className="section-intro">
        Use the full logo for social avatars and profile images where there's enough width for
        the horizontal lockup to read clearly. Use the mark on its own for favicons and app icons
        where space is too small for any wordmark.
      </p>

      <a href="/downloads/brand-logos.zip" download className="dl-btn" style={{ marginTop: 0, marginBottom: 48 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download logos
      </a>

      <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 48, marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginBottom: 24 }}>
          <div className="section-label" style={{ marginBottom: 0 }}>Avatars: full logo</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 24, maxWidth: 820 }}>
          {avatarBgs.map(a => (
            <div key={a.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: "100%", aspectRatio: "1", borderRadius: "50%", background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", ...(a.outline ? { boxShadow: 'inset 0 0 0 1px #DADADA' } : {}) }}>
                <FullLogoSvg markFill={a.mark} style={{ width: "60%", height: "auto" }} />
              </div>
              <div style={{ fontSize: 11, color: '#005668', letterSpacing: "0.04em", fontFamily: "Gellix, sans-serif" }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 48, marginBottom: 80 }}>
        <div style={{ marginBottom: 24 }}>
          <div className="section-label" style={{ marginBottom: 0 }}>Favicons: mark</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 760 }}>
          <div>
            <div style={{ fontSize: 11, color: '#005668', letterSpacing: "0.04em", marginBottom: 16, fontFamily: "Gellix, sans-serif" }}>On light</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}>
              {faviconSizes.map(size => (
                <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  <div style={{ width: size, height: size, background: "#FFFFFF", border: "1px solid #E5E5E5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <LogoMarkSvg markFill={t['dark-blue']} style={{ width: "80%", height: "80%" }} />
                  </div>
                  <div style={{ fontSize: 10, color: '#005668', fontFamily: "Gellix, sans-serif" }}>{size}px</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#005668', letterSpacing: "0.04em", marginBottom: 16, fontFamily: "Gellix, sans-serif" }}>On dark</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}>
              {faviconSizes.map(size => (
                <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  <div style={{ width: size, height: size, background: "#000000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <LogoMarkSvg markFill="#fff" style={{ width: "80%", height: "80%" }} />
                  </div>
                  <div style={{ fontSize: 10, color: '#005668', fontFamily: "Gellix, sans-serif" }}>{size}px</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
