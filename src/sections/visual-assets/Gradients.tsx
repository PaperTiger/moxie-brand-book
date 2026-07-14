import brand from '../../brand.config'
import DownloadFullResButton from '../../components/ui/DownloadFullResButton'

const base = import.meta.env.BASE_URL

// Full-resolution originals live in public/images/gradients-full/ with the same
// base name as their WebP display counterpart, e.g. moxie-gradient-01.jpg.
const FULL_RES_FILES = brand.images.gradients.map(f => f.replace(/\.webp$/, '.jpg'))

export default function Gradients() {
  const { client } = brand.meta
  const gradients = brand.images.gradients

  return (
    <div className="page">
      <div className="section-label">Visual assets</div>
      <h2 className="section-title">Gradients</h2>
      <p className="section-intro">
        A library of approved mesh gradients drawn from the primary and secondary palette. Use
        them as full-bleed backgrounds behind the logo, headlines, or photography: never as a
        background for dense body copy, where they compete with legibility.
      </p>

      <img src={`${base}images/gradient-reference.png`} alt={`${client} gradient color reference`}
        style={{ width: '100%', height: 'auto', display: 'block', marginBottom: 12, maxWidth: 900 }} />
      <p style={{ fontFamily: 'Gellix, sans-serif', fontSize: 12, color: '#005668', margin: '0 0 32px' }}>
        Reference: linear gradient recipes built from the primary and secondary palette, for
        rebuilding these gradients in Figma, Photoshop, or CSS.
      </p>

      <DownloadFullResButton
        files={FULL_RES_FILES}
        folder="images/gradients-full/"
        zipSuffix="gradients"
        assetLabel="gradients"
        style={{ marginBottom: 32 }}
      />

      <div className="app-examples-grid" style={{ margin: '0 0 80px' }}>
        {gradients.map(f => (
          <img key={f} src={`${base}images/gradients/${f}`} alt={`${client} gradient`}
            style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '16 / 9', objectFit: 'cover' }} />
        ))}
      </div>
    </div>
  )
}
