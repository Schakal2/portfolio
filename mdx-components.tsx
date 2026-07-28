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

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className={styles.sectionHeading} {...props} />,
    h3: (props) => <h3 className={styles.sectionHeading} {...props} />,
    p: (props) => <p className={styles.sectionBody} {...props} />,
    // eslint-disable-next-line @next/next/no-img-element
    img: (props) => <img className={styles.galleryImage} alt="" {...props} />,
    Video,
    ...components,
  }
}
