import brand from '../../brand.config'

export default function TypeScale() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">Size & scale</h2>
      <p className="section-intro">
        The complete type scale: sizes, weights, letter-spacing, and line-height for every level.
      </p>
      <div style={{ borderTop: '1px solid #E5E5E5' }}>
        {brand.typeScale.map(s => (
          <div key={s.name} style={{ display: 'grid', gridTemplateColumns: '80px 200px 1fr', gap: 16, padding: '16px 0', borderBottom: '1px solid #E5E5E5', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Gellix, sans-serif', fontSize: 11, color: '#005668' }}>{s.size}</div>
            <div style={{ fontFamily: 'Gellix, sans-serif', fontSize: 11, color: '#005668' }}>{s.name} · {s.family} {s.weight}</div>
            <div style={{ fontFamily: s.family + ', sans-serif', fontWeight: s.weight, fontSize: `clamp(14px, ${s.size}, ${s.size})`, letterSpacing: s.ls, color: 'var(--charcoal)', lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {brand.specimens.display96}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
