import React from 'react'

export const LanguageContext = React.createContext({
  language: 'es',
  setLanguage: (language) => {},
})

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = React.useState('es')

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
