interface Stat {
  value: string
  label: string
}

interface Row {
  k: string
  v: string
}

interface CaseSummaryProps {
  stats?: Stat[]
  rows: Row[]
}

export default function CaseSummary({ stats, rows }: CaseSummaryProps) {
  return (
    <aside className="case-summary">
      {stats && stats.length > 0 && (
        <div className="case-stats">
          {stats.map((s, i) => (
            <div className="case-stat" key={i}>
              <span className="case-stat-value">{s.value}</span>
              <span className="case-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      )}
      <dl className="case-rows">
        {rows.map((r, i) => (
          <div className="case-row" key={i}>
            <dt className="case-row-k">{r.k}</dt>
            <dd className="case-row-v">{r.v}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}
