"use client"

import { useLocale } from "@/lib/locale-context"
import { MarkStar } from "@/components/mark-badge"
import styles from "./site-footer.module.css"

export function SiteFooter() {
  const { t, locale } = useLocale()
  const year = new Date().getFullYear()
  const cvHref = locale === "de" ? "/images/cv-de.pdf" : "/images/cv-en.pdf"

  return (
    <footer className={styles.footer} id="contact">
      <MarkStar className={styles.badge} hideShape />
      <div className={styles.col}>
        <h5>{t.footer.navTitle}</h5>
        <a href="/">{t.nav.home}</a>
        <a href="/#work">{t.nav.work}</a>
        <a href={cvHref} target="_blank" rel="noopener noreferrer">
          {t.nav.cv}
        </a>
      </div>
      <div className={styles.col}>
        <h5>{t.footer.contactTitle}</h5>
        <a href="mailto:julian2wegner@gmail.com">Email</a>
        <a href="https://www.linkedin.com/in/julianwegner2/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://www.behance.net/julianwegner1" target="_blank" rel="noopener noreferrer">
          Behance
        </a>
      </div>
      <p className={styles.rights}>
        © {year} Julian Wegner. {t.footer.rights}
      </p>
    </footer>
  )
}
