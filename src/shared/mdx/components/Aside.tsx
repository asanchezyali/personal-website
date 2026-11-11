interface AsideProps {
  /** Short label shown in bold, e.g. the reader's objection. */
  title?: string
  /** 'note' answers a question; 'warn' flags a trap. */
  tone?: 'note' | 'warn'
  children: React.ReactNode
}

/**
 * Sidenote for depth on demand: a sceptical reader's objection answered inline,
 * or a trap worth flagging. Reuses the site's `.callout` styles.
 */
export default function Aside({ title, tone = 'note', children }: AsideProps) {
  return (
    <aside className={tone === 'warn' ? 'callout warn aside' : 'callout aside'}>
      <span className="ic" aria-hidden="true">
        {tone === 'warn' ? '!' : '?'}
      </span>
      <div>
        {title ? <strong>{title}</strong> : null}
        {children}
      </div>
    </aside>
  )
}
