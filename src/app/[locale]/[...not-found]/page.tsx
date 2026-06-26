import { notFound } from 'next/navigation'

// Catch-all that matches any unmatched URL under a locale and triggers the
// localized not-found UI (src/app/[locale]/not-found.tsx). Without this, Next
// falls back to its built-in default 404 for unmatched routes.
export default function NotFoundCatchAll() {
  notFound()
}
