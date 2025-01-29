import { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
}

export default function SectionContainer({ children }: SectionContainerProps) {
  return (
    <section className="mx-auto px-4 sm:px-8 max-w-7xl">{children}</section>
  )
}
