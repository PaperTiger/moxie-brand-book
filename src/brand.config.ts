export interface ColorToken {
  name: string
  hex: string
  textColor: string
  outline?: string
}

export interface FontFace {
  family: string
  weight: string | number
  file: string
}

export interface NavItem {
  label: string
  id: string
  children?: Omit<NavItem, 'children'>[]
  groupId?: string
  subId?: string
}

export interface NavGroup {
  group: string
  items: NavItem[]
}

export interface TypeScaleEntry {
  size: string
  name: string
  family: string
  weight: number
  ls: string
  lh: number
}

export interface BrandConfig {
  typeScale: TypeScaleEntry[]
  meta: {
    client: string
    nameLine1: string
    nameLine2: string
    title: string
    version: string
    date: string
    preparedBy: string
    sidebarLogoImage: string
    coverSealImage: string
  }
  specimens: {
    display96: string
    display73: string
    display64: string
    display48: string
    headline42: string
    headline32: string
    headline24: string
    headline21: string
    body18: string
    body16: string
    body14: string
    body12: string
    sentence: string
    avoidText: string
    avoidTextPart1: string
    avoidTextPart2: string
    fallbackGoogle16: string
    fallbackSystem16: string
  }
  tokens: Record<string, string>
  typography: {
    displayFont: string
    bodyFont: string
    bodyFontUrl?: string
    googleFallbackFont: string
    googleFallbackUrl: string
    systemFallbackFont: string
    fonts: FontFace[]
  }
  colors: { primary: ColorToken[]; secondary: ColorToken[]; tertiary: ColorToken[] }
  colorPairings: Array<{ bg: string; logo: string }>
  images: {
    photography: string[]   // filenames in public/images/photography/
    applications: string[]  // filenames in public/images/applications/
  }
  nav: NavGroup[]
}

const _client = 'Moxie'

