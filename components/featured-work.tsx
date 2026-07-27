"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import type { WorkItem } from "@/lib/content"
import styles from "./featured-work.module.css"

export function FeaturedWork() {
  const { t } = useLocale()

  return (
    <section className={styles.section} id="work">
      <div className={styles.fwBanner}>
        <span aria-hidden="true">✶</span>
        <span>{t.work.banner}</span>
        <span aria-hidden="true">✶</span>
      </div>
      <div className={styles.cases}>
        {t.work.items.map((item) => (
          <CaseRow key={item.slug} item={item} />
        ))}
      </div>
    </section>
  )
}

function CaseRow({ item }: { item: WorkItem }) {
  const body = (
    <>
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
        {item.href && <span className={styles.btn}>{item.ctaLabel}</span>}
      </div>
    </>
  )

  if (item.href && item.external) {
    return (
      <a href={item.href} className={styles.case} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    )
  }

  if (item.href) {
    return (
      <Link href={item.href} className={styles.case}>
        {body}
      </Link>
    )
  }

  return <div className={`${styles.case} ${styles.caseDisabled}`}>{body}</div>
}
