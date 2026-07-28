"use client"

import { useLocale } from "@/lib/locale-context"
import { RingBadge } from "@/components/mark-badge"
import styles from "./hero.module.css"

interface HeroProps {
  selectedSkill?: string | null
  onSelectSkill?: (skill: string | null) => void
}

export function Hero({ selectedSkill, onSelectSkill }: HeroProps) {
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
            {t.skills.map((skill) => {
              const isSelected = selectedSkill === skill
              return (
                <li key={skill}>
                  <button
                    type="button"
                    onClick={() => onSelectSkill?.(skill)}
                    className={`${styles.skillBtn} ${isSelected ? styles.activeSkill : ""}`}
                    aria-pressed={isSelected}
                  >
                    {skill}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <RingBadge text="UX Design · UI Design · Web Design · " />
      </div>
    </section>
  )
}
