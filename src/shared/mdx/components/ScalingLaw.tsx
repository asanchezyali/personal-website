'use client'

import { useState } from 'react'

interface ScalingLawProps {
  labels?: {
    hint?: string
    frontier?: string
    isoCompute?: string
    optimum?: string
    params?: string
    tokens?: string
    ratio?: string
    gain?: string
    note?: string
    reset?: string
  }
}

const W = 340
const H = 250
const PAD_L = 42
const PAD_B = 34
const PAD_T = 14
const PAD_R = 12

// Axis ranges, in powers of ten.
const NX = [9, 12.2] as const
const DY = [10, 13.6] as const

/** Chinchilla: at the compute optimum D = 20N, and C ≈ 6ND, so C = 120N². */
const optimum = (C: number) => {
  const N = Math.sqrt(C / 120)
  return { N, D: 20 * N }
}

// GPT-3 and Gopher share a token count, so their labels are placed on opposite sides.
const MODELS = [
  { name: 'GPT-3', N: 175e9, D: 300e9, dx: -8, anchor: 'end' as const },
  { name: 'Gopher', N: 280e9, D: 300e9, dx: 8, anchor: 'start' as const },
  { name: 'Chinchilla', N: 70e9, D: 1.4e12, dx: 8, anchor: 'start' as const },
]

export default function ScalingLaw({ labels = {} }: ScalingLawProps) {
  // The slider carries log10(C); the budget itself spans four orders of magnitude.
  const [logC, setLogC] = useState(23.5)
  const C = Math.pow(10, logC)

  const x = (logN: number) => PAD_L + ((logN - NX[0]) / (NX[1] - NX[0])) * (W - PAD_L - PAD_R)
  const y = (logD: number) => H - PAD_B - ((logD - DY[0]) / (DY[1] - DY[0])) * (H - PAD_B - PAD_T)

  const { N: Nopt, D: Dopt } = optimum(C)

  // D = 20N is a straight line of slope 1 on log-log axes.
  const fA = { n: NX[0], d: NX[0] + Math.log10(20) }
  const fB = { n: NX[1], d: NX[1] + Math.log10(20) }
  // C = 6ND is a straight line of slope −1.
  const iso = (logN: number) => Math.log10(C) - Math.log10(6) - logN
  const iA = { n: NX[0], d: iso(NX[0]) }
  const iB = { n: NX[1], d: iso(NX[1]) }

  const fmtN = (v: number) =>
    v >= 1e12 ? `${(v / 1e12).toFixed(2)} T` : `${(v / 1e9).toFixed(0)} B`
  const fmtD = (v: number) =>
    v >= 1e12 ? `${(v / 1e12).toFixed(2)} T` : `${(v / 1e9).toFixed(0)} B`
  // Kaplan's compute exponent: a tenfold budget buys this much less loss.
  const gain = (1 - Math.pow(10, -0.05)) * 100

  return (
    <div className="dvec">
      <div className="dvec-canvas">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={labels.hint ?? 'Parameters against tokens, with the compute-optimal frontier'}
        >
          <clipPath id="sl-clip">
            <rect x={PAD_L} y={PAD_T} width={W - PAD_L - PAD_R} height={H - PAD_B - PAD_T} />
          </clipPath>

          {[10, 11, 12, 13].map((d) => (
            <g key={d}>
              <line className="sl-grid" x1={PAD_L} y1={y(d)} x2={W - PAD_R} y2={y(d)} />
              <text
                className="sl-tick"
                x={PAD_L - 6}
                y={y(d) + 3}
                textAnchor="end"
              >{`10^${d}`}</text>
            </g>
          ))}
          {[9, 10, 11, 12].map((n) => (
            <g key={n}>
              <line className="sl-grid" x1={x(n)} y1={PAD_T} x2={x(n)} y2={H - PAD_B} />
              <text
                className="sl-tick"
                x={x(n)}
                y={H - PAD_B + 12}
                textAnchor="middle"
              >{`10^${n}`}</text>
            </g>
          ))}

          <g clipPath="url(#sl-clip)">
            <line className="sl-iso" x1={x(iA.n)} y1={y(iA.d)} x2={x(iB.n)} y2={y(iB.d)} />
            <line className="sl-frontier" x1={x(fA.n)} y1={y(fA.d)} x2={x(fB.n)} y2={y(fB.d)} />

            {MODELS.map((m) => (
              <g key={m.name}>
                <circle
                  className="sl-model"
                  cx={x(Math.log10(m.N))}
                  cy={y(Math.log10(m.D))}
                  r={4.5}
                />
                <text
                  className="sl-name"
                  x={x(Math.log10(m.N)) + m.dx}
                  y={y(Math.log10(m.D)) + 3}
                  textAnchor={m.anchor}
                >
                  {m.name}
                </text>
              </g>
            ))}

            <circle className="sl-opt" cx={x(Math.log10(Nopt))} cy={y(Math.log10(Dopt))} r={6} />
          </g>

          <line className="vplot-axis" x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} />
          <line className="vplot-axis" x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} />
          <text className="sl-axis" x={(W + PAD_L) / 2} y={H - 4} textAnchor="middle">
            {labels.params ?? 'parameters N'}
          </text>
          <text
            className="sl-axis"
            x={12}
            y={(H - PAD_B + PAD_T) / 2}
            textAnchor="middle"
            transform={`rotate(-90 12 ${(H - PAD_B + PAD_T) / 2})`}
          >
            {labels.tokens ?? 'tokens D'}
          </text>
        </svg>
      </div>

      <div className="dvec-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'Both axes are logarithmic, so both families of lines are straight.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">C</span>
          <input
            type="range"
            min={21.5}
            max={25}
            step={0.1}
            value={logC}
            onChange={(e) => setLogC(Number(e.target.value))}
            aria-label="compute"
          />
          <span className="mplay-val">{`10^${logC.toFixed(1)}`}</span>
        </label>

        <p className="mplay-readout" aria-live="polite">
          {labels.optimum ?? 'optimum'}: <strong>{fmtN(Nopt)}</strong> ·{' '}
          <strong>{fmtD(Dopt)}</strong> {labels.ratio ?? 'tokens'}
        </p>
        <ul className="fs-legend">
          <li>
            <i className="sl-k-frontier" /> {labels.frontier ?? 'compute-optimal frontier, D = 20N'}
          </li>
          <li>
            <i className="sl-k-iso" /> {labels.isoCompute ?? 'equal compute, C = 6ND'}
          </li>
        </ul>
        <p className="cs-note">
          {labels.gain ?? `Ten times the budget buys about ${gain.toFixed(0)}% less loss.`}
        </p>

        <button className="mplay-reset" type="button" onClick={() => setLogC(23.5)}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
