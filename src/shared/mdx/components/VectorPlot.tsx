interface Vec {
  x: number
  y: number
  label?: string
  color?: string
  dashed?: boolean
}

interface VectorPlotProps {
  vectors: Vec[]
  range?: number
  caption?: string
  height?: number
}

const PALETTE = ['var(--vp-a)', 'var(--vp-b)', 'var(--vp-c)', 'var(--vp-d)']

export default function VectorPlot({
  vectors,
  range = 5,
  caption,
  height = 340,
}: VectorPlotProps) {
  const size = 320
  const half = size / 2
  const unit = half / range
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  const ticks: number[] = []
  for (let i = -range; i <= range; i++) if (i !== 0) ticks.push(i)

  return (
    <figure className="vplot" style={{ ['--vplot-h' as string]: `${height}px` }}>
      <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={caption ?? 'Vector plot'}>
        <defs>
          {PALETTE.map((c, i) => (
            <marker
              key={i}
              id={`vp-head-${i}`}
              markerWidth="7"
              markerHeight="7"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill={c} />
            </marker>
          ))}
        </defs>

        {ticks.map((t) => (
          <g key={`g${t}`}>
            <line className="vplot-grid" x1={toX(t)} y1={0} x2={toX(t)} y2={size} />
            <line className="vplot-grid" x1={0} y1={toY(t)} x2={size} y2={toY(t)} />
          </g>
        ))}
        <line className="vplot-axis" x1={0} y1={half} x2={size} y2={half} />
        <line className="vplot-axis" x1={half} y1={0} x2={half} y2={size} />

        {vectors.map((v, i) => {
          const color = v.color ?? PALETTE[i % PALETTE.length]
          const idx = PALETTE.indexOf(color)
          return (
            <g key={i}>
              <line
                x1={half}
                y1={half}
                x2={toX(v.x)}
                y2={toY(v.y)}
                stroke={color}
                strokeWidth={2.4}
                strokeDasharray={v.dashed ? '5 4' : undefined}
                markerEnd={idx >= 0 ? `url(#vp-head-${idx})` : undefined}
              />
              {v.label && (
                <text
                  className="vplot-label"
                  x={toX(v.x) + (v.x >= 0 ? 8 : -8)}
                  y={toY(v.y) - 8}
                  textAnchor={v.x >= 0 ? 'start' : 'end'}
                  fill={color}
                >
                  {v.label}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
