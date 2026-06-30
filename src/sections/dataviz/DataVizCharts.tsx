import brand from '../../brand.config'

const t = brand.tokens

// ── Donut segment path helper ────────────────────────────────────
function donutSegment(
  cx: number, cy: number, r: number, ir: number,
  startPct: number, pct: number,
): string {
  const τ = 2 * Math.PI
  const a0 = startPct * τ - Math.PI / 2
  const a1 = (startPct + pct) * τ - Math.PI / 2
  const x1 = cx + r  * Math.cos(a0), y1 = cy + r  * Math.sin(a0)
  const x2 = cx + r  * Math.cos(a1), y2 = cy + r  * Math.sin(a1)
  const ix1 = cx + ir * Math.cos(a0), iy1 = cy + ir * Math.sin(a0)
  const ix2 = cx + ir * Math.cos(a1), iy2 = cy + ir * Math.sin(a1)
  const large = pct > 0.5 ? 1 : 0
  const f = (n: number) => n.toFixed(2)
  return [
    `M ${f(x1)} ${f(y1)}`,
    `A ${r} ${r} 0 ${large} 1 ${f(x2)} ${f(y2)}`,
    `L ${f(ix2)} ${f(iy2)}`,
    `A ${ir} ${ir} 0 ${large} 0 ${f(ix1)} ${f(iy1)}`,
    'Z',
  ].join(' ')
}

// ── Bar chart data ────────────────────────────────────────────────
// Light version: darker secondary tones that hold contrast on white (Lime/Aurora are too light here)
const BAR_DATA_LIGHT = [
  { label: 'Q1', value: 63, color: '#005668' },   // Dark Teal
  { label: 'Q2', value: 82, color: '#F65F28' },   // Flare
  { label: 'Q3', value: 47, color: '#0090A4' },   // Light Teal
  { label: 'Q4', value: 91, color: '#48A1FD' },   // Azure
  { label: 'Q5', value: 74, color: '#6F8B22' },   // Deep Lime — distinct from the teals
]

// Dark version: the bright secondaries (Lime, Aurora) read well on a dark ground
const BAR_DATA_DARK = [
  { label: 'Q1', value: 63, color: '#55EFC7' },   // Aurora
  { label: 'Q2', value: 82, color: '#F65F28' },   // Flare
  { label: 'Q3', value: 47, color: '#48A1FD' },   // Azure
  { label: 'Q4', value: 91, color: '#BAEB65' },   // Lime
  { label: 'Q5', value: 74, color: '#C6E5DD' },   // Mist
]

interface BarDatum { label: string; value: number; color: string }

