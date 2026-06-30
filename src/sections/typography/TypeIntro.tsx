import brand from '../../brand.config'

const df = brand.typography.displayFont   // Gellix — primary
const accent = 'Queens Condensed'          // condensed editorial accent

export default function TypeIntro() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">Introduction</h2>
      <p className="section-intro">
        {brand.meta.client} uses two typefaces. {df} is the primary typeface for display, headlines,
        body, and UI text. {accent} sets several editorial headline styles, adding high-contrast
        condensed character alongside {df}.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 48 }}>
        <div style={{ background: 'var(--charcoal)', padding: '40px 36px' }}>
          <div style={{ fontFamily: `'${df}', sans-serif`, fontWeight: 700, fontSize: 'clamp(40px,6vw,72px)', letterSpacing: '-0.04em', color: '#fff', lineHeight: 0.9, marginBottom: 24 }}>Aa</div>
          <div style={{ fontFamily: `${df}, sans-serif`, fontSize: 11, color: '#A9D6CC', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Primary typeface</div>
          <div style={{ fontFamily: `'${df}', sans-serif`, fontSize: 24, fontWeight: 600, color: '#fff' }}>{df}</div>
        </div>
        <div style={{ background: '#F8F8F8', padding: '40px 36px' }}>
          <div style={{ fontFamily: `'${accent}', sans-serif`, fontWeight: 400, fontSize: 'clamp(40px,6vw,72px)', color: 'var(--charcoal)', lineHeight: 0.9, marginBottom: 24 }}>Aa</div>
          <div style={{ fontFamily: `${df}, sans-serif`, fontSize: 11, color: '#4D4D4D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Editorial headlines</div>
          <div style={{ fontFamily: `'${accent}', sans-serif`, fontSize: 24, fontWeight: 400, color: 'var(--charcoal)' }}>{accent}</div>
        </div>
      </div>
      <p style={{ fontFamily: `${df}, sans-serif`, fontSize: 15, lineHeight: 1.7, color: 'var(--charcoal)', maxWidth: 560 }}>
        Never substitute another typeface without approval. This pairing is chosen for on-screen
        legibility, brand consistency, and technical availability across all platforms.
      </p>
    </div>
  )
}
