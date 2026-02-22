"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Menu,
  Search,
  Mail,
  Phone,
  Home,
  ChevronDown,
  X,
} from "lucide-react"
import styles from "./sidebar.module.css"

const navItems = [
  { label: "Homepage", href: "/" },
  { label: "eBehorde", href: "/ebehoerde" },
]

const miniPosts = [
  { image: "/images/pic07.jpg", text: "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore aliquam." },
  { image: "/images/pic08.jpg", text: "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore aliquam." },
  { image: "/images/pic09.jpg", text: "Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore aliquam." },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth <= 1280
      setIsMobile(mobile)
      if (!mobile) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  function handleNavClick() {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        className={styles.toggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.active : styles.inactive}`}
      >
        <div className={styles.inner}>
          {/* Search */}
          <section className={styles.search}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.searchInput}
                />
                <Search size={18} className={styles.searchIcon} />
              </div>
            </form>
          </section>

          {/* Navigation Menu */}
          <nav className={styles.menu}>
            <header>
              <h2 className={styles.sectionTitle}>Menu</h2>
            </header>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${
                      pathname === item.href ? styles.navLinkActive : ""
                    }`}
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Recent Posts */}
          <section className={styles.section}>
            <header>
              <h2 className={styles.sectionTitle}>Recent Work</h2>
            </header>
            <div className={styles.miniPosts}>
              {miniPosts.map((post, index) => (
                <article key={index} className={styles.miniPost}>
                  <Link href="#" className={styles.miniPostImage}>
                    <Image
                      src={post.image}
                      alt="Project thumbnail"
                      width={400}
                      height={250}
                      className={styles.miniPostImg}
                    />
                  </Link>
                  <p className={styles.miniPostText}>{post.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Get In Touch */}
          <section className={styles.section}>
            <header>
              <h2 className={styles.sectionTitle}>Get in touch</h2>
            </header>
            <p>
              {
                "Whether you're looking to build a world-class content design team, need a strategic eye on a complex product ecosystem, or just want to debate the merits of the Oxford comma over coffee\u2014I'm all ears."
              }
            </p>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Mail size={20} className={styles.contactIcon} />
                <a href="mailto:information@untitled.tld">
                  information@untitled.tld
                </a>
              </li>
              <li className={styles.contactItem}>
                <Phone size={20} className={styles.contactIcon} />
                <span>(000) 000-0000</span>
              </li>
              <li className={styles.contactItem}>
                <Home size={20} className={styles.contactIcon} />
                <span>
                  1234 Somewhere Road #8254
                  <br />
                  Nashville, TN 00000-0000
                </span>
              </li>
            </ul>
          </section>

          {/* Footer */}
          <footer className={styles.footer}>
            <p className={styles.copyright}>
              {"Julian Wegner. All rights reserved. Design: "}
              <a
                href="https://html5up.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                HTML5 UP
              </a>
              .
            </p>
          </footer>
        </div>
      </aside>
    </>
  )
}
