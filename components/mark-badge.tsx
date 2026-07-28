import styles from "./mark-badge.module.css"

const STAR_POINTS =
  "100,4 112,70 170,36 128,90 196,100 128,110 170,164 112,130 100,196 88,130 30,164 72,110 4,100 72,90 30,36 88,70"

export function MarkStar({
  className,
  hideShape,
}: {
  className?: string
  hideShape?: boolean
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {!hideShape && <polygon className={styles.polygon} points={STAR_POINTS} />}
      <text x="100" y="105" textAnchor="middle" className={styles.letters}>
        JULIAN WEGNER
      </text>
    </svg>
  )
}

export function RingBadge({ text }: { text: string }) {
  // Placing each character at its own angle (instead of flowing text along
  // a <textPath>) guarantees the loop closes exactly, whatever the text —
  // textPath length never matched the circle's circumference perfectly,
  // which is what cut the last word off mid-way and overlapped it with
  // the start.
  const chars = text.toUpperCase().split("")
  const step = 360 / chars.length

  return (
    <div className={styles.ringWrap} aria-hidden="true">
      <svg className={styles.ring} viewBox="0 0 260 260">
        {chars.map((char, i) => (
          <text
            key={i}
            x="130"
            y="30"
            textAnchor="middle"
            transform={`rotate(${i * step} 130 130)`}
            className={styles.ringChar}
          >
            {char === " " ? " " : char}
          </text>
        ))}
      </svg>
      <div className={styles.star}>
        <MarkStar className={styles.starSvg} hideShape />
      </div>
    </div>
  )
}
