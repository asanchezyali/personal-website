import React from 'react'
import { Coffee, Heart } from 'lucide-react'

const DonateButtons = () => {
  return (
    <div className="flex gap-3 py-8">
      <a
        href="https://ko-fi.com/asanchezyali"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 items-center rounded-full border border-gray-200 bg-transparent px-4 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-600 dark:hover:text-blue-400"
      >
        <Coffee className="mr-2 h-4 w-4 text-blue-500" />
        Buy coffee
      </a>

      <a
        href="https://www.paypal.com/paypalme/asanchezyali"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 items-center rounded-full border border-gray-200 bg-transparent px-4 text-sm font-medium text-gray-700 hover:border-red-300 hover:text-red-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-red-600 dark:hover:text-red-400"
      >
        <Heart className="mr-2 h-4 w-4 text-red-500" />
        Tip me
      </a>
    </div>
  )
}

export default DonateButtons
