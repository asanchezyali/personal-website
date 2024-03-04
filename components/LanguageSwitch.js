import React from 'react'
import { LanguageContext } from '@/providers/LanguageProvider'

const LanguageSwitch = () => {
  const { language, setLanguage } = React.useContext(LanguageContext)

  return (
    <button
      aria-label="Toggle Language"
      type="button"
      className="rounded-md bg-slate-300 px-4 py-1 font-medium text-gray-900 hover:bg-primary-500 dark:bg-gray-800 dark:text-gray-100"
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
    >
      {language === 'en' ? 'ES' : 'EN'}
    </button>
  )
}

export default LanguageSwitch
