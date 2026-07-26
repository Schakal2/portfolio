"use client"

import { useLocale } from "@/lib/locale-context"
import { RingBadge } from "@/components/mark-badge"
import styles from "./hero.module.css"

export function Hero() {
  const { t } = useLocale()

  return (
    <section className={styles.hero}>
      <div className={styles.banner}>
        <span aria-hidden="true">✶</span>
        <span>{t.hero.banner}</span>
        <span aria-hidden="true">✶</span>
      </div>
      <div className={styles.grid}>
        <div>
          <h1 className={styles.heading}>{t.hero.heading}</h1>
          <p className={styles.bio}>{t.hero.bio}</p>
          <a className={styles.cta} href="#work">
            {t.hero.cta} <span aria-hidden="true">&gt;</span>
          </a>
          <ul className={styles.skills}>
            {t.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
        <RingBadge words={t.hero.ringWords} />
      </div>
    </section>
  )
}
