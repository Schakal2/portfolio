import type { ReactNode } from "react"
import type { MDXComponents } from "mdx/types"
import styles from "@/components/case-study-page.module.css"

function Video({ src }: { src: string }) {
  return (
    <video
      src={src}
      className={styles.galleryVideo}
      controls
      playsInline
      muted
      loop
    />
  )
}

function MetaGrid({ children }: { children: ReactNode }) {
  return <div className={styles.metaGrid}>{children}</div>
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.metaItem}>
      <span className={styles.metaLabel}>{label}</span>
      <span className={styles.metaValue}>{value}</span>
    </div>
  )
}

function StatGrid({ children }: { children: ReactNode }) {
  return <div className={styles.statGrid}>{children}</div>
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statNumber}>{number}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}

function Callout({ children }: { children: ReactNode }) {
  return <div className={styles.calloutBox}>{children}</div>
}

function Exploration({ title, selected, children }: { title: string; selected?: boolean; children: ReactNode }) {
  return (
    <div className={`${styles.explorationCard} ${selected ? styles.explorationCardSelected : ""}`}>
      <div className={styles.explorationHeader}>
        <span>{title}</span>
        {selected && <span>✅ Ausgewählt</span>}
      </div>
      <div>{children}</div>
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className={styles.sectionHeading} {...props} />,
    h3: (props) => <h3 className={styles.sectionHeading} {...props} />,
    p: (props) => <p className={styles.sectionBody} {...props} />,
    ul: (props) => <ul className={styles.list} {...props} />,
    ol: (props) => <ol className={styles.list} {...props} />,
    // eslint-disable-next-line @next/next/no-img-element
    img: (props) => <img className={styles.galleryImage} alt="" {...props} />,
    Video,
    MetaGrid,
    MetaItem,
    StatGrid,
    StatCard,
    Callout,
    Exploration,
    ...components,
  }
}

