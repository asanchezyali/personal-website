'use client'

import { useMemo, useState } from 'react'

interface EnergyCompactionProps {
  n?: number
  labels?: {
    hint?: string
    keep?: string
    canonical?: string
    cosine?: string
    error?: string
    energy?: string
    note?: string
  }
}

/** A smooth signal plus a small step, sampled at n points. */
function signal(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    return 2 * Math.sin(Math.PI * t) + 0.6 * t + (t > 0.7 ? 0.4 : 0)
  })
}

/** Orthonormal DCT-II basis vector k, evaluated at n points. */
function dctBasis(n: number, k: number) {
  const s = k === 0 ? Math.sqrt(1 / n) : Math.sqrt(2 / n)
  return Array.from({ length: n }, (_, i) => s * Math.cos((Math.PI * (i + 0.5) * k) / n))
}

export default function EnergyCompaction({ n = 16, labels = {} }: EnergyCompactionProps) {
  const [keep, setKeep] = useState(3)

  const { x, coefCanon, coefDct, recon, err, energyKept } = useMemo(() => {
    const x = signal(n)
    const basis = Array.from({ length: n }, (_, k) => dctBasis(n, k))
    // Orthonormal basis: coordinates are dot products, no system to solve.
    const coefDct = basis.map((b) => b.reduce((s, v, i) => s + v * x[i], 0))

    const order = coefDct.map((c, k) => ({ c: Math.abs(c), k })).sort((a, b) => b.c - a.c)
    const keepSet = new Set(order.slice(0, keep).map((o) => o.k))
    const recon = Array.from({ length: n }, (_, i) =>
      basis.reduce((s, b, k) => (keepSet.has(k) ? s + coefDct[k] * b[i] : s), 0)
    )
    const total = x.reduce((s, v) => s + v * v, 0)
    const resid = x.reduce((s, v, i) => s + (v - recon[i]) ** 2, 0)
    return {
      x,
      coefCanon: x,
      coefDct,
      recon,
      err: Math.sqrt(resid / total),
      energyKept: 1 - resid / total,
    }
  }, [n, keep])

  const maxAbs = (a: number[]) => Math.max(...a.map(Math.abs))
  const mc = maxAbs(coefCanon)
  const md = maxAbs(coefDct)

  const bars = (a: number[], scale: number, cls: string, highlight?: Set<number>) => (
    <div className="ec-bars">
      {a.map((v, i) => (
        <span
          key={i}
          className={`ec-bar ${cls} ${highlight && !highlight.has(i) ? 'is-dropped' : ''}`}
          style={{ height: `${Math.max(1.5, (Math.abs(v) / scale) * 100)}%` }}
        />
      ))}
    </div>
  )

  const order = coefDct.map((c, k) => ({ c: Math.abs(c), k })).sort((a, b) => b.c - a.c)
  const keepSet = new Set(order.slice(0, keep).map((o) => o.k))

  const plot = (a: number[], cls: string) => {
    const mx = Math.max(...a),
      mn = Math.min(...a)
    const pts = a.map(
      (v, i) => `${(i / (a.length - 1)) * 100},${30 - ((v - mn) / (mx - mn || 1)) * 28}`
    )
    return <polyline className={cls} points={pts.join(' ')} />
  }

  return (
    <div className="ec">
      <div className="ec-stage">
        <div className="ec-panel">
          <span className="mmul-name">{labels.canonical ?? 'base canónica'}</span>
          {bars(coefCanon, mc, 'is-canon')}
        </div>
        <div className="ec-panel">
          <span className="mmul-name">{labels.cosine ?? 'base coseno'}</span>
          {bars(coefDct, md, 'is-dct', keepSet)}
        </div>
        <svg
          className="ec-signal"
          viewBox="0 0 100 32"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {plot(x, 'ec-orig')}
          {plot(recon, 'ec-recon')}
        </svg>
      </div>

      <div className="ec-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'The same vector, its coordinates in two bases.'}
        </p>

        <label className="mplay-slider">
          <span className="mplay-name">k</span>
          <input
            type="range"
            min={1}
            max={n}
            step={1}
            value={keep}
            onChange={(e) => setKeep(Number(e.target.value))}
            aria-label="coefficients kept"
          />
          <span className="mplay-val">{keep}</span>
        </label>

        <p className="mplay-readout" aria-live="polite">
          {labels.keep ?? 'coeficientes'} {keep}/{n} · {labels.energy ?? 'energía'}{' '}
          {(energyKept * 100).toFixed(2)} %
        </p>
        <p className="mplay-readout">
          {labels.error ?? 'error relativo'} = {(err * 100).toFixed(2)} %
        </p>
        <p className="cs-note">
          {labels.note ??
            'In the canonical basis every coordinate matters; in the cosine basis a few carry almost all the energy.'}
        </p>
      </div>
    </div>
  )
}
