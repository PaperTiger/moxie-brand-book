import brand from '../../brand.config'

const base = import.meta.env.BASE_URL
const photos = brand.images.photography

export default function PhotoDos() {
  const items = [
    { img: photos[0], caption: "Shoot organic compositions where the subject does not feel staged." },
    { img: photos[1], caption: "Play with light and shadow to create visual interest and depth." },
    { img: photos[2], caption: "Rich and warm color tones make photography feel human and approachable." },
    { img: photos[13], caption: "Capture real moments of collaboration and problem-solving at work." },
    { img: photos[14], caption: "Show people in the real Moxie space, with the brand present in the environment." },
    { img: photos[15], caption: "Use real Moxie environments: the studio, the office, the rooms where the work happens." },
  ]
  return (
    <div className="photo-layout">
      <div>
        <div className="section-label" style={{ marginBottom: 20 }}>Photography</div>
        <h2 className="section-title" style={{ marginBottom: 24 }}>Dos</h2>
        <p style={{ fontFamily: "Gellix, sans-serif", fontSize: 14, color: '#005668', lineHeight: 1.4 }}>
          These are guiding principles when creating photography assets, a starting point for
          shooting imagery used in print or digital collateral.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        {items.map((item, i) => (
          <div key={i} style={{ paddingBottom: 40 }}>
            <img src={`${base}images/photography/${item.img}`} alt="" style={{ width: "100%", height: 240, objectFit: "cover", display: "block", marginBottom: 14 }} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 20, height: 20, background: "var(--dark-blue)", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div style={{ fontFamily: "Gellix, sans-serif", fontSize: 13, color: "var(--charcoal)", lineHeight: 1.5 }}>{item.caption}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
