import { useState } from 'react'
import JSZip from 'jszip'
import brand from '../../brand.config'

const LOGO_FILES = [
  'moxie-logo-full-dark.svg',
  'moxie-logo-full-light.svg',
  'moxie-logo-full-dark-gradient.svg',
  'moxie-logo-stacked-dark.svg',
  'moxie-logo-stacked-light.svg',
  'moxie-logo-stacked-dark-gradient.svg',
  'moxie-logo-mark-dark.svg',
  'moxie-logo-mark-light.svg',
  'moxie-logo-mark-gradient.svg',
]

async function downloadLogoZip() {
  const zip = new JSZip()
  const base = import.meta.env.BASE_URL
  await Promise.all(LOGO_FILES.map(async (file) => {
    const resp = await fetch(`${base}images/logos/${file}`)
    if (!resp.ok) throw new Error(`Failed to fetch ${file}`)
    zip.file(file, await resp.blob())
  }))
  const zipBlob = await zip.generateAsync({ type: 'blob' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(zipBlob)
  a.download = `${brand.meta.client.toLowerCase().replace(/\s+/g, '-')}-logos.zip`
  a.click()
  URL.revokeObjectURL(a.href)
}

export default function DownloadLogosButton({ style }: { style?: React.CSSProperties }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await downloadLogoZip()
    } finally {
      setDownloading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="dl-btn"
      style={{ marginTop: 0, marginBottom: 48, cursor: downloading ? 'wait' : 'pointer', opacity: downloading ? 0.7 : 1, ...style }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      {downloading ? 'Preparing…' : 'Download logos'}
    </button>
  )
}
