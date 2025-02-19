'use client'

import React from 'react'

interface CalendlyProps {
  buttonText?: string
  buttonClassName?: string
}

const Calendly: React.FC<CalendlyProps> = ({
  buttonText = 'Schedule a meeting',
  buttonClassName,
}) => {
  const defaultButtonClasses =
    'rounded-lg bg-secondary-950 px-8 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-secondary-950'

  return (
    <a
      href="https://calendly.com/hello-piagents/30min"
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClassName || defaultButtonClasses}
    >
      {buttonText}
    </a>
  )
}

export default Calendly
