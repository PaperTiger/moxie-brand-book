import brand from '../../brand.config'

const base = import.meta.env.BASE_URL
const photos = brand.images.photography

export default function PhotoDonts() {
  const client = brand.meta.client
  const items = [
    { img: photos[6],  filter: "saturate(0.2) brightness(1.15)", caption: "Don't shoot desaturated, stylised imagery that strips the brand's warmth and character." },
    { img: photos[7],  filter: "brightness(1.6) contrast(1.1)", caption: "Avoid blown-out, over-exposed images that feel generic and lack a sense of place." },
    { img: photos[8],  filter: "hue-rotate(180deg) saturate(0.5)", caption: "Don't apply heavy color grading or filters that make images feel processed and inauthentic." },
    { img: "stock-handshake.webp", filter: "none", caption: `Avoid generic stock imagery that could belong to any brand. Use photography specific to ${client}.` },
    { img: photos[10], filter: "brightness(1.8) contrast(0.85) saturate(0.4)", caption: "Don't shoot from perspectives that make the brand feel abstract rather than lived-in." },
    { img: "stock-hands-unity.webp", filter: "none", caption: "Avoid clichéd, overly polished stock concepts (stacked hands, staged \"teamwork\") that feel generic rather than authentic." },
  ]
  return (
    <div className="photo-layout">
      <div>
        <div className="section-label" style={{ marginBottom: 20 }}>Photography</div>
        <h2 className="section-title" style={{ marginBottom: 24 }}>Don'ts</h2>
        <p style={{ fontFamily: "Gellix, sans-serif", fontSize: 14, color: '#005668', lineHeight: 1.65 }}>
          Avoid photography choices that undermine authenticity, flatten the brand character,
          or project an image that does not reflect the real {client}.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        {items.map((item, i) => (
          <div key={i} style={{ paddingBottom: 40 }}>
            <img src={`${base}images/photography/${item.img}`} alt="" style={{ width: "100%", height: 240, objectFit: "cover", display: "block", marginBottom: 14, filter: item.filter }} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 20, height: 20, background: "var(--orange)", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M18 6L6 18M6 6l12 12"/></svg>
              </div>
              <div style={{ fontFamily: "Gellix, sans-serif", fontSize: 13, color: "var(--charcoal)", lineHeight: 1.5 }}>{item.caption}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
