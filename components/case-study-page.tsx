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
  gallery: CaseStudyImage[]
}

export function CaseStudyPage({ title, copy, cover, gallery }: CaseStudyPageProps) {
  return (
    <>
      <SiteHeader />
      <article className={styles.article}>
        <Link href="/#work" className={styles.back}>
          &lt; {copy.back}
        </Link>
        <p className={styles.role}>{copy.role}</p>
        <h1 className={styles.title}>{title}</h1>
        <ul className={styles.tags}>
          {copy.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <Image
          src={cover.src}
          alt={`${title} preview`}
          width={cover.width}
          height={cover.height}
          className={styles.cover}
          priority
        />
        <p className={styles.intro}>{copy.intro}</p>
        <div className={styles.gallery}>
          {gallery.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={`${title} case study detail`}
              width={image.width}
              height={image.height}
              className={styles.galleryImage}
              sizes="(max-width: 760px) 100vw, 760px"
            />
          ))}
        </div>
      </article>
      <SiteFooter />
    </>
  )
}
