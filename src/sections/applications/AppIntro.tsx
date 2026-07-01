import brand from '../../brand.config'

export default function AppIntro() {
  const client = brand.meta.client
  return (
    <div className="intro-layout">
      <div className="section-label">Applications</div>

      <p className="intro-statement">
        Every surface. Every scale.
      </p>

      <div className="intro-spacer" style={{ flex: 1 }} />

      <div className="intro-body">
        <p>
          The {client} brand is judged in its most everyday moments: a pitch deck slide,
          a reporting dashboard, a social ad, a conference booth. This section shows how the
          system holds up across collateral, digital media, and merchandise.
        </p>
      </div>
    </div>
  )
}
