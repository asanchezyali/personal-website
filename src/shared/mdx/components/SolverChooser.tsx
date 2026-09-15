'use client'

import { useState } from 'react'

type Shape = 'square' | 'tall' | 'wide'
type Rank = 'full' | 'deficient'
type Kind = 'dense' | 'sparse-spd' | 'sparse-general'

interface Option<T> {
  value: T
  label: string
}

interface SolverChooserProps {
  labels?: {
    shape?: string
    rank?: string
    kind?: string
    recommends?: string
    why?: string
  }
  options?: {
    shape?: Option<Shape>[]
    rank?: Option<Rank>[]
    kind?: Option<Kind>[]
  }
  answers?: Record<string, { call: string; why: string }>
}

const DEFAULT_ANSWERS: Record<string, { call: string; why: string }> = {
  'square|full|dense': { call: 'np.linalg.solve(A, b)', why: 'Unique solution; LU with partial pivoting.' },
  'square|deficient|dense': { call: 'np.linalg.lstsq(A, b, rcond=None)', why: 'Singular: solve raises. lstsq returns the minimum-norm least-squares solution.' },
  'tall|full|dense': { call: 'np.linalg.lstsq(A, b, rcond=None)', why: 'Overdetermined: no exact solution. QR, without forming AᵀA.' },
  'tall|deficient|dense': { call: 'np.linalg.lstsq(A, b, rcond=None)', why: 'Rank-deficient least squares: the SVD path picks the minimum-norm minimiser.' },
  'wide|full|dense': { call: 'np.linalg.lstsq(A, b, rcond=None)', why: 'Underdetermined: infinitely many solutions, and lstsq returns the one of least norm.' },
  'wide|deficient|dense': { call: 'np.linalg.lstsq(A, b, rcond=None)', why: 'Same as above; rcond decides which singular values count as zero.' },
  'square|full|sparse-spd': { call: 'scipy.sparse.linalg.cg(A, b)', why: 'Conjugate gradient: needs only products A·v, and requires symmetric positive definite.' },
  'square|deficient|sparse-spd': { call: 'scipy.sparse.linalg.lsqr(A, b)', why: 'Singular or near-singular: lsqr is the least-squares iterative method.' },
  'square|full|sparse-general': { call: 'scipy.sparse.linalg.gmres(A, b)', why: 'Non-symmetric: GMRES, since CG does not apply.' },
  'square|deficient|sparse-general': { call: 'scipy.sparse.linalg.lsqr(A, b)', why: 'Rank-deficient and sparse: lsqr tolerates it.' },
  'tall|full|sparse-spd': { call: 'scipy.sparse.linalg.lsqr(A, b)', why: 'Sparse least squares without forming AᵀA.' },
  'tall|deficient|sparse-spd': { call: 'scipy.sparse.linalg.lsqr(A, b)', why: 'Sparse least squares without forming AᵀA.' },
  'tall|full|sparse-general': { call: 'scipy.sparse.linalg.lsqr(A, b)', why: 'Sparse least squares without forming AᵀA.' },
  'tall|deficient|sparse-general': { call: 'scipy.sparse.linalg.lsqr(A, b)', why: 'Sparse least squares without forming AᵀA.' },
  'wide|full|sparse-spd': { call: 'scipy.sparse.linalg.lsqr(A, b)', why: 'Underdetermined and sparse: lsqr converges to the minimum-norm solution.' },
  'wide|deficient|sparse-spd': { call: 'scipy.sparse.linalg.lsqr(A, b)', why: 'Underdetermined and sparse: lsqr converges to the minimum-norm solution.' },
  'wide|full|sparse-general': { call: 'scipy.sparse.linalg.lsqr(A, b)', why: 'Underdetermined and sparse: lsqr converges to the minimum-norm solution.' },
  'wide|deficient|sparse-general': { call: 'scipy.sparse.linalg.lsqr(A, b)', why: 'Underdetermined and sparse: lsqr converges to the minimum-norm solution.' },
}

export default function SolverChooser({ labels = {}, options = {}, answers }: SolverChooserProps) {
  const shapes = options.shape ?? [
    { value: 'square', label: 'm = n' },
    { value: 'tall', label: 'm > n' },
    { value: 'wide', label: 'm < n' },
  ]
  const ranks = options.rank ?? [
    { value: 'full', label: 'full rank' },
    { value: 'deficient', label: 'deficient' },
  ]
  const kinds = options.kind ?? [
    { value: 'dense', label: 'dense' },
    { value: 'sparse-spd', label: 'sparse, SPD' },
    { value: 'sparse-general', label: 'sparse, general' },
  ]

  const [shape, setShape] = useState<Shape>('square')
  const [rank, setRank] = useState<Rank>('full')
  const [kind, setKind] = useState<Kind>('dense')

  const table = answers ?? DEFAULT_ANSWERS
  const pick = table[`${shape}|${rank}|${kind}`] ?? DEFAULT_ANSWERS['square|full|dense']

  const group = <T extends string>(
    title: string,
    opts: Option<T>[],
    value: T,
    set: (v: T) => void
  ) => (
    <div className="chooser-group">
      <span className="chooser-label">{title}</span>
      <div className="chooser-opts">
        {opts.map((o) => (
          <button
            key={o.value}
            type="button"
            className={o.value === value ? 'bc-preset is-active' : 'bc-preset'}
            onClick={() => set(o.value)}
            aria-pressed={o.value === value}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="chooser">
      <div className="chooser-stage">
        <p className="chooser-recommends">{labels.recommends ?? 'use'}</p>
        <pre className="chooser-call">
          <code>{pick.call}</code>
        </pre>
        <p className="chooser-why">
          <span>{labels.why ?? 'why'}</span> {pick.why}
        </p>
      </div>

      <div className="chooser-controls">
        {group<Shape>(labels.shape ?? 'shape', shapes, shape, setShape)}
        {group<Rank>(labels.rank ?? 'rank', ranks, rank, setRank)}
        {group<Kind>(labels.kind ?? 'structure', kinds, kind, setKind)}
      </div>
    </div>
  )
}
