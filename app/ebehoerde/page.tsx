"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import styles from "./page.module.css"

export default function EBehoerdePage() {
  const { t } = useLocale()
  const eb = t.ebehoerde

  return (
    <>
      <SiteHeader />
      <article className={styles.article}>
        <Link href="/#work" className={styles.back}>
          &lt; {eb.back}
        </Link>
        <p className={styles.role}>{eb.role}</p>
        <h1 className={styles.title}>eBehörde</h1>
        <ul className={styles.tags}>
          {eb.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <Image
          src="/images/ebehoerde-cover.png"
          alt="eBehörde app preview"
          width={1535}
          height={1219}
          className={styles.cover}
          priority
        />
        <p className={styles.intro}>{eb.intro}</p>
        <p className={styles.note}>{eb.note}</p>
      </article>
      <SiteFooter />
    </>
  )
}
