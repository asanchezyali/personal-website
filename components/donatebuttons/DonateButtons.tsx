import React from 'react'
import { Coffee, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const DonateButtons = () => {
  return (
    <div className="flex gap-3 py-8">
      <Button variant="ghost" asChild className="h-8 rounded-full shadow">
        <a href="https://ko-fi.com/asanchezyali" target="_blank" rel="noopener noreferrer">
          <Coffee className="mr-2 h-4 w-4 text-blue-500" />
          Buy coffee
        </a>
      </Button>

      <Button variant="ghost" asChild className="h-8 rounded-full shadow">
        <a href="https://www.paypal.com/paypalme/asanchezyali" target="_blank" rel="noopener noreferrer">
          <Heart className="mr-2 h-4 w-4 text-red-500" />
          Tip me
        </a>
      </Button>
    </div>
  )
}

export default DonateButtons
