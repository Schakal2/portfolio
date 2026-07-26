"use client"

import { useLocale } from "@/lib/locale-context"
import styles from "./locale-toggle.module.css"

export function LocaleToggle() {
  const { locale, setLocale } = useLocale()

  return (
    <div className={styles.toggle} role="group" aria-label="Language">
      <button
        type="button"
        className={styles.option}
        aria-pressed={locale === "de"}
        onClick={() => setLocale("de")}
      >
        DE
      </button>
      <span className={styles.divider}>/</span>
      <button
        type="button"
        className={styles.option}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
    </div>
  )
}
