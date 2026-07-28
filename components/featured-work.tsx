"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import type { WorkItem } from "@/lib/content"
import styles from "./featured-work.module.css"

interface FeaturedWorkProps {
  selectedSkill?: string | null
  onSelectSkill?: (skill: string | null) => void
}

export function FeaturedWork({ selectedSkill, onSelectSkill }: FeaturedWorkProps) {
  const { t } = useLocale()

  const filteredItems = selectedSkill
    ? t.work.items.filter((item) => item.tags?.includes(selectedSkill))
    : t.work.items

  return (
    <section className={styles.section} id="work">
      <div className={styles.fwBanner}>
        <span aria-hidden="true">✶</span>
        <span>{t.work.banner}</span>
        <span aria-hidden="true">✶</span>
      </div>

      {selectedSkill && (
        <div className={styles.filterBar}>
          <span>
            Filter: <strong>{selectedSkill}</strong> ({filteredItems.length}{" "}
            {filteredItems.length === 1 ? "Projekt" : "Projekte"})
          </span>
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => onSelectSkill?.(null)}
          >
            ✕ Alle anzeigen
          </button>
        </div>
      )}

      <div className={styles.cases}>
        {filteredItems.map((item) => (
          <CaseRow
            key={item.slug}
            item={item}
            selectedSkill={selectedSkill}
            onSelectSkill={onSelectSkill}
          />
        ))}
      </div>
    </section>
  )
}

function CaseRow({
  item,
  selectedSkill,
  onSelectSkill,
}: {
  item: WorkItem
  selectedSkill?: string | null
  onSelectSkill?: (skill: string | null) => void
}) {
  return (
    <div className={styles.case} id={`project-${item.slug}`}>
      <div className={styles.shot}>
        {item.cover ? (
          <Image
            src={item.cover}
            alt={`${item.title} preview`}
            width={800}
            height={600}
            className={styles.shotImg}
          />
        ) : (
          <span className={styles.shotPlaceholder}>Screen Mockup</span>
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.role}>{item.role}</p>
        <h3>{item.title}</h3>
        <p className={styles.tag}>{item.tag}</p>
        <h4>{item.headline}</h4>
        <p className={styles.meta}>{item.meta}</p>

        {item.tags && item.tags.length > 0 && (
          <div className={styles.projectTags}>
            {item.tags.map((tag) => {
              const isSelected = selectedSkill === tag
              return (
                <button
                  key={tag}
                  type="button"
                  className={`${styles.projectTagBtn} ${isSelected ? styles.activeProjectTag : ""}`}
                  onClick={() => onSelectSkill?.(tag)}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        )}

        {item.href && (
          item.external ? (
            <a
              href={item.href}
              className={styles.btn}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.ctaLabel}
            </a>
          ) : (
            <Link href={item.href} className={styles.btn}>
              {item.ctaLabel}
            </Link>
          )
        )}
      </div>
    </div>
  )
}
