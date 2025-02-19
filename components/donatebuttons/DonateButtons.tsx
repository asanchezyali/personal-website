'use client'

import { Coffee } from 'lucide-react'
import React from 'react'

const DonateButtons = () => {
  return (
    <div className="flex space-x-3 py-8">
      <a
        href="https://ko-fi.com/asanchezyali"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-8 items-center whitespace-nowrap rounded-full bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:bg-primary-50 hover:text-primary-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary-400"
      >
        <Coffee className="mr-2 h-4 w-4 text-primary-500" />
        Buy coffee
      </a>

{/*       <a
        href="https://brave.com/tip"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-8 items-center whitespace-nowrap rounded-full bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:bg-orange-50 hover:text-[#FF5000] dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-[#FF5000]"
      >
        <svg className="mr-2 h-4 w-4 text-[#FF5000]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.65 11.625c.44-1.055.658-2.41.658-3.74 0-1.017-.22-1.89-.623-2.61-.715-1.272-2.253-2.233-3.897-2.233L12 3l-5.788.042c-1.644 0-3.182.961-3.897 2.233-.403.72-.623 1.593-.623 2.61 0 1.33.219 2.685.658 3.74.763 1.83 2.897 4.344 5.286 5.471.797.377 1.62.658 2.463.866l1.901-.084 1.901.084a12.56 12.56 0 0 0 2.463-.866c2.389-1.127 4.523-3.64 5.286-5.471z" />
        </svg>
        Tip BAT
      </a> */}
    </div>
  )
}

export default DonateButtons
