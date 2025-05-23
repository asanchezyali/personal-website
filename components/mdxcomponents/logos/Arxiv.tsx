import React from 'react'

interface ArxivProps {
  className?: string
}

function Arxiv(props: ArxivProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.732 24.269" {...props}>
      <g>
        <path
          fill="#bdb9b4"
          d="M573.549 280.916l2.266 2.738 6.674-7.84c.353-.47.52-.717.353-1.117a1.218 1.218 0 00-1.061-.748.953.953 0 00-.712.262z"
          transform="translate(-566.984 -271.548)"
        ></path>
        <path
          fill="#b31b1b"
          d="M579.525 282.225l-10.606-10.174a1.413 1.413 0 00-.834-.5 1.09 1.09 0 00-1.027.66c-.167.4-.047.681.319 1.206l8.44 10.242-6.282 7.716a1.336 1.336 0 00-.323 1.3 1.114 1.114 0 001.04.69A.992.992 0 00571 293l8.519-7.92a1.924 1.924 0 00.006-2.855z"
          transform="translate(-566.984 -271.548)"
        ></path>
        <path
          fill="#bdb9b4"
          d="M584.32 293.912l-8.525-10.275-2.265-2.737-1.389 1.254a2.063 2.063 0 000 2.965l10.812 10.419a.925.925 0 00.742.282 1.039 1.039 0 00.953-.667 1.261 1.261 0 00-.328-1.241z"
          transform="translate(-566.984 -271.548)"
        ></path>
      </g>
    </svg>
  )
}

export default Arxiv
