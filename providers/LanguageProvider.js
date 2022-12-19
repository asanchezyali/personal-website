import React from 'react'

export const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: (language) => {},
})

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = React.useState('en')

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
