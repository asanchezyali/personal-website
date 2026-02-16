'use client'

import React from 'react'
import { MailIcon } from '../search/icons'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface cModalProps {
  isOpen?: boolean
  onClose: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  disabled?: boolean
}

export const CModal: React.FC<cModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white dark:bg-black sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center text-3xl font-semibold">
            <MailIcon className="mr-2 h-6 w-6" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="relative flex-auto">{body}</div>
        {footer && <DialogFooter className="flex flex-col gap-2">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
