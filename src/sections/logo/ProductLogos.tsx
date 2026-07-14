import brand from '../../brand.config'
import DownloadLogosButton from '../../components/ui/DownloadLogosButton'

const base = import.meta.env.BASE_URL

const productLogos = [
  { file: '360-logo.png',     label: 'Moxie 360° Diagnostic' },
  { file: 'AIMI.png',         label: 'Aimi by Moxie' },
  { file: 'manifold@2x.png',  label: 'Moxie Strategic Manifold' },
]

export default function ProductLogos() {
  return (
    <div className="page">
      <div className="section-label">Logo &amp; mark</div>
      <h2 className="section-title">Product logos</h2>
      <p className="section-intro">
        Approved logos for {brand.meta.client}'s proprietary tools and platforms. Use them as
        supplied, exactly as shown here.
      </p>

      <DownloadLogosButton
        label="Download all"
        zipSuffix="product-logos"
        folder="images/logos/product-logos/"
        files={productLogos.map(p => p.file)}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 0, border: '1px solid #E5E5E5' }}>
        {productLogos.map((p, i) => (
          <div key={p.file} style={{
            padding: '40px 32px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20,
            minHeight: 220,
            borderRight: (i + 1) % 3 !== 0 ? '1px solid #E5E5E5' : undefined,
            borderBottom: '1px solid #E5E5E5',
          }}>
            <img src={`${base}images/logos/product-logos/${p.file}`} alt={p.label}
              style={{ maxWidth: '100%', maxHeight: 80, width: 'auto', height: 'auto', display: 'block' }} />
            <span style={{ fontFamily: "'Gellix', sans-serif", fontSize: 12, color: '#005668', letterSpacing: '0.02em', textAlign: 'center' }}>{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
