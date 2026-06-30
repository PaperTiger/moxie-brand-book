import brand from '../../brand.config'

const sc = brand.typeScale

// Each usage role references the type scale entry that defines its face, weight + letter-spacing
const displayEntry   = sc.find(s => s.name === 'Display L')!     // Gellix Bold
const sectionEntry   = sc.find(s => s.name === 'Headline XL')!   // Gellix Bold
const editorialEntry = sc.find(s => s.name === 'Headline L')!    // Queens Condensed
const bodyXLEntry    = sc.find(s => s.name === 'Body XL')!       // Gellix Medium
const bodyLEntry     = sc.find(s => s.name === 'Body L')!        // Gellix Medium

const rows = [
  {
    role: 'Display headline',
    face: displayEntry.family, weight: 'Bold',
    specs: `48 – 96 px · ${displayEntry.ls} tracking · 90% leading · Sentence case`,
    ex: (
      <div style={{ fontFamily: `'${displayEntry.family}', sans-serif`, fontWeight: displayEntry.weight, fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 0.9, letterSpacing: displayEntry.ls, color: 'var(--charcoal)' }}>
        Prominent headline<br/>to describe a message.
      </div>
    ),
  },
  {
    role: 'Section headline',
    face: sectionEntry.family, weight: 'Bold',
    specs: `21 – 42 px · ${sectionEntry.ls} tracking · 100% leading · Sentence case`,
    ex: (
      <div style={{ fontFamily: `'${sectionEntry.family}', sans-serif`, fontWeight: sectionEntry.weight, fontSize: 'clamp(20px, 3.5vw, 40px)', lineHeight: 1, letterSpacing: sectionEntry.ls, color: 'var(--charcoal)' }}>
        Concise subtitle to offer<br/>additional insight.
      </div>
    ),
  },
  {
    role: 'Editorial headline',
    face: editorialEntry.family, weight: 'Regular',
    specs: `24 – 32 px · 0 tracking · 110% leading · Sentence case`,
    ex: (
      <div style={{ fontFamily: `'${editorialEntry.family}', serif`, fontWeight: editorialEntry.weight, fontSize: 'clamp(22px, 3.2vw, 32px)', lineHeight: 1.1, letterSpacing: editorialEntry.ls, color: 'var(--charcoal)' }}>
        Attribution &amp; reporting<br/>that proves the results.
      </div>
    ),
  },
  {
    role: 'Eyebrow / label',
    face: 'Gellix', weight: 'SemiBold',
    specs: '10 – 12 px · +8% tracking · 100% leading · UPPERCASE',
    ex: (
      <div style={{ fontFamily: 'Gellix, sans-serif', fontWeight: 600, fontSize: 13, lineHeight: 1, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--charcoal)' }}>
        Section label / eyebrow text
      </div>
    ),
  },
  {
    role: 'Body copy large',
    face: bodyXLEntry.family, weight: 'Medium',
    specs: `18 px · ${bodyXLEntry.ls} tracking · 120% leading · Sentence case`,
    ex: (
      <div style={{ fontFamily: `${bodyXLEntry.family}, sans-serif`, fontWeight: bodyXLEntry.weight, fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.4, letterSpacing: bodyXLEntry.ls, color: 'var(--charcoal)', maxWidth: 560 }}>
        {brand.specimens.body18}
      </div>
    ),
  },
  {
    role: 'Body copy',
    face: bodyLEntry.family, weight: 'Medium',
    specs: `16 px · ${bodyLEntry.ls} tracking · 140% leading · Sentence case`,
    ex: (
      <div style={{ fontFamily: `${bodyLEntry.family}, sans-serif`, fontWeight: bodyLEntry.weight, fontSize: 'clamp(14px,1.2vw,16px)', lineHeight: 1.4, letterSpacing: bodyLEntry.ls, color: 'var(--charcoal)', maxWidth: 560 }}>
        {brand.specimens.body16}
      </div>
    ),
  },
]

export default function TypeUsage() {
  return (
    <div className="page">
      <div className="section-label">Typography</div>
      <h2 className="section-title">Typographic usage</h2>
      <p className="section-intro" style={{ maxWidth: 640 }}>
        Display and section headlines are set in <strong>Gellix Bold</strong>. Selected editorial
        headlines use <strong>Queens Condensed</strong> for contrast. Eyebrow labels and body copy
        are set in <strong>Gellix Medium</strong>. Each role maps to a specific typeface, weight,
        size range, tracking, and leading. Mixing roles undermines hierarchy.
      </p>

      {rows.map((row) => (
        <div key={row.role} style={{ borderTop: '1px solid #E5E5E5', paddingTop: 28, paddingBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{ fontFamily: 'Gellix, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--charcoal)' }}>
              {row.role}
            </div>
            <div style={{ fontFamily: 'Gellix, sans-serif', fontSize: 12, color: '#005668', letterSpacing: '0.01em' }}>
              {row.face} · {row.weight} · {row.specs}
            </div>
          </div>
          {row.ex}
        </div>
      ))}
    </div>
  )
}
