import brand from '../../brand.config'
import DownloadFullResButton from '../../components/ui/DownloadFullResButton'

const base = import.meta.env.BASE_URL

// Full-resolution originals live in public/images/half-moons-full/ with the same
// base name as their WebP display counterpart, e.g. moxie-pinwheel.png.
const FULL_RES_FILES = brand.images.halfMoons.map(f => f.replace(/\.webp$/, '.png'))

const ASSETS: Record<string, { label: string; note: string }> = {
  'blurred-half-moon.webp': { label: 'Blurred half-moon', note: 'Full-bleed background' },
  'moxie-array.webp':       { label: 'Array',             note: 'Accent' },
  'moxie-falling-moon.webp':{ label: 'Falling moon',      note: 'Accent' },
  'moxie-pinwheel.webp':    { label: 'Pinwheel',          note: 'Accent' },
}

export default function HalfMoons() {
  const halfMoons = brand.images.halfMoons

  return (
    <div className="page">
      <div className="section-label">Visual assets</div>
      <h2 className="section-title">Half-moons</h2>
      <p className="section-intro">
        Illustrated graphic elements built from the logo mark's half-circle motif. The blurred
        half-moon is a soft gradient wash: use it full-bleed as a background, with type set over
        it. The others are hard-edged and work as isolated accents alongside copy, not behind it.
      </p>

      <DownloadFullResButton
        files={FULL_RES_FILES}
        folder="images/half-moons-full/"
        zipSuffix="half-moons"
        assetLabel="half-moons"
        style={{ marginBottom: 32 }}
      />

      {/* Cells carry right+bottom borders and the container carries top+left, so the grid
          reads correctly at any column count auto-fill lands on. */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 0, borderTop: '1px solid #E5E5E5', borderLeft: '1px solid #E5E5E5', margin: '0 0 80px', overflow: 'hidden' }}>
        {halfMoons.map((f) => {
          const asset = ASSETS[f]
          return (
            <div key={f} style={{
              padding: '40px 32px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20,
              minHeight: 280,
              borderRight: '1px solid #E5E5E5',
              borderBottom: '1px solid #E5E5E5',
            }}>
              <img src={`${base}images/half-moons/${f}`} alt={`${brand.meta.client} ${asset?.label ?? f}`}
                style={{ maxWidth: '100%', maxHeight: 200, width: 'auto', height: 'auto', display: 'block' }} />
              <span style={{ fontFamily: "'Gellix', sans-serif", fontSize: 12, color: '#005668', letterSpacing: '0.02em', textAlign: 'center' }}>
                {asset?.label ?? f}
                {asset?.note && (
                  <span style={{ display: 'block', color: '#9AA5A8', marginTop: 4 }}>{asset.note}</span>
                )}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
