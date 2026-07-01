import brand from '../../brand.config'

const base = import.meta.env.BASE_URL
const heroPhoto = brand.images.photography[8] ?? brand.images.photography[0]

export default function PhotoIntro() {
  const client = brand.meta.client
  return (
    <div className="portrait-intro">
      <div style={{ display: 'flex', flexDirection: 'column', padding: 32, boxSizing: 'border-box' }}>
        <div className="section-label">Photography</div>
        <p style={{ fontFamily: 'Gellix, sans-serif', fontWeight: 700,
          fontSize: 'clamp(24px,3.2vw,48px)', lineHeight: 1.0, letterSpacing: '-0.02em',
          color: 'var(--charcoal)', maxWidth: 720, margin: '16px 0 0' }}>
          Photography that earns its place.
        </p>
        <div style={{ flex: 1 }} />
        <div style={{ maxWidth: 480 }}>
          <p style={{ fontFamily: 'Gellix, sans-serif', fontSize: 16, lineHeight: 1.4,
            color: 'var(--charcoal)', margin: 0 }}>
            {client} imagery should feel real and human. Favor candid teams at work,
            real environments, and clean product shots over staged stock. Photography builds
            trust by showing how the work actually gets done.
          </p>
        </div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={`${base}images/photography/${heroPhoto}`} alt=""
          style={{ position: 'absolute', bottom: 0, right: 0, width: '88%', height: '90%', objectFit: 'cover' }} />
      </div>
    </div>
  )
}
