import Image from "next/image"
import styles from "./banner.module.css"

export default function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <header>
          <h1>{"Hi, I'm Julian"}</h1>
          <p className={styles.subtitle}>UXUI Designer | Web Designer</p>
        </header>
        <p>
          {
            "I'm Julian, a UX Writing Executive dedicated to the idea that the right words don't just fill boxes\u2014they build bridges. With over a decade of experience leading content design teams through complex digital transformations, I specialize in turning friction into flow. Whether it's navigating a high-stakes product launch or refining a global voice and tone strategy, my goal is always to create interfaces that speak a human language, making technology feel a little less like a machine and more like a conversation."
          }
        </p>
      </div>
      <span className={styles.image}>
        <Image
          src="/images/pic01.jpg"
          alt="Julian Wegner portrait"
          width={600}
          height={600}
          className={styles.img}
          priority
        />
      </span>
    </section>
  )
}
