import styles from "./mark-badge.module.css"

const STAR_POINTS =
  "100,4 112,70 170,36 128,90 196,100 128,110 170,164 112,130 100,196 88,130 30,164 72,110 4,100 72,90 30,36 88,70"

export function MarkStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <polygon className={styles.polygon} points={STAR_POINTS} />
      <text x="100" y="105" textAnchor="middle" className={styles.letters}>
        JULIAN WEGNER
      </text>
    </svg>
  )
}

export function RingBadge({ name }: { name: string }) {
  const ringText = `${Array(6).fill(name).join(" • ")} • `

  return (
    <div className={styles.ringWrap} aria-hidden="true">
      <svg className={styles.ring} viewBox="0 0 260 260">
        <defs>
          <path id="markRingPath" d="M 130,130 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0" />
        </defs>
        <text className={styles.ringText}>
          <textPath href="#markRingPath" startOffset="0%">
            {ringText}
          </textPath>
        </text>
      </svg>
      <div className={styles.star}>
        <MarkStar className={styles.starSvg} />
      </div>
    </div>
  )
}
