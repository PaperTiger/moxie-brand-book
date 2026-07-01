import brand from '../../brand.config'
import { FullLogoSvg, LogoMarkSvg } from '../../components/ui/LogoSvg'
import DownloadLogosButton from '../../components/ui/DownloadLogosButton'

const t = brand.tokens
const base = import.meta.env.BASE_URL
const GRADIENT_FULL = `${base}images/logos/moxie-logo-full-dark-gradient.svg`
const GRADIENT_MARK = `${base}images/logos/moxie-logo-mark-gradient.svg`

const VEIL = '#E2FEF7'
const DARK_TEAL = t['primary-blue']

// White, Mist, and Veil lead with the gradient logo; solid marks elsewhere for contrast.
const avatarBgs: { bg: string; label: string; mark?: string; gradient?: boolean; outline?: boolean }[] = [
  { bg: '#FFFFFF',         label: 'White',      gradient: true, outline: true },
  { bg: '#C6E5DD',         label: 'Mist',       gradient: true },
  { bg: VEIL,               label: 'Veil',       gradient: true },
  { bg: DARK_TEAL,         label: 'Dark teal',  mark: VEIL },
  { bg: '#0090A4',         label: 'Light teal', mark: VEIL },
  { bg: t['dark-blue'],    label: 'Logo dark',  mark: VEIL },
  { bg: t['orange'],       label: 'Flare',      mark: VEIL },
  { bg: t['green'],        label: 'Lime',       mark: DARK_TEAL },
  { bg: t['fuscia'],       label: 'Aurora',     mark: DARK_TEAL },
  { bg: t['purple'],       label: 'Azure',      mark: VEIL },
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

      <DownloadLogosButton
        label="Download assets"
        zipSuffix="avatar-favicon-assets"
        files={[
          'moxie-logo-full-dark.svg',
          'moxie-logo-full-light.svg',
          'moxie-logo-full-dark-gradient.svg',
          'moxie-logo-mark-dark.svg',
          'moxie-logo-mark-light.svg',
          'moxie-logo-mark-gradient.svg',
        ]}
      />

      <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: 48, marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginBottom: 24 }}>
          <div className="section-label" style={{ marginBottom: 0 }}>Avatars: full logo</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 24, maxWidth: 820 }}>
          {avatarBgs.map(a => (
            <div key={a.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: "100%", aspectRatio: "1", borderRadius: "50%", background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", ...(a.outline ? { boxShadow: 'inset 0 0 0 1px #DADADA' } : {}) }}>
                {a.gradient
                  ? <img src={GRADIENT_FULL} alt={`${brand.meta.client} logo`} style={{ width: "70%", height: "auto", display: "block" }} />
                  : <FullLogoSvg markFill={a.mark} style={{ width: "70%", height: "auto" }} />}
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
                    <img src={GRADIENT_MARK} alt={`${brand.meta.client} mark`} style={{ width: "80%", height: "80%", display: "block" }} />
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
