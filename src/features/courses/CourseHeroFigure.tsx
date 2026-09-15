/**
 * Decorative figure for the courses index: a grid under a linear transformation
 * that shears and returns, with the two basis vectors following it. Pure CSS
 * animation, no JS — and it stops entirely under prefers-reduced-motion.
 */
export default function CourseHeroFigure() {
  const SIZE = 260
  const half = SIZE / 2
  const R = 4
  const unit = half / R
  const to = (v: number) => half + v * unit

  const lines: number[] = []
  for (let i = -R; i <= R; i++) lines.push(i)

  return (
    <div className="chero" aria-hidden="true">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <g className="chero-grid">
          {lines.map((i) => (
            <g key={i}>
              <line x1={to(i)} y1={to(-R)} x2={to(i)} y2={to(R)} />
              <line x1={to(-R)} y1={to(i)} x2={to(R)} y2={to(i)} />
            </g>
          ))}
        </g>

        <line className="chero-axis" x1={0} y1={half} x2={SIZE} y2={half} />
        <line className="chero-axis" x1={half} y1={0} x2={half} y2={SIZE} />

        <g className="chero-vecs">
          <polygon className="chero-area" points={`${to(0)},${to(0)} ${to(1)},${to(0)} ${to(1)},${to(1)} ${to(0)},${to(1)}`} />
          <line className="chero-i" x1={to(0)} y1={to(0)} x2={to(2.4)} y2={to(0)} />
          <line className="chero-j" x1={to(0)} y1={to(0)} x2={to(0)} y2={to(2.4)} />
          <circle className="chero-dot-i" cx={to(2.4)} cy={to(0)} r={5} />
          <circle className="chero-dot-j" cx={to(0)} cy={to(2.4)} r={5} />
        </g>
      </svg>
    </div>
  )
}
