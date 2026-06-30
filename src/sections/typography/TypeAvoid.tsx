import brand from '../../brand.config'

const df = brand.typography.displayFont
const bf = brand.typography.bodyFont

export default function TypeAvoid() {
  const avoidItems: { label: string; demo?: string; style: React.CSSProperties }[] = [
    { label: "Don't use Queens Condensed for large headings. Use Gellix only.", style: { fontFamily: `'Queens Condensed', serif`, fontWeight: 400, fontSize: 44, letterSpacing: 0 } },
    { label: "Don't use ultra-tight letter-spacing on body text.",     style: { fontFamily: `${bf}, sans-serif`, fontSize: 16, letterSpacing: '-0.1em' } },
    { label: "Don't use very loose tracking on display text.",         style: { fontFamily: `${df}, sans-serif`, fontWeight: 300, fontSize: 28, letterSpacing: '0.2em' } },
    { label: "Don't set body copy in all caps.",                       style: { fontFamily: `${bf}, sans-serif`, fontSize: 16, textTransform: 'uppercase' as const } },
    { label: "Don't use line-height below 1 on multi-line text.",      demo: brand.specimens.body14, style: { fontFamily: `${bf}, sans-serif`, fontSize: 18, lineHeight: 0.72, maxWidth: 440 } },
  ]
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">What to avoid</h2>
      <p className="section-intro">
        These typographic errors undermine legibility, brand consistency, and the
        overall quality of communications.
      </p>
      <div style={{ borderTop: '1px solid #E5E5E5' }}>
        {avoidItems.map(item => (
          <div key={item.label} style={{ padding: '28px 0', borderBottom: '1px solid #E5E5E5' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FFF0F0', padding: '2px 8px', borderRadius: 3, marginBottom: 14 }}>
              <span style={{ color: '#FF3B3B', fontFamily: `${bf}, sans-serif`, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>DON'T</span>
            </div>
            <div style={{ ...item.style, color: 'var(--charcoal)', marginBottom: 10 }}>{item.demo ?? brand.specimens.avoidText}</div>
            <div style={{ fontFamily: `${bf}, sans-serif`, fontSize: 12, color: '#005668' }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
