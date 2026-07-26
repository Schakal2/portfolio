"use client"

import { useLocale } from "@/lib/locale-context"
import { MarkStar } from "@/components/mark-badge"
import styles from "./site-footer.module.css"

export function SiteFooter() {
  const { t } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} id="contact">
      <MarkStar className={styles.badge} />
      <div className={styles.col}>
        <h5>{t.footer.navTitle}</h5>
        <a href="/">{t.nav.home}</a>
        <a href="/#work">{t.nav.work}</a>
      </div>
      <div className={styles.col}>
        <h5>{t.footer.contactTitle}</h5>
        <a href="mailto:julian2wegner@gmail.com">Email</a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Behance
        </a>
      </div>
      <p className={styles.rights}>
        © {year} Julian Wegner. {t.footer.rights}
      </p>
    </footer>
  )
}
