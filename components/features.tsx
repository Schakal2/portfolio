import { Gem, Send, Rocket, BarChart3 } from "lucide-react"
import styles from "./features.module.css"

const features = [
  {
    icon: Gem,
    title: "Portitor ullamcorper",
    description:
      "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
  },
  {
    icon: Send,
    title: "Sapien veroeros",
    description:
      "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
  },
  {
    icon: Rocket,
    title: "Quam lorem ipsum",
    description:
      "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
  },
  {
    icon: BarChart3,
    title: "Sed magna finibus",
    description:
      "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
  },
]

export default function Features() {
  return (
    <section className={styles.section}>
      <header>
        <h2 className={styles.sectionTitle}>Erat lacinia</h2>
      </header>
      <div className={styles.features}>
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <article key={index} className={styles.feature}>
              <span className={styles.iconWrapper}>
                <Icon size={36} className={styles.icon} />
              </span>
              <div className={styles.content}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
