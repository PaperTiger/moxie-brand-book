import { useState } from 'react'
import type { ReactNode } from 'react'
import JSZip from 'jszip'
import brand, { darkestPrimary, lightestPrimary } from '../../brand.config'

const bf = brand.typography.bodyFont

async function downloadFontZip(family: string) {
  const zip = new JSZip()
  const fonts = brand.typography.fonts.filter(f => f.family === family)
  const base = import.meta.env.BASE_URL
  await Promise.all(fonts.map(async (f) => {
    const url = f.file.startsWith('http') ? f.file : `${base}${f.file.replace(/^\//, '')}`
    const resp = await fetch(url)
    if (!resp.ok) throw new Error(`Failed to fetch ${f.file}`)
    const blob = await resp.blob()
    zip.file(f.file.split('/').pop() ?? 'font', blob)
  }))
  const zipBlob = await zip.generateAsync({ type: 'blob' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(zipBlob)
  a.download = `${family.replace(/\s+/g, '-')}-fonts.zip`
  a.click()
  URL.revokeObjectURL(a.href)
}

interface Props {
  family: string          // font family to showcase + download
  displayWeight: number   // weight for the large specimen
  alphaWeight?: number    // weight for the uppercase alphabet row
  description: ReactNode   // left-column copy (rendered in the body font)
  displayClamp?: string   // font-size clamp for the large name specimen
  displayWrap?: boolean   // allow the large name to wrap (for long names)
}

export default function FontOverview({
  family, displayWeight, alphaWeight = 400, description,
  displayClamp = 'clamp(40px,22cqi,190px)', displayWrap = false,
}: Props) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await downloadFontZip(family)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="fg-overview" style={{ background: darkestPrimary.hex, color: lightestPrimary.hex }}>
      {/* Left col — description in the body font */}
      <div style={{ fontFamily: `${bf}, sans-serif`, fontSize: 14, lineHeight: 1.55, color: 'var(--fg-overview-text)', alignSelf: 'start' }}>
        {description}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
          <button onClick={handleDownload} disabled={downloading} className="dl-btn" style={{ background: 'var(--fg-overview-text)', color: 'var(--fg-overview-bg)', marginTop: 0, cursor: downloading ? 'wait' : 'pointer', opacity: downloading ? 0.7 : 1 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            {downloading ? 'Preparing…' : `Download ${family}`}
          </button>
        </div>
      </div>

      {/* Right col: large type name at top, alphabet pushed to bottom — all set in the showcased family */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignSelf: 'stretch' }}>
        <div style={{ containerType: 'inline-size' }}>
          <div style={{ fontFamily: `'${family}', sans-serif`, fontWeight: displayWeight, fontSize: displayClamp, lineHeight: 0.9, letterSpacing: '-0.03em', color: 'var(--fg-overview-text)', whiteSpace: displayWrap ? 'normal' : 'nowrap', marginTop: '-0.12em' }}>{family}</div>
        </div>
        <div style={{ paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.25)', containerType: 'inline-size' }}>
          <div style={{ fontFamily: `'${family}', sans-serif`, fontWeight: alphaWeight, fontSize: 'clamp(14px,5.6cqi,42px)', letterSpacing: '-0.01em', color: 'var(--fg-overview-text)', lineHeight: 1.3 }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
          <div style={{ fontFamily: `'${family}', sans-serif`, fontWeight: 400, fontSize: 'clamp(14px,5.6cqi,42px)', letterSpacing: '-0.01em', color: 'var(--fg-overview-text)', lineHeight: 1.3 }}>abcdefghijklmnopqrstuvwxyz</div>
          <div style={{ fontFamily: `'${family}', sans-serif`, fontWeight: 400, fontSize: 'clamp(11px,4.6cqi,28px)', letterSpacing: '-0.005em', color: 'var(--fg-overview-text)', lineHeight: 1.3 }}>1234567890!@#$%&amp;*.,;:/{}[]()?!</div>
        </div>
      </div>
    </div>
  )
}
