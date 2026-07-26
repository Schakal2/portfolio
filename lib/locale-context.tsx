"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { content, type Locale } from "@/lib/content"

const STORAGE_KEY = "locale"

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof content)["de"]
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("de")

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "de" || stored === "en") {
      setLocaleState(stored)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  function setLocale(next: Locale) {
    setLocaleState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: content[locale] }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider")
  return ctx
}
