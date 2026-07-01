import brand from './brand.config'

export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export interface ResolvedPairing {
  bg: string
  text: string
  bgHex: string
  textHex: string
  gradient: boolean
}

const allColors = [...brand.colors.primary, ...brand.colors.secondary, ...brand.colors.tertiary]

function colorByName(name: string) {
  return allColors.find(c => c.name.toLowerCase() === name.toLowerCase())
}

// Single source of truth for "approved color combinations" across the Color and Logo &
// mark pages — reads from brand.colorPairings so every page stays in sync with Figma.
export function resolveColorPairings(): ResolvedPairing[] {
  return brand.colorPairings.map(p => {
    const bgToken = colorByName(p.bg)
    const textToken = colorByName(p.text)
    return {
      bg: p.bg,
      text: p.text,
      bgHex: bgToken?.hex ?? '#FFFFFF',
      textHex: textToken?.hex ?? '#000000',
      gradient: p.logo.includes('gradient'),
    }
  })
}
