import Image from "next/image"
import Link from "next/link"
import styles from "./posts.module.css"

const posts = [
  {
    image: "/images/images/Cover image eBehoerde.png",
    title: "eBehorde",
    description:
      "E-Behorde ist eine digitale Plattform, die entwickelt wurde, um die Interaktion der Burgerinnen und Burger mit den Behorden in Deutschland zu erleichtern.",
    href: "/ebehoerde",
  },
  {
    image: "/images/pic02.jpg",
    title: "Nulla amet dolore",
    description:
      "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
    href: "#",
  },
  {
    image: "/images/pic03.jpg",
    title: "Tempus ullamcorper",
    description:
      "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
    href: "#",
  },
  {
    image: "/images/pic04.jpg",
    title: "Sed etiam facilis",
    description:
      "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
    href: "#",
  },
  {
    image: "/images/pic05.jpg",
    title: "Feugiat lorem aenean",
    description:
      "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
    href: "#",
  },
  {
    image: "/images/pic06.jpg",
    title: "Amet varius aliquam",
    description:
      "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.",
    href: "#",
  },
]

export default function Posts() {
  return (
    <section className={styles.section}>
      <header>
        <h2 className={styles.sectionTitle}>Ipsum sed dolor</h2>
      </header>
      <div className={styles.posts}>
        {posts.map((post, index) => (
          <article key={index} className={styles.post}>
            <Link href={post.href} className={styles.postImageLink}>
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className={styles.postImg}
              />
            </Link>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <ul className={styles.actions}>
              <li>
                <Link href={post.href} className={styles.button}>
                  More
                </Link>
              </li>
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
