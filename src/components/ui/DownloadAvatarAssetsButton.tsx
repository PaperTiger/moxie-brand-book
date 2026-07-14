import { useState } from 'react'
import JSZip from 'jszip'
import brand from '../../brand.config'
import { FULL_LOGO_PATHS, FULL_LOGO_VIEWBOX, MARK_PATH, MARK_VIEWBOX } from './LogoSvg'

const SIZE = 1000
const LOGO_WIDTH_RATIO = 0.7 // matches the proportion used in the live circular avatar swatches

// Favicon/app-icon sizes browsers and platforms actually ask for.
const FAVICON_SIZES = [16, 32, 48, 64, 180, 192, 512]
const MARK_WIDTH_RATIO = 0.8 // matches the 80% inset used in the live favicon previews

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

// Composites a SQUARE favicon: the mark letterboxed inside the square at its true
// ~2:1 aspect, centered, with an even margin. The raw mark SVG is 259x123, so
// shipping it directly as a favicon leaves the browser to squash or crop it into
// the square slot — hence compositing here instead.
// Omit `bg` to leave the square transparent — the canvas starts transparent, so
// skipping the fill is all it takes.
export async function renderFaviconPng(size: number, opts: { bg?: string; gradientSrc?: string; markFill?: string }): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  if (opts.bg) {
    ctx.fillStyle = opts.bg
    ctx.fillRect(0, 0, size, size)
  }

  const targetW = size * MARK_WIDTH_RATIO
  const targetH = targetW * (MARK_VIEWBOX.height / MARK_VIEWBOX.width)
  const x = (size - targetW) / 2
  const y = (size - targetH) / 2

  if (opts.gradientSrc) {
    const img = await loadImage(opts.gradientSrc)
    ctx.drawImage(img, x, y, targetW, targetH)
  } else {
    const scale = targetW / MARK_VIEWBOX.width
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(scale, scale)
    ctx.fillStyle = opts.markFill ?? '#000000'
    ctx.fill(new Path2D(MARK_PATH))
    ctx.restore()
  }

  return canvasToPngBlob(canvas)
}

// Square, scalable favicon. Same letterboxing as the PNGs, expressed as a
// 512x512 viewBox so it stays crisp at any size.
function faviconSvg(markFill: string, bg?: string): string {
  const S = 512
  const w = S * MARK_WIDTH_RATIO
  const h = w * (MARK_VIEWBOX.height / MARK_VIEWBOX.width)
  const x = (S - w) / 2
  const y = (S - h) / 2
  const scale = w / MARK_VIEWBOX.width
  const rect = bg ? `\n  <rect width="${S}" height="${S}" fill="${bg}"/>` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">${rect}
  <g transform="translate(${x} ${y}) scale(${scale})">
    <path d="${MARK_PATH}" fill="${markFill}"/>
  </g>
</svg>
`
}

export interface AvatarSpec {
  label: string
  bg: string
  mark?: string
  gradient?: boolean
}

export interface FaviconSpec {
  name: string
  bg?: string          // omit for a transparent background
  mark?: string
  gradient?: boolean
}

async function downloadAvatarAssetsZip(
  avatars: AvatarSpec[],
  favicons: FaviconSpec[],
  gradientSrc: string,
  markGradientSrc: string,
) {
  const zip = new JSZip()
  const slug = brand.meta.client.toLowerCase().replace(/\s+/g, '-')

  await Promise.all(avatars.map(async (a) => {
    const blob = await renderAvatarPng(a.bg, { gradientSrc: a.gradient ? gradientSrc : undefined, markFill: a.mark })
    zip.file(`avatars/${slug}-avatar-${a.label.toLowerCase().replace(/\s+/g, '-')}.png`, blob)
  }))

  await Promise.all(favicons.flatMap((f) => {
    const src = f.gradient ? markGradientSrc : undefined
    const pngs = FAVICON_SIZES.map(async (size) => {
      const blob = await renderFaviconPng(size, { bg: f.bg, gradientSrc: src, markFill: f.mark })
      zip.file(`favicons/${f.name}/${slug}-favicon-${f.name}-${size}x${size}.png`, blob)
    })
    // Gradient fills can't be expressed from the shared path data, so the scalable
    // SVG is only emitted for the solid-fill variants.
    if (!f.gradient) {
      zip.file(`favicons/${f.name}/${slug}-favicon-${f.name}.svg`, faviconSvg(f.mark ?? '#000000', f.bg))
    }
    return pngs
  }))

  const zipBlob = await zip.generateAsync({ type: 'blob' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(zipBlob)
  a.download = `${slug}-avatar-assets.zip`
  a.click()
  URL.revokeObjectURL(a.href)
}

export default function DownloadAvatarAssetsButton({ avatars, favicons, gradientSrc, markGradientSrc, style }: { avatars: AvatarSpec[]; favicons: FaviconSpec[]; gradientSrc: string; markGradientSrc: string; style?: React.CSSProperties }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await downloadAvatarAssetsZip(avatars, favicons, gradientSrc, markGradientSrc)
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
