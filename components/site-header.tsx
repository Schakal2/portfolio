"use client"

import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import { LocaleToggle } from "@/components/locale-toggle"
import styles from "./site-header.module.css"

export function SiteHeader() {
  const { t } = useLocale()

  return (
    <header className={styles.top}>
      <Link href="/" className={styles.mark}>
        J_W!
      </Link>
      <nav className={styles.nav}>
        <Link href="/">{t.nav.home}</Link>
        <Link href="/#work">{t.nav.work}</Link>
        <Link href="/#contact">{t.nav.contact}</Link>
      </nav>
      <LocaleToggle />
    </header>
  )
}
