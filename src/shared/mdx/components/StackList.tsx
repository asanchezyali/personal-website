interface StackItem {
  name: string
  what?: string
  why: string
}

interface StackListProps {
  title?: string
  items: StackItem[]
}

export default function StackList({ title, items }: StackListProps) {
  return (
    <div className="stack-group">
      {title && <div className="stack-group-label">{title}</div>}
      <div className="stack-list">
        {items.map((item, i) => (
          <div className="stack-row" key={i}>
            <div className="stack-head">
              <span className="stack-name">{item.name}</span>
              {item.what && <span className="stack-what">{item.what}</span>}
            </div>
            <p className="stack-why">{item.why}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
