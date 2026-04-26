import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="wrap"
      style={{
        minHeight: 'calc(100dvh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '64px 24px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--f-ubuntu)',
          fontSize: 'clamp(80px,18vw,160px)',
          fontWeight: 700,
          lineHeight: 0.9,
          background: 'linear-gradient(90deg, var(--p-500), var(--s-500))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          marginBottom: 32,
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        404
      </div>
      <h1 style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: 16 }}>
        Page not found
      </h1>
      <p className="muted" style={{ fontSize: 17, maxWidth: '48ch', marginBottom: 32 }}>
        Sorry, we couldn&apos;t find what you were looking for. But don&apos;t worry — there&apos;s plenty more to explore.
      </p>
      <Link href="/" className="btn primary">
        Back to homepage <span className="a">→</span>
      </Link>
    </div>
  )
}