const brand: BrandConfig = {
  typeScale: [
    { size: '96px', name: 'Display XL',  family: 'Gellix', weight: 700, ls: '-0.04em',  lh: 0.9 },
    { size: '73px', name: 'Display L',   family: 'Gellix', weight: 700, ls: '-0.03em',  lh: 0.9 },
    { size: '64px', name: 'Display M',   family: 'Gellix', weight: 700, ls: '-0.03em',  lh: 0.9 },
    { size: '48px', name: 'Display S',   family: 'Gellix', weight: 700, ls: '-0.025em', lh: 0.95 },
    { size: '42px', name: 'Headline XL', family: 'Gellix',          weight: 700, ls: '-0.02em', lh: 1.0 },
    { size: '32px', name: 'Headline L',  family: 'Queens Condensed', weight: 400, ls: '0',       lh: 1.1 },
    { size: '24px', name: 'Headline M',  family: 'Queens Condensed', weight: 400, ls: '0',       lh: 1.25 },
    { size: '21px', name: 'Headline S',  family: 'Gellix',          weight: 700, ls: '-0.01em', lh: 1.2 },
    { size: '18px', name: 'Body XL',     family: 'Gellix', weight: 500, ls: '-0.01em',  lh: 1.55 },
    { size: '16px', name: 'Body L',      family: 'Gellix', weight: 500, ls: '-0.01em',  lh: 1.6 },
    { size: '14px', name: 'Body M',      family: 'Gellix', weight: 500, ls: '0',         lh: 1.6 },
    { size: '12px', name: 'Caption',     family: 'Gellix', weight: 500, ls: '0',         lh: 1.5 },
  ],
  meta: {
    client:           _client,
    nameLine1:        'Brand',
    nameLine2:        'Guidelines',
    title:            _client,
    version:          'Version 1.0',
    date:             'June 2026',
    preparedBy:       'Paper Tiger',
    sidebarLogoImage: `${import.meta.env.BASE_URL}images/logos/moxie-logo-full-dark-gradient.svg`,
    coverSealImage:   `${import.meta.env.BASE_URL}images/logos/moxie-logo-mark-gradient.svg`,
  },

  specimens: {
    display96:        'Moxie',
    display73:        'Connected audio',
    display64:        'Driving full-funnel results',
    display48:        'Connected TV',
    headline42:       'Mobile and display ads',
    headline32:       'Attribution and reporting',
    headline24:       `${_client} is a pioneer in developing and delivering programmatic media.`,
    headline21:       '100% return on investment',
    body18:           `${_client} is a pioneer in developing and delivering programmatic connected TV.`,
    body16:           'Connected TV campaigns take time, the right tools, and real expertise. That is why we give you a full programmatic team: strategists, media buyers, and campaign managers.',
    body14:           'Connected TV campaigns take time, the right tools, and real expertise. That is why we give you a full programmatic team: strategists, media buyers, and campaign managers, backed by a tech stack that is always evolving.',
    body12:           'Connected TV campaigns take time, the right tools, and real expertise. That is why we give you a full programmatic team.',
    sentence:         `${_client} builds connected TV campaigns that drive full-funnel results.`,
    avoidText:        `${_client} drives full-funnel results across every connected screen.`,
    avoidTextPart1:   _client,
    avoidTextPart2:   'drives full-funnel results across every connected screen.',
    fallbackGoogle16: `${_client} builds connected TV campaigns that drive full-funnel results. When Gellix is unavailable, Outfit provides a clean, modern alternative.`,
    fallbackSystem16: `${_client} builds connected TV campaigns that drive full-funnel results. When Gellix is unavailable, Arial maintains clarity and legibility.`,
  },

  // Token keys are the theming API consumed across the book (CSS custom properties).
  // Keys are kept stable; values are mapped to the Moxie palette.
  tokens: {
    'lh-body':          '1.65',
    'primary-blue':     '#005668',   // Dark Teal — primary accent
    'primary-blue-rgb': '0, 86, 104',
    'dark-blue':        '#004553',    // Logo dark — deep teal, hero backgrounds
    charcoal:           '#005668',    // Dark Teal — all dark type uses this
    white:              '#FFFFFF',
    orange:             '#F65F28',    // Flare
    purple:             '#48A1FD',    // Azure
    'pale-green':       '#C6E5DD',    // Mist — light tint
    'lime-dark':        '#005668',    // Dark Teal — text on light tints
    green:              '#BAEB65',    // Lime
    fuscia:             '#55EFC7',    // Aurora
    gray:               '#F0F7E8',    // Haze — neutral light
  },

  typography: {
    displayFont:        'Gellix',
    bodyFont:           'Gellix',
    bodyFontUrl:        'https://www.fontfabric.com/fonts/gellix/',
    googleFallbackFont: 'Outfit',
    googleFallbackUrl:  'https://fonts.google.com/specimen/Outfit',
    systemFallbackFont: 'Arial',
    fonts: [
      { family: 'Gellix',          weight: 400, file: 'fonts/Gellix/Gellix-Regular.woff2' },
      { family: 'Gellix',          weight: 500, file: 'fonts/Gellix/Gellix-Medium.woff2' },
      { family: 'Gellix',          weight: 700, file: 'fonts/Gellix/Gellix-Bold.woff2' },
      { family: 'Queens Condensed', weight: 400, file: 'fonts/Queens Condensed/QueensCondensedTrial-Regular.ttf' },
    ],
  },

  colors: {
    primary: [
      { name: 'Dark Teal',  hex: '#005668', textColor: '#C6E5DD' },
      { name: 'Light Teal', hex: '#0090A4', textColor: '#C6E5DD' },
      { name: 'Mist',       hex: '#C6E5DD', textColor: '#005668' },
      { name: 'Veil',       hex: '#E2FEF7', textColor: '#0090A4', outline: '1px solid #C7C7C7' },
    ],
    secondary: [
      { name: 'Flare',     hex: '#F65F28', textColor: '#E2FEF7' },
      { name: 'Lime',      hex: '#BAEB65', textColor: '#005668' },
      { name: 'Aurora',    hex: '#55EFC7', textColor: '#005668' },
      { name: 'Azure',     hex: '#48A1FD', textColor: '#E2FEF7' },
    ],
    tertiary: [
      { name: 'Shadow',    hex: '#7E7E7E', textColor: '#E2FEF7' },
      { name: 'Dusk',      hex: '#36363B', textColor: '#E2FEF7' },
      { name: 'Haze',      hex: '#F0F7E8', textColor: '#005668', outline: '1px solid #DDE7D6' },
      { name: 'Logo dark', hex: '#004553', textColor: '#E2FEF7' },
    ],
  },

  images: {
    photography: [
      'image-168.webp', 'image-169.webp', 'image-171.webp', 'image-172.webp',
      'image-176.webp', 'image-185.webp', 'image-186.webp', 'image-188.webp',
      'image-207.webp', 'image-208.webp', 'image-209.webp', 'image-210.webp',
      'image-211.webp', 'image-212.webp', 'image-213.webp', 'image-214.webp',
    ],
    applications: [
      'application-1.webp', 'application-2.webp', 'application-3.webp',
      'application-4.webp', 'application-5.webp', 'application-6.webp',
    ],
  },

  colorPairings: [
    { bg: 'Mist',       logo: 'moxie-logo-full-dark-gradient.svg'},
    { bg: 'Veil',       logo: 'moxie-logo-full-dark-gradient.svg'},
    { bg: 'Dark Teal',  logo: 'moxie-logo-full-light.svg' },
    { bg: 'Light Teal', logo: 'moxie-logo-full-light.svg' },
    { bg: 'Aurora',     logo: 'moxie-logo-full-dark.svg' },
    { bg: 'Flare',      logo: 'moxie-logo-full-dark.svg' },
    { bg: 'Azure',      logo: 'moxie-logo-full-dark.svg' },
    { bg: 'Lime',       logo: 'moxie-logo-full-dark.svg' },
  ],

  nav: [
    {
      group: 'Visual identity',
      items: [{ label: 'Introduction', id: 'vi-intro' }],
    },
    {
      group: 'Logo & mark',
      items: [
        { label: 'Full logo',        id: 'logo-horizontal' },
        { label: 'Stacked logo',     id: 'logo-stacked' },
        { label: 'Logo mark',        id: 'h-logo-mark' },
        { label: 'Avatar & favicon', id: 'logo-avatar' },
        { label: 'Co-branding',      id: 'logo-cobranding' },
        { label: 'Logo positioning', id: 'logo-positioning' },
        { label: 'What to avoid',    id: 'logo-avoid' },
      ],
    },
    {
      group: 'Color',
      items: [
        { label: 'Introduction',              id: 'color-intro' },
        { label: 'Primary palette',           id: 'primary-palette' },
        { label: 'Secondary palette',         id: 'secondary-palette' },
        { label: 'Tertiary palette',          id: 'tertiary-palette' },
        { label: 'Combinations & accessibility', id: 'color-combinations' },
        { label: 'Color pathways',            id: 'color-pathways' },
      ],
    },
    {
      group: 'Typography',
      items: [
        { label: 'Introduction', id: 'type-intro' },
        {
          label: 'Display & body', id: 'fg-overview',
          groupId: 'nav-fg-group', subId: 'nav-fg-sub',
          children: [
            { label: 'Gellix',        id: 'fg-overview' },
            { label: 'Queens',        id: 'fg-overview-queens' },
            { label: 'Usage',         id: 'fg-usage' },
            { label: 'Type specimen', id: 'fg-specimen' },
            { label: 'Size & scale',  id: 'fg-scale' },
          ],
        },
        { label: 'Google fallback', id: 'google-fallback' },
        { label: 'System fallback', id: 'type-fallback' },
        { label: 'What to avoid',   id: 'type-avoid' },
      ],
    },
    {
      group: 'Photography',
      items: [
        { label: 'Introduction', id: 'photo-intro' },
        { label: 'Examples',     id: 'photo-examples' },
        { label: 'Dos',          id: 'photo-dos' },
        { label: "Don'ts",       id: 'photo-donts' },
      ],
    },
    {
      group: 'Data visualisation',
      items: [
        { label: 'Color sequence',   id: 'dataviz-colors' },
        { label: 'Chart guidelines', id: 'dataviz-charts' },
      ],
    },
    {
      group: 'Applications',
      items: [
        { label: 'Introduction', id: 'app-intro' },
        { label: 'Examples',     id: 'app-examples' },
      ],
    },
    {
      group: 'Iconography',
      items: [{ label: 'Introduction', id: 'icon-intro' }],
    },
    {
      group: 'Print & export',
      items: [{ label: 'Specifications', id: 'print-specs' }],
    },
  ],
}

// Derived palette extremes — used for auto-theming fullbleed sections (e.g. TypeOverview)
function _lum(hex: string): number {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16) / 255
  const g = parseInt(c.slice(2, 4), 16) / 255
  const b = parseInt(c.slice(4, 6), 16) / 255
  const lin = (x: number) => x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
const _sorted = [...brand.colors.primary].sort((a, b) => _lum(a.hex) - _lum(b.hex))
export const darkestPrimary  = _sorted[0]
export const lightestPrimary = _sorted[_sorted.length - 1]

export default brand
