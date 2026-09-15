'use client'

import { useMemo, useState } from 'react'

interface BestSubspaceProps {
  points?: [number, number][]
  labels?: {
    hint?: string
    angle?: string
    residual?: string
    best?: string
    variance?: string
    snap?: string
  }
}

const SIZE = 320
const RANGE = 3.2

const CLOUD: [number, number][] = [
  [-2.4, -1.4],
  [-1.8, -0.6],
  [-1.2, -1.0],
  [-0.6, -0.1],
  [0.0, 0.3],
  [0.6, 0.2],
  [1.2, 0.9],
  [1.8, 0.7],
  [2.4, 1.5],
  [-0.3, -0.7],
  [0.9, 0.6],
  [-1.5, -1.2],
]

export default function BestSubspace({ points = CLOUD, labels = {} }: BestSubspaceProps) {
  const [deg, setDeg] = useState(0)

  const { centred, best } = useMemo(() => {
    const n = points.length
    const mx = points.reduce((s, p) => s + p[0], 0) / n
    const my = points.reduce((s, p) => s + p[1], 0) / n
    const c = points.map(([x, y]) => [x - mx, y - my] as [number, number])
    // Principal direction of a 2-D cloud, in closed form.
    const sxx = c.reduce((s, p) => s + p[0] * p[0], 0)
    const syy = c.reduce((s, p) => s + p[1] * p[1], 0)
    const sxy = c.reduce((s, p) => s + p[0] * p[1], 0)
    const theta = 0.5 * Math.atan2(2 * sxy, sxx - syy)
    return { centred: c, best: (theta * 180) / Math.PI }
  }, [points])

  const half = SIZE / 2
  const unit = half / RANGE
  const toX = (x: number) => half + x * unit
  const toY = (y: number) => half - y * unit

  const rad = (deg * Math.PI) / 180
  const u: [number, number] = [Math.cos(rad), Math.sin(rad)]

  // Sum of squared distances to the line spanned by u.
  const residual = centred.reduce((s, p) => {
    const t = p[0] * u[0] + p[1] * u[1]
    return s + (p[0] - t * u[0]) ** 2 + (p[1] - t * u[1]) ** 2
  }, 0)
  const explained = centred.reduce((s, p) => s + (p[0] * u[0] + p[1] * u[1]) ** 2, 0)
  const total = residual + explained

  const curve = useMemo(() => {
    const pts: string[] = []
    let max = 0
    const vals: number[] = []
    for (let a = -90; a <= 90; a += 2) {
      const r = (a * Math.PI) / 180
      const uu = [Math.cos(r), Math.sin(r)]
      const v = centred.reduce((s, p) => {
        const t = p[0] * uu[0] + p[1] * uu[1]
        return s + (p[0] - t * uu[0]) ** 2 + (p[1] - t * uu[1]) ** 2
      }, 0)
      vals.push(v)
      if (v > max) max = v
    }
    vals.forEach((v, i) => {
      const x = (i / (vals.length - 1)) * 100
      pts.push(`${x},${34 - (v / max) * 30}`)
    })
    return pts.join(' ')
  }, [centred])

  const atBest = Math.abs(((deg - best + 90 + 180) % 180) - 90) < 2
  const far = RANGE * 1.5

  return (
    <div className="bsub">
      <div className="bsub-canvas">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={labels.hint ?? 'Best line through a cloud'}
        >
          <clipPath id="bsub-clip">
            <rect x={0} y={0} width={SIZE} height={SIZE} />
          </clipPath>
          <line className="vplot-axis" x1={0} y1={half} x2={SIZE} y2={half} />
          <line className="vplot-axis" x1={half} y1={0} x2={half} y2={SIZE} />
          <g clipPath="url(#bsub-clip)">
            <line
              className={atBest ? 'bsub-line is-best' : 'bsub-line'}
              x1={toX(-far * u[0])}
              y1={toY(-far * u[1])}
              x2={toX(far * u[0])}
              y2={toY(far * u[1])}
            />
            {centred.map(([x, y], i) => {
              const t = x * u[0] + y * u[1]
              return (
                <line
                  key={`r${i}`}
                  className="bsub-res"
                  x1={toX(x)}
                  y1={toY(y)}
                  x2={toX(t * u[0])}
                  y2={toY(t * u[1])}
                />
              )
            })}
            {centred.map(([x, y], i) => (
              <circle key={i} className="bsub-pt" cx={toX(x)} cy={toY(y)} r={4} />
            ))}
          </g>
        </svg>
      </div>

      <div className="bsub-controls">
        <p className="dvec-hint">
          {labels.hint ??
            'The line turns; the segments are the distances being squared and summed.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">θ</span>
          <input
            type="range"
            min={-90}
            max={90}
            step={1}
            value={deg}
            onChange={(e) => setDeg(Number(e.target.value))}
            aria-label="angle"
          />
          <span className="mplay-val">{deg}°</span>
        </label>

        <svg
          className="bsub-curve"
          viewBox="0 0 100 36"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polyline points={curve} />
          <line
            className="bsub-mark"
            x1={((deg + 90) / 180) * 100}
            y1={0}
            x2={((deg + 90) / 180) * 100}
            y2={36}
          />
        </svg>
        <p className="bsub-axis" aria-hidden="true">
          <span>−90°</span>
          <span>0°</span>
          <span>90°</span>
        </p>

        <p className="mplay-readout" aria-live="polite">
          {labels.residual ?? 'residuo'} = {residual.toFixed(2)} · {labels.variance ?? 'explicado'}{' '}
          {((explained / total) * 100).toFixed(1)} %
        </p>
        <p className={`bsub-verdict ${atBest ? 'is-best' : ''}`}>
          {labels.best ?? 'mínimo en'} θ = {best.toFixed(1)}°
        </p>

        <button className="mplay-reset" type="button" onClick={() => setDeg(Math.round(best))}>
          {labels.snap ?? 'Ir al mínimo'}
        </button>
      </div>
    </div>
  )
}
