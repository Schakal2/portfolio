import Link from "next/link"
import {
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react"
import styles from "./header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <strong>UXUI Portfolio</strong> Julian Wegner
      </Link>
      <ul className={styles.icons}>
        <li>
          <a href="#" aria-label="Twitter" className={styles.iconLink}>
            <Twitter size={18} />
          </a>
        </li>
        <li>
          <a href="#" aria-label="Facebook" className={styles.iconLink}>
            <Facebook size={18} />
          </a>
        </li>
        <li>
          <a href="#" aria-label="Instagram" className={styles.iconLink}>
            <Instagram size={18} />
          </a>
        </li>
      </ul>
    </header>
  )
}
