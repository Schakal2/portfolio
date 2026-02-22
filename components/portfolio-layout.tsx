import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import styles from "./portfolio-layout.module.css"

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.inner}>
          <Header />
          {children}
        </div>
      </div>
      <Sidebar />
    </div>
  )
}
