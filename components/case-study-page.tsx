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
  /** Media shown right after the intro paragraph, before the first section. */
  introMedia?: CaseStudyImage[]
  /** Media shown after each section, indexed the same as copy.sections. */
  sectionMedia?: CaseStudyImage[][]
  /** Media shown at the very end, after all sections. */
  closingMedia?: CaseStudyImage[]
}

export function CaseStudyPage({
  title,
  copy,
  cover,
  introMedia,
  sectionMedia,
  closingMedia,
}: CaseStudyPageProps) {
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
        <MediaGroup title={title} media={introMedia} />
        {copy.sections?.map((section, i) => (
          <div key={section.heading}>
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>{section.heading}</h2>
              <p className={styles.sectionBody}>{section.body}</p>
            </section>
            <MediaGroup title={title} media={sectionMedia?.[i]} />
          </div>
        ))}
        <MediaGroup title={title} media={closingMedia} />
      </article>
      <SiteFooter />
    </>
  )
}

function MediaGroup({ title, media }: { title: string; media?: CaseStudyImage[] }) {
  if (!media || media.length === 0) return null

  return (
    <div className={styles.gallery}>
      {media.map((item) =>
        item.video ? (
          <video
            key={item.src}
            src={item.src}
            className={styles.galleryVideo}
            controls
            playsInline
            muted
            loop
          />
        ) : (
          <Image
            key={item.src}
            src={item.src}
            alt={`${title} case study detail`}
            width={item.width}
            height={item.height}
            className={styles.galleryImage}
            sizes="(max-width: 760px) 100vw, 760px"
          />
        )
      )}
    </div>
  )
}
