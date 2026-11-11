interface FigureProps {
  /** Figure number, referenced from the prose as "Figure n". */
  n: number
  /** Word printed before the number ("Figure", "Figura"). */
  label?: string
  caption: React.ReactNode
  children: React.ReactNode
}

/** Numbered figure with a caption under any diagram or interactive component. */
export default function Figure({ n, label = 'Figure', caption, children }: FigureProps) {
  return (
    <figure className="fig" id={`fig-${n}`}>
      {children}
      <figcaption className="fig-cap">
        <span className="fig-num">
          {label} {n}.
        </span>{' '}
        {caption}
      </figcaption>
    </figure>
  )
}
