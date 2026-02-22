import PortfolioLayout from "@/components/portfolio-layout"
import Banner from "@/components/banner"
import Features from "@/components/features"
import Posts from "@/components/posts"

export default function HomePage() {
  return (
    <PortfolioLayout>
      <Banner />
      <Features />
      <Posts />
    </PortfolioLayout>
  )
}
