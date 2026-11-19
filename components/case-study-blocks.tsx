import type { ReactNode } from "react"
import styles from "./case-study-blocks.module.css"

/* Building blocks for richer case studies. All of them are registered
   as MDX components, so an .mdx file can mix them with plain markdown. */

export function Lead({ children }: { children: ReactNode }) {
  return <div className={styles.lead}>{children}</div>
}

export function Chapter({ n, label }: { n: string; label: string }) {
  return (
    <div className={styles.chapter}>
      <span aria-hidden="true">✶</span>
      <span>
        {n} · {label}
      </span>
      <span aria-hidden="true">✶</span>
    </div>
  )
}

interface FigureProps {
  src: string
  alt?: string
  caption?: string
  poster?: string
  wide?: boolean
  tone?: "brand" | "plain"
  maxWidth?: number
}

/** Image or looping, muted video (for .mp4/.webm) with an optional caption. */
export function Figure({ src, alt = "", caption, poster, wide, tone = "brand", maxWidth }: FigureProps) {
  const isVideo = /\.(mp4|webm)$/i.test(src)
  return (
    <figure className={`${styles.figure} ${wide ? styles.wide : ""} ${tone === "brand" ? styles.brand : ""}`}>
      <div className={styles.frame}>
        {isVideo ? (
          <video
            src={src}
            poster={poster}
            className={styles.media}
            style={maxWidth ? { maxWidth } : undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={alt}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className={styles.media} style={maxWidth ? { maxWidth } : undefined} loading="lazy" />
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  )
}

export function Steps({ children }: { children: ReactNode }) {
  return <ol className={styles.steps}>{children}</ol>
}

export function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <li className={styles.step}>
      <span className={styles.stepNumber}>{n}</span>
      <strong className={styles.stepTitle}>{title}</strong>
      <span className={styles.stepBody}>{children}</span>
    </li>
  )
}

interface FixProps {
  n: string
  title: string
  problem: string
  cause: string
  fix: string
  labels?: [string, string, string]
  children?: ReactNode
}

/** One fix: the story on the left, the evidence (image/video) on the right. */
export function Fix({ n, title, problem, cause, fix, labels = ["Problem", "Ursache", "Lösung"], children }: FixProps) {
  return (
    <section className={styles.fix}>
      <div className={styles.fixText}>
        <span className={styles.fixNumber}>{n}</span>
        <h3 className={styles.fixTitle}>{title}</h3>
        <dl className={styles.fixList}>
          <dt>{labels[0]}</dt>
          <dd>{problem}</dd>
          <dt>{labels[1]}</dt>
          <dd>{cause}</dd>
          <dt>{labels[2]}</dt>
          <dd>{fix}</dd>
        </dl>
      </div>
      <div className={styles.fixMedia}>{children}</div>
    </section>
  )
}

export function Learnings({ children }: { children: ReactNode }) {
  return <div className={styles.learnings}>{children}</div>
}

export function Learning({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.learning}>
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  )
}

export function Marquee({ text }: { text: string }) {
  const items = Array.from({ length: 6 }, (_, i) => (
    <span key={i}>
      {text} <span aria-hidden="true">✶</span>{" "}
    </span>
  ))
  return (
    <div className={styles.marquee} aria-label={text}>
      <div className={styles.marqueeTrack} aria-hidden="true">
        {items}
        {items}
      </div>
    </div>
  )
}

export function Gallery({ children }: { children: ReactNode }) {
  return <div className={styles.gallery}>{children}</div>
}

/** A compact tile: media on top, outcome title and one sentence below. */
export function Shot({ src, alt = "", poster, title, children }: { src: string; alt?: string; poster?: string; title: string; children?: ReactNode }) {
  const isVideo = /\.(mp4|webm)$/i.test(src)
  return (
    <figure className={styles.shot}>
      <div className={styles.shotMedia}>
        {isVideo ? (
          <video src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-label={alt} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} loading="lazy" />
        )}
      </div>
      <figcaption className={styles.shotText}>
        <strong>{title}</strong>
        {children && <span>{children}</span>}
      </figcaption>
    </figure>
  )
}

export function Quote({ children }: { children: ReactNode }) {
  return <blockquote className={styles.quote}>{children}</blockquote>
}
