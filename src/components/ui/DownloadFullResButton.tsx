import { useState } from 'react'
import JSZip from 'jszip'
import brand from '../../brand.config'

// Generic "download the full-resolution originals" button. Pair with a WebP-compressed
// folder used for on-page display (via scripts/convert-images.js) and a sibling "-full"
// folder holding the untouched originals — e.g. gradients/ + gradients-full/,
// half-moons/ + half-moons-full/. The "-full" folder is never listed in
// convert-images.js's DIRS, so it survives the compression step untouched.
async function downloadFullResZip(files: string[], folder: string, zipName: string, label: string) {
  const zip = new JSZip()
  const base = import.meta.env.BASE_URL
  const missing: string[] = []

  await Promise.all(files.map(async (file) => {
    const resp = await fetch(`${base}${folder}${file}`)
    // Vite's dev server (and some static hosts) return 200 + an HTML fallback page
    // for unmatched paths instead of a real 404, so `resp.ok` alone can't detect a
    // missing file — require an actual image content-type too.
    const isImage = resp.ok && (resp.headers.get('content-type') ?? '').startsWith('image/')
    if (!isImage) { missing.push(file); return }
    zip.file(file, await resp.blob())
  }))

  if (missing.length === files.length) {
    throw new Error(`No full-resolution ${label} files are available yet.`)
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(zipBlob)
  a.download = zipName
  a.click()
  URL.revokeObjectURL(a.href)
}

interface Props {
  files: string[]        // filenames (relative to `folder`) to include
  folder: string          // folder (relative to BASE_URL) the full-res files live in
  zipSuffix: string        // appended to the client slug for the zip filename, e.g. "gradients"
  assetLabel: string       // human name used in the button text and error message, e.g. "gradients"
  style?: React.CSSProperties
}

export default function DownloadFullResButton({ files, folder, zipSuffix, assetLabel, style }: Props) {
  const [state, setState] = useState<'idle' | 'downloading' | 'error'>('idle')

  const handleDownload = async () => {
    setState('downloading')
    try {
      const slug = brand.meta.client.toLowerCase().replace(/\s+/g, '-')
      await downloadFullResZip(files, folder, `${slug}-${zipSuffix}.zip`, assetLabel)
      setState('idle')
    } catch (err) {
      console.error(`${assetLabel} download failed:`, err)
      setState('error')
      setTimeout(() => setState('idle'), 2500)
    }
  }

  const label = state === 'downloading' ? 'Preparing…' : state === 'error' ? 'Unavailable — try again later' : `Download full-resolution ${assetLabel}`

  return (
    <button
      onClick={handleDownload}
      disabled={state === 'downloading'}
      className="dl-btn"
      style={{ marginTop: 0, cursor: state === 'downloading' ? 'wait' : 'pointer', opacity: state === 'downloading' ? 0.7 : 1, ...style }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      {label}
    </button>
  )
}
