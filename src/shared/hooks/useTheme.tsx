'use client'
import React, { createContext, useState, useContext, useEffect } from 'react'

interface ThemeContextProps { theme: string; setTheme: (t: string) => void; mounted: boolean }
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setTheme(localStorage.getItem('yali-theme') || 'system'); setMounted(true) }, [])
  useEffect(() => {
    localStorage.setItem('yali-theme', theme)
    const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', dark)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme, mounted }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
  return ctx
}
