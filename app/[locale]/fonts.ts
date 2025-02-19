import { Ubuntu, Lato, Overlock } from 'next/font/google'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  variable: '--font-ubuntu',
  weight: ['400', '500', '700'],
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['100', '300', '400', '700', '900'],
})

const overlock = Overlock({
  subsets: ['latin'],
  variable: '--font-overlock',
  weight: ['400', '700', '900'],
})

export { ubuntu, lato, overlock }
