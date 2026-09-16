'use client'

import { useState } from 'react'

interface AdaptationCostProps {
  labels?: {
    hint?: string
    frozen?: string
    lora?: string
    full?: string
    trainable?: string
    perTask?: string
    tasks?: string
    note?: string
    reset?: string
  }
}

const V = 30522
const POS = 512
const H = 768
const FFN = 3072
const L = 12
const MiB = 1024 * 1024

const layer = (h: number, f: number) => 4 * (h * h + h) + (h * f + f) + (f * h + h) + 2 * 2 * h
const BASE = V * H + POS * H + 2 * H + 2 * H + L * layer(H, FFN) + (H * H + H)
const HEAD = H * 2 + 2

type Mode = 'frozen' | 'lora' | 'full'

export default function AdaptationCost({ labels = {} }: AdaptationCostProps) {
  const [mode, setMode] = useState<Mode>('lora')
  const [rank, setRank] = useState(8)
  const [tasks, setTasks] = useState(8)

  // LoRA on the query and value projections: two matrices per layer, each 2·H·r.
  const loraParams = L * 2 * 2 * H * rank
  const trainable = mode === 'frozen' ? HEAD : mode === 'lora' ? loraParams : BASE
  const perTask = mode === 'full' ? BASE : trainable + HEAD
  const total = BASE + (mode === 'full' ? (tasks - 1) * BASE : tasks * perTask)

  const fmt = (bytes: number) =>
    bytes / MiB < 1 ? `${(bytes / 1024).toFixed(1)} KiB` : `${(bytes / MiB).toFixed(1)} MiB`

  const modes: [Mode, string][] = [
    ['frozen', labels.frozen ?? 'frozen'],
    ['lora', labels.lora ?? 'LoRA'],
    ['full', labels.full ?? 'full fine-tuning'],
  ]

  const maxTotal = BASE * 4 + tasks * BASE * 4

  return (
    <div className="dec">
      <div className="dec-stage">
        <div className="kv-row">
          <span className="kv-label">{labels.trainable ?? 'trainable'}</span>
          <span className="dec-track">
            <span className="kv-bar" style={{ width: `${(trainable / BASE) * 100}%` }} />
          </span>
          <span className="dec-val">{((trainable / BASE) * 100).toFixed(2)}%</span>
        </div>
        <div className="kv-row">
          <span className="kv-label">{labels.perTask ?? 'stored per task'}</span>
          <span className="dec-track">
            <span className="kv-bar is-over" style={{ width: `${(perTask / BASE) * 100}%` }} />
          </span>
          <span className="dec-val">{fmt(perTask * 4)}</span>
        </div>
        <div className="kv-row">
          <span className="kv-label">
            {tasks} {labels.tasks ?? 'tasks'}
          </span>
          <span className="dec-track">
            <span
              className="kv-bar is-weights"
              style={{ width: `${((total * 4) / maxTotal) * 100}%` }}
            />
          </span>
          <span className="dec-val">{fmt(total * 4)}</span>
        </div>
      </div>

      <div className="dec-controls">
        <p className="dvec-hint">
          {labels.hint ?? 'One shared backbone, and what each task costs on top of it.'}
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

        {mode === 'lora' && (
          <label className="mplay-slider">
            <span className="mplay-name">r</span>
            <input
              type="range"
              min={1}
              max={32}
              step={1}
              value={rank}
              onChange={(e) => setRank(Number(e.target.value))}
              aria-label="rank"
            />
            <span className="mplay-val">{rank}</span>
          </label>
        )}
        <label className="mplay-slider">
          <span className="mplay-name">n</span>
          <input
            type="range"
            min={1}
            max={40}
            step={1}
            value={tasks}
            onChange={(e) => setTasks(Number(e.target.value))}
            aria-label="tasks"
          />
          <span className="mplay-val">{tasks}</span>
        </label>

        <p className="cs-note">
          {labels.note ??
            'Full fine-tuning stores a whole copy of BERT per task. The other two store a shared backbone and something small beside it.'}
        </p>

        <button
          className="mplay-reset"
          type="button"
          onClick={() => {
            setMode('lora')
            setRank(8)
            setTasks(8)
          }}
        >
          {labels.reset ?? 'Reset'}
        </button>
      </div>
    </div>
  )
}
