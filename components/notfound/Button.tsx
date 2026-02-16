import Link from 'next/link'
import { Button } from '@/components/ui/button'

type ButtonProps = {
  text: string
  href: string
  style?: string
  rel?: string
}

const ShimmerButton = ({ text, href }: ButtonProps) => {
  return (
    <Button variant="shimmer" asChild>
      <Link
        href={href}
        target={href.startsWith('http') ? `_blank` : ''}
        style={{ textDecoration: 'none' }}
      >
        <span className="relative z-50 text-lg text-white">{text}</span>
      </Link>
    </Button>
  )
}

export default ShimmerButton
