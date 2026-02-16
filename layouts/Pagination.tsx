import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  params: { locale: LocaleTypes }
}
export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  params: { locale },
}: PaginationProps) {
  const { t } = useTranslation(locale, 'home')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  const handlePrevPage = () => {
    if (prevPage) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (nextPage) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        <Button
          variant="ghost"
          disabled={!prevPage}
          onClick={handlePrevPage}
        >
          {t('prevp')}
        </Button>
        <span className="flex items-center">
          {currentPage} of {totalPages}
        </span>
        <Button
          variant="ghost"
          disabled={!nextPage}
          onClick={handleNextPage}
        >
          {t('nextp')}
        </Button>
      </nav>
    </div>
  )
}
