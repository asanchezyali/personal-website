'use client'

import { useMemo, useState } from 'react'

interface DependenceDegreeProps {
  labels?: {
    hint?: string
    singular?: string
    cond?: string
    vif?: string
    rank?: string
    reset?: string
    note?: string
  }
}

const C1 = [1, 2, 3, 4, 5, 6, 7, 8]
const C2 = [2, 1, 4, 3, 6, 5, 8, 7]
const D = [3, 1, 4, 1, 5, 9, 2, 6]

/** Eigenvalues of a symmetric 3×3 by cyclic Jacobi rotations. */
function eigSym3(M: number[][]) {
  const A = M.map((r) => [...r])
  for (let sweep = 0; sweep < 60; sweep++) {
    let p = 0, q = 1, mx = 0
    for (let i = 0; i < 3; i++)
      for (let j = i + 1; j < 3; j++)
        if (Math.abs(A[i][j]) > mx) { mx = Math.abs(A[i][j]); p = i; q = j }
    if (mx < 1e-14) break
    const th = 0.5 * Math.atan2(2 * A[p][q], A[p][p] - A[q][q])
    const c = Math.cos(th), s = Math.sin(th)
    for (let k = 0; k < 3; k++) {
      const apk = A[p][k], aqk = A[q][k]
      A[p][k] = c * apk + s * aqk
      A[q][k] = -s * apk + c * aqk
    }
    for (let k = 0; k < 3; k++) {
      const akp = A[k][p], akq = A[k][q]
      A[k][p] = c * akp + s * akq
      A[k][q] = -s * akp + c * akq
    }
  }
  return [A[0][0], A[1][1], A[2][2]].sort((a, b) => b - a)
}

/** R² of regressing y on the columns of X, with intercept, by normal equations. */
function rSquared(X: number[][], y: number[]) {
  const n = y.length
  const my = y.reduce((s, v) => s + v, 0) / n
  const cols = X[0].length
  const G: number[][] = []
  const rhs: number[] = []
  for (let i = 0; i < cols; i++) {
    G.push(Array.from({ length: cols }, (_, j) =>
      X.reduce((s, row) => s + row[i] * row[j], 0)))
    rhs.push(X.reduce((s, row, k) => s + row[i] * y[k], 0))
  }
  // Gauss-Jordan on [G | rhs]
  const m = G.map((r, i) => [...r, rhs[i]])
  for (let c = 0; c < cols; c++) {
    let p = c
    for (let r = c; r < cols; r++) if (Math.abs(m[r][c]) > Math.abs(m[p][c])) p = r
    if (Math.abs(m[p][c]) < 1e-12) return 1
    ;[m[c], m[p]] = [m[p], m[c]]
    const pv = m[c][c]
    for (let j = 0; j <= cols; j++) m[c][j] /= pv
    for (let r = 0; r < cols; r++) {
      if (r === c) continue
      const f = m[r][c]
      for (let j = 0; j <= cols; j++) m[r][j] -= f * m[c][j]
    }
  }
  const beta = m.map((r) => r[cols])
  let ssr = 0, sst = 0
  for (let k = 0; k < n; k++) {
    const pred = X[k].reduce((s, v, i) => s + v * beta[i], 0)
    ssr += (y[k] - pred) ** 2
    sst += (y[k] - my) ** 2
  }
  return sst < 1e-14 ? 1 : 1 - ssr / sst
}

export default function DependenceDegree({ labels = {} }: DependenceDegreeProps) {
  const [alpha, setAlpha] = useState(0.5)

  const { sigmas, cond, vif, rank } = useMemo(() => {
    const c3 = C1.map((_, i) => (1 - alpha) * D[i] + alpha * (C1[i] + C2[i]))
    const X = C1.map((_, i) => [C1[i], C2[i], c3[i]])
    // Gram matrix and its eigenvalues give the singular values of X.
    const G = [0, 1, 2].map((i) =>
      [0, 1, 2].map((j) => X.reduce((s, r) => s + r[i] * r[j], 0)))
    const ev = eigSym3(G)
    const s = ev.map((v) => Math.sqrt(Math.max(0, v)))
    // Singular values recovered from the eigenvalues of XᵀX keep only about half
    // the digits, since forming the Gram matrix squares the condition number. The
    // usable threshold is therefore √ε·σ₁ and not ε·σ₁.
    const tol = 3 * Math.sqrt(2.220446049250313e-16) * s[0]
    // VIF of the third column against a constant and the first two.
    const ones = C1.map(() => 1)
    const r2 = rSquared(C1.map((_, i) => [ones[i], C1[i], C2[i]]), c3)
    return {
      sigmas: s,
      cond: s[2] > tol ? s[0] / s[2] : Infinity,
      vif: r2 >= 1 - 1e-12 ? Infinity : 1 / (1 - r2),
      rank: s.filter((v) => v > tol).length,
    }
  }, [alpha])

  const sci = (v: number) =>
    !Number.isFinite(v) ? '∞' : v >= 1e4 ? v.toExponential(1) : v.toFixed(2)

  const max = sigmas[0]
  const severity = !Number.isFinite(vif) || vif > 100 ? 'is-bad' : vif > 10 ? 'is-warn' : 'is-ok'

  return (
    <div className="ddeg">
      <div className="ddeg-stage">
        <div className="scost-bars">
          {sigmas.map((s, i) => (
            <div className="scost-row" key={i}>
              <span className="scost-label">σ{i + 1}</span>
              <div className="scost-bar">
                <span
                  className={i === 2 ? severity : 'is-ok'}
                  style={{ width: `${Math.max(0.5, (s / max) * 100)}%` }}
                />
              </div>
              <span className="scost-value">{sci(s)}</span>
            </div>
          ))}
        </div>

        <dl className="cond-readout">
          <div>
            <dt>{labels.rank ?? 'matrix_rank'}</dt>
            <dd className={rank < 3 ? 'is-bad' : ''}>{rank}</dd>
          </div>
          <div>
            <dt>{labels.cond ?? 'cond(X)'}</dt>
            <dd className={severity}>{sci(cond)}</dd>
          </div>
          <div>
            <dt>{labels.vif ?? 'VIF de x₃'}</dt>
            <dd className={severity}>{sci(vif)}</dd>
          </div>
          <div>
            <dt>α</dt>
            <dd>{alpha.toFixed(2)}</dd>
          </div>
        </dl>
      </div>

      <div className="ddeg-controls">
        <p className="dvec-hint">{labels.hint ?? 'x₃ = (1 − α)·d + α·(x₁ + x₂). At α = 1 it is exactly the sum of the other two.'}</p>

        <label className="mplay-slider">
          <span className="mplay-name">α</span>
          <input type="range" min={0} max={1} step={0.01} value={alpha}
                 onChange={(e) => setAlpha(Number(e.target.value))} aria-label="alpha" />
          <span className="mplay-val">{alpha.toFixed(2)}</span>
        </label>

        <p className="cs-note">{labels.note ?? 'The rank flips at the very end; the condition number and the VIF grow throughout.'}</p>

        <button className="mplay-reset" type="button" onClick={() => setAlpha(0.5)}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