function BarChart({ data, dark = false }: { data: BarDatum[]; dark?: boolean }) {
  const W = 460, H = 280
  const ml = 40, mr = 12, mt = 20, mb = 38
  const cW = W - ml - mr
  const cH = H - mt - mb
  const barW = 56
  const gap = 14
  const totalW = data.length * barW + (data.length - 1) * gap
  const startX = ml + (cW - totalW) / 2
  const gridPcts = [0, 25, 50, 75, 100]
  const gridColor  = dark ? 'rgba(255,255,255,0.12)' : '#E5E5E5'
  const labelColor = dark ? 'rgba(255,255,255,0.75)'  : '#111'
  const xLabelColor = dark ? 'rgba(255,255,255,0.75)' : '#111'
  const valueLabelColor = dark ? 'rgba(255,255,255,0.9)' : '#111111'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%"
      style={{ display: "block", fontFamily: "'Gellix', sans-serif" }}>
      {gridPcts.map(pct => {
        const y = mt + cH - (pct / 100) * cH
        return (
          <g key={pct}>
            <line x1={ml} y1={y} x2={W - mr} y2={y} stroke={gridColor} strokeWidth="1" />
            <text x={ml - 6} y={y + 4} textAnchor="end" fontSize="10" fill={labelColor}>{pct}</text>
          </g>
        )
      })}
      {data.map((d, i) => {
        const barH = (d.value / 100) * cH
        const x = startX + i * (barW + gap)
        const y = mt + cH - barH
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={barH} fill={d.color} rx="2" />
            <text x={x + barW / 2} y={mt + cH + 15} textAnchor="middle"
              fontSize="11" fill={xLabelColor}>{d.label}</text>
            <text x={x + barW / 2} y={y - 6} textAnchor="middle"
              fontSize="10" fontWeight="600" fill={valueLabelColor}>{d.value}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ── Line chart ───────────────────────────────────────────────────
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const LINE_DATA = [
  { label: 'Earned media', color: '#005668', values: [38, 45, 52, 49, 63, 71, 78, 86] },
  { label: 'Paid reach',   color: '#F65F28', values: [22, 30, 41, 38, 47, 55, 61, 69] },
  { label: 'Owned',        color: '#0090A4', values: [15, 19, 24, 33, 35, 44, 52, 58] },
  { label: 'Coalition',    color: '#48A1FD', values: [9, 12, 17, 21, 28, 31, 39, 47] },
]

function LineChart() {
  const W = 560, H = 300
  const ml = 36, mr = 16, mt = 16, mb = 34
  const cW = W - ml - mr
  const cH = H - mt - mb
  const n = MONTHS.length
  const xs = (i: number) => ml + (i / (n - 1)) * cW
  const ys = (v: number) => mt + cH - (v / 100) * cH
  const axis = '#005668'

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%"
        style={{ display: "block", fontFamily: "'Gellix', sans-serif" }}>
        {[0, 25, 50, 75, 100].map(pct => {
          const y = ys(pct)
          return (
            <g key={pct}>
              <line x1={ml} y1={y} x2={W - mr} y2={y} stroke="#ECECEC" strokeWidth="1"
                strokeDasharray={pct === 0 ? undefined : "3,5"} />
              <text x={ml - 8} y={y + 3} textAnchor="end" fontSize="9.5" fill={axis} opacity="0.6">{pct}</text>
            </g>
          )
        })}
        {MONTHS.map((m, i) => (
          <text key={m} x={xs(i)} y={mt + cH + 18} textAnchor="middle" fontSize="10" fill={axis} opacity="0.6">{m}</text>
        ))}

        {/* Straight line segments + data points */}
        {LINE_DATA.map((s, i) => {
          const pts = s.values.map((v, j) => `${xs(j).toFixed(1)},${ys(v).toFixed(1)}`).join(' ')
          return (
            <g key={i}>
              <polyline points={pts} fill="none" stroke={s.color} strokeWidth="2.5" />
              {s.values.map((v, j) => (
                <circle key={j} cx={xs(j)} cy={ys(v)} r="3.5" fill={s.color} />
              ))}
            </g>
          )
        })}
      </svg>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px", marginTop: 16 }}>
        {LINE_DATA.map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Gellix', sans-serif", fontSize: 12, color: "#005668" }}>{s.label}</span>
            <span style={{ fontFamily: "'Gellix', sans-serif", fontSize: 12, fontWeight: 700, color: s.color }}>
              {s.values[s.values.length - 1]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Donut chart ──────────────────────────────────────────────────
const DONUT_DATA_LIGHT = [
  { label: 'Product',  pct: 0.35, color: '#005668' },   // Dark Teal
  { label: 'Services', pct: 0.22, color: '#F65F28' },   // Flare
  { label: 'Support',  pct: 0.18, color: '#0090A4' },   // Light Teal
  { label: 'Growth',   pct: 0.13, color: '#48A1FD' },   // Azure
  { label: 'Other',    pct: 0.12, color: '#6F8B22' },   // Deep Lime
]

// Dark variant: the bright secondaries read forward on the deep teal ground
const DONUT_DATA_DARK = [
  { label: 'Product',  pct: 0.35, color: '#55EFC7' },   // Aurora
  { label: 'Services', pct: 0.22, color: '#F65F28' },   // Flare
  { label: 'Support',  pct: 0.18, color: '#48A1FD' },   // Azure
  { label: 'Growth',   pct: 0.13, color: '#BAEB65' },   // Lime
  { label: 'Other',    pct: 0.12, color: '#C6E5DD' },   // Mist
]

interface DonutDatum { label: string; pct: number; color: string }

function DonutChart({ data, dark = false }: { data: DonutDatum[]; dark?: boolean }) {
  const size = 200, cx = 100, cy = 100, r = 86, ir = 48
  let cum = 0
  const segs = data.map(d => {
    const start = cum; cum += d.pct
    return { ...d, path: donutSegment(cx, cy, r, ir, start, d.pct) }
  })

  const centerLabelColor = dark ? 'rgba(255,255,255,0.6)' : '#111'
  const centerValueColor = dark ? '#FFFFFF' : '#111'
  const legendTextColor  = dark ? 'rgba(255,255,255,0.9)' : '#111'
  const legendPctColor   = dark ? 'rgba(255,255,255,0.55)' : '#111'

  return (
    <div className="donut-chart-row">
      <svg viewBox={`0 0 ${size} ${size}`} width="100%"
        style={{ display: "block", maxWidth: size, flexShrink: 0, fontFamily: "'Gellix', sans-serif" }}>
        {segs.map((s, i) => <path key={i} d={s.path} fill={s.color} />)}
        <text x={cx} y={cy - 7} textAnchor="middle" fontSize="10"
          fill={centerLabelColor} fontFamily="Gellix, sans-serif">Total</text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize="20" fontWeight="700"
          fill={centerValueColor} fontFamily="Gellix, sans-serif">100%</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {data.map(d => (
          <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 12, height: 12, background: d.color, borderRadius: 2,
              flexShrink: 0,
              ...(d.color === t['white'] ? { outline: '1px solid rgba(255,255,255,0.35)' } : {}) }} />
            <div style={{ fontFamily: "'Gellix', sans-serif", fontSize: 13, color: legendTextColor }}>
              {d.label}
              <span style={{ color: legendPctColor, marginLeft: 10, fontWeight: 600 }}>
                {Math.round(d.pct * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Style spec row ───────────────────────────────────────────────
function SpecRow({ label, spec }: { label: string; spec: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr",
      borderBottom: "1px solid #E5E5E5", padding: "13px 0" }}>
      <div style={{ fontFamily: "'Gellix', sans-serif", fontSize: 11, color: '#005668',
        fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", paddingTop: 1 }}>
        {label}
      </div>
      <div style={{ fontFamily: "'Gellix', sans-serif", fontSize: 13, color: "#333",
        lineHeight: 1.5 }}>{spec}</div>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────
export default function DataVizCharts() {
  return (
    <div className="page">
      <div className="section-label">Data visualisation</div>
      <h2 className="section-title">Chart guidelines</h2>
      <p className="section-intro">
        All charts and data graphics must follow these structural and stylistic standards.
        Consistent axes, typography, and color usage reinforce brand recognition at scale.
      </p>

      {/* Bar chart — light + dark */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 600, fontSize: 15,
            color: '#005668' }}>Bar chart</div>
          <div style={{ fontFamily: "'Gellix', sans-serif", fontSize: 11, color: '#005668',
            letterSpacing: "0.07em", textTransform: "uppercase" }}>Multi-category</div>
        </div>
        <div className="chart-compare-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <div>
            <div style={{ fontFamily: "'Gellix', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: '#005668',
              marginBottom: 8 }}>On light</div>
            <div style={{ border: "1px solid #E5E5E5", padding: "24px 20px", background: "#fff" }}>
              <BarChart data={BAR_DATA_LIGHT} />
            </div>
            <div style={{ fontFamily: "'Gellix', sans-serif", fontSize: 11, color: '#005668',
              marginTop: 8, lineHeight: 1.5 }}>
              On white, use the darker secondaries (Dark Teal, Flare, Light Teal, Azure, Deep Lime),
              each a distinct hue that holds up against the page.
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Gellix', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: '#005668',
              marginBottom: 8 }}>On dark</div>
            <div style={{ border: "1px solid #E5E5E5", padding: "24px 20px",
              background: t['dark-blue'] }}>
              <BarChart data={BAR_DATA_DARK} dark />
            </div>
            <div style={{ fontFamily: "'Gellix', sans-serif", fontSize: 11, color: '#005668',
              marginTop: 8, lineHeight: 1.5 }}>
              On dark, the bright secondaries (Aurora, Lime, Azure, Mist) come forward and stay
              legible against the deep teal ground.
            </div>
          </div>
        </div>
      </div>

      {/* Line chart */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 600, fontSize: 15,
            color: '#005668' }}>Line chart</div>
          <div style={{ fontFamily: "'Gellix', sans-serif", fontSize: 11, color: '#005668',
            letterSpacing: "0.07em", textTransform: "uppercase" }}>Time series</div>
        </div>
        <div style={{ border: "1px solid #E5E5E5", padding: "32px 24px" }}>
          <LineChart />
        </div>
      </div>

      {/* Donut chart — light + dark */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 600, fontSize: 15,
            color: '#005668' }}>Donut chart</div>
          <div style={{ fontFamily: "'Gellix', sans-serif", fontSize: 11, color: '#005668',
            letterSpacing: "0.07em", textTransform: "uppercase" }}>Part-to-whole</div>
        </div>
        <div className="chart-compare-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <div>
            <div style={{ fontFamily: "'Gellix', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: '#005668',
              marginBottom: 8 }}>On light</div>
            <div style={{ border: "1px solid #E5E5E5", padding: "32px 24px", background: "#fff" }}>
              <DonutChart data={DONUT_DATA_LIGHT} />
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Gellix', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: '#005668',
              marginBottom: 8 }}>On dark</div>
            <div style={{ border: "1px solid #E5E5E5", padding: "32px 24px",
              background: t['dark-blue'] }}>
              <DonutChart data={DONUT_DATA_DARK} dark />
            </div>
          </div>
        </div>
        <div style={{ fontFamily: "'Gellix', sans-serif", fontSize: 11, color: '#005668',
          marginTop: 8, lineHeight: 1.5 }}>
          On light, segments use the darker secondaries; on dark they switch to the brights (Aurora, Lime, Mist) so each slice stays distinct against the deep teal.
        </div>
      </div>

      {/* Style spec */}
      <div className="content-block">
        <h3 style={{ fontFamily: "'Gellix', sans-serif", fontWeight: 500, fontSize: 17,
          margin: '0 0 4px', color: '#005668' }}>Chart style specifications</h3>
        <div style={{ marginTop: 4, borderTop: "1px solid #E5E5E5" }}>
          <SpecRow label="Gridlines" spec="1px #E5E5E5, horizontal only, dashed on line charts, solid on bar charts" />
          <SpecRow label="Axis labels" spec="Inter 10–11px / #4D4D4D on light, 75% white on dark, always outside the plot area" />
          <SpecRow label="Value labels" spec="Inter 10px / #111 on light, 90% white on dark, optional, above bars or at line endpoints" />
          <SpecRow label="Legend" spec="Inter 11–12px / #333, below chart, horizontal, 16×3px rounded color block" />
          <SpecRow label="Bar corners" spec="border-radius: 2px, max 4px" />
          <SpecRow label="Background" spec="Always white (#FFFFFF) or brand dark. Ensures print-safe export." />
          <SpecRow label="Chart title" spec="Gellix 14px / 600 / #111, above chart, left-aligned" />
          <SpecRow label="Chart subtitle" spec="Inter 12px / #4D4D4D, immediately below title, left-aligned" />
          <SpecRow label="Dot size (line)" spec="radius 4–5px, filled with the series color" />
          <SpecRow label="Stroke weight" spec="2–2.5px for lines, 1px for axis and grid lines" />
        </div>
      </div>
    </div>
  )
}
