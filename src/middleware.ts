import { NextResponse, NextRequest } from 'next/server'

const fallbackLng = 'en'
const locales = ['en', 'es'] as const

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  if (pathname.startsWith(`/${fallbackLng}/`) || pathname === `/${fallbackLng}`) {
    return NextResponse.redirect(
      new URL(pathname.replace(`/${fallbackLng}`, pathname === `/${fallbackLng}` ? '/' : ''), request.url)
    )
  }
  const missing = locales.every((l) => !pathname.startsWith(`/${l}/`) && pathname !== `/${l}`)
  if (missing) {
    return NextResponse.rewrite(new URL(`/${fallbackLng}${pathname}`, request.url))
  }
}

export const config = {
  matcher: ['/', '/((?!api|static|track|data|css|scripts|_next|.*\\..*).*)', '/sitemap.xml'],
}
