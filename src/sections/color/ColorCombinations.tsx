import { FullLogoSvg } from '../../components/ui/LogoSvg'
import { resolveColorPairings } from '../../utils'

const base = import.meta.env.BASE_URL
const GRADIENT_FULL = `${base}images/logos/moxie-logo-full-dark-gradient.svg`

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

function linearize(c: number) {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex)
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

function contrast(hex1: string, hex2: string) {
  const l1 = luminance(hex1)
  const l2 = luminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker  = Math.min(l1, l2)
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 10) / 10
}

const pairings = resolveColorPairings()

export default function ColorCombinations() {
  return (
    <>
      <div className="page" style={{ paddingBottom: 24 }}>
        <div className="section-label">Color</div>
        <h2 className="section-title">Combinations & accessibility</h2>
        <p className="section-intro" style={{ marginBottom: 0 }}>
          The approved background and text pairings, each with its live WCAG contrast ratio.
          AA requires 4.5:1 for body text, AAA requires 7:1. Pairings marked <strong>FAIL</strong>
          do not meet AA for body copy: reserve them for large display text, logos, or graphic
          accents, never small text.
        </p>
      </div>

      <div className="combos-grid">
        {pairings.map(p => {
          const bgHex = p.bgHex
          const fgHex = p.textHex
          const ratio = contrast(bgHex, fgHex)
          const aa  = ratio >= 4.5
          const aaa = ratio >= 7
          const level = aaa ? 'AAA' : aa ? 'AA' : 'FAIL'
          const fail = level === 'FAIL'

          return (
            <div key={`${p.bg}-${p.text}`} style={{
              background: bgHex,
              padding: 'clamp(20px, 2.5vw, 40px)',
              display: 'flex', flexDirection: 'column',
              minHeight: 'clamp(200px, 22vw, 300px)',
            }}>
              {/* Mist and Veil always use the full-color gradient logo; other pairings use the
                  solid logo tinted to the pairing's text colour so it matches the type. */}
              {p.gradient
                ? <img src={GRADIENT_FULL} alt="Moxie logo" style={{ width: '100%', maxWidth: 'clamp(80px, 9vw, 130px)', height: 'auto', display: 'block' }} />
                : <FullLogoSvg markFill={fgHex} style={{ width: '100%', maxWidth: 'clamp(80px, 9vw, 130px)', height: 'auto', display: 'block' }} />}

              <div style={{ flex: 1 }} />

              {/* Small text-on-background sample, sitting just above the label */}
              <span style={{
                fontFamily: "'Gellix', sans-serif", fontWeight: 700,
                fontSize: 'clamp(16px, 1.8vw, 24px)', lineHeight: 1, color: fgHex, marginBottom: 10,
              }}>Aa</span>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{
                  fontFamily: 'Gellix, sans-serif', fontSize: 11, fontWeight: 500,
                  color: fgHex, letterSpacing: '0.02em',
                }}>
                  {p.bg} / {p.text}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <span style={{
                    fontFamily: 'Gellix, sans-serif', fontSize: 9, fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: fail ? '#FFFFFF' : bgHex, background: fail ? '#D8392B' : fgHex,
                    padding: '3px 7px', borderRadius: 2,
                    display: 'flex', alignItems: 'center', gap: 3,
                  }}>
                    {fail ? (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M2 2l4 4M6 2L2 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M1.5 4L3.2 5.8L6.5 2.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {level}
                  </span>
                  <span style={{ fontFamily: 'Gellix, sans-serif', fontSize: 10, fontWeight: 500, color: fgHex }}>
                    {ratio}:1
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
