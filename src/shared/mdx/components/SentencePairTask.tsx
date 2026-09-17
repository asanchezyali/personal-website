'use client'

import { useState } from 'react'

interface SentencePairTaskProps {
  a?: string
  b?: string
  /** A sentence lifted from an unrelated document: the NSP negative. */
  other?: string
  labels?: {
    hint?: string
    nsp?: string
    sop?: string
    positive?: string
    negative?: string
    cue?: string
    nspCue?: string
    sopCue?: string
    evidence?: string
    reset?: string
  }
}

export default function SentencePairTask({
  a = 'The kernel of a matrix collects the vectors the map annihilates.',
  b = 'Its dimension completes the rank up to the number of columns.',
  other = 'The recipe calls for two eggs and a little flour.',
  labels = {},
}: SentencePairTaskProps) {
  const [task, setTask] = useState<'nsp' | 'sop'>('nsp')

  // Both tasks share the positive; only the negative is built differently.
  const negative = task === 'nsp' ? [a, other] : [b, a]

  return (
    <div className="perm">
      <div className="perm-stage">
        <div className="sp-card is-pos">
          <span className="sp-tag">{labels.positive ?? 'positive'}</span>
          <p>{a}</p>
          <p>{b}</p>
        </div>
        <div className="sp-card is-neg">
          <span className="sp-tag">{labels.negative ?? 'negative'}</span>
          <p>{negative[0]}</p>
          <p className={task === 'nsp' ? 'is-offtopic' : undefined}>{negative[1]}</p>
        </div>
      </div>

      <div className="perm-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'Both tasks share the positive pair. Only the negative differs.'}
        </p>

        <div className="am-modes">
          <button
            type="button"
            className={task === 'nsp' ? 'am-mode is-on' : 'am-mode'}
            onClick={() => setTask('nsp')}
          >
            {labels.nsp ?? 'NSP'}
          </button>
          <button
            type="button"
            className={task === 'sop' ? 'am-mode is-on' : 'am-mode'}
            onClick={() => setTask('sop')}
          >
            {labels.sop ?? 'SOP'}
          </button>
        </div>

        <p className="mplay-readout" aria-live="polite">
          {labels.cue ?? 'to tell them apart'}:{' '}
          <strong>
            {task === 'nsp'
              ? (labels.nspCue ?? 'a change of topic suffices')
              : (labels.sopCue ?? 'the topic is identical; only order helps')}
          </strong>
        </p>
        <p className="cs-note">
          {labels.evidence ??
            'Measured in ALBERT: a model trained on NSP scores 52.0% on SOP, which is chance. One trained on SOP scores 78.9% on NSP.'}
        </p>

        <button className="mplay-reset" type="button" onClick={() => setTask('nsp')}>
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
