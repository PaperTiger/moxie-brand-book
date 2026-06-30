import brand from '../../brand.config'
import ColorSwatch from '../../components/ui/ColorSwatch'

export default function TertiaryPalette() {
  return (
    <>
      <div className="page" style={{ paddingBottom: 24 }}>
        <div className="section-label">Color</div>
        <h2 className="section-title">Tertiary palette</h2>
        <p className="section-intro" style={{ marginBottom: 0 }}>
          Tertiary colors are the neutral foundation: backgrounds, surfaces, text, and UI structure.
          They keep the primary and secondary palettes legible and let them lead.
        </p>
      </div>
      <div className="palette-grid palette-grid--secondary">
        {brand.colors.tertiary.map(color => (
          <ColorSwatch key={color.hex} color={color} />
        ))}
      </div>
    </>
  )
}
