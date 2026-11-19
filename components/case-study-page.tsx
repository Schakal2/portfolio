import type { CSSProperties, ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { CaseStudyCopy } from "@/lib/content"
import type { CaseStudyImage } from "@/lib/case-study-images"
import styles from "./case-study-page.module.css"

interface CaseStudyPageProps {
  title: string
  copy: CaseStudyCopy
  cover: CaseStudyImage
  children: ReactNode
  /** Optional replacement for the cover image, e.g. a looping video. */
  hero?: ReactNode
  /** One-sentence summary shown under the title. */
  headline?: string
  /** Brand colours for this case study (surfaces behind media, accents). */
  theme?: { surface: string; accent: string }
}

export function CaseStudyPage({ title, copy, cover, children, hero, headline, theme }: CaseStudyPageProps) {
  const themeVars = theme
    ? ({ "--cs-surface": theme.surface, "--cs-accent": theme.accent } as CSSProperties)
    : undefined

  return (
    <>
      <SiteHeader />
      <article className={styles.article} style={themeVars}>
        <Link href="/#work" className={styles.back}>
          &lt; {copy.back}
        </Link>
        <p className={styles.role}>{copy.role}</p>
        <h1 className={styles.title}>{title}</h1>
        {headline && <p className={styles.headline}>{headline}</p>}
        <ul className={styles.tags}>
          {copy.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {hero ? (
          <div className={styles.hero}>{hero}</div>
        ) : (
          <Image
            src={cover.src}
            alt={`${title} preview`}
            width={cover.width}
            height={cover.height}
            className={styles.cover}
            priority
          />
        )}
        <div className={styles.body}>{children}</div>
      </article>
      <SiteFooter />
    </>
  )
}
