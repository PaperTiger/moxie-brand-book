import { useState } from 'react'
import JSZip from 'jszip'
import brand from '../../brand.config'
import { FULL_LOGO_PATHS, FULL_LOGO_VIEWBOX } from './LogoSvg'

const SIZE = 1000
const LOGO_WIDTH_RATIO = 0.7 // matches the proportion used in the live circular avatar swatches

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load ${src}`))
    img.src = src
  })
}

function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => (blob ? resolve(blob) : reject(new Error('canvas.toBlob failed'))), 'image/png')
  })
}

// Composites a full-bleed square avatar: solid brand background + logo, centered.
// Square (not circular) so the client can drop it straight into any platform's
// own avatar cropper without us guessing their crop shape.
export async function renderAvatarPng(bgHex: string, opts: { gradientSrc?: string; markFill?: string }): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = bgHex
  ctx.fillRect(0, 0, SIZE, SIZE)

  const targetW = SIZE * LOGO_WIDTH_RATIO
  const targetH = targetW * (FULL_LOGO_VIEWBOX.height / FULL_LOGO_VIEWBOX.width)
  const x = (SIZE - targetW) / 2
  const y = (SIZE - targetH) / 2

  if (opts.gradientSrc) {
    const img = await loadImage(opts.gradientSrc)
    ctx.drawImage(img, x, y, targetW, targetH)
  } else {
    const scale = targetW / FULL_LOGO_VIEWBOX.width
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(scale, scale)
    ctx.fillStyle = opts.markFill ?? '#000000'
    for (const p of FULL_LOGO_PATHS) {
      ctx.fill(new Path2D(p.d), p.evenodd ? 'evenodd' : 'nonzero')
    }
    ctx.restore()
  }

  return canvasToPngBlob(canvas)
}

export interface AvatarSpec {
  label: string
  bg: string
  mark?: string
  gradient?: boolean
}

// Favicon-ready mark files bundled alongside the composited avatars.
const MARK_FILES = ['moxie-logo-mark-dark.svg', 'moxie-logo-mark-light.svg', 'moxie-logo-mark-gradient.svg']

async function downloadAvatarAssetsZip(avatars: AvatarSpec[], gradientSrc: string) {
  const zip = new JSZip()
  const base = import.meta.env.BASE_URL

  await Promise.all(avatars.map(async (a) => {
    const blob = await renderAvatarPng(a.bg, { gradientSrc: a.gradient ? gradientSrc : undefined, markFill: a.mark })
    const slug = a.label.toLowerCase().replace(/\s+/g, '-')
    zip.file(`moxie-avatar-${slug}.png`, blob)
  }))

  await Promise.all(MARK_FILES.map(async (file) => {
    const resp = await fetch(`${base}images/logos/${file}`)
    if (resp.ok) zip.file(file, await resp.blob())
  }))

  const zipBlob = await zip.generateAsync({ type: 'blob' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(zipBlob)
  a.download = `${brand.meta.client.toLowerCase().replace(/\s+/g, '-')}-avatar-assets.zip`
  a.click()
  URL.revokeObjectURL(a.href)
}

export default function DownloadAvatarAssetsButton({ avatars, gradientSrc, style }: { avatars: AvatarSpec[]; gradientSrc: string; style?: React.CSSProperties }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await downloadAvatarAssetsZip(avatars, gradientSrc)
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
      {downloading ? 'Preparing…' : 'Download assets'}
    </button>
  )
}
