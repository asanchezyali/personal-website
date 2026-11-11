'use client'

import { useState } from 'react'

interface Bucket {
  id: string
  label: string
  /** Source lines in this bucket. */
  lines: number
}

interface CodeShareProps {
  buckets: Bucket[]
  /** Bucket id that holds the model call; it is the answer the reader guesses. */
  answer: string
  /** Optional finer number revealed with the answer, e.g. lines inside the call itself. */
  exactLines?: number
  /** BCP 47 locale for number formatting, e.g. 'es-CO'. */
  locale?: string
  labels?: {
    question?: string
    guess?: string
    reveal?: string
    yourGuess?: string
    actual?: string
    exact?: string
    lines?: string
    reset?: string
  }
}

/**
 * Predict-then-reveal bar chart: the reader guesses what share of a codebase calls
 * the model, then sees where the lines really live.
 */
export default function CodeShare({
  buckets,
  answer,
  exactLines,
  locale,
  labels = {},
}: CodeShareProps) {
  const [guess, setGuess] = useState(30)
  const [revealed, setRevealed] = useState(false)

  const total = buckets.reduce((s, b) => s + b.lines, 0)
  const sorted = [...buckets].sort((a, b) => b.lines - a.lines)
  const max = sorted[0]?.lines ?? 1
  const target = buckets.find((b) => b.id === answer)
  const actualPct = target ? (target.lines / total) * 100 : 0
  const nf = new Intl.NumberFormat(locale)
  const fmtPct = (x: number) => {
    const digits = x < 1 ? 2 : 1
    const n = new Intl.NumberFormat(locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })
    return `${n.format(x)} %`
  }

  return (
    <div className="cshare">
      <div className="cshare-ask">
        <p className="cshare-q">
          {labels.question ?? 'What share of the code do you think calls the model?'}
        </p>
        <label className="mplay-slider">
          <span className="mplay-name">{labels.guess ?? 'guess'}</span>
          <input
            type="range"
            min={0}
            max={60}
            step={1}
            value={guess}
            disabled={revealed}
            onChange={(e) => setGuess(Number(e.target.value))}
            aria-label={labels.guess ?? 'guess'}
          />
          <span className="mplay-val">{guess}%</span>
        </label>
        {revealed ? (
          <button className="mplay-reset" type="button" onClick={() => setRevealed(false)}>
            {labels.reset ?? 'Guess again'}
          </button>
        ) : (
          <button className="cshare-reveal" type="button" onClick={() => setRevealed(true)}>
            {labels.reveal ?? 'Reveal'}
          </button>
        )}
      </div>

      {revealed ? (
        <div className="cshare-bars" aria-live="polite">
          <p className="cshare-verdict">
            {labels.yourGuess ?? 'Your guess'}: <strong>{guess}%</strong> ·{' '}
            {labels.actual ?? 'Actual'}: <strong>{fmtPct(actualPct)}</strong>
            {exactLines !== undefined ? (
              <>
                {' '}
                · {labels.exact ?? 'inside the call itself'}:{' '}
                <strong>{fmtPct((exactLines / total) * 100)}</strong> ({exactLines}{' '}
                {labels.lines ?? 'lines'})
              </>
            ) : null}
          </p>
          {sorted.map((b) => (
            <div key={b.id} className={b.id === answer ? 'cshare-row is-answer' : 'cshare-row'}>
              <span className="cshare-label">{b.label}</span>
              <span className="dec-track">
                <span className="cshare-bar" style={{ width: `${(b.lines / max) * 100}%` }} />
              </span>
              <span className="dec-val">
                {nf.format(b.lines)} · {fmtPct((b.lines / total) * 100)}
              </span>
            </div>
          ))}
          <p className="cs-note">
            {nf.format(total)} {labels.lines ?? 'lines'}
          </p>
        </div>
      ) : null}
    </div>
  )
}
