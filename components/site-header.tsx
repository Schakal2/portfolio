"use client"

import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import { LocaleToggle } from "@/components/locale-toggle"
import styles from "./site-header.module.css"

export function SiteHeader() {
  const { t, locale } = useLocale()
  const cvHref = locale === "de" ? "/images/cv-de.pdf" : "/images/cv-en.pdf"

  return (
    <header className={styles.top}>
      <Link href="/" className={styles.mark}>
        Julian Wegner
      </Link>
      <nav className={styles.nav}>
        <Link href="/">{t.nav.home}</Link>
        <Link href="/#work">{t.nav.work}</Link>
        <Link href="/#contact">{t.nav.contact}</Link>
        <a href={cvHref} target="_blank" rel="noopener noreferrer">
          {t.nav.cv}
        </a>
      </nav>
      <LocaleToggle />
    </header>
  )
}
