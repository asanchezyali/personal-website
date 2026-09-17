'use client'

import { useState } from 'react'

type Mode = 'subword' | 'word' | 'span'

interface Piece {
  text: string
  /** True when the piece continues the previous word rather than starting a new one. */
  cont?: boolean
}

interface MaskingGranularityProps {
  pieces?: Piece[]
  labels?: {
    hint?: string
    subword?: string
    word?: string
    span?: string
    hidden?: string
    whole?: string
    leak?: string
    noLeak?: string
    reset?: string
  }
}

const DEFAULT: Piece[] = [
  { text: 'el' },
  { text: 'mode' },
  { text: '##lo', cont: true },
  { text: 'pre' },
  { text: '##entrena', cont: true },
  { text: '##do', cont: true },
  { text: 'recons' },
  { text: '##truye', cont: true },
  { text: 'la' },
  { text: 'fra' },
  { text: '##se', cont: true },
]

export default function MaskingGranularity({
  pieces = DEFAULT,
  labels = {},
}: MaskingGranularityProps) {
  const [mode, setMode] = useState<Mode>('subword')

  // Group the pieces into words: a word starts where a piece is not a continuation.
  const words: number[][] = []
  pieces.forEach((p, i) => {
    if (!p.cont || words.length === 0) words.push([i])
    else words[words.length - 1].push(i)
  })

  // Deterministic choices, so the figure is stable between modes.
  const targetWord = 1 // the second word, which is split in two
  const longWord = 2 // the word split into three, where a surviving piece gives most away

  let hidden: Set<number>
  if (mode === 'subword') hidden = new Set([words[longWord][1]])
  else if (mode === 'word') hidden = new Set(words[longWord])
  else hidden = new Set([...words[targetWord], ...words[targetWord + 1]])

  // A word is only partly hidden when some of its pieces survive as cues.
  const partial = words.filter(
    (w) => w.some((i) => hidden.has(i)) && w.some((i) => !hidden.has(i))
  ).length

  const modes: [Mode, string][] = [
    ['subword', labels.subword ?? 'subword'],
    ['word', labels.word ?? 'whole word'],
    ['span', labels.span ?? 'span'],
  ]

  return (
    <div className="perm">
      <div className="perm-stage">
        <div className="perm-row">
          {pieces.map((p, i) => (
            <span
              key={i}
              className={hidden.has(i) ? 'mg-tok is-hidden' : p.cont ? 'mg-tok is-cont' : 'mg-tok'}
            >
              {hidden.has(i) ? '[MASK]' : p.text}
            </span>
          ))}
        </div>
        <p className={`lyr-verdict ${partial > 0 ? 'is-bad' : 'is-ok'}`} aria-live="polite">
          {partial > 0
            ? (labels.leak ?? 'the surviving pieces give the word away')
            : (labels.noLeak ?? 'no piece of the word survives as a cue')}
        </p>
      </div>

      <div className="perm-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'A word split into pieces can be recovered from the pieces left behind.'}
        </p>

        <div className="am-modes">
          {modes.map(([m, label]) => (
            <button
              key={m}
              type="button"
              className={mode === m ? 'am-mode is-on' : 'am-mode'}
              onClick={() => setMode(m)}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="mplay-readout" aria-live="polite">
          {labels.hidden ?? 'pieces hidden'} = <strong>{hidden.size}</strong> ·{' '}
          {labels.whole ?? 'words left half-open'} = <strong>{partial}</strong>
        </p>

        <button className="mplay-reset" type="button" onClick={() => setMode('subword')}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
